/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.20
功能：游戏界面场景脚本
*****************************************************/

import ASCAd from "../../SDK/ASCAd";
import { GameState, Platform } from "../Common/CommonEnum";
import CommonGlobal from "../Common/CommonGlobal";
import TipsManager from "../Common/TipsManager";
import AdManager from "../Expand/AdManager";
import audioEngineMamager from "../Expand/audioEngineMamager";
import DownloadManager from "../Expand/DownloadManager";
import PoolManager from "../Expand/PoolManager";
import SDKManager from "../Expand/SDKManager";
import ToolsManager from "../Expand/ToolsManager";
import { AllCommandDefine } from "../MainComponent/AllCommandDefine";
import { AllMediatorDefine } from "../MainComponent/AllMediatorDefine";
import CommonFacade from "../MainComponent/CommonFacade";
import GameMainMediator from "../MainComponent/Game/Mediator/GameMainMediator";
import BaseKeyBaseUnit from "../MainComponent/Game/Unit/KeyBaseUnit/BaseKeyBaseUnit";
import NormalKeyBaseUnit from "../MainComponent/Game/Unit/KeyBaseUnit/NormalKeyBaseUnit";
import PressedKeyBaseUnit from "../MainComponent/Game/Unit/KeyBaseUnit/PressedKeyBaseUnit";
import { PageName } from "../MainComponent/PageName";
import { OpenPageFunc } from "../MainComponent/UI/Command/OpenPageCmd";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    // ------------------------------------------------------------
    // 预制

    /** 普通的钢琴块底预制 */
    @property(cc.Prefab)
    private normalKeyBasePre: cc.Prefab = null;

    /** 长按型的钢琴块底预制 */
    @property(cc.Prefab)
    private pressedKeyBasePre: cc.Prefab = null;



    // ------------------------------------------------------------
    // 节点

    /** 背景节点 */
    private bgNode: cc.Node = null;

    // ------------------------------
    // 游戏基础节点

    /** 游戏基础控制总节点 */
    private baseNode: cc.Node = null;

    /** 钢琴块列表的总控制节点 */
    private keyList: cc.Node = null;

    /** 专门控制钢琴块移动的总节点 */
    private keyConNode: cc.Node = null;

    /** 游戏内的点击线 */
    private gameTouchLine: cc.Node = null;

    /** 点击线的光 */
    private lineLightSP: cc.Node = null;

    /** 钢琴键分组的列表 */
    private keyGroupList = [];

    /** 游戏界面分割线分组的列表 */
    private keyLineList = [];


    // ---------------------------------------------------
    // 切换背景组件
    /** 切换背景总控制节点 */
    private switchNode: cc.Node = null;
    /** 切换背景图片集合列表 */
    private switchSPList: cc.Node[] = [];


    // ------------------------------------------------------------
    // 数据区

    private static _instance: Game = null;
    public static getInstance() {
        return Game._instance;
    }


    // ---------------------------------------------- 
    // 游戏基础信息

    /** 本地歌曲信息 */
    @property(cc.AudioClip)
    private baseMusicData: cc.AudioClip = null;

    /** 本地歌曲json */
    @property(cc.JsonAsset)
    private baseMusicJSON: cc.JsonAsset = null;

    /** 表当前游戏是否要进行自动计算钢琴块的长度 */
    @property({ displayName: "是否根据节奏点信息自动计算" })
    private isNeedAutoCalcu: boolean = true;

    /** 短钢琴块的单位长度 */
    @property({ displayName: "单位短钢琴块的长度" })
    private normalKeyNum: number = CommonGlobal.getInstance().gameKeyUnitNum;

    /** 游戏内的基础移动速度 */
    @property({ displayName: "游戏内的基础移动速度" })
    private gameSpeed: number = CommonGlobal.getInstance().gamePlayerSpeed;


    // ---------------------------------------------- 
    // 游戏正常玩法信息
    /** 用于进行存储钢琴块的节点信息 */
    private keyArr: cc.Node[] = [];
    /** 当前创建到第几个节奏点 */
    private pointCount: number = 0;
    /** 当前歌曲播放到的时间 */
    private musicTime: number = 0;
    /** 当前游戏移动的速度 */
    private playerSpeed: number = 500;
    /** 上一个节点的父节点是第几个 */
    private lastParentNum: number = 0;
    /** 上一个节点的父节点是第几个(用于双节点的情况下) */
    private otherLastParentNum: number = 0;
    /** 当前玩家点击到第几个板子 */
    private pressedCount: number = 0;


    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        if (!Game._instance) {
            Game._instance = this;
            this.init();
            cc.game.addPersistRootNode(this.node); //添加常驻节点
        } else {
            this.node.destroy();
        }
    };

    onEnable() {
        if (CommonGlobal.getInstance().platform != Platform.Douyin) {
            AdManager.showBanner();
        }
    };

    onDisable() {
        if (CommonGlobal.getInstance().platform != Platform.Douyin) {
            AdManager.hideBanner();
        }
    };

    update(dt) {
        // 钢琴块的创建
        if (CommonGlobal.getInstance().gameCurStatus == GameState.Game
            || CommonGlobal.getInstance().gameCurStatus == GameState.Shield) {
            this.createKeyBase();
            this.musicTime += dt;
        }

        this.checkWin();

        // 钢琴块移动
        if (CommonGlobal.getInstance().gameCurStatus == GameState.Game
            || CommonGlobal.getInstance().gameCurStatus == GameState.Shield
            || CommonGlobal.getInstance().gameCurStatus == GameState.Clear) {
            this.keyConNode.y -= dt * this.playerSpeed;
        } else if (CommonGlobal.getInstance().gameCurStatus == GameState.Dead) {
            this.keyConNode.y += dt * this.playerSpeed;
        }
    };



    // ------------------------------------------------------------
    // 函数定义

    // ------------------------------
    // 数据初始化

    /** 数据初始化 */
    private init() {
        this.defination();
        this.definePar();
        this.reset();

        this.scheduleOnce(() => {
            this.registMediator();
            this.setButtonEvt();
        }, 0)

    };

    /** 节点定义 */
    private defination() {

        this.bgNode = this.node.getChildByName("SP_BG");

        // 切换背景
        this.switchNode = this.node.getChildByName("Switch");
        this.switchSPList = [];
        for (let z = 0; z < this.switchNode.childrenCount; z++) {
            this.switchSPList[z] = this.switchNode.children[z];
            this.switchSPList[z].width = CommonGlobal.getInstance().screenWidth / 4;
            this.switchSPList[z].height = CommonGlobal.getInstance().screenHeight;
            this.switchSPList[z].x = (-0.375 + 0.25 * z) * CommonGlobal.getInstance().screenWidth;
        }

        // --------------------------------
        // 游戏场景基础场景
        this.baseNode = this.node.getChildByName("GameBase");
        this.keyList = this.baseNode.getChildByName("KeyList");
        this.keyConNode = this.keyList.getChildByName("KeyCon");
        this.lineLightSP = this.keyList.getChildByName("SP_LineLight");
        this.gameTouchLine = this.lineLightSP.getChildByName("Touch_Line");
        this.keyGroupList = [];
        this.keyLineList = [];
        for (let i = 0; i < this.keyList.childrenCount; i++) {
            let curChild = this.keyList.children[i];
            let curName = curChild.name;

            if (curName.indexOf("Group") != -1) {
                if (curName.indexOf("1") != -1) {
                    this.keyGroupList[0] = curChild;
                } else if (curName.indexOf("2") != -1) {
                    this.keyGroupList[1] = curChild;
                } else if (curName.indexOf("3") != -1) {
                    this.keyGroupList[2] = curChild;
                } else if (curName.indexOf("4") != -1) {
                    this.keyGroupList[3] = curChild;
                }
            }

            if (curName.indexOf("Line") != -1) {
                if (curName.indexOf("1") != -1) {
                    this.keyLineList[0] = curChild;
                } else if (curName.indexOf("2") != -1) {
                    this.keyLineList[1] = curChild;
                } else if (curName.indexOf("3") != -1) {
                    this.keyLineList[2] = curChild;
                }
            }
        }

    };

    /** 参数定义 */
    private definePar() {

        // 游戏参数
        this.musicTime = 0;
        this.pointCount = 0;
        this.pressedCount = 0;
        this.playerSpeed = CommonGlobal.getInstance().gamePlayerSpeed;

        CommonGlobal.getInstance().gameCurStatus = GameState.Wait;
        this.recoverData();
    };

    /** 注册中介 */
    private registMediator() {
        CommonFacade.getInstance().registerMediator(new GameMainMediator(AllMediatorDefine.GameMainMediator, this.node));
    };



    // ------------------------------
    // 数据重设

    /** 数据重设 */
    public reset() {
        // 游戏参数
        this.musicTime = 0;
        this.pointCount = 0;
        this.pressedCount = 0;

        CommonGlobal.getInstance().gameCurStatus = GameState.Wait;
        CommonGlobal.getInstance().gameHighing = false;
        CommonGlobal.getInstance().isGameing = true;
        CommonGlobal.getInstance().gameFirstPos = CommonGlobal.getInstance().screenHeight * 0.3;

        this.readAppointData();
        this.recoverData();
        this.reCalculateSpeedAndLen();

        this.playerSpeed = CommonGlobal.getInstance().gamePlayerSpeed;

        this.createFirstKeyBase();
        this.createFirstPoint();

        // 重新初始节点位置
        this.setKeyConY(-CommonGlobal.getInstance().gameFirstPos);

        // 设置背景图片的样式
        this.setBGType();
        this.resetSwitch();

        // 初始设置线的位置
        this.refreshLineType();
        this.hideKeyLine();

        CommonFacade.getInstance().sendNotification(AllCommandDefine.GameResetOKResponse);
        audioEngineMamager.getInstance().stopMusic();

        if (CommonGlobal.getInstance().platform == Platform.Douyin) {
            SDKManager.getInstance().startGameVideo();
        }

    };

    /** 创建开始游戏之前的钢琴块预制 */
    private createFirstPoint() {
        for (let i = 0; i < 10; i++) {
            this.createKeyBase();
        }
    };

    /** 回收数据 */
    private recoverData() {
        for (let i = -1; i < this.keyArr.length; i++) {
            if (this.keyArr[i]) {
                // this.keyArr[i].destroy();
                PoolManager.getInstance().putNode(this.keyArr[i]);
                this.keyArr[i] = undefined;
            }
        }

        this.keyArr = [];
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;

        if (isShow == true) {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.GameRestartLogicResponse);
        }
    };

    /** 设置当前游戏的背景图片 */
    public setBGType() {
        const self = this;
        let loadRes = "BG/BG_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_" + (CommonGlobal.getInstance().gameHighing ? "High" : "Normal");
        DownloadManager.loadBundleAsset("Skin", loadRes, cc.SpriteFrame, (err, res) => {
            self.bgNode.getComponent(cc.Sprite).spriteFrame = res;
            this.hideAllSp();
        })
    };

    /** 读取指定的数据 */
    private readAppointData() {
        if (this.baseMusicData) {
            CommonGlobal.getInstance().gameMusicData = this.baseMusicData;
        }

        if (this.baseMusicJSON) {
            CommonGlobal.getInstance().gameMusicJson = [];
            let pointNum = 0;
            for (let i = 0; i < this.baseMusicJSON.json.length; i++) {
                let curData = this.baseMusicJSON.json[i];
                if (curData.pressKey != 'listen') {
                    CommonGlobal.getInstance().gameMusicJson[pointNum] = curData;
                    pointNum++
                }
            }
        }

        // 重新设置短钢琴块的长度        
        CommonGlobal.getInstance().gameKeyUnitNum = this.normalKeyNum;
        CommonGlobal.getInstance().gamePlayerSpeed = this.gameSpeed;
        CommonGlobal.getInstance().gameBasePlayerSpeed = this.gameSpeed;
        CommonGlobal.getInstance().gameKeyLen = CommonGlobal.getInstance().gameKeyUnitNum / CommonGlobal.getInstance().gamePlayerSpeed;
    };



    // ------------------------------
    // 普通数据处理

    /** 重新计算钢琴块的移动速度和长度 */
    public reCalculateSpeedAndLen() {
        if (this.isNeedAutoCalcu == false) return

        // 计算节奏点之间的时间差
        let cutTime = 10;
        for (let i = 0; i < CommonGlobal.getInstance().gameMusicJson.length; i++) {
            let curData = CommonGlobal.getInstance().gameMusicJson[i];
            let lastData = CommonGlobal.getInstance().gameMusicJson[i + 1];
            if (curData && lastData) {
                let reduceTime = (lastData.time - curData.time) / 1000;
                if (cutTime > reduceTime) {
                    cutTime = reduceTime;
                }
            }
        }

        if (cutTime < 0.15) cutTime = 0.15;
        CommonGlobal.getInstance().gameKeyLen = cutTime;
        CommonGlobal.getInstance().gamePlayerSpeed = CommonGlobal.getInstance().gameKeyUnitNum / CommonGlobal.getInstance().gameKeyLen;
        CommonGlobal.getInstance().gameBasePlayerSpeed = CommonGlobal.getInstance().gameKeyUnitNum / CommonGlobal.getInstance().gameKeyLen;

        console.log("gameKeyLen: ", CommonGlobal.getInstance().gameKeyLen)
        console.log("gamePlayerSpeed: ", CommonGlobal.getInstance().gamePlayerSpeed)

    };

    /** 获得钢琴键分组的列表 */
    public getKeyGroupList() {
        return this.keyGroupList;
    };

    /** 获得钢琴键的节点信息 */
    public getKeyList() {
        return this.keyArr;
    };

    /** 获得已经点击过的钢琴块数字 */
    public getPressedNum() {
        return this.pressedCount;
    };

    /** 获得歌曲的播放时间 */
    public getMusicTime() {
        return this.musicTime
    };

    /** 设置已经点击过的钢琴块数字 */
    public setPressedNum(pressedNum: number) {
        console.log("当前钢琴块到了第 " + this.pressedCount + " 个")
        this.pressedCount = pressedNum;
    };

    /** 减少指定的瞬间 */
    private reduceCurMusicTime(curTime: number) {
        this.musicTime -= curTime;
        console.log("当前时间为: ", this.musicTime);
    };

    /** 设置当前钢琴块总控制节点的高度 */
    private setKeyConY(yNum: number) {
        this.keyConNode.y = yNum;
    };

    //--------------------------------------------------------------
    // 切换组件

    /** 对当前切换组件进行重新设置 */
    private resetSwitch() {
        for (let i = 0; i < this.switchSPList.length; i++) {
            this.switchSPList[i].active = false;
            this.switchSPList[i].stopAllActions();
        }
    };

    /** 重新加载切换图片的列表 */
    private resetSwitchSPList() {
        let isHigh = CommonGlobal.getInstance().gameHighing;

        let sp1Str = "Switch/Switch_" + (isHigh ? "Normal" : "High") + "_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_1";
        DownloadManager.loadBundleAsset("Skin", sp1Str, cc.SpriteFrame, (err, res) => {
            this.switchSPList[0].getComponent(cc.Sprite).spriteFrame = res;
        })

        let sp2Str = "Switch/Switch_" + (isHigh ? "Normal" : "High") + "_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_2";
        DownloadManager.loadBundleAsset("Skin", sp2Str, cc.SpriteFrame, (err, res) => {
            this.switchSPList[1].getComponent(cc.Sprite).spriteFrame = res;
        })

        let sp3Str = "Switch/Switch_" + (isHigh ? "Normal" : "High") + "_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_3";
        DownloadManager.loadBundleAsset("Skin", sp3Str, cc.SpriteFrame, (err, res) => {
            this.switchSPList[2].getComponent(cc.Sprite).spriteFrame = res;
        })

        let sp4Str = "Switch/Switch_" + (isHigh ? "Normal" : "High") + "_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_4";
        DownloadManager.loadBundleAsset("Skin", sp4Str, cc.SpriteFrame, (err, res) => {
            this.switchSPList[3].getComponent(cc.Sprite).spriteFrame = res;
        })

    };

    /** 转场切换动画 */
    public switchAnim() {
        for (let i = 0; i < this.switchSPList.length; i++) {
            let switchTime = 0.3 * i
            this.scheduleOnce(() => {
                this.switchSPList[i].active = true;
                this.switchSPList[i].height = CommonGlobal.getInstance().screenHeight;
                this.switchSPList[i].y = -CommonGlobal.getInstance().screenHeight;
                cc.tween(this.switchSPList[i])
                    .to(0.5, { y: 0 }, { easing: cc.easing.cubicIn })
                    .call(() => {
                        if (i == this.switchSPList.length - 1) {
                            CommonFacade.getInstance().sendNotification(AllCommandDefine.GameChangeBGRequest);
                        }
                    })
                    .start()

            }, switchTime)
        }
    };

    /** 将全部节点进行隐藏 */
    public hideAllSp() {
        for (let z = 0; z < this.switchSPList.length; z++) {
            const curSp = this.switchSPList[z];
            curSp.active = false;
        }

        this.resetSwitchSPList();
    };


    // ------------------------------
    // 游戏基础组件创建

    // 钢琴块
    /** 创建钢琴块底 */
    private createKeyBase() {
        if (this.pointCount >= CommonGlobal.getInstance().gameMusicJson.length) {
            return
        }

        // 时间到了之后进行创建一个
        const curTime = CommonGlobal.getInstance().screenHeight / this.playerSpeed;
        if ((CommonGlobal.getInstance().gameMusicJson[this.pointCount].time / 1000) > (this.musicTime + curTime + 1)) {
            return
        }

        let keyType = CommonGlobal.getInstance().gameMusicJson[this.pointCount].pressKey;
        // 普通点 双按点 开始高潮点 结束高潮点
        if (keyType == "light" || keyType == "heavy" || keyType == "startHigh" || keyType == "endHigh") {
            if (this.checkNeedPressed() == true) {
                this.createPressKeyBase();
            } else {
                this.createNormalKeyBase();
            }
        } else if (keyType == "startLong") {
            this.createPressKeyBase();
        } else {
            this.pointCount++
        }
    };

    /** 构建最初位置的钢琴块 */
    private createFirstKeyBase() {
        console.log("构建最初位置的钢琴块");

        let curKey = PoolManager.getInstance().getNode(this.normalKeyBasePre);
        if (!curKey) {
            curKey = cc.instantiate(this.normalKeyBasePre);
        }

        // 数据初始化
        const curJS = curKey.getComponent(NormalKeyBaseUnit);
        curJS.resetCurBase();
        curJS.setKeyNum(0);
        curJS.setKeySpeed(this.playerSpeed);

        // 设置时间
        curJS.setLenTime(0);
        curJS.setHighType(0);

        curKey.parent = this.keyConNode;
        curKey.setPosition(curKey.position.x, (curKey.height / 2));
        curKey.name = "-1";

        // 设置父节点
        let newList = [];
        if (CommonGlobal.getInstance().isNewRolePlaying == false) {
            let curRan = ToolsManager.random(0, this.keyGroupList.length - 1);
            newList.push(curRan);
            this.lastParentNum = curRan;
        } else {
            newList.push(2);
            this.lastParentNum = 2;
        }
        curJS.setPressedList(newList);

        this.keyArr[-1] = curKey;
    };

    /** 创建普通的钢琴块底 */
    private createNormalKeyBase() {
        console.log("创建普通的钢琴块底 : " + this.pointCount);

        let curKey = PoolManager.getInstance().getNode(this.normalKeyBasePre);
        if (!curKey) {
            curKey = cc.instantiate(this.normalKeyBasePre);
        }

        // 数据初始化
        const curJS = curKey.getComponent(NormalKeyBaseUnit);
        curJS.resetCurBase();
        curJS.setKeyNum(this.pointCount + 1);
        curJS.setKeySpeed(this.playerSpeed);

        // 设置时间
        curJS.setLenTime(CommonGlobal.getInstance().gameMusicJson[this.pointCount].time / 1000);
        curJS.setJSONTime(CommonGlobal.getInstance().gameMusicJson[this.pointCount].time / 1000)

        // 设置样式
        let curKeyType = CommonGlobal.getInstance().gameMusicJson[this.pointCount].pressKey;
        if (curKeyType == "light" || curKeyType == "heavy") {
            curJS.setHighType(0);
        } else if (curKeyType == "startHigh") {
            curJS.setHighType(1);
        } else if (curKeyType == "endHigh") {
            curJS.setHighType(2);
        }

        curKey.parent = this.keyConNode;
        let curData = CommonGlobal.getInstance().gameMusicJson[this.pointCount];
        let curCount = ((curData.time / 1000) + CommonGlobal.getInstance().gameKeyLen * 0.5) * CommonGlobal.getInstance().gameBasePlayerSpeed;
        curKey.setPosition(curKey.position.x, curCount - curKey.height / 2);
        curKey.name = this.pointCount.toString();

        // 设置父节点
        let newList = [];
        let curRan = this.randomParentNum();
        if (curKeyType == "heavy") {
            let mirrorNum = this.getMirrorNum(curRan);
            if (mirrorNum != -1) {
                newList.push(mirrorNum);
                this.otherLastParentNum = mirrorNum;
            }
        }

        newList.push(curRan);
        curJS.setPressedList(newList);
        this.lastParentNum = curRan;

        this.keyArr[this.pointCount] = curKey;
        this.pointCount++
    };

    /** 创建长按的钢琴块底 */
    private createPressKeyBase() {
        console.log("创建长按的钢琴块底 : " + this.pointCount);

        let curKey = PoolManager.getInstance().getNode(this.pressedKeyBasePre);
        if (!curKey) {
            curKey = cc.instantiate(this.pressedKeyBasePre);
        }

        // 数据初始化
        const curJS = curKey.getComponent(PressedKeyBaseUnit);
        curJS.resetCurBase();
        curJS.setKeyNum(this.pointCount + 1);
        curJS.setKeySpeed(this.playerSpeed);

        // 设置样式
        let curKeyType = CommonGlobal.getInstance().gameMusicJson[this.pointCount].pressKey;
        if (curKeyType == "light" || curKeyType == "heavy") {
            curJS.setHighType(0);
        } else if (curKeyType == "startHigh") {
            curJS.setHighType(1);
        } else if (curKeyType == "endHigh") {
            curJS.setHighType(2);
        }

        // 设置时间
        curJS.setJSONTime(CommonGlobal.getInstance().gameMusicJson[this.pointCount].time / 1000)

        // 设置高度
        let nextData = CommonGlobal.getInstance().gameMusicJson[this.pointCount + 1];
        let curData = CommonGlobal.getInstance().gameMusicJson[this.pointCount];
        let curTime = (nextData.time - curData.time) / 1000;
        let curCount = (curData.time / 1000) * CommonGlobal.getInstance().gameBasePlayerSpeed;

        if (nextData.pressKey == "endLong") {
            curJS.setAddPressedNum(2);
        } else {
            curJS.setAddPressedNum(1);
        }

        curJS.setCutTime(curTime);
        curKey.parent = this.keyConNode;
        curKey.setPosition(curKey.position.x, curCount);
        curKey.name = this.pointCount.toString();

        // 设置父节点
        let newList = [];
        let curRan = this.randomParentNum();
        // if (this.randomDouble()) {
        //     let mirrorNum = this.getMirrorNum(curRan);
        //     if (mirrorNum != -1) {
        //         newList.push(mirrorNum);
        //         this.otherLastParentNum = mirrorNum;
        //     }
        // }

        newList.push(curRan);
        curJS.setPressedList(newList);
        this.lastParentNum = curRan;

        this.keyArr[this.pointCount] = curKey;
        this.keyArr[this.pointCount + 1] = curKey;
        this.pointCount++
    };

    /** 刷新之后的钢琴块的列表 */
    private refreshKeyList() {
        for (let i = this.pressedCount; i < this.keyArr.length; i++) {
            let curKey = this.keyArr[i];
            if (curKey) {
                let curJS = curKey.getComponent(BaseKeyBaseUnit);
                curJS.refreshAllKey();
            }
        }
    };

    /** 将钢琴块全部设置为护盾状态 */
    private setKeyShield() {
        for (let i = 0; i < this.keyArr.length; i++) {
            let curKey = this.keyArr[i];
            if (curKey) {
                let curJS = curKey.getComponent(BaseKeyBaseUnit);
                curJS.setShieldKey();
            }
        }
    };

    /** 重新设置钢琴块的位置 */
    private resetKeyPos() {
        CommonGlobal.getInstance().gameCurStatus = GameState.Pause;

        let curNode = this.keyArr[this.pressedCount - 1];
        let keyTime = curNode.getComponent(BaseKeyBaseUnit).getJSONTime();
        let cutTime = Math.abs(keyTime - this.musicTime);

        cc.tween(this.keyConNode)
            .to(cutTime * 0.3, { y: -CommonGlobal.getInstance().gameFirstPos - keyTime * this.playerSpeed }, { easing: cc.easing.backOut })
            .call(() => {
                CommonGlobal.getInstance().gameCurStatus = GameState.Wait;
            })
            .start()
    };

    /** 回收之前的钢琴块 */
    private recoverBeforeKey() {
        for (let i = 0; i < this.pressedCount - 1; i++) {
            let curKey = this.keyArr[i];
            if (curKey) {
                PoolManager.getInstance().putNode(curKey);
            }
        }
    };

    // 钢琴块生成的辅助函数

    /** 检测是否需要从短按点修改成长按点 */
    private checkNeedPressed() {
        let nextData = CommonGlobal.getInstance().gameMusicJson[this.pointCount + 1];
        let curData = CommonGlobal.getInstance().gameMusicJson[this.pointCount];

        if (!nextData) {
            return false
        } else {
            // 获得点之间的时间差
            let curTime = (nextData.time - curData.time) / 1000;
            // 以短板的单位时间为标准来进行比较
            let unitKeyTime = CommonGlobal.getInstance().gameKeyLen * 1.5;

            return curTime >= unitKeyTime
        }
    };

    /** 设置随机 */
    private randomParentNum() {
        let curRandomNum = 0;                                   // 最后返回父节点数字

        let canChange = false;                                  // 表能够进行随机切换
        let changeNum = ToolsManager.random(0, 100);            // 获得切换的概率
        if (changeNum >= 85) {
            canChange = true;
        }

        // 随机列表
        let arr = [];
        if (canChange == true) {
            for (let i = 0; i < this.keyGroupList.length; i++) {
                if (i != this.lastParentNum && i != this.otherLastParentNum) {
                    arr.push(i);
                }
            }
        } else {
            for (let i = 0; i < this.keyGroupList.length; i++) {
                if (Math.abs(i - this.lastParentNum) == 1 && i != this.otherLastParentNum) {
                    arr.push(i);
                }
            }
        }
        let ranArrNum = ToolsManager.random(0, arr.length - 1);
        curRandomNum = arr[ranArrNum];

        this.otherLastParentNum = -1;

        return curRandomNum
    };

    /** 获得当前数字的镜像数字 */
    private getMirrorNum(curNum: number) {
        let mirrorNum = -1;

        for (let i = 0; i < this.keyGroupList.length; i++) {
            let absNum = Math.abs(curNum - i)
            if (absNum == 2 && i != this.otherLastParentNum && i != this.lastParentNum) {
                mirrorNum = i;
                break
            }
        }

        return mirrorNum
    };

    // 钢琴线
    /** 刷新游戏内的歌曲线的样式 */
    private refreshLineType() {
        const self = this;

        let loadKeyLineRes = "CutLine/CutLine_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_" + (CommonGlobal.getInstance().gameHighing ? "High" : "Normal");
        DownloadManager.loadBundleAsset("Skin", loadKeyLineRes, cc.SpriteFrame, (err, res) => {
            for (let i = 0; i < self.keyLineList.length; i++) {
                self.keyLineList[i].getComponent(cc.Sprite).spriteFrame = res;
            }
        })

    };

    /** 设置游戏内的歌曲线的y值 */
    private setLinePosY(posY: number) {
        this.lineLightSP.stopAllActions();
        let cutOpacity = 150 - this.lineLightSP.opacity;
        if (cutOpacity != 0) {
            cc.tween(this.lineLightSP)
                .to(cutOpacity * 0.001, { opacity: 150 })
                .start()
        }

        this.lineLightSP.y = posY;

        // // 计算偏移量
        // let curTouchPos = posY + CommonGlobal.getInstance().screenHeight / 2;
        // CommonGlobal.getInstance().gameFirstPos = curTouchPos;

    };

    /** 隐藏钢琴线 */
    private hideKeyLine() {
        cc.tween(this.lineLightSP)
            .to(0.3, { opacity: 0 })
            .start()
    };


    // ------------------------------
    // 游戏内部页面逻辑

    /** 展示复活界面 */
    public showRelive() {
        console.log("展示复活界面");
        TipsManager.getInstance().showTips("展示复活界面", 1, true);

        CommonGlobal.getInstance().gameCurStatus = GameState.Pause;
        CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest,
            new OpenPageFunc(PageName.RelivePage, () => {
                CommonFacade.getInstance().sendNotification(AllCommandDefine.GameReliveLogicResponse);
            }, () => {
                CommonFacade.getInstance().sendNotification(AllCommandDefine.GameFailLogicResponse);
            })
        );

    };

    /** 游戏暂停 */
    public gamePause() {
        console.log("游戏暂停")
        TipsManager.getInstance().showTips("游戏暂停", 1, true);

        CommonGlobal.getInstance().gameCurStatus = GameState.Pause;
    };

    /** 游戏死亡 */
    public gameDead() {
        console.log("游戏死亡")
        TipsManager.getInstance().showTips("游戏死亡", 1, true);

        CommonGlobal.getInstance().gameCurStatus = GameState.Dead;
        this.scheduleOnce(() => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.GameShowReliveResponse);

            let curKeyTime = (CommonGlobal.getInstance().gameMusicJson[this.pressedCount + 1].time - CommonGlobal.getInstance().gameMusicJson[this.pressedCount].time) / 1000;
            this.reduceCurMusicTime(curKeyTime);
        }, CommonGlobal.getInstance().gameDeadReturnTime)

    };

    /** 游戏复活 */
    public gameRelive() {
        console.log("游戏复活");
        TipsManager.getInstance().showTips("游戏复活", 1, true);

        // 如果存在钢琴块则将那个钢琴块进行设置为继续游戏样式
        if (this.keyArr[this.pressedCount - 1]) {
            // 设置等待玩家继续游戏
            CommonGlobal.getInstance().gameCurStatus = GameState.Wait;
            let curKey = this.keyArr[this.pressedCount - 1];
            curKey.getComponent(BaseKeyBaseUnit).setKeyStart();
            CommonFacade.getInstance().sendNotification(AllCommandDefine.GameReliveResponse);

            this.recoverBeforeKey();
            this.resetKeyPos();
        } else {
            CommonGlobal.getInstance().gameCurStatus = GameState.Game;
        }

    };

    /** 游戏胜利 */
    public gameWin() {
        console.log("游戏胜利")
        TipsManager.getInstance().showTips("游戏胜利", 1, true);
        CommonGlobal.getInstance().gameCurStatus = GameState.Clear;

        this.scheduleOnce(() => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.WinPage, () => {
                Game.getInstance().setPageActive(false);
            }));
        }, 1)

    };

    /** 游戏失败 */
    public gameFail() {
        console.log("游戏失败")
        TipsManager.getInstance().showTips("游戏失败", 1, true);

        CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.LosePage, () => {
            Game.getInstance().setPageActive(false);
        }));

    };

    /** 游戏重新开始 */
    public gameRestart() {
        CommonFacade.getInstance().sendNotification(AllCommandDefine.GameRestartResponse);
        this.reset();
    };

    /** 检查是否胜利 */
    private checkWin() {
        // console.log("pressedCount: ", this.pressedCount)
        // 如果处于游戏中
        if (CommonGlobal.getInstance().gameCurStatus == GameState.Game
            || CommonGlobal.getInstance().gameCurStatus == GameState.Shield) {
            // 全部的节奏点都被点击的情况下
            if ((this.pressedCount - 1) == CommonGlobal.getInstance().gameMusicJson.length) {
                // this.gameWin();
                CommonFacade.getInstance().sendNotification(AllCommandDefine.GameWinLogicResponse);
            }
        }
    };

    /** 切换当前游戏是否处于高潮状态状态 */
    public changeGameType(isHigh: boolean) {
        CommonGlobal.getInstance().gameHighing = isHigh;
        this.switchAnim();
        this.refreshLineType();
        this.refreshKeyList();
    };

    /** 切换当前游戏是否处于护盾状态状态 */
    public changeShieldType(isShield: boolean) {
        if (isShield == true) {
            this.setKeyShield();
        } else {
            this.refreshKeyList();
        }
    };



    // ------------------------------------------------------------
    // 设置监听事件

    /** 设置按钮的监听事件 */
    private setButtonEvt() {
        this.setLineEvt();
    };

    /** 设置背景线的监听事件 */
    private setLineEvt() {
        const touchFunc = (evt) => {
            let curPos = evt.getLocation();
            let nodePos = this.keyList.convertToNodeSpaceAR(curPos);
            this.setLinePosY(nodePos.y);
        }

        this.keyList.on(cc.Node.EventType.TOUCH_START, (evt) => {
            touchFunc(evt)
        }, this)

        this.keyList.on(cc.Node.EventType.TOUCH_MOVE, (evt) => {
            touchFunc(evt)
        }, this)

        this.keyList.on(cc.Node.EventType.TOUCH_END, (evt) => {
            touchFunc(evt)
            this.hideKeyLine();
        }, this)
    };


}

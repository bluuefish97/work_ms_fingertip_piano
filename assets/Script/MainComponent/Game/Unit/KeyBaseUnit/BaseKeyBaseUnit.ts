/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.22
功能：钢琴块底的基础单元
*****************************************************/

import { GameState, NormalKeyType } from "../../../../Common/CommonEnum";
import CommonGlobal from "../../../../Common/CommonGlobal";
import AudioPlayManager from "../../../../Expand/AudioPlayManager";
import PoolManager from "../../../../Expand/PoolManager";
import Game from "../../../../SceneScript/Game";
import { AllCommandDefine } from "../../../AllCommandDefine";
import CommonFacade from "../../../CommonFacade";
import BaseKeyUnit from "../KeyUnit/BaseKeyUnit";
import ErrorKeyUnit from "../KeyUnit/ErrorKeyUnit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseKeyBaseUnit extends cc.Component {

    /** 需要进行按的预制 */
    @property(cc.Prefab)
    protected pressedPre: cc.Prefab = null;
    /** 无需按的预制 */
    @property(cc.Prefab)
    protected unPressedPre: cc.Prefab = null;

    /** 当前第几个框的文本节点 */
    @property(cc.Node)
    private numLB: cc.Node = null;

    /** 钢琴块的总时间长度 */
    protected keyCutTime: number = 0;
    /** 当前钢琴块所对应的时间 */
    protected lenTime: number = 0;
    /** 当前钢琴块在歌单json中所对应的值 */
    protected keyJSONTime: number = 0;
    /** 当前钢琴块的值 */
    protected curKeyNum: number = 0;
    /** 当前钢琴块的移动速度 */
    protected curSpeedNum: number = 0;
    /** 当前钢琴块的高潮点类型(0普通,1开始高潮,2结束高潮) */
    protected curHighType: number = 0;

    /** 表当前的组件内是否就一个需要进行点击的 */
    protected isMultiple: boolean = false;
    /** 需要去进行点击的个数 */
    protected needPressedNum: number = 0;
    /** 已经点击完毕的个数 */
    protected pressedOKNum: number = 0;

    /** 错过或者点击之后增加的数量 */
    protected addPressedNum: number = 1;

    /** 父节点的脚本 */
    protected parentJS = null;

    /** 用于进行存储全部的能够进行点击的节点列表 */
    protected pressedList = [];
    /** 用于进行存储全部的不能点击的节点列表 */
    protected errorList = [];

    /** 当前列是否有过误触操作(如果有误触操作的情况下,则当离出屏幕时不再扣血) */
    protected isTouchError: boolean = false;

    /** 当前组件是否被回收 */
    protected isRecover: boolean = false;

    /** 表当前组件是否已经去过一次血 */
    protected isReduced: boolean = false;

    /** 当前组件是否已经展示过高潮点 */
    protected isShowHigh: boolean = false;


    update(dt) {
        if (CommonGlobal.getInstance().gameCurStatus == GameState.Game ||
            CommonGlobal.getInstance().gameCurStatus == GameState.Shield) {
            this.checkOutGameHigh();
            this.checkLose();
            this.recoverCurKeyBase();
        }
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 对当前组件进行重新设置 */
    public resetCurBase() {
        this.node.opacity = 255;

        // 回收当前组件上的列表节点
        for (let i = 0; i < this.pressedList.length; i++) {
            PoolManager.getInstance().putNode(this.pressedList[i]);
            this.pressedList[i] = null;
        }
        this.pressedList = [];

        for (let j = 0; j < this.errorList.length; j++) {
            PoolManager.getInstance().putNode(this.errorList[j]);
            this.errorList[j] = null;
        }
        this.errorList = [];

        // 参数初始化
        this.keyCutTime = 0;
        this.lenTime = 0;
        this.keyJSONTime = 0;
        this.curKeyNum = 0;
        this.curSpeedNum = 0;
        this.curHighType = 0;

        // 用于进行复数操作
        this.isMultiple = false;
        this.needPressedNum = 0;
        this.pressedOKNum = 0;

        this.isTouchError = false;
        this.isRecover = false;
        this.isReduced = false;

        this.isShowHigh = false;
    };

    /** 回收当前的钢琴块 */
    protected recoverCurKeyBase() {
        if (this.isRecover != false) return
        let worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        if (worldPos.y < -(this.node.height + CommonGlobal.getInstance().screenHeight * 0.1)) {
            this.isRecover = true;
            console.log("回收当前的钢琴块底");
            cc.tween(this.node)
                .to(1, { opacity: 0 })
                .call(() => {
                    PoolManager.getInstance().putNode(this.node);
                })
                .start()
        }
    };

    /** 设置钢琴块的值 */
    public setKeyNum(keyNum: number) {
        this.curKeyNum = keyNum;
        if (this.numLB) {
            this.numLB.getComponent(cc.Label).string = keyNum.toString();
        }
    };

    /** 设置钢琴块的移动速度 */
    public setKeySpeed(speedNum: number) {
        this.curSpeedNum = speedNum;
    };

    /** 设置钢琴块的时间端 */
    public setLenTime(curTime: number) {
        this.lenTime = curTime;
        this.node.height = CommonGlobal.getInstance().gameKeyLen * CommonGlobal.getInstance().gameBasePlayerSpeed;
    };

    /** 设置钢琴块的时间差 */
    public setCutTime(cutTime: number) {
        this.lenTime = cutTime;
        this.node.height = cutTime * CommonGlobal.getInstance().gameBasePlayerSpeed;
    };

    /** 设置当前钢琴块的json时间 */
    public setJSONTime(jsonTime: number) {
        this.keyJSONTime = jsonTime;
    };

    /** 获得当前钢琴块的json时间 */
    public getJSONTime() {
        return this.keyJSONTime
    }

    /** 对点击板子数进行增加 */
    public addPressNum(curNum: number) {
        this.pressedOKNum += curNum;
        this.checkGameHigh();
        this.checkPressClear();
    };

    /** 检测当前的板子是否点击完毕 */
    private checkPressClear() {
        if (this.pressedOKNum >= this.needPressedNum && this.isTouchError == false) {
            let pressedNum = Game.getInstance().getPressedNum()
            if (this.curKeyNum == pressedNum) {
                if (CommonGlobal.getInstance().gameCurStatus == GameState.Wait) {
                    CommonGlobal.getInstance().gameCurStatus = GameState.Game;

                    CommonFacade.getInstance().sendNotification(AllCommandDefine.GameStartResponse);
                    AudioPlayManager.playGameStartAU();
                }

                pressedNum += this.addPressedNum
                Game.getInstance().setPressedNum(pressedNum);
            }
        }
    };

    /** 检测游戏高潮 */
    private checkGameHigh() {
        if (this.pressedOKNum >= this.needPressedNum && this.isTouchError == false) {
            let pressedNum = Game.getInstance().getPressedNum()
            if (this.curKeyNum == pressedNum) {
                if (this.isShowHigh == false) {
                    this.isShowHigh = true;

                    if (this.curHighType == 1) {
                        CommonFacade.getInstance().sendNotification(AllCommandDefine.GameHighResponse, ({
                            type: true
                        }))
                    } else if (this.curHighType == 2) {
                        CommonFacade.getInstance().sendNotification(AllCommandDefine.GameHighResponse, ({
                            type: false
                        }))
                    }
                }
            }
        }
    };

    /** 移出屏幕之后检测一下高潮 */
    private checkOutGameHigh() {
        if (this.isRecover != false) return

        let worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        if (worldPos.y < -this.node.height) {
            if (this.isShowHigh == false && this.pressedOKNum < this.needPressedNum) {
                if (this.curHighType == 1) {
                    CommonFacade.getInstance().sendNotification(AllCommandDefine.GameHighResponse, ({
                        type: true
                    }))
                } else if (this.curHighType == 2) {
                    CommonFacade.getInstance().sendNotification(AllCommandDefine.GameHighResponse, ({
                        type: false
                    }))
                }
                this.isShowHigh = true;
            }
        }
    };

    /** 检查是否失败 */
    private checkLose() {
        if (this.isRecover != false) return
        if (this.isReduced != false) return

        let worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        if (worldPos.y < -this.node.height) {
            let pressedNum = Game.getInstance().getPressedNum()
            // 如果当前组件尚未被全部进行点击且尚未出现过误触操作的情况下
            if (this.pressedOKNum < this.needPressedNum && this.isTouchError == false && pressedNum <= this.curKeyNum) {
                this.isReduced = true;
                let pressedNum = Game.getInstance().getPressedNum()
                pressedNum += this.addPressedNum
                Game.getInstance().setPressedNum(pressedNum);

                // 如果处于正在游戏中的情况下,则扣除生命值
                if (CommonGlobal.getInstance().gameCurStatus == GameState.Game) {
                    console.log("游戏结束");
                    CommonGlobal.getInstance().gameDeadReturnTime = this.node.height / CommonGlobal.getInstance().gamePlayerSpeed;
                    CommonFacade.getInstance().sendNotification(AllCommandDefine.GameReduceHPRequest, ({
                        type: 1
                    }));
                }
            }
        }
    };

    /** 用于进行初始化当前的组件 */
    public setPressedList(curList) {
        this.needPressedNum = curList.length;
        this.pressedOKNum = 0;
    };

    /** 将子钢琴块全部设为等待开始的样式 */
    public setKeyStart() {
        for (let i = 0; i < this.pressedList.length; i++) {
            const curKey = this.pressedList[i];
            const curJS = curKey.getComponent(BaseKeyUnit);
            if (curJS.getKeyType() != NormalKeyType.Pressed) {
                curJS.setNormalKeyType(NormalKeyType.StartGame);
            }
            curJS.setPressed(false);
        }

        for (let j = 0; j < this.errorList.length; j++) {
            const curKey = this.errorList[j];
            const curJS = curKey.getComponent(ErrorKeyUnit);
            curJS.resetKey();
            curJS.setParentJS(this);
        }
    };

    /** 对当前组件下的钢琴块进行全部刷新的操作 */
    public refreshAllKey() {
        for (let i = 0; i < this.pressedList.length; i++) {
            let curKey = this.pressedList[i];
            let curJS = curKey.getComponent(BaseKeyUnit);
            curJS.refreshKeyType();
        }
    };

    /** 对当前组件下的钢琴块切换成护盾样式的操作 */
    public setShieldKey() {
        for (let i = 0; i < this.pressedList.length; i++) {
            let curKey = this.pressedList[i];
            let curJS = curKey.getComponent(BaseKeyUnit);
            if (curJS.getKeyType() != NormalKeyType.Pressed) {
                curJS.setNormalKeyType(NormalKeyType.Shield);
            }
        }
    };

    /** 判断当前排误触之后是否允许玩家点击下一排的钢琴块 */
    public addPressCount() {
        let pressedNum = Game.getInstance().getPressedNum()
        if (pressedNum == this.curKeyNum) {
            pressedNum += this.addPressedNum
            Game.getInstance().setPressedNum(pressedNum);
        }
    };

    /** 设置当前节点的高潮点类型 */
    public setHighType(typeNum: number) {
        this.curHighType = typeNum;
    };

    /** 设置错过或者点击之后增加的数量 */
    public setAddPressedNum(pressedNum: number) {
        this.addPressedNum = pressedNum;
    }

}

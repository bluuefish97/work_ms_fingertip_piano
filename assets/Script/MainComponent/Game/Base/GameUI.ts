/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.26
功能：游戏内场景UI总控制
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import DownloadManager from "../../../Expand/DownloadManager";
import PoolManager from "../../../Expand/PoolManager";
import Game from "../../../SceneScript/Game";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import GameUIMediator from "../Mediator/GameUIMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {

    /** 体力的预制 */
    @property(cc.Prefab)
    private hpPrefab: cc.Prefab = null;

    /** 手指的预制 */
    @property(cc.Prefab)
    private handPrefab: cc.Prefab = null;

    // ---------------------------------------------------
    // 进度条组件
    /** 进度条控制总节点 */
    private progressNode: cc.Node = null;
    /** 进度条的bar节点 */
    private progressBarNode: cc.Node = null;
    /** 进度条的星星列表总节点 */
    private progressStarList: cc.Node = null;
    /** 进度条的星星高亮点的节点列表 */
    private progressStarLightList: cc.Node[] = [];
    /** 进度条的星星灰点的节点列表 */
    private progressStarGrayList: cc.Node[] = [];
    /** 进度条所获得的分数文本节点 */
    private progressScoreNode: cc.Node = null;
    /** 进度条的特效总控制点 */
    private progressEffectNode: cc.Node = null;
    /** 进度条的特效列表 */
    private progressEffectList: cc.Node[] = [];

    /** 进度条的最佳文本节点 */
    private progressBestLB: cc.Node = null;


    // ---------------------------------------------------
    // 体力组件

    /** 玩家剩余体力的节点 */
    private hpNode: cc.Node = null;



    // ---------------------------------------------------
    // 歌曲组件

    /** 歌曲信息控制总节点 */
    private musicDataCon: cc.Node = null;

    /** 歌曲信息基础节点 */
    private musicDataBase: cc.Node = null;
    /** 歌曲名称的文本遮罩 */
    private musicNameMask: cc.Node = null;
    /** 歌曲名称的文本节点 */
    private musicNameLB: cc.Node = null;
    /** 歌手名称的文本遮罩 */
    private singerNameMask: cc.Node = null;
    /** 歌手名称的文本节点 */
    private singerNameLB: cc.Node = null;
    /** 最佳分数的文本节点 */
    private bestScoreLB: cc.Node = null;
    /** 星星控制总节点 */
    private starListNode: cc.Node = null;
    /** 星星列表 */
    private starList: cc.Node[] = [];
    /** 亮的星星列表 */
    private starLightList: cc.Node[] = [];
    /** 灰色的星星列表 */
    private starGrayList: cc.Node[] = [];

    /** 歌曲信息新手引导节点 */
    private musicDataNewRole: cc.Node = null;
    /** 新手引导节点内的歌曲名称的文本遮罩 */
    private musicNameMask_NewRole: cc.Node = null;
    /** 新手引导节点内的歌曲名称的文本节点 */
    private musicNameLB_NewRole: cc.Node = null;
    /** 新手引导节点内的歌手名称的文本遮罩 */
    private singerNameMask_NewRole: cc.Node = null;
    /** 新手引导节点内的歌手名称的文本节点 */
    private singerNameLB_NewRole: cc.Node = null;

    /** 失误状态下的显示节点 */
    private missCon: cc.Node = null;
    /** 无敌图片显示 */
    private shieldSP: cc.Node = null;

    private nextBTN: cc.Node = null;
    private pauseBTN: cc.Node = null;
    private resumeBTN: cc.Node = null;

    /** 玩家提示的手 */
    private newRoleHand: cc.Node = null;


    // ---------------------------------------------------
    // 参数

    /** 分数 */
    private scoreNum: number = 0;

    /** 最佳的次数 */
    private bestNum: number = 0;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
        this.registMediator();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 注册中介 */
    private registMediator() {
        CommonFacade.getInstance().registerMediator(new GameUIMediator(AllMediatorDefine.GameUIMediator, this.node));
    };

    /** 节点的定义 */
    private defination() {
        // 进度条
        this.progressNode = this.node.getChildByName("Progress");
        this.progressBarNode = this.progressNode.getChildByName("Bar");
        this.progressStarList = this.progressNode.getChildByName("StarList");
        this.progressScoreNode = this.progressNode.getChildByName("LB_Score");
        this.progressStarLightList = [];
        this.progressStarGrayList = [];
        for (let i = 0; i < this.progressStarList.childrenCount; i++) {
            const curChild = this.progressStarList.children[i];
            const grayNode = curChild.getChildByName("SP_Gray");
            const lightNode = curChild.getChildByName("SP_Light");
            this.progressStarLightList[i] = lightNode;
            this.progressStarGrayList[i] = grayNode;
        }
        this.progressEffectNode = this.progressNode.getChildByName("EffectList");
        this.progressEffectList = [];
        for (let z = 0; z < this.progressEffectNode.childrenCount; z++) {
            this.progressEffectList[z] = this.progressEffectNode.children[z];
        }
        this.progressBestLB = this.progressEffectList[0].getChildByName("LB_Count");

        // 体力条
        this.hpNode = this.node.getChildByName("HP");

        // 歌曲信息组件
        this.musicDataCon = this.node.getChildByName("GRP_MusicData");
        this.musicDataBase = this.musicDataCon.getChildByName("SP_Base");
        this.musicNameMask = this.musicDataBase.getChildByName("Mask_MusicName");
        this.musicNameLB = this.musicNameMask.getChildByName("LB_MusicName");
        this.singerNameMask = this.musicDataBase.getChildByName("Mask_SingerName");
        this.singerNameLB = this.singerNameMask.getChildByName("LB_SingerName");
        this.bestScoreLB = this.musicDataBase.getChildByName("LB_BestScore");
        this.starListNode = this.musicDataBase.getChildByName("StarList");
        this.starList = [];
        this.starLightList = [];
        this.starGrayList = [];
        for (let i = 0; i < this.starListNode.childrenCount; i++) {
            this.starList[i] = this.starListNode.children[i];
            this.starLightList[i] = this.starList[i].getChildByName("SP_Light");
            this.starGrayList[i] = this.starList[i].getChildByName("SP_Gray");
        }

        this.musicDataNewRole = this.musicDataCon.getChildByName("SP_NewRole");
        this.musicNameMask_NewRole = this.musicDataNewRole.getChildByName("Mask_MusicName");
        this.musicNameLB_NewRole = this.musicNameMask_NewRole.getChildByName("LB_MusicName");
        this.singerNameMask_NewRole = this.musicDataNewRole.getChildByName("Mask_SingerName");
        this.singerNameLB_NewRole = this.singerNameMask_NewRole.getChildByName("LB_SingerName");

        // 无敌组件
        this.missCon = this.node.getChildByName("MissCon");
        this.shieldSP = this.missCon.getChildByName("SP_Shield");

        this.nextBTN = this.node.getChildByName("NextBTN");
        this.pauseBTN = this.node.getChildByName("PauseBTN");
        this.resumeBTN = this.node.getChildByName("ResumeBTN");
    };

    /** 刷新当前的UI */
    public resetUI() {

        this.scoreNum = 0;
        this.bestNum = 0;

        // 将滚动条的亮星星隐藏
        for (let i = 0; i < this.progressStarLightList.length; i++) {
            this.progressStarLightList[i].active = false;
        }
        // 将滚动条的暗星星显示
        for (let j = 0; j < this.progressStarGrayList.length; j++) {
            this.progressStarGrayList[j].active = true;
        }
        // 将特效全部隐藏
        for (let z = 0; z < this.progressEffectList.length; z++) {
            this.progressEffectList[z].active = false;
        }

        this.resetHP();
        this.refreshScoreLB();
        this.refreshProgressBar(0);
        this.setStarNum(0);

    };




    //--------------------------------------------------------------
    // 歌曲组件

    /** 设置歌曲信息的样式 */
    public setMusicDataType() {
        this.musicDataBase.active = false;
        this.musicDataNewRole.active = false;

        if (CommonGlobal.getInstance().isNewRolePlaying == true) {
            this.musicDataNewRole.active = true;
            this.showTipsHand();
        } else {
            this.musicDataBase.active = true;
        }
    };

    /** 设置歌曲名称 */
    public setMusicName(curString: string) {
        this.musicNameLB.getComponent(cc.Label).string = curString;
        this.musicNameLB_NewRole.getComponent(cc.Label).string = curString;

        this.scheduleOnce(() => {
            this.moveLBNode(this.musicNameLB, this.musicNameMask);
            this.moveLBNode(this.musicNameLB_NewRole, this.musicNameMask_NewRole);
        }, 0)
    };

    /** 设置歌手名称 */
    public setSingerName(curString: string) {
        this.singerNameLB.getComponent(cc.Label).string = curString;
        this.singerNameLB_NewRole.getComponent(cc.Label).string = curString;

        this.scheduleOnce(() => {
            this.moveLBNode(this.singerNameLB, this.singerNameMask);
            this.moveLBNode(this.singerNameLB_NewRole, this.singerNameMask_NewRole);
        }, 0)
    };

    /** 移动遮罩节点内的文本节点 */
    private moveLBNode(curLBNode: cc.Node, curMaskNode: cc.Node) {
        curLBNode.stopAllActions();
        curLBNode.x = 0;

        // 如果底部的文本节点宽度大于外部的遮罩的大小,则对其进行遮罩操作
        if (curLBNode.width > curMaskNode.width) {
            curLBNode.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.moveBy(4, -curLBNode.width, 0),
                        cc.callFunc(() => {
                            curLBNode.x = curLBNode.width
                        }),
                        cc.moveBy(4, -curLBNode.width, 0)
                    )
                )
            )
        }
    };

    /** 设置最佳分数 */
    public setBestScore(curNum: number) {
        this.bestScoreLB.getComponent(cc.Label).string = "最高分: " + curNum.toString();
    };

    /** 设置星星数 */
    public setStarNum(starNum: number) {
        for (let i = 0; i < this.starListNode.childrenCount; i++) {
            this.starLightList[i].active = (starNum > i);
            this.starGrayList[i].active = !(starNum > i);
        }
    };

    /** 设置音乐组件的显示 */
    public setMusicConActive(isShow: boolean) {
        this.musicDataCon.active = isShow;
        this.musicDataCon.opacity = 255;
    };

    /** 调用音乐组件的隐藏动画 */
    public hideMusicConAnim() {
        cc.tween(this.musicDataCon)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.setMusicConActive(false);
            })
            .start()

        if (this.newRoleHand) {
            this.newRoleHand.destroy();
            this.newRoleHand = null;
        }
    };


    //--------------------------------------------------------------
    // 分数组件

    /** 设置当前的分数文本 */
    public refreshScoreLB() {
        this.progressScoreNode.getComponent(cc.Label).string = CommonGlobal.getInstance().gameScoreNum.toString();
        if (CommonGlobal.getInstance().gameScoreNum != 0) {
            this.progressScoreNode.stopAllActions();
            this.progressScoreNode.setScale(0.7);
            cc.tween(this.progressScoreNode)
                .to(0.2, { scale: 0.7 * 1.2 })
                .to(0.1, { scale: 0.7 })
                .start();
        }
    };

    /** 展示分数的特效 */
    public showScoreAnim(curNum: number) {
        for (let i = 0; i < this.progressEffectList.length; i++) {
            this.progressEffectList[i].active = false;
            this.progressEffectList[i].opacity = 0;
            this.progressEffectList[i].stopAllActions();
        }

        const curEffect = this.progressEffectList[curNum];
        curEffect.active = true;
        curEffect.opacity = 255;

        let curSkelecton = curEffect.getComponent(sp.Skeleton);
        if (curSkelecton) {
            curSkelecton.setAnimation(0, "animation", false);
            curSkelecton.setCompleteListener((trackEntry, loopCount) => {
                let anim = trackEntry.animation ? trackEntry.animation.name : "";
                if (anim == "animation") {
                    curEffect.active = false;
                }
            })
        } else {
            let spAnim = curEffect.getChildByName("SPAnim");
            if (spAnim) {
                spAnim.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
            }

            cc.tween(curEffect)
                .to(0.2, { scale: 1.2 }, { easing: cc.easing.backOut })
                .delay(0.1)
                .to(0.3, { opacity: 0, scale: 1 })
                .call(() => {
                    curEffect.active = false;
                    curEffect.setScale(0);
                })
                .start();
        }

        // 设置文本的数量
        if (curNum != 0) {
            this.bestNum = 0;
        } else {
            this.bestNum++;
        }
        this.setEffectLB(this.bestNum);
    };

    /** 刷新顶部的进度条 */
    public refreshProgressBar(curPer: number) {
        this.progressNode.getComponent(cc.ProgressBar).progress = curPer;
    };

    /** 展示星星的动画 */
    public showStarAnim(curNum: number) {
        this.progressStarGrayList[curNum].active = false;
        this.progressStarLightList[curNum].active = true;
        this.progressStarLightList[curNum].setScale(0);

        cc.tween(this.progressStarLightList[curNum])
            .to(0.1, { scale: 1.2 })
            .to(0.1, { scale: 1.0 })
            .start();

    };

    /** 重新设置体力 */
    public resetHP() {
        let curNum = CommonGlobal.getInstance().gameMaxHP
        for (let i = 0; i < curNum; i++) {
            let curPrefab = this.hpNode.children[i];
            if (!curPrefab) {
                curPrefab = cc.instantiate(this.hpPrefab);
            }

            curPrefab.stopAllActions();
            curPrefab.setParent(this.hpNode);
            curPrefab.active = true;
            curPrefab.opacity = 255;
            curPrefab.setScale(1);
        }

    };

    /** 减少体力 */
    public reduceHP(curNum: number) {
        let curPrefab = this.hpNode.children[curNum];
        if (curPrefab) {
            curPrefab.runAction(
                cc.sequence(
                    cc.scaleTo(0.2, 1.2),
                    cc.rotateTo(0.1, 30),
                    cc.rotateTo(0.1, -25),
                    cc.rotateTo(0.1, 20),
                    cc.rotateTo(0.1, 0),
                    cc.scaleTo(0.4, 0),
                    cc.callFunc(() => {
                        curPrefab.active = false;
                        PoolManager.getInstance().putNode(curPrefab);
                    })
                )
            )
        }

        if (curNum != 0) {
            this.showMissCon();
        }
    };

    /** 设置特效的文本 */
    private setEffectLB(effectNum: number) {
        // this.progressBestLB.stopAllActions();
        // this.progressBestLB.setScale(1, 0);
        // cc.tween(this.progressBestLB)
        //     .to(0.5, { scaleY: 1.2 })
        //     .to(0.1, { scale: 1 })
        //     .start()

        this.progressBestLB.getComponent(cc.Label).string = "x" + effectNum.toString();
    };


    //--------------------------------------------------------------
    // 其余组件

    /** 展示提示的手指节点 */
    private showTipsHand() {
        let curHandPrefab = cc.instantiate(this.handPrefab);
        let curKeyList = Game.getInstance().getKeyList();
        let curKey = curKeyList[-1];

        let worldPos = curKey.parent.convertToWorldSpaceAR(curKey.position);
        let uiPos = this.node.convertToNodeSpaceAR(worldPos);
        curHandPrefab.parent = this.node;
        curHandPrefab.setPosition(uiPos.x + 80, uiPos.y);
        curHandPrefab.setSiblingIndex(0);

        this.newRoleHand = curHandPrefab;
    };

    /** 展示错过组件 */
    private showMissCon() {
        this.missCon.stopAllActions();
        this.missCon.active = true;
        this.missCon.opacity = 255;

        cc.tween(this.missCon)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this.missCon.active = false;
            })
            .start()

    };

    /** 设置暂停 */
    public setIsPause(isPause: boolean) {
        this.pauseBTN.active = isPause;
        this.resumeBTN.active = !isPause;
    };



    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置下一首歌曲按钮的监听事件 */
    public setNextEvt(curCall: Function) {
        this.nextBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置游戏暂停的监听事件 */
    public setPauseEvt(curCall: Function) {
        this.pauseBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置游戏继续的监听事件 */
    public setResumeEvt(curCall: Function) {
        this.resumeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}

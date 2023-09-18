/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.20
功能：持续长按型钢琴块按钮的单元
*****************************************************/


import { NormalKeyType, GameState } from "../../../../Common/CommonEnum";
import CommonGlobal from "../../../../Common/CommonGlobal";
import AudioPlayManager from "../../../../Expand/AudioPlayManager";
import DownloadManager from "../../../../Expand/DownloadManager";
import SDKManager from "../../../../Expand/SDKManager";
import Game from "../../../../SceneScript/Game";
import { AllCommandDefine } from "../../../AllCommandDefine";
import CommonFacade from "../../../CommonFacade";
import BaseKeyUnit from "./BaseKeyUnit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PressedKeyUnit extends BaseKeyUnit {

    /** 持续长按的控制组件 */
    private pressedCon: cc.Node = null;
    /** 持续长按组件的线条节点 */
    private pressedLine: cc.Node = null;
    /** 持续长按组件的持续按的图片 */
    private pressedLineSP: cc.Node = null;
    /** 持续长按组件的特效节点 */
    private pressedEffect: cc.Node = null;

    /** 增加分数文本 */
    private addLB: cc.Node = null;

    /** 表是否处于被点击的状态中 */
    private isPressIng: boolean = false;
    /** 首次点击时的时间 */
    private firstPressedTime: number = 0;

    /** 当前的百分比条 */
    private curPerNum: number = 0;

    /** 玩家点击的位置 */
    private touchPos = null;



    update(dt) {
        super.update(dt);

        if (this.isPressIng == true) {
            this.refreshKeyBar();
            this.checkPressedPointInKey();
        }
    }

    protected defination() {
        super.defination();

        this.pressedCon = this.node.getChildByName("GRP_Pressed");
        this.pressedLine = this.pressedCon.getChildByName("SP_Line");
        this.pressedLineSP = this.pressedCon.getChildByName("SP_Pressed");
        this.pressedEffect = this.pressedLineSP.getChildByName("Effect");

        this.addLB = this.node.getChildByName("LB_Add");
    };

    // ------------------------------------------------------------
    // 函数定义

    /** 对当前的钢琴块进行初始初始化操作 */
    public resetKey() {
        super.resetKey();

        this.isPressIng = false;
        this.firstPressedTime = 0;
        this.touchPos = null;
        this.setKeyBar(0);
        this.setAddLBActive(false);
    };

    /** 设置是否处于点击状态中 */
    private setPressType(isPressIng: boolean) {
        this.isPressIng = isPressIng;

        if (isPressIng == true) {
            this.pressedEffect.active = true;
            this.pressedEffect.getComponent(cc.ParticleSystem).resetSystem();
        } else {
            this.pressedEffect.active = false;
        }
    };

    /** 计算持续点击的时间 */
    private calculateTime() {
        // 当前时间
        let curTime = new Date().getTime();
        return curTime - this.firstPressedTime
    };

    /** 刷新钢琴块长度 */
    private refreshKeyBar() {
        let touchPointPos = this.node.convertToNodeSpaceAR(this.touchPos)
        let touchPointY = touchPointPos.y;
        let nodeHeight = this.node.height;

        // 获得当前钢琴块所按的
        let percel = touchPointY / nodeHeight;
        percel += 0.05;
        if (percel >= 1) {
            percel = 1
        }
        this.setKeyBar(percel);
    };

    /** 设置当前钢琴块长按的进度 */
    private setKeyBar(barNum: number) {
        let curBar = barNum;
        if (curBar >= 1) {
            curBar = 1;
        } else if (curBar <= 0.2 && curBar > 0) {
            curBar = 0.2
        }
        this.curPerNum = curBar;

        this.pressedLineSP.active = this.curPerNum != 0;
        if (this.curPerNum != 0) {
            let calculateLen = this.curPerNum * this.keyLen;
            this.pressedLineSP.height = calculateLen + 600 + CommonGlobal.getInstance().screenHeight * 0.08;
            this.pressedLineSP.getChildByName("SP").height = calculateLen + 600 + CommonGlobal.getInstance().screenHeight * 0.08;

            if (curBar == 1) {
                this.pressedLineSP.active = false;
            }
        }
    };

    /** 设置钢琴块的高度 */
    public setCutTime(cutTime: number) {
        super.setCutTime(cutTime);

        this.keyLen = cutTime * CommonGlobal.getInstance().gameBasePlayerSpeed;
        this.node.height = this.keyLen;
        this.startSP.height = this.keyLen;
        this.normalSP.height = this.keyLen;
        this.pressedSP.height = this.keyLen;
        this.shieldSP.height = this.keyLen;

        this.pressedLine.height = this.keyLen - this.pressedLine.y;

        this.addLB.y = this.keyLen + this.addLB.height / 2;
    };

    /** 检测长按点是否处于钢琴块之中 */
    private checkPressedPointInKey() {
        var points = this.node.getBoundingBoxToWorld();
        var result = points.contains(this.touchPos);
        if (!result) this.giveUpPress();
    };

    /** 放弃长按 */
    private giveUpPress() {
        if (this.isPressed == false) {
            console.log("放弃长按");

            this.setPressed(true);
            this.setPressType(false);
            this.setNormalKeyType(NormalKeyType.Pressed);

            this.addScore();
        }
    };

    /** 按持续按的时间增加分数 */
    private addScore() {
        if (this.firstPressedTime == 0) return

        // 根据持续长按的时间来获得分数
        let pressedTime = this.calculateTime();
        let curCount = Math.floor(pressedTime / (CommonGlobal.getInstance().gameKeyLen * 1000));
        if (curCount <= 1) {
            curCount = 1;
        }

        this.setAddLBActive(true);
        let curScore = CommonGlobal.getInstance().gameScoreList[0] * curCount;
        this.setAddLB(curScore);

        CommonFacade.getInstance().sendNotification(AllCommandDefine.GameAddScoreRequest, {
            type: 0,
            rate: curCount
        });
    };

    /** 设置增加分数文本 */
    private setAddLB(addNum: number) {
        this.addLB.getComponent(cc.Label).string = "+" + addNum.toString();
    };

    /** 控制增加分数节点的显示 */
    private setAddLBActive(isShow: boolean) {
        this.addLB.active = isShow;
    };

    /** 刷新当前钢琴块的样式 */
    public refreshKeySP() {
        super.refreshKeySP();

        let loadRes = "Key/Key_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_Pressed";
        DownloadManager.loadBundleAsset("Skin", loadRes, cc.SpriteFrame, (err, res) => {
            this.startSP.getComponent(cc.Sprite).spriteFrame = res;
            this.normalSP.getComponent(cc.Sprite).spriteFrame = res;
            this.pressedSP.getComponent(cc.Sprite).spriteFrame = res;
            this.shieldSP.getComponent(cc.Sprite).spriteFrame = res;
        })
    };


    // ------------------------------------------------------------
    // 监听事件

    /** 设置按钮的监听事件 */
    protected setBTNEvent() {
        super.setBTNEvent();

        this.unclickCurKey();
    };

    /** 点击当前的钢琴块 */
    protected clickCurKey() {
        const self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, (evt) => {
            if (self.isPressed == false) {
                let pressedNum = Game.getInstance().getPressedNum()
                if (CommonGlobal.getInstance().gameCurStatus == GameState.Game
                    || CommonGlobal.getInstance().gameCurStatus == GameState.Wait
                    || CommonGlobal.getInstance().gameCurStatus == GameState.Shield) {

                    if (CommonGlobal.getInstance().gameCurStatus == GameState.Wait
                        || CommonGlobal.getInstance().gameCurStatus == GameState.Game) {
                        if (self.curKeyNum <= pressedNum || this.parentJS.isTouchError == true) {
                            self.setNormalKeyType(NormalKeyType.Normal);
                            self.firstPressedTime = new Date().getTime();
                            self.setPressType(true);
                            self.touchPos = evt.getLocation();
                            self.parentJS.addPressNum(1);

                            SDKManager.getInstance().phoneVibrate("short");
                        }
                    } else {
                        self.setNormalKeyType(NormalKeyType.Normal);
                        self.firstPressedTime = new Date().getTime();
                        self.setPressType(true);
                        self.touchPos = evt.getLocation();
                        self.parentJS.addPressNum(1);

                        SDKManager.getInstance().phoneVibrate("short");
                        if (self.curKeyNum > pressedNum) {
                            Game.getInstance().setPressedNum(self.curKeyNum + 1);
                        }
                    }
                }
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (evt) => {
            // 如果处于长按的状态中,则刷新位置
            if (self.isPressIng == true) {
                console.log("移动中");
                self.touchPos = evt.getLocation();
            }
        }, this);
    };

    /** 放弃点击当前的钢琴块 */
    private unclickCurKey() {
        const self = this;
        const cancelFunc = () => {
            if (self.isPressIng == true) {
                self.isPressIng = false;
                self.giveUpPress();
            }
        }

        this.node.on(cc.Node.EventType.TOUCH_END, (() => {
            cancelFunc();
        }), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (() => {
            cancelFunc();
        }), this);
    };

}

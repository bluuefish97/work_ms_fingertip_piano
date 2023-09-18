/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.20
功能：普通钢琴块的单元
*****************************************************/


import { NormalKeyType, GameState } from "../../../../Common/CommonEnum";
import CommonGlobal from "../../../../Common/CommonGlobal";
import DownloadManager from "../../../../Expand/DownloadManager";
import SDKManager from "../../../../Expand/SDKManager";
import Game from "../../../../SceneScript/Game";
import { AllCommandDefine } from "../../../AllCommandDefine";
import CommonFacade from "../../../CommonFacade";
import BaseKeyUnit from "./BaseKeyUnit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NormalKeyUnit extends BaseKeyUnit {

    /** 点击时的动画图片样式 */
    private pressedAnimSP: cc.Node = null;

    /** 扩散图片的样式 */
    private diffuseSP: cc.Node = null;


    protected defination() {
        super.defination();
        this.pressedAnimSP = this.node.getChildByName("SP_PressedAnim");
        this.diffuseSP = this.node.getChildByName("SP_Diffuse");
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 对当前的钢琴块进行初始初始化操作 */
    public resetKey() {
        super.resetKey();
        this.diffuseSP.active = false;
    };


    /** 设置普通钢琴块的样式 */
    public setNormalKeyType(keyType: NormalKeyType) {
        super.setNormalKeyType(keyType);

        switch (keyType) {
            case NormalKeyType.Pressed:
                // 设置扩散动画
                this.showPressedAnim();

                cc.tween(this.pressedSP)
                    .to(0.1, { opacity: 0 })
                    .start()
                break
        }
    };

    /** 刷新当前钢琴块的样式 */
    public refreshKeySP() {
        super.refreshKeySP();

        let loadRes = "Key/Key_" + (CommonGlobal.getInstance().userData.SkinNum + 1) + "_Base";
        DownloadManager.loadBundleAsset("Skin", loadRes, cc.SpriteFrame, (err, res) => {
            this.startSP.getComponent(cc.Sprite).spriteFrame = res;
            this.normalSP.getComponent(cc.Sprite).spriteFrame = res;
            this.pressedSP.getComponent(cc.Sprite).spriteFrame = res;
            this.shieldSP.getComponent(cc.Sprite).spriteFrame = res;
            this.pressedAnimSP.getComponent(cc.Sprite).spriteFrame = res;
        })
    };

    /** 展示点击之后的扩散动画 */
    public showPressedAnim() {

        this.pressedAnimSP.active = false;

        this.diffuseSP.active = true;
        this.diffuseSP.opacity = 180;
        this.diffuseSP.scale = 0.3;
        cc.tween(this.diffuseSP)
            .to(0.4, { scale: 0.8 }, { easing: cc.easing.sineOut })
            .call(() => {
                this.diffuseSP.active = false
            })
            .start()
    };

    /** 检测点击范围所获得的奖励值 */
    public checkTouchType(checkPos: cc.Vec2) {
        // 获得位置在当前节点的坐标
        let curPos = this.node.convertToNodeSpaceAR(checkPos);

        // 获得对应的百分百
        let checkPer = 100 * curPos.y / this.node.height;

        // 检测分数类型
        let scoreType = -1;
        let cutPer = Math.abs(checkPer - 50);
        for (let i = 0; i < CommonGlobal.getInstance().gameCheckNormalTouchList.length; i++) {
            if (cutPer <= CommonGlobal.getInstance().gameCheckNormalTouchList[i]) {
                scoreType = i;
                break
            }
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.GameAddScoreRequest, ({
            type: scoreType,
            rate: 1
        }));
    };

    /** 设置钢琴块的时间端 */
    public setLenTime(curTime: number) {
        super.setLenTime(curTime);

        this.keyLen = CommonGlobal.getInstance().gameKeyLen * CommonGlobal.getInstance().gameBasePlayerSpeed;
        this.node.height = this.keyLen;
        this.startSP.height = this.keyLen;
        this.normalSP.height = this.keyLen;
        this.pressedSP.height = this.keyLen;
        this.shieldSP.height = this.keyLen;
        this.pressedAnimSP.height = this.keyLen;
        this.pressedAnimSP.y = this.pressedAnimSP.height / 2;
    };



    // ------------------------------------------------------------
    // 监听事件

    /** 点击当前的钢琴块 */
    protected clickCurKey() {
        super.clickCurKey();

        const self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, (evt) => {
            if (self.isPressed == false) {
                let pressedNum = Game.getInstance().getPressedNum()
                if (CommonGlobal.getInstance().gameCurStatus == GameState.Wait
                    || CommonGlobal.getInstance().gameCurStatus == GameState.Game
                    || CommonGlobal.getInstance().gameCurStatus == GameState.Shield) {

                    if (CommonGlobal.getInstance().gameCurStatus == GameState.Wait
                        || CommonGlobal.getInstance().gameCurStatus == GameState.Game) {
                        if (self.curKeyNum <= pressedNum || this.parentJS.isTouchError == true) {
                            let curPos = evt.getLocation();
                            self.setNormalKeyType(NormalKeyType.Pressed);
                            self.setPressed(true);
                            self.parentJS.addPressNum(1);
                            self.checkTouchType(curPos);

                            SDKManager.getInstance().phoneVibrate("short");
                        }
                    } else {
                        console.log("无敌时间内的点击(普通)")
                        let curPos = evt.getLocation();
                        self.setNormalKeyType(NormalKeyType.Pressed);
                        self.setPressed(true);
                        self.parentJS.addPressNum(1);
                        self.checkTouchType(curPos);

                        SDKManager.getInstance().phoneVibrate("short");
                        if (self.curKeyNum > pressedNum) {
                            Game.getInstance().setPressedNum(self.curKeyNum + 1);
                        }
                    }
                }

            }
        }, this);
    };


}

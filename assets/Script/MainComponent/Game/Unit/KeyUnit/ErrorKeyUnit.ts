/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.22
功能：错误钢琴块基础底
*****************************************************/

import { GameState } from "../../../../Common/CommonEnum";
import CommonGlobal from "../../../../Common/CommonGlobal";
import AudioPlayManager from "../../../../Expand/AudioPlayManager";
import Game from "../../../../SceneScript/Game";
import { AllCommandDefine } from "../../../AllCommandDefine";
import CommonFacade from "../../../CommonFacade";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ErrorKeyUnit extends cc.Component {

    /** 错误图片的样式 */
    private errorSP: cc.Node = null;

    /** 当前钢琴块的值 */
    private curKeyNum: number = 0;

    /** 当前钢琴块的移动速度 */
    private curSpeedNum: number = 0;

    /** 表当前的钢琴块是否点击过 */
    private isPressed: boolean = false;

    /** 父节点的脚本 */
    private parentJS = null;

    onLoad() {
        this.defination();
        this.resetKey();
        this.setBTNEvent();
    };

    private defination() {
        this.errorSP = this.node.getChildByName("SP_Error");
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 对当前的钢琴块进行初始初始化操作 */
    public resetKey() {
        this.parentJS = null;
        this.setPressed(false);
        this.setErrorActive(false);
    };

    /** 设置钢琴块的状态 */
    private setPressed(isPressed: boolean) {
        this.isPressed = isPressed;
    };

    /** 设置钢琴块的时间端 */
    public setLenTime(curTime: number) {
        this.node.height = CommonGlobal.getInstance().gameKeyLen * CommonGlobal.getInstance().gameBasePlayerSpeed;
    };

    /** 设置钢琴块的时间差 */
    public setCutTime(cutTime: number) {
        this.node.height = cutTime * CommonGlobal.getInstance().gameBasePlayerSpeed;
    };

    /** 设置钢琴块的值 */
    public setKeyNum(keyNum: number) {
        this.curKeyNum = keyNum;
    };

    /** 设置钢琴块的移动速度 */
    public setKeySpeed(speedNum: number) {
        this.curSpeedNum = speedNum;
    };

    /** 设置错误图片的显示样式 */
    private setErrorActive(isShow: boolean) {
        this.errorSP.active = isShow;
    };

    /** 设置父节点的脚本 */
    public setParentJS(curJS) {
        this.parentJS = curJS;
    };


    // ------------------------------------------------------------
    // 监听事件

    /** 设置按钮的监听事件 */
    private setBTNEvent() {
        this.clickCurKey();
    };

    /** 点击当前的钢琴块 */
    private clickCurKey() {
        const self = this;

        this.node.on(cc.Node.EventType.TOUCH_END, (() => {
            let pressedNum = Game.getInstance().getPressedNum()
            if (self.isPressed == false && self.curKeyNum == pressedNum) {
                if (CommonGlobal.getInstance().gameCurStatus == GameState.Game
                    || CommonGlobal.getInstance().gameCurStatus == GameState.Shield) {
                    console.log("点击错误板子");
                    self.setErrorActive(true);
                    AudioPlayManager.playGameErrorAU();

                    // 正常游戏时间时进行扣血操作
                    if (CommonGlobal.getInstance().gameCurStatus == GameState.Game) {
                        self.scheduleOnce(() => {
                            console.log("闪烁之后,游戏结束")

                            CommonFacade.getInstance().sendNotification(AllCommandDefine.GameReduceHPRequest, ({
                                type: 0
                            }));

                            if (this.parentJS) {
                                this.parentJS.isTouchError = true;
                                this.parentJS.addPressCount();
                            }
                        }, 0)
                    }
                }
            }
        }), this)
    };

}

/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：体力界面的中介
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import PowerManager from "../../../Expand/PowerManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { OpenPageFunc } from "../Command/OpenPageCmd";
import PowerPage from "../Page/PowerPage";

export default class PowerMediator extends Mediator {

    /** 体力界面 */
    private curPage: PowerPage = null



    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(PowerPage);
        this.setPageActive(false);
        this.setButtonEvt();
        this.countLeaveTimePower();
        this.resetPower();

        this.setPowerRestore();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.RefreshPowerResponse,
            AllCommandDefine.SetPowerActiveResponse,
            AllCommandDefine.ReducePowerResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case AllCommandDefine.RefreshPowerResponse:
                if (info && info.type) {
                    this.addPowerAnim(info.type);
                } else {
                    this.resetPower();
                }
                break

            case AllCommandDefine.SetPowerActiveResponse:
                if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
                    this.setPageActive(info.type);
                } else {
                    this.setPageActive(false);
                }
                break

            case AllCommandDefine.ReducePowerResponse:
                this.reducePowerAnim(info.curNode, info.curCall);
                break

            default:
                break;
        }
    };



    // -------------------------------------------------------------------------------------
    // 内部函数

    /** 重新设置体力 */
    private resetPower() {
        let curPowerNum = CommonGlobal.getInstance().userData.PowerNum;
        this.curPage.setPowerLB(curPowerNum);
    };

    /** 计算离线时体力 */
    private countLeaveTimePower() {
        /** 如果当前的体力小于最大的体力数,则根据离线时间增加体力 */
        if (CommonGlobal.getInstance().userData.PowerNum < CommonGlobal.getInstance().maxPowerNum) {
            let getOutTime = CommonGlobal.getInstance().userData.getOutTime;
            var offLineTime = (new Date().getTime() - getOutTime) / 1000;
            console.log('离线时间', offLineTime)
            CommonGlobal.getInstance().userData.PowerNum += Math.abs(Math.floor(offLineTime / CommonGlobal.getInstance().addPowerTime));

            if (CommonGlobal.getInstance().userData.PowerNum >= CommonGlobal.getInstance().maxPowerNum) {
                CommonGlobal.getInstance().userData.PowerNum = CommonGlobal.getInstance().maxPowerNum;
            }

            if (CommonGlobal.getInstance().userData.PowerNum <= 0) {
                CommonGlobal.getInstance().userData.PowerNum = 0;
            }

            CommonGlobal.getInstance().saveUserData();
        }
    };


    // ---------------------------------------
    // 体力动画

    /** 增加体力动画 */
    private addPowerAnim(powerNum: number) {
        const powerCall = () => {
            this.resetPower();
        }
        this.curPage.addPowerAnim(powerNum, powerCall);
    };

    /** 减少体力动画 */
    private reducePowerAnim(reduceNode: cc.Node, curCall: Function) {
        this.curPage.reducePowerAnim(reduceNode, curCall);
    };


    // ---------------------------------------
    // 体力恢复倒计时功能

    /** 设置体力恢复倒计时函数 */
    private setPowerRestore() {
        setInterval(() => {
            PowerManager.getInstance().powerRestore(() => {
                this.resetPower();
            })

            this.resetPowerTimeLB();
        }, 1000)
    };

    /** 重新设置体力恢复的倒计时 */
    private resetPowerTimeLB() {
        if (CommonGlobal.getInstance().userData.PowerNum >= CommonGlobal.getInstance().maxPowerNum) {
            this.curPage.setTimeOutActive(false);
        } else {
            this.curPage.setTimeOutActive(true);

            let curCutTime = PowerManager.getInstance().powerTimecunt;
            let curMinNum = Math.floor(curCutTime / 60);
            let curSecNum = curCutTime - curMinNum * 60;
            let curStr = ""
            if (curSecNum >= 10) {
                curStr = "0" + curMinNum + ":" + curSecNum.toString();
            } else {
                curStr = "0" + curMinNum + ":0" + curSecNum.toString();
            }

            this.curPage.setTimeOutLB(curStr);
        }
    };


    // ---------------------------------------
    // 通用函数

    /** 设置页面的显示 */
    private setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setPowerEvt(() => {
            this.powerEvt();
        })
    };

    /** 体力的监听事件 */
    public powerEvt() {
        if (CommonGlobal.getInstance().showPowerPage == true) return

        CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.AddPowerPage));
    };

}

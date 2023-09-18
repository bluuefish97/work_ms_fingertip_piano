/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.22
功能：复活界面的中介
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AdManager from "../../../Expand/AdManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import RelivePage from "../Page/RelivePage";

export default class RelivePageMediator extends Mediator {

    /** 复活界面 */
    private curPage: RelivePage = null;

    /** 复活成功回调 */
    private reliveCall: Function = null;

    /** 复活失败回调 */
    private reliveCall2: Function = null;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent.curNode as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(RelivePage);
        this.setPageActive(true);

        let curCall1 = viewComponent.callback;
        let curCall2 = viewComponent.callback2;
        this.setCallFunc(curCall1, curCall2);

        this.setButtonEvt();
        this.startReliveTime();

    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.ReliveResponse,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let name = notification.getName();
        switch (name) {
            case AllCommandDefine.ReliveResponse:
                this.dealReliveGame(info.isRelive);
                break;

            default:
                break;
        }
    }


    // ------------------------------------------------------------
    // 内置函数

    /** 设置界面的显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);

        CommonFacade.getInstance().sendNotification(AllCommandDefine.SetDiamondActiveRequest, ({
            type: isShow
        }))

        if (isShow == true) {
            if (CommonGlobal.getInstance().platform == Platform.VIVO) {
                setTimeout(() => {
                    AdManager.showInsertAD();
                }, 1000);
            }
        }
    };

    /** 开始进行倒计时 */
    public startReliveTime() {
        this.curPage.ResetReliveTime();
    };

    /** 将当前玩家进行复活操作 */
    private dealReliveGame(curBool) {
        this.setPageActive(false);

        if (curBool) {
            // 请求复活
            this.reliveCall();

            this.reliveCall = null;
            this.reliveCall2 = null;
        } else {
            // 请求结束游戏
            this.reliveCall2();

            this.reliveCall = null;
            this.reliveCall2 = null;
        }
    };

    /** 设置回调函数 */
    public setCallFunc(curCall1?: Function, curCall2?: Function) {
        this.reliveCall = () => {
            curCall1()
        };
        this.reliveCall2 = () => {
            curCall2()
        };
    };



    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮的监听事件 */
    private setButtonEvt() {
        this.curPage.setDiamondEvt(() => {
            this.diamondEvt();
        })

        this.curPage.setVideoEvt(() => {
            this.videoEvt();
        })

        this.curPage.setGiveUpEvt(() => {
            this.giveUpEvt();
        })
    };

    /** 钻石复活的监听事件 */
    private diamondEvt() {
        this.curPage.setCountDownStop(true);

        const self = this;
        const faillCall = () => {
            self.curPage.setCountDownStop(false);
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ReliveRequest, ({
            type: "diamond",
            cost: 300,
            curCall: faillCall
        }))
    };

    /** 视频复活的监听事件 */
    private videoEvt() {
        this.curPage.setCountDownStop(true);

        const self = this;
        const faillCall = () => {
            self.curPage.setCountDownStop(false);
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ReliveRequest, ({
            type: "video",
            cost: 0,
            curCall: faillCall
        }))

        AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "revive", 1);
    };

    /** 放弃复活的监听事件 */
    private giveUpEvt() {
        CommonFacade.getInstance().sendNotification(AllCommandDefine.ReliveRequest, ({
            type: "giveup",
            cost: 0,
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "cancalRevive", 1);
    };

}


export class RelivePageFunc {
    curNode: cc.Node;
    callback: Function;
    callback2: Function;

    constructor(node: cc.Node, func?: Function, func2?: Function) {
        this.curNode = node;
        this.callback = func;
        this.callback2 = func2;
    }
}


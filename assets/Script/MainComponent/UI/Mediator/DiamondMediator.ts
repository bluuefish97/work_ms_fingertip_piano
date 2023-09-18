/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：钻石界面的中介
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { OpenPageFunc } from "../Command/OpenPageCmd";
import DiamondPage from "../Page/DiamondPage";

export default class DiamondMediator extends Mediator {

    /** 钻石界面 */
    private curPage: DiamondPage = null

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(DiamondPage);
        this.resetDiamond();
        this.setButtonEvt();
        this.setPageActive(false);
        
    };


    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.RefreshDiamondResponse,
            AllCommandDefine.SetDiamondActiveResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case AllCommandDefine.RefreshDiamondResponse:
                if (info && info.type) {
                    this.addDiamondAnim(info.type);
                } else {
                    this.resetDiamond();
                }
                break;

            case AllCommandDefine.SetDiamondActiveResponse:
                this.setPageActive(info.type);
                break;

            default:
                break;
        }
    };



    // -------------------------------------------------------------------------------------
    // 内部函数

    /** 重新设置钻石 */
    resetDiamond() {
        let curDiamondNum = CommonGlobal.getInstance().userData.DiamondNum;
        this.curPage.setDiamondLB(curDiamondNum);
    };

    /** 增加钻石的动画 */
    addDiamondAnim(diamondNum: number) {
        const diamondCall = () => {
            this.resetDiamond();
        }
        this.curPage.addDiamondAnim(diamondNum, diamondCall);
    };

    /** 设置页面的显示 */
    setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
    };


    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setDiamondEvt(() => {
            this.diamondEvt();
        })
    };

    /** 钻石界面监听事件 */
    private diamondEvt() {
        if (CommonGlobal.getInstance().showDiamondPage == true) return

        CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.AddDiamondPage));
        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "dia", 1);
    };


}

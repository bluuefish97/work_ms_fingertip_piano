/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：顶部桌面组件的中介
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import TipsManager from "../../../Common/TipsManager";
import AdManager from "../../../Expand/AdManager";
import SDKManager from "../../../Expand/SDKManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { OpenPageFunc } from "../Command/OpenPageCmd";
import TopView from "../HomeView/TopView";

export default class TopViewMediator extends Mediator {

    /** 顶部组件 */
    private curPage: TopView = null;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(TopView);
        this.setBTNEvent();

    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.RecordResponse,
        ];
    }

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case AllCommandDefine.RecordResponse:
                this.setRecordType(info.type);
                break;

            default:
                break;
        }
    }

    /** 设置录屏的状态 */
    private setRecordType(isRecord: boolean) {
        this.curPage.setRecordType(isRecord);
    };



    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置监听事件 */
    private setBTNEvent() {
        this.curPage.setAddDeskEvt(() => {
            this.addDeskEvt();
        })

        this.curPage.setRecordEvt(() => {
            this.recordEvt();
        })

        this.curPage.setCancelRecordEvt(() => {
            this.cancelRecordEvt();
        })

        this.curPage.setServiceEvt(() => {
            this.serviceEvt();
        })

        this.curPage.setMoreEvt(() => {
            this.moreEvt();
        })

    };

    /** 设置添加桌面的事件 */
    private addDeskEvt() {
        var callback = () => {
        }
        SDKManager.getInstance().addDeskTop(callback);
    };

    /** 设置录屏的监听事件 */
    private recordEvt() {
        SDKManager.getInstance().startGameVideo();

        CommonFacade.getInstance().sendNotification(AllCommandDefine.RecordResponse, ({
            type: true
        }))
    };

    /** 取消录屏的监听事件 */
    private cancelRecordEvt() {
        let recordTime = SDKManager.getInstance().getRecordTime();
        if (recordTime <= 3) {
            TipsManager.getInstance().showTips("录屏录制时间过短");
            return
        }

        const curVideoCall = (videoPath) => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.RecordResponse, ({
                type: false
            }))

            if (!videoPath) {
                TipsManager.getInstance().showTips("视频录制出错");
            } else {
                if (CommonGlobal.getInstance().isGameing == false) {
                    CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.RecordSharePage));
                }
            }
        }

        SDKManager.getInstance().stopGameVideo(curVideoCall);
    };

    /** 客服按钮的监听事件 */
    public serviceEvt() {
        let curStr = "联系客服: QQ " + CommonGlobal.getInstance().qqStr;
        TipsManager.getInstance().showTips(curStr);
    };

    /** 更多精彩的监听事件 */
    public moreEvt() {
        AdManager.showOPPOMoreGame();
    };



}

/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：录屏分享界面的中介
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import DiamondManager from "../../../Expand/DiamondManager";
import SDKManager from "../../../Expand/SDKManager";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import RecordSharePage from "../Page/RecordSharePage";

export default class RecordShareMediator extends Mediator {

    /** 录屏分享界面 */
    private curPage: RecordSharePage = null;

    /** 视频获得的钻石数目 */
    private diamondNum: number = 100;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(RecordSharePage);
        this.setButtonEvt();
        this.setDiamondLB();
    };



    // -------------------------------------------------------------------------------------
    // 内部函数

    /** 设置钻石文本 */
    private setDiamondLB() {
        this.diamondNum = CommonGlobal.getInstance().rewardDiamondNum;
        this.curPage.setDiamondLB(this.diamondNum);
    };

    /** 设置界面的显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setShareEvt(() => {
            this.shareEvt();
        })

        this.curPage.setCloseEvt(() => {
            this.closeEvt();
        })
    };

    /** 设置分享的事件 */
    private shareEvt() {
        const shareCall = () => {
            // 获得钻石
            DiamondManager.getInstance().addDiamond(this.diamondNum);
            CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshDiamondResponse, ({
                type: this.diamondNum
            }));

            // 关闭页面
            this.setPageActive(false);
        }
        SDKManager.getInstance().shareVideo(shareCall);
    };

    /** 设置关闭界面的事件 */
    private closeEvt() {
        this.setPageActive(false);
    };

}

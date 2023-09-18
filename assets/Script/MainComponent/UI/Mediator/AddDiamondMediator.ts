/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.23
功能：增加钻石界面中介者
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import TipsManager from "../../../Common/TipsManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import AddDiamondPage from "../Page/AddDiamondPage";

export default class AddDiamondMediator extends Mediator {

    /** 增加钻石界面 */
    private curPage: AddDiamondPage = null

    /** 视频获得的钻石数目 */
    private diamondNum: number = 100;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return;
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return;
        }

        this.curPage = viewNode.getComponent(AddDiamondPage);
        this.setPageActive(true);
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
        if (isShow == true) {
            AudioPlayManager.playShowAddDiamondAU();
        }

        CommonGlobal.getInstance().showDiamondPage = isShow;
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置监听事件 */
    private setButtonEvt() {
        this.curPage.setVideoEvt(() => {
            this.videoEvt();
        })

        this.curPage.setPlayEvt(() => {
            this.playEvt();
        })

        this.curPage.setCloseEvt(() => {
            this.closeEvt();
        })

    };

    /** 设置视频获得钻石的事件 */
    private videoEvt() {
        const self = this;
        const curCall = () => {
            self.setPageActive(false)
            TipsManager.getInstance().showTips("获得" + this.diamondNum + "钻石", 1, true);
        }

        CommonFacade.getInstance().sendNotification(AllCommandDefine.AddDiamondRequest, ({
            reward: this.diamondNum,
            call: curCall
        }))

        AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "diaGet", 1);
    };

    /** 设置玩游戏获得的事件 */
    private playEvt() {
        this.setPageActive(false);
    };

    /** 设置关闭的监听事件 */
    private closeEvt() {
        this.setPageActive(false);
    };


}

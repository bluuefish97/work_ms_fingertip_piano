/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：
功能：
*****************************************************/

import MusicManager from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import GiftView from "../HomeView/GiftView";
import GiftNodeMediator from "./GiftNodeMediator";


export default class GiftViewMediator extends Mediator {

    /** 顶部组件 */
    private curPage: GiftView = null;

    /** 最大奖励 */
    private maxRewardNum: number = 20;

    /** 奖励列表 */
    private rewardList = [
        3,
        10,
        20
    ]

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(GiftView);
        this.setBTNEvent();

        this.initAllGiftList();
        this.refreshStar();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.RefreshGiftResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        switch (notification.getName()) {
            case AllCommandDefine.RefreshGiftResponse:
                this.refreshStar();
                break;

            default:
                break;
        }
    }


    // ------------------------------------------------------------
    // 内部函数

    /** 初始化全部的礼物列表 */
    private initAllGiftList() {
        for (let i = 0; i < this.rewardList.length; i++) {
            this.curPage.createReward(this.rewardList[i], this.maxRewardNum, (curPrefab) => {
                CommonFacade.getInstance().removeMediator(AllMediatorDefine.GiftViewMediator + "_" + i);
                CommonFacade.getInstance().registerMediator(new GiftNodeMediator(AllMediatorDefine.GiftViewMediator + "_" + i, curPrefab));
                let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.GiftViewMediator + "_" + i) as GiftNodeMediator;
                curMediator.setGiftNum(i);
                curMediator.setNeedStarNum(this.rewardList[i]);

                this.sendNotification(AllCommandDefine.RefreshGiftResponse);
            })
        }

    };

    /** 刷新全部的星星数 */
    private refreshStar() {
        let curStar = MusicManager.getInstance().getStarNum();
        this.setStarLB(curStar);
    };

    /** 设置星星的文本 */
    private setStarLB(starNum: number) {
        this.curPage.setStarLB(starNum);
    };


    // ------------------------------------------------------------
    // 设置监听事件

    /** 设置按钮的监听事件 */
    private setBTNEvent() {

    };

}

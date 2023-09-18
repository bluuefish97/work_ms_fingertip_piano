/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：礼物节点的中介
*****************************************************/

import TipsManager from "../../../Common/TipsManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import DiamondManager from "../../../Expand/DiamondManager";
import LocalStorageManager from "../../../Expand/LocalStorageManager";
import MusicManager from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { OpenPageFunc } from "../Command/OpenPageCmd";
import GiftNodeUnit from "../Unit/GiftNodeUnit";
import RewardBoxMediator from "./RewardBoxMediator";

export default class GiftNodeMediator extends Mediator {

    /** 礼物节点 */
    private curGift: GiftNodeUnit = null;

    /** 第几个礼物 */
    private giftNum: number = 0;

    /** 需要的星星数 */
    private needStarNum: number = 0;

    /** 获得的奖励 */
    private rewardNum: number = 200;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curGift = viewNode.getComponent(GiftNodeUnit);
        this.setBTNEvent();
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
                this.refreshGiftData();
                break;

            default:
                break;
        }
    };



    // ------------------------------------------------------------
    // 内部函数

    /** 刷新礼物的信息 */
    private refreshGiftData() {
        this.curGift.setStarNum(this.needStarNum);

        let curStar = MusicManager.getInstance().getStarNum();
        if (curStar >= this.needStarNum) {
            LocalStorageManager.setlocalStorage("giftReward" + this.giftNum, true);
        }
        // LocalStorageManager.setlocalStorage("giftReward" + this.giftNum, true);

        // 设置解锁的状态
        let curBool = LocalStorageManager.getlocalStorageToBoolean("giftReward" + this.giftNum);
        // 获得是否获得的状态
        let curGetReward = LocalStorageManager.getlocalStorageToBoolean("getGiftReward" + this.giftNum);

        let returnNum = -1;
        if (curBool == false) {
            returnNum = 0;
        } else if (curBool == true && curGetReward == false) {
            returnNum = 1;
        } else {
            returnNum = 2;
        }

        this.curGift.setGiftType(returnNum);

    };

    /** 设置第几个礼物数 */
    public setGiftNum(curNum: number) {
        this.giftNum = curNum;
    };

    /** 设置需要的星星数 */
    public setNeedStarNum(curNum: number) {
        this.needStarNum = curNum;
    };



    // ------------------------------------------------------------
    // 设置监听事件

    /** 设置按钮的监听事件 */
    private setBTNEvent() {
        this.curGift.setGrayEvt(() => {
            this.grayEvt();
        })

        this.curGift.setGiftEvt(() => {
            this.giftEvt();
        })

    };

    /** 设置灰色礼物的监听事件 */
    private grayEvt() {
        TipsManager.getInstance().showTips("无法点击");
    };

    /** 设置高亮礼物的监听事件 */
    private giftEvt() {
        CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.RewardBoxPage, () => {
            let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.RewardBoxMediator) as RewardBoxMediator;
            if (curMediator) {
                curMediator.setGiftNum(this.giftNum);
            }
        }));

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "treasurebox", 1);
    };


}

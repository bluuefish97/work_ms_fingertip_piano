/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：页面切换显示的总节点的中介
*****************************************************/

import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import Home from "../../../SceneScript/Home";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import { HomeConName } from "../../PageName";
import { ShowHomeBody } from "../Command/ShowHomeCmd";
import HomeConPage from "../HomeView/PageList/HomeConPage";

export default class HomeConMediator extends Mediator {

    /** 游戏内UI总控制界面 */
    private curPage: HomeConPage = null;

    /** 页面所显示的id */
    private pageNum: number = 0;

    /** 表能否进行点击按钮 */
    private canTouch = true;

    /** 页面的列表 */
    private pageNameList = ["HomeNode", "MusicListNode", "MoreListNode"];

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(HomeConPage);
        this.refreshBTN(this.pageNum);
        this.setBTNEvent();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.ShowPageResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let name = notification.getName();
        switch (name) {
            case AllCommandDefine.ShowPageResponse:
                this.switchRootNode(info.showPageNum, info.curCall);
                break

            default:
                break;
        }
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 切换根节点 */
    public switchRootNode(switchNum: number, curCall: Function) {
        let curNum = this.pageNum;                              // 当前页面所对应的id
        let isTurnLeft = switchNum > curNum;                   // 表当前页面是否要进行向左切换,反之则进行向右切换
        let switchRootName = this.pageNameList[switchNum];      // 切换界面的名称

        let haveRoot = false                                    // 表当前要切换的节点是否已经存在
        let curRootNode = null                                  // 当前展示的根节点
        let showRootNode = null                                 // 如果存在的情况下,用以记录切换的节点
        let parentNode = Home.getInstance().pageListNode        // 所有根节点的父节点

        for (let i = 0; i < parentNode.childrenCount; i++) {
            let curChild = parentNode.children[i]
            if (curChild.name == switchRootName) {
                haveRoot = true
                showRootNode = curChild
            }

            if (curChild.name == this.pageNameList[curNum]) {
                curRootNode = curChild
            }
        }

        const switchCall = () => {
            this.canTouch = true;
            curCall && curCall()
        }

        if (haveRoot == true) {
            this.switchAnim(curRootNode, showRootNode, isTurnLeft, switchCall);
        } else {
            let curLoadStr: HomeConName = null;
            if (switchRootName == "MusicListNode") {
                curLoadStr = HomeConName.MusicListNode;
            } else if (switchRootName == "MoreListNode") {
                curLoadStr = HomeConName.MoreListNode;
            }

            CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowHomeRequest, new ShowHomeBody(curLoadStr, (curPrefab) => {
                this.switchAnim(curRootNode, curPrefab, isTurnLeft, switchCall);
            }));
        }

        this.pageNum = switchNum;
        this.refreshBTN(switchNum);
    };

    /** 切换动画 */
    private switchAnim(curRootNode: cc.Node, showRootNode: cc.Node, isTurnLeft: boolean, curCall: Function) {
        this.curPage.switchAnim(curRootNode, showRootNode, isTurnLeft, curCall);
    };

    /** 刷新按钮的显示 */
    private refreshBTN(switchNum: number) {
        this.curPage.refreshBTN(switchNum);
    };



    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置监听事件 */
    private setBTNEvent() {
        this.curPage.setHomeEvt(() => {
            this.homeEvt();
        })

        this.curPage.setMusicEvt(() => {
            this.musicEvt();
        })

        this.curPage.setMoreEvt(() => {
            this.moreEvt();
        })

    };

    /** 设置主界面按钮的监听事件 */
    private homeEvt() {
        console.log("点击主界面按钮")
        if (this.pageNum == 0) return
        if (this.canTouch == false) return
        this.canTouch = false;

        AudioPlayManager.playDownBTNAU();
        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowPageRequest, ({
            showPageNum: 0
        }));

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "main", 1);
    };

    /** 设置我的音乐按钮的监听事件 */
    private musicEvt() {
        console.log("点击我的音乐按钮")
        if (this.pageNum == 1) return
        if (this.canTouch == false) return
        this.canTouch = false;

        AudioPlayManager.playDownBTNAU();
        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowPageRequest, ({
            showPageNum: 1
        }));

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "lists", 1);
    };

    /** 设置更多按钮的监听事件 */
    private moreEvt() {
        console.log("点击更多界面按钮")
        if (this.pageNum == 2) return
        if (this.canTouch == false) return
        this.canTouch = false;

        AudioPlayManager.playDownBTNAU();
        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowPageRequest, ({
            showPageNum: 2
        }));
    };

}

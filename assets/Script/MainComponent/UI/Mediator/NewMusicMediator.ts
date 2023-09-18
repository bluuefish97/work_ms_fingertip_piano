/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：新歌速递页面的中介
*****************************************************/

import MusicManager, { MusicStatus } from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import NewMusicPage from "../Page/NewMusicPage";
import NormalMusicUnit from "../Unit/NormalMusicUnit";
import NormalMusicMediator from "./NormalMusicMediator";

export default class NewMusicMediator extends Mediator {

    /** 新歌速递界面 */
    private curPage: NewMusicPage = null;

    /** 当前歌曲组件所存储的歌曲信息 */
    private curMusicList = [];

    /** 创建组件的间隔事件差 */
    private createInterTime: number = 50;



    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(NewMusicPage);
        this.setButtonEvt();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.StartGameResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        if (info) {
            switch (notification.getName()) {
                case AllCommandDefine.StartGameResponse:
                    this.setPageActive(false);
                    break

                default:
                    break;
            }
        }
    };




    // -------------------------------------------------------------------------------------
    // 内部函数

    /** 初始化当前的歌曲存储信息 */
    public initMusicList() {
        this.curMusicList = MusicManager.getInstance().getStatusMusicList(MusicStatus.NewMusic);
        this.initCreateMusicList();
    };

    /** 初始化音乐列表 */
    private initCreateMusicList() {
        const self = this;

        for (let i = 0; i < this.curMusicList.length; i++) {
            this.curPage.createMusicPrefab((curPrefab: cc.Node) => {
                const curJS = curPrefab.getComponent(NormalMusicUnit);
                curJS.setAnimNodeActive(false);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.NewMusicMediator + "_" + i);
                CommonFacade.getInstance().registerMediator(new NormalMusicMediator(AllMediatorDefine.NewMusicMediator + "_" + i, curPrefab));
                let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.NewMusicMediator + "_" + i) as NormalMusicMediator;
                curMediator.baseMusicInfo = self.curMusicList[i];
                curMediator.refreshMusicData();
                curMediator.setAdTypeNum(1);

                setTimeout(() => {
                    curJS.setMusicAnim(true);
                }, self.createInterTime * i)
            })
        }
    };

    /** 设置页面的弹窗动画 */
    public setPageAnim() {
        this.curPage.setPageAnim(() => {
            this.initMusicList();
        });
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.curPage.setPageActive(isShow);
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curPage.setCloseEvt(() => {
            this.closeEvt();
        })
    };

    /** 关闭当前界面的监听事件 */
    private closeEvt() {
        this.setPageActive(false);
    };


}

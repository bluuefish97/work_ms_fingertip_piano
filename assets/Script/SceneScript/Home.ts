/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：主界面场景脚本
*****************************************************/

import CommonGlobal from "../Common/CommonGlobal";
import AnalyticsManager from "../Expand/AnalyticsManager";
import MusicManager from "../Expand/MusicManager";
import { AllCommandDefine } from "../MainComponent/AllCommandDefine";
import CommonFacade from "../MainComponent/CommonFacade";
import { HomeConName, PageName } from "../MainComponent/PageName";
import { OpenPageFunc } from "../MainComponent/UI/Command/OpenPageCmd";
import { ShowHomeBody } from "../MainComponent/UI/Command/ShowHomeCmd";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    //---------------数据区---------------------
    private static _instance: Home = null;
    public static getInstance() {
        return Home._instance;
    }

    /** 页面控制总节点 */
    @property(cc.Node)
    public pageListNode: cc.Node = null;

    /** 主页中用于进行存储组件总控制节点 */
    @property(cc.Node)
    public HomeContentNode: cc.Node = null;

    /** 加载完成的节点数 */
    private loadOKNum: number = 0;

    /** 加载全部节点数 */
    private loadAllNum: number = 0;

    /** 资源预加载成功 */
    private loadPrefabOK: boolean = false;

    onLoad() {
        console.log("主界面进入");
        this.loadPrefabOK = false;
        this.InitHome();
        this.loadTopCon();
        this.checkLoadNewMusic();
    };

    onEnable() {
        CommonFacade.getInstance().sendNotification(AllCommandDefine.SetDiamondActiveRequest, ({
            type: true
        }))

        CommonFacade.getInstance().sendNotification(AllCommandDefine.SetPowerActiveRequest, ({
            type: true
        }))

        if (this.loadPrefabOK == true) {
            MusicManager.getInstance().autoPlayMusic();
        }

        AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "main", 1);
    };

    /** 对桌面进行初始化操作 */
    InitHome() {
        if (!Home._instance) {
            Home._instance = this;
            cc.game.addPersistRootNode(this.node); //添加常驻节点
        } else {
            this.node.destroy();
        }
    };

    /** 设置页面的显示 */
    setPageActive(isShow: boolean) {
        this.node.active = isShow;
        CommonGlobal.getInstance().isGameing = !isShow;
    };

    /** 加载顶部组件 */
    loadTopCon() {
        // this.loadAllNum = 2;
        // this.loadOKNum = 0;

        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowHomeRequest, new ShowHomeBody(HomeConName.GRP_Top, () => {
            this.loadHotCon();
        }));
    };

    /** 加载顶部组件 */
    loadHotCon() {
        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowHomeRequest, new ShowHomeBody(HomeConName.GRP_Hot, () => {
            this.loadGiftCon();
        }));
    };

    /** 加载礼物组件 */
    loadGiftCon() {
        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowHomeRequest, new ShowHomeBody(HomeConName.GRP_Gift, () => {
            this.loadLikeCon();
        }));
    };

    /** 加载偏好组件 */
    loadLikeCon() {
        CommonFacade.getInstance().sendNotification(AllCommandDefine.ShowHomeRequest, new ShowHomeBody(HomeConName.GRP_Like, () => {
            this.loadPrefabOK = true;
            MusicManager.getInstance().autoPlayMusic();
        }));
    };

    /** 检测是否需要加载新歌速递界面 */
    private checkLoadNewMusic() {
        if (MusicManager.getInstance().checkNewMusic()) {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.NewMusicPage));
        }
    };


}

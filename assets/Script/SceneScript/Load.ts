/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.20
功能：加载界面场景脚本
*****************************************************/

import { Platform } from "../Common/CommonEnum";
import CommonGlobal from "../Common/CommonGlobal";
import GameManager from "../Common/GameManager";
import AnalyticsManager from "../Expand/AnalyticsManager";
import audioEngineMamager from "../Expand/audioEngineMamager";
import AudioSourcesMamager from "../Expand/AudioSourcesMamager";
import MusicManager from "../Expand/MusicManager";
import SDKManager from "../Expand/SDKManager";

const { ccclass, property } = cc._decorator;

const _platform = cc.Enum({
    "VIVO": 0,
    "OPPO": 1,
    "安卓": 2,
    "抖音": 3,
    "QQ": 4,
    "IOS": 5,
    "微信": 6,
    "华为": 7,
    "小米": 8,
    "百度": 9,
    "Web": 10,
    "快手": 11,

    "安卓-无广告": 101,
    "安卓-OPPO": 102,
    "安卓-VIVO": 103,
    "安卓-小米": 104,
    "安卓-taptap": 105,
});

@ccclass
export default class Load extends cc.Component {

    private static _instance: Load = null;
    public static getInstance() {
        return Load._instance;
    }

    @property({ type: cc.Enum(_platform), displayName: "发布渠道" })
    Platform = _platform["OPPO"];

    @property({ tooltip: "测试模式" })
    TestModle: boolean = false;

    /** 普通显示节点 */
    private normalNode: cc.Node = null;

    /** 新玩家显示节点 */
    private newRoleNode: cc.Node = null;

    // 加载进度条的文本节点
    private percelLB: cc.Node = null;

    /** 进度条的总节点 */
    private progressBar: cc.Node = null;

    /** 进度条的文本节点 */
    private progressLB: cc.Node = null;

    /** 加载特效节点 */
    private loadEffect: cc.Node = null;

    /** 普通标题图片 */
    private logoSP: cc.Node = null;

    /** oppo端标题图片 */
    private logoSP_OPPO: cc.Node = null;


    onLoad() {
        this.defination();
        this.InitData();
        this.InitLoad();
        this.InitASCAd();
        this.InitAudio();
        this.InitMusic();

        this.setDiffType();
    };

    onEnable() {
        // this.setLoadType();
    };

    start() {
        GameManager.getInstance().commonFacade.startup();
    };

    defination() {
        this.normalNode = this.node.getChildByName("Normal");
        this.newRoleNode = this.node.getChildByName("NewRole");

        this.percelLB = this.node.getChildByName("LB_Percel");
        this.progressBar = this.node.getChildByName("ProgressBar");
        this.progressLB = this.progressBar.getChildByName("LB_Loading");
        this.loadEffect = this.node.getChildByName("Load_Effect");

        this.logoSP = this.normalNode.getChildByName("SP_Logo");
        this.logoSP_OPPO = this.normalNode.getChildByName("SP_Logo_OPPO");
    };

    InitData() {
        // 基础数据设置
        // 存储版本号
        CommonGlobal.getInstance().cocosVersion = Number(cc.ENGINE_VERSION[0] + cc.ENGINE_VERSION[1] + cc.ENGINE_VERSION[2]);
        // 存储平台信息
        CommonGlobal.getInstance().platform = this.Platform;
        // 存储是否为测试模式
        CommonGlobal.getInstance().isTestModle = this.TestModle;
        // 存储高度
        CommonGlobal.getInstance().screenHeight = cc.view.getVisibleSize().height;
        // 存储宽度
        CommonGlobal.getInstance().screenWidth = cc.view.getVisibleSize().width;
        // 本地数据初始化
        CommonGlobal.getInstance().userDataInit();
        // 设置对应的channelId
        CommonGlobal.getInstance().dealConfigID();
        // 读取本地的数据
        CommonGlobal.getInstance().loadConfig();

    };

    /** 对桌面进行初始化操作 */
    InitLoad() {
        if (!Load._instance) {
            Load._instance = this;
            cc.game.addPersistRootNode(this.node); //添加常驻节点
        } else {
            this.node.destroy();
        }
    };

    /** 初始化广告 */
    InitASCAd() {
        SDKManager.getInstance().initASCAd();
    };

    /** 初始化音频 */
    InitAudio() {
        AudioSourcesMamager.getInstance().SoundsInit();
        audioEngineMamager.getInstance().initaudioEngine();
    };

    /** 初始化加载歌曲 */
    InitMusic() {
        MusicManager.getInstance().loadMusicTable();
    };

    /** 设置加载页面类型 */
    setLoadType() {
        this.normalNode.active = false;
        this.newRoleNode.active = false;

        if (CommonGlobal.getInstance().isNewRolePlaying != true) {
            this.normalNode.active = true;
        } else {
            this.newRoleNode.active = true;
        }
    };

    /** 设置加载进度条 */
    setLoadProcess(perNum: number) {
        if (!this.percelLB) return

        this.percelLB.getComponent(cc.Label).string = perNum.toString() + "%";
        this.progressBar.getComponent(cc.ProgressBar).progress = perNum / 100;
        this.progressLB.getComponent(cc.Label).string = "加载中 " + perNum + "%"
    };

    /** 设置页面的显示 */
    setPageActive(isShow: boolean) {
        this.node.active = isShow;
        CommonGlobal.getInstance().isGameing = isShow;

        if (isShow == true) {
            this.loadEffect.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        }
    };

    /** 设置不同端的类型样式 */
    setDiffType() {
        this.logoSP.active = false;
        this.logoSP_OPPO.active = false;

        if (CommonGlobal.getInstance().platform == Platform.OPPO) {
            this.logoSP_OPPO.active = true;
        } else {
            this.logoSP.active = true;
        }
    };

}

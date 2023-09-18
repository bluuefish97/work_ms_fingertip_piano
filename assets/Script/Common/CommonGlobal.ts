/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.02.23
功能：用于进行存储通用数据
*****************************************************/

import { sdkConfig } from "../../SDK/SdkConfig";
import audioEngineMamager from "../Expand/audioEngineMamager";
import LocalStorageManager from "../Expand/LocalStorageManager";
import { GameState, Platform } from "./CommonEnum";

export default class CommonGlobal {
    private static instance: CommonGlobal
    public static getInstance(): CommonGlobal {
        if (!CommonGlobal.instance) CommonGlobal.instance = new CommonGlobal();
        return CommonGlobal.instance;
    }

    // -----------------------------------------------------------------
    // 游戏平台ID

    private VivoChannelId = "5602108"
    private OppoChannelId = "5602142"
    private AndroidChannelId = "1234666"
    private DouyinChannelId = "5602154"           //5602154
    private QQChannelId = "0"
    private IOSChannelId = "0"
    private WechatChannelId = "5669161"
    private HuaweiChannelId = "0"
    private XiaomiChannelId = "0"
    private BaiduChannelId = "0"
    private WebChannelId = "0"
    private KuaishouChannelId = "0"


    // -----------------------------------------------------------------
    // 游戏基础信息

    /** cocos的版本号 */
    public cocosVersion: number = null
    /** 平台编号 */
    public platform: number = null;
    /** 表当前游戏是否为测试模式 */
    public isTestModle: boolean = false




    // -----------------------------------------------------------------
    // 本地配置基础信息

    /** 皮肤配置信息 */
    public skinConfig = [];
    /** 偏好配置信息 */
    public favourConfig = [];


    // -----------------------------------------------------------------
    // 游戏基础数据

    // 最大的体力上限
    public maxPowerNum: number = 5;
    /** 进行一把游戏所花费的体力数 */
    public reducePoweNum: number = 1;
    // 增加一点体力所需要的时间
    public addPowerTime: number = 300;
    // 表当前游戏是否处于游玩状态中
    public isGameing: boolean = false;
    // 表当前游戏是否复活成功
    public reliveOK: boolean = false;
    /** 表当前是否处于展示体力页面的状态中 */
    public showPowerPage: boolean = false;
    /** 表当前是否处于展示钻石界面的状态中 */
    public showDiamondPage: boolean = false;
    // 观看视频或者分享获得钻石
    public rewardDiamondNum: number = 100;
    // 球皮肤解锁的状态合集
    public BallUnlock = [];
    // 场景的宽度
    public screenWidth: number = 0;
    // 场景的高度
    public screenHeight: number = 0;
    // 当前是否处于新玩家游玩的状态中
    public isNewRolePlaying: boolean = false;

    // QQ的客服数据
    public qqStr = "1092785165"

    /** 用户数据,可在此添加其他数据 */
    public userData = {
        /** 钻石数量 */
        DiamondNum: 0,
        /** 体力数量 */
        PowerNum: 0,
        /** 游戏难度ID */
        gameModelsId: 0,
        /** 是否展示个性化推荐 */
        chooseFavorite: false,
        /** 上次退出时间*/
        getOutTime: 0,
        /** 星期 */
        WeekTime: 0,
        /** 当前使用的皮肤id */
        SkinNum: 0,
        /** 背景音乐大小 */
        BgSoundScale: 1,
        /** 音效大小 */
        EffectScale: 1,
        /** 是否开启震动 */
        IsShake: true,
    };

    /** 增加体力的列表 */
    public addPowerList = [
        3,
        5,
        5
    ];

    /** 增加体力消耗的列表 */
    public addPowerCostList = [
        150,
        200,
        0
    ]


    // -----------------------------------------------------------------------
    // 歌曲基础数据

    /** 当前主界面进行播放歌曲的歌曲ID */
    public playingMusicId: string = ""

    // ------------------------------------
    // 游戏内相关基础数据

    /** 当前游戏进行游玩的歌曲ID */
    public gameMusicId: string = ""

    /** 游戏内游玩的歌曲加载路径 */
    public gameMusicDataStr: string = ""

    /** 当前游戏内要进行播放的音乐歌曲资源 */
    public gameMusicData: cc.AudioClip = null;

    /** 游戏内游玩的歌曲的json加载路径 */
    public gameMusicJsonStr: string = ""

    /** 当前游戏中要进行播放的音乐所对应的json表 */
    public gameMusicJson = [];

    /** 游戏所获得的钻石奖励数 */
    public gameRewardDiamondNum: number = 0;

    /** 游戏所获得的分数 */
    public gameScoreNum: number = 0;

    /** 游戏所获得的星星数 */
    public gameStarNum: number = 0;

    /** 游戏的进程状态 */
    public gameCurStatus: GameState = GameState.Wait;

    /** 游戏内的当前移动速度 */
    public gamePlayerSpeed: number = 1500;

    /** 游戏内的基础速度 */
    public gameBasePlayerSpeed: number = 1500;

    /** 游戏内一个单位的钢琴块的时间长度 */
    public gameKeyLen: number = 0.4;

    /** 游戏内一个单位的钢琴块的速度乘以时间的总长度 */
    public gameKeyUnitNum: number = 600;

    /** 游戏内创造的位置 */
    public gameFirstPos: number = cc.view.getVisibleSize().height / 2;

    /** 游戏内死亡之后将钢琴块返回的时间 */
    public gameDeadReturnTime: number = 0;

    /** 游戏内最大血量 */
    public gameMaxHP: number = 3;

    /** 游戏内当前血量 */
    public gameCurHP: number = 0;

    /** 游戏是否处于高潮点的状态中 */
    public gameHighing: boolean = false;

    /** 游戏的高潮点(达到该点时将会进行切换新场景) */
    public gameHighTime: number = 0;

    /** 游戏的高潮点持续时间 */
    public gameHighContinueTime: number = 30;

    /** 游戏检测普通点点击位置列表 */
    public gameCheckNormalTouchList = [
        30,
        50
    ]

    /** 游戏中分数奖励列表 */
    public gameScoreList = [
        2,             // prefect
        1,              // best
        0,              // normal
        0,              // bad
    ];



    // -----------------------------------------------------------------------
    // 游戏内所需要的游戏资源存储

    // 游戏皮肤资源
    /** 表当前的皮肤资源是否加载完毕 */
    public loadSkinDataOK: boolean = false;

    /** 普通场景资源 */
    public gameSkinNormalBGRes: cc.SpriteFrame[] = [];
    /** 普通格子切割线资源 */
    public gameSkinNormalCutLineRes: cc.SpriteFrame[] = [];
    /** 普通钢琴块图片资源 */
    public gameSkinNormalKeyRes: cc.SpriteFrame[] = [];
    /** 普通点击线资源 */
    public gameSkinNormalLineRes: cc.SpriteFrame[] = [];
    /** 普通点击线上扫光资源 */
    public gameSkinNormalLineLightRes: cc.SpriteFrame[] = [];

    /** 高潮点场景资源 */
    public gameSkinHighBGRes: cc.SpriteFrame[] = [];
    /** 高潮点格子切割线资源 */
    public gameSkinHighCutLineRes: cc.SpriteFrame[] = [];
    /** 高潮点钢琴块图片资源 */
    public gameSkinHighKeyRes: cc.SpriteFrame[] = [];
    /** 高潮点点击线资源 */
    public gameSkinHighLineRes: cc.SpriteFrame[] = [];
    /** 高潮点普通点击线上扫光资源 */
    public gameSkinHighLineLightRes: cc.SpriteFrame[] = [];

    // -----------------------------------------------------------------------
    // 数据处理函数

    /** 重新设置channelId */
    public dealConfigID() {
        let curChannelID = null
        switch (this.platform) {
            case Platform.VIVO:
                curChannelID = this.VivoChannelId
                break
            case Platform.OPPO:
                curChannelID = this.OppoChannelId
                break
            case Platform.Android:
            case Platform.Android_NoAD:
            case Platform.Android_OPPO:
            case Platform.Android_TapTap:
            case Platform.Android_VIVO:
            case Platform.Android_XiaoMi:
                curChannelID = this.AndroidChannelId
                break
            case Platform.Douyin:
                curChannelID = this.DouyinChannelId
                break
            case Platform.QQ:
                curChannelID = this.QQChannelId
                break
            case Platform.IOS:
                curChannelID = this.IOSChannelId
                break
            case Platform.Wechat:
                curChannelID = this.WechatChannelId
                break
            case Platform.Huawei:
                curChannelID = this.HuaweiChannelId
                break
            case Platform.Xiaomi:
                curChannelID = this.XiaomiChannelId
                break
            case Platform.Baidu:
                curChannelID = this.BaiduChannelId
                break
            case Platform.Web:
                curChannelID = this.WebChannelId
                break
            case Platform.Kuaishou:
                curChannelID = this.KuaishouChannelId
                break
        }

        sdkConfig.channelId = curChannelID;
        console.log("当前的渠道id为: ", curChannelID);
    };

    /** 对本地数据进行读取 */
    public loadConfig() {

    };

    // ----------------------------------
    // 通用数据

    /** 每次进入游戏之后进行数据的初始化 */
    public userDataInit() {
        console.log("游戏内数据初始化开始")

        // 解析存储在本地的玩家基础数据
        let curUserData = JSON.parse(LocalStorageManager.getlocalStorage("userData"));
        if (curUserData != null) {
            console.log("数据存在,并重新设置")
            for (let key in curUserData) {
                this.userData[key] = curUserData[key];
            }
        }
        console.log("userData : ", this.userData)

        this.dealOldPlayerUserData();

        // // 设置音效和音乐的大小
        // audioEngineMamager.getInstance().setAllEffectsVolunm(this.userData.EffectScale);
        // audioEngineMamager.getInstance().setMusicVolume(this.userData.BgSoundScale);
    };

    /** 将当前的数据进行存储 */
    public saveUserData() {
        LocalStorageManager.setlocalStorage("userData", JSON.stringify(this.userData));

        // 设置音效和音乐的大小
        audioEngineMamager.getInstance().setAllEffectsVolunm(this.userData.EffectScale);
        audioEngineMamager.getInstance().setMusicVolume(this.userData.BgSoundScale);
    };

    /** 对玩家数据进行初始化操作 */
    public resetUserData() {
        this.userData = {
            DiamondNum: 0,
            PowerNum: 0,
            gameModelsId: 0,
            chooseFavorite: false,
            getOutTime: 0,
            WeekTime: 0,
            SkinNum: 0,
            BgSoundScale: 1,
            EffectScale: 1,
            IsShake: true,
        };

        this.saveUserData();
    };

    /** 对老玩家数据进行重新处理 */
    private dealOldPlayerUserData() {
        let diamondNum = LocalStorageManager.getlocalStorageToNumber("DiamonNum");
        const dealUserDataOK = LocalStorageManager.getlocalStorageToBoolean("dealUserDataOK");
        if (diamondNum != 0 && dealUserDataOK == false) {
            this.userData.DiamondNum = diamondNum;
            this.saveUserData();

            console.log("老玩家钻石数据处理完毕")
        }

        LocalStorageManager.setlocalStorage("dealUserDataOK", true);
    };


}



import ServerCenter from "../server/ServerCenter";
import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class WeixinAd implements AdInterface {

    /**
     * 变量区域*******************************************
     */
    /**
     * 广告开关区域*********************************
     */
    /**
     * 系统banner广告开关
     */
    SW_SystemBanner = false;
    /**
     * 系统插屏广告开关
     */
    SW_SystemInters = false;
    /**
     * 视频广告开关
     */
    SW_Video = false;
    /**
     * 原生广告开关
     */
    SW_Native = false;
    /**
     * 原生banner广告开关
     */
    SW_NativeBanner = false;
    /**
     * 原生插屏广告开关
     */
    SW_NativeInters = false;
    /**
     * 盒子广告开关
     */
    SW_Box = false;


    /**
     * 广告ID区域*************************************
     */
    /**
     * 系统banner广告ID
     */
    ID_SystemBanner = "";
    /**
     * 系统插屏广告ID
     */
    ID_SystemInters = "";
    /**
     * 原生广告ID
     */
    ID_Native = "";
    /**
     * 原生自定义广告ID
     */
    ID_NativeCustom = "";
    /**
     * 视频广告ID
     */
    ID_Video = "";
    /**
     * 盒子广告ID
     */
    ID_Box = "";
    /**
     * 积木广告ID
     */
    ID_Block = "";


    /**
     * 插屏二合一区域**********************************
     */
    /**
     * 原生插屏出现概率
     */
    NUM_NativeIntersP = 0;


    /**
     * 动态控制区域***************************
     */
    /**
     * 原生插屏上报次数(降低原生广告点击率)
     */
    NUM_NativeIntersReport = 1;
    /**
     * bannerWuchu模式出现概率
     */
    NUM_BannerErrP = 0;
    /**
     * bannerWuchu模式最多出现次数
     */
    NUM_BannerErrMost = 0;
    /**
     * bannerWuchu模式第几次必出
     */
    NUM_BannerErrMust = 0;

    /**
     * 视频Wuchu模式出现概率
     */
    NUM_VideoErrP = 0;
    /**
     * 视频Wuchu模式最多出现次数
     */
    NUM_VideoErrMost = 0;
    /**
     * 视频Wuchu模式第几次必出
     */
    NUM_VideoErrMust = 0;

    /**
     * 原生贴片开关
     */
    SW_NativePaster = false;
    /**
     * 原生贴片Wuchu模式出现概率
     */
    NUM_NativePasterErrP = 0;
    /**
     * 原生贴片Wuchu模式最多出现次数
     */
    NUM_NativePasterErrMost = 0;
    /**
     * 原生贴片Wuchu模式第几次必出
     */
    NUM_NativePasterErrMust = 0;


    /**
     * 广告基础控制区域******************************
     */
    /**
     * banner控制区域***************************
     */
    /**
     * banner刷新时间
     */
    NUM_BannerUpdateTime = 30;
    /**
     * 系统banner优先？
     */
    SW_SystemBannerFirst = true;
    /**
     * banner最多展示次数
     */
    NUM_BannerMostShow = 99;

    /**
     * 插屏控制区域*****************************
     */
    /**
     * 插屏基础控制
     */
    SW_IntersBaseControl = false;
    /**
     * 插屏第几次开始展示
     */
    NUM_IntersStart = 0;
    /**
     * 插屏展示间隔次数
     */
    NUM_IntersIntervalNum = 0;
    /**
     * 插屏间隔最小时间
     */
    NUM_IntersIntervalTime = 0;
    /**
     * 插屏延迟时间(ms)
     */
    NUM_IntersDelayTime = 0;
    /**
     * 插屏延迟概率
     */
    NUM_IntersDelayP = 0;

    /**
     * 插屏视频控制区域**************************
     */
    /**
     * 插屏视频延迟时间(ms)
     */
    NUM_IntersVideoDelayTime = 0;
    /**
     * 插屏视频延迟展示概率0-100(%)
     */
    NUM_IntersVideoDelayP = 0;

    /**
     * 原生控制区域******************************
     */
    /**
     * 原生广告刷新时间
     */
    NUM_NativeUpdateTime = 30;


    /**
     * 桌面开关区域************************************
     */
    /**
     * 添加桌面图标开关
     */
    SW_AddDesktop = false;
    /**
     * 插屏间隔弹桌面图标开关
     */
    SW_IntersIntervalToAddDesktop = false;
    /**
     * 自动弹添加桌面次数
     */
    NUM_AutoAddDeskMostTimes = 0;
    /**
     * 第几次插屏变添加桌面
     */
    NUM_IntersToAddDesktopNumber = 0;


    /**
     * 互推区域
     */
    /**
     * 互推统计开关(默认开启)
     */
    SW_Statistics = true;
    /**
     * 互推icon开关
     */
    SW_NavigateIcon = false;
    /**
     * 互推列表开关
     */
    SW_NavigateGroup = false;
    /**
     * 结算互推开关
     */
    SW_NavigateSettle = false;
    /**
     * 互推游戏
     */
    pushGameList = null;




    /**
     * 已经调用展示插屏的次数
     */
    NUM_hasShowInters = 0;
    /**
     * 插屏当前间隔的次数
     */
    NUM_intersNowInterval = 0;
    /**
     * 插屏当前间隔时间
     */
    NUM_IntersNowIntervalTime = 99;
    /**
     * 插屏当前变添加桌面次数
     */
    NUM_IntersNowToAddDesktop = 0;




    /**
     * 系统banner广告对象
     */
    bannerAd = null;
    /**
     * 系统banner是否加载成功
     */
    loadSucc_SystemBanner = false;
    /**
     * banner是否加载成功
     */
    loadSucc_Banner = false;
    /**
     * 已经调用过showBanner?
     */
    hasShowBanner = false;
    /**
     * banner刷新定时器
     */
    interval_updateBanner = null;
    /**
     * 检查banner加载成功定时器
     */
    timeout_checkBannerLoadSucc = null;
    /**
     * 当前总共查询banner加载是否成功的次数
     */
    NUM_CheckBannerLoadSucc = 0;
    /**
     * 最多查询banner加载是否成功的次数
     */
    NUM_MaxCheckBannerLoadSucc = 5;
    /**
     * banner已经被用户关闭的次数
     */
    NUM_BannerClose = 0;



    /**
     * 系统插屏广告对象
     */
    systemIntersAd = null;
    /**
     * 系统插屏是否加载成功
     */
    loadSucc_SystemInters = false;




    /**
     * 视频广告对象
     */
    videoAd = null;
    /**
     * 视频广告是否加载成功
     */
    loadSucc_Video = false;
    /**
     * 视频广告回调
     */
    callback_Video = null;




    /**
     * 原生广告对象
     */
    nativeAd = null;
    /**
     * 原生icon的参数
     */
    param_nativeIcon = {
        x: 0,
        y: 0
    };
    /**
     * 原生icon是否加载成功
     */
    loadSucc_NativeIcon = false;
    /**
     * 是否正在展示原生icon
     */
    isShow_NativeIcon = false;
    /**
     * 原生icon刷新定时器
     */
    timeout_updateNativeIcon = null;




    /**
     * 积木广告对象
     */
    blockAd = null;
    /**
     * 积木广告是否加载成功
     */
    loadSucc_Block = false;
    /**
     * 积木广告的参数
     */
    param_block = {
        type: "white",
        blockSize: 5,
        blockX: 0,
        blockY: 0
    };
    /**
     * 积木广告刷新定时器
     */
    timeout_updateBlock = null;




    /**
     * 互推icon资源
     */
    navigateIconRes = null;
    /**
     * 互推icon资源是否加载成功
     */
    loadSucc_NavigateIcon = false;
    /**
     * 互推列表资源
     */
    navigateGroupRes = null;
    /**
     * 互推列表资源是否加载成功
     */
    loadSucc_NavigateGroup = false;
    /**
     * 结算互推资源
     */
    navigateSettleRes = null;
    /**
     * 结算互推资源是否加载成功
     */
    loadSucc_NavigateSettle = false;
    /**
     * 互推游戏列表的icon资源
     */
    pushGameListIconTexture = [];
    /**
     * 互推游戏列表是否加载完成
     */
    loadSucc_PushGameList = false;

    /**
     * 互推icon是否正在展示
     */
    isShow_NavigateIcon = false;
    /**
     * 互推列表是否正在展示
     */
    isShow_NavigateGroup = false;
    /**
     * 结算互推类型1或者2是否正在展示
     */
    isShow_NavigateSettle = false;
    /**
     * 结算互推类型1是否正在展示
     */
    isShow_NavigateSettle1 = false;


    /**
     * 互推icon节点
     */
    node_navigateIcon = null;
    /**
     * 互推列表节点
     */
    node_navigateGroup = null;
    /**
     * 结算互推节点
     */
    node_navigateSettle = null;
    /**
     * 互推icon刷新定时器
     */
    interval_updateNavigateIcon = null;
    /**
     * 互推列表icon隐藏定时器
     */
    timeout_hideNavigateGroupIcon = null;


    /**
     * 互推列表获取的六个icon节点
     */
    nodeArr_NavigateGroupGetIcon = [];




    /**
     * 当前已经进入Wuchubanner模式次数
     */
    NUM_NowErrBanner = 0;
    /**
     * 正在展示Wuchubanner
     */
    isShow_ErrBanner = false;
    /**
     * Wuchubanner节点
     */
    node_ErrBanner = null;
    /**
     * Wuchubanner已调用showBanner
     */
    errBannerHasShowBanner = false;
    /**
     * Wuchubanner已回调次数
     */
    NUM_errBannerHasCallback = 0;
    /**
     * 当前已经调用getErrBannerFlag次数
     */
    NUM_NowGetErrBannerFlag = 0;


    /**
     * 当前已经进入Wuchu视频次数
     */
    NUM_NowErrVideo = 0;
    /**
     * 当前已经调用getErrVideoFlag次数
     */
    NUM_NowGetErrVideoFlag = 0;



    /**
     * 广告分组
     */
    AdGroup = "";



    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "createAd======================");
        if (this.SW_SystemBanner && this.ID_SystemBanner != "") this.createSystemBanner();

        if (this.SW_SystemInters && this.ID_SystemInters != "") this.createSystemInters();
        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();

        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        // show的时候创建
        if (this.SW_Native && this.ID_Native != "") this.createNative();

        // if (this.ID_Block != "") this.createBlock();
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "startLoadPushGamaes======================");
        if (this.SW_NavigateIcon) this.loadNavigateIconRes();
        if (this.SW_NavigateGroup) this.loadNavigateGroupRes();
        if (this.SW_NavigateSettle) this.loadNavigateSettleRes();
        if (this.SW_NavigateIcon || this.SW_NavigateGroup || this.SW_NavigateSettle) this.loadPushGameList();
    }

    /**
     * 创建系统banner广告
     */
    createSystemBanner() {
        console.log("XminigameSDK", "--createSystemBanner--");
        if (CheckConfig.stringHasSpace(this.ID_SystemBanner)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道系统banner广告ID中含有空字符串,请检查后台系统banner广告ID*********************");
            return;
        }

        // @ts-ignore
        let windowWidth = Number(wx.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(wx.getSystemInfoSync().windowHeight);

        // 竖屏游戏?
        let standGame = cc.winSize.width < cc.winSize.height;

        // @ts-ignore
        this.bannerAd = wx.createBannerAd({
            adUnitId: this.ID_SystemBanner,
            style: {
                left: 10,
                top: 76,
                height: 50,
                width: standGame ? windowWidth : 300
            },
        });

        // 监听系统banner尺寸变化
        this.bannerAd.onResize((size) => {
            this.bannerAd.style.top = windowHeight - size.height;
            this.bannerAd.style.left = (windowWidth - size.width) / 2;
        });

        // 监听系统banner加载
        this.bannerAd.onLoad(() => {
            console.log("XminigameSDK", "WX banner加载成功");
            this.loadSucc_SystemBanner = true;
            if (this.hasShowBanner) {
                this.showSystemBanner();
            }
        })

        // 监听系统banner错误
        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "WX banner加载失败：", JSON.stringify(err));
            setTimeout(() => {
                this.createSystemBanner();
            }, 10 * 1000);
        })
    }

    /**
     * 创建系统插屏广告
     */
    createSystemInters() {
        console.log("XminigameSDK", "--createSystemInters--");
        if (CheckConfig.stringHasSpace(this.ID_SystemInters)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道系统插屏广告ID中含有空字符串,请检查后台系统插屏广告ID*********************");
            return;
        }

        // @ts-ignore
        this.systemIntersAd = wx.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        });

        //监听插屏广告加载完成
        this.systemIntersAd.onLoad(() => {
            console.log("XminigameSDK", "WX 插屏广告加载完成")
            this.loadSucc_SystemInters = true;
        })

        //监听插屏广告加载出错
        this.systemIntersAd.onError(err => {
            console.log("XminigameSDK", "WX 插屏广告加载失败：", JSON.stringify(err))
            this.loadSucc_SystemInters = false;
            setTimeout(() => {
                this.systemIntersAd && this.systemIntersAd.load();
            }, 30 * 1000)
        })

        // 监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            this.NUM_IntersNowIntervalTime = 0;
        })
        // 加载一次
        this.systemIntersAd.load();
    }

    /**
     * 创建视频广告
     */
    createVideo() {
        console.log("XminigameSDK", "--createVideo--");
        if (CheckConfig.stringHasSpace(this.ID_Video)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道视频广告ID中含有空字符串,请检查后台视频广告ID*********************");
            return;
        }

        // @ts-ignore
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: this.ID_Video
        })

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "WX 视频广告加载完成")
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "WX 视频广告加载失败：" + JSON.stringify(err))
            this.loadSucc_Video = false;
            setTimeout(() => {
                this.videoAd && this.videoAd.load()
            }, 30 * 1000)
        })

        //监听视频广告播放完成
        this.videoAd.onClose(res => {
            setTimeout(() => {
                if (res.isEnded) {
                    console.log("XminigameSDK", "WX 激励视频广告完成,发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(true);
                       // this.loadSucc_Video = false;
                        console.log("-------this.videoAd.load()");
                        
                        this.videoAd.load();
                    }
                } else {
                    console.log("XminigameSDK", "WX 激励视频广告取消关闭,不发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(false);
                       // this.loadSucc_Video = false;
                        this.videoAd.load();
                    }
                }
            }, 500)
        })

        // 加载一次
        this.videoAd.load();
    }

    /**
     * 创建原生广告
     */
    createNative() {
        console.log("XminigameSDK", "--createNative--");
        if (CheckConfig.stringHasSpace(this.ID_Native)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生广告ID中含有空字符串,请检查后台原生广告ID*********************");
            return;
        }

        // @ts-ignore
        this.nativeAd = wx.createCustomAd({
            adUnitId: this.ID_Native,
            adIntervals: 30,
            style: {
                left: this.param_nativeIcon.x,
                top: this.param_nativeIcon.y,
                fixed: true
            }
        })

        // 监听原生广告加载
        this.nativeAd.onLoad(() => {
            console.log("XminigameSDK", "WX 原生ICON加载成功");
            this.loadSucc_NativeIcon = true;
        });

        // 监听原生广告错误
        this.nativeAd.onError((err) => {
            console.log("XminigameSDK", "WX 原生ICON加载失败：", JSON.stringify(err));
            this.loadSucc_NativeIcon = false;
        });

        // 监听原生广告关闭
        this.nativeAd.onClose(() => {
            console.log("XminigameSDK", "WX 手动关闭原生ICON 30s后再次刷新");
            if (this.timeout_updateNativeIcon) clearTimeout(this.timeout_updateNativeIcon);
            this.hideNativeIcon();
            this.timeout_updateNativeIcon =
                setTimeout(() => {
                    this.createNative();
                    setTimeout(() => {
                        this.nativeAd.show();
                    }, 500);
                }, 30 * 1000);
        });
    }

    /**
     * 创建积木(格子)广告
     */
    createBlock() {
        // console.log("XminigameSDK", "--createBlock--");
        // if (CheckConfig.stringHasSpace(this.ID_Block)) {
        //     console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道积木广告ID中含有空字符串,请检查后台积木广告ID*********************");
        //     return;
        // }

        // // @ts-ignore
        // this.blockAd = wx.createGridAd({
        //     adUnitId: this.ID_Block,
        //     adTheme: this.param_block.type,
        //     gridCount: this.param_block.blockSize,
        //     style: {
        //         left: this.param_block.blockX,
        //         top: this.param_block.blockY,
        //         width: 300,
        //         opacity: 0.8
        //     },
        // });

        // // 监听积木广告加载
        // this.blockAd.onLoad(() => {
        //     console.log("XminigameSDK", "WX 格子(积木)广告加载成功");
        //     this.loadSucc_Block = true;
        // })

        // // 监听积木广告错误
        // this.blockAd.onError((err) => {
        //     console.log("XminigameSDK", "WX 格子(积木)广告加载失败:" + JSON.stringify(err));
        // })
    }

    /**
     * 加载互推icon资源
     */
    loadNavigateIconRes() {
        console.log("XminigameSDK", "--loadNavigateIconRes--");

        this.navigateIconRes = {
            NavigateIconBg: null,
            NavigateIconMask: null,
            NavigateIconMoreGame: null,
        }

        let navigateIconResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIconBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIconMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateIconMoreGame.png",
        ]

        LoadRes.loadResArray(navigateIconResArr, (err, texture) => {
            this.navigateIconRes.NavigateIconBg = texture[0];
            this.navigateIconRes.NavigateIconMask = texture[1];
            this.navigateIconRes.NavigateIconMoreGame = texture[2];
            this.loadSucc_NavigateIcon = true;
            console.log("XminigameSDK", "互推ICON资源加载成功");
        });
    }

    /**
     * 加载互推列表资源
     */
    loadNavigateGroupRes() {
        console.log("XminigameSDK", "--loadNavigateGroupRes--");

        this.navigateGroupRes = {
            NavigateGroupIconBtn: null,
            NavigateGroupIconMask: null,
            NavigateGroupLeftTuck: null,
            NavigateGroupListLeft: null,
            NavigateGroupListRight: null,
            NavigateGroupRightTuck: null,
        }

        let navigateGroupResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupIconBtn.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupIconMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupLeftTuck.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupListLeft.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupListRight.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateGroupRightTuck.png",
        ]

        LoadRes.loadResArray(navigateGroupResArr, (err, texture) => {
            this.navigateGroupRes.NavigateGroupIconBtn = texture[0];
            this.navigateGroupRes.NavigateGroupIconMask = texture[1];
            this.navigateGroupRes.NavigateGroupLeftTuck = texture[2];
            this.navigateGroupRes.NavigateGroupListLeft = texture[3];
            this.navigateGroupRes.NavigateGroupListRight = texture[4];
            this.navigateGroupRes.NavigateGroupRightTuck = texture[5];
            this.loadSucc_NavigateGroup = true;
            console.log("XminigameSDK", "互推列表资源加载成功");
        });
    }

    /**
     * 加载结算互推资源
     */
    loadNavigateSettleRes() {
        console.log("XminigameSDK", "--loadNavigateSettleRes--");

        this.navigateSettleRes = {
            NavigateSettle1Bg: null,
            NavigateSettle2Bg: null,
            NavigateSettleIconYellow: null,
            NavigateSettleIconMask: null,
            NavigateSettleNameBg: null,
        }

        let navigateSettleResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettle1Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettle2Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettleIconYellow.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettleIconMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NavigateSettleNameBg.png",
        ]

        LoadRes.loadResArray(navigateSettleResArr, (err, texture) => {
            this.navigateSettleRes.NavigateSettle1Bg = texture[0];
            this.navigateSettleRes.NavigateSettle2Bg = texture[1];
            this.navigateSettleRes.NavigateSettleIconYellow = texture[2];
            this.navigateSettleRes.NavigateSettleIconMask = texture[3];
            this.navigateSettleRes.NavigateSettleNameBg = texture[4];
            this.loadSucc_NavigateSettle = true;
            console.log("XminigameSDK", "结算互推资源加载成功");
        });
    }

    /**
     * 加载互推游戏列表
     */
    loadPushGameList() {
        console.log("XminigameSDK", "--loadPushGameList--");

        if (this.pushGameList == null) return;

        let hasLoadIconNum = 0;

        for (let i = 0; i < this.pushGameList.length; i++) {
            cc.loader.load(this.pushGameList[i].pushGamePicture, (err, texture) => {
                if (err) {
                    console.log("XminigameSDK", `pushGameList icon${i}加载失败`);
                    cc.loader.load("https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Navigate/NoIcon.png", (err, texture) => {
                        hasLoadIconNum++;
                        if (err) {
                            this.pushGameListIconTexture[i] = null;
                        }
                        else {
                            this.pushGameListIconTexture[i] = texture;
                            if (hasLoadIconNum >= this.pushGameList.length) {
                                this.loadSucc_PushGameList = true;
                            }
                        }
                    });
                }
                else {
                    hasLoadIconNum++;
                    this.pushGameListIconTexture[i] = texture;
                    if (hasLoadIconNum >= this.pushGameList.length) {
                        this.loadSucc_PushGameList = true;
                    }
                }
            });
        }
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner() {
        if (!this.loadSucc_Banner) {
            this.checkBannerLoadSucc();
            return;
        }

        if (this.NUM_BannerMostShow <= this.NUM_BannerClose) {
            console.log("XminigameSDK", "banner最大关闭次数", this.NUM_BannerMostShow, " 已达上限 return");
            // 清除banner刷新定时器
            if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
            return;
        }

        if (this.isShow_NavigateSettle1) {
            console.log("XminigameSDK", "正在展示结算互推1,无法showBanner");
            return;
        }

        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        // 已经调用过showBanner
        this.hasShowBanner = true;

        if (this.SW_SystemBanner) {
            this.showSystemBanner();
            this.updateSystemBanner();
        }
    }

    hideBanner() {
        this.hasShowBanner = false;
        this.hideSystemBanner();
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        return this.loadSucc_SystemInters;
    }

    showInters() {
        // 插屏间隔弹添加桌面
        this.NUM_hasShowInters++;
        if (this.SW_IntersIntervalToAddDesktop && this.NUM_hasShowInters <= this.NUM_IntersToAddDesktopNumber) {
            console.log("XminigameSDK", "第" + this.NUM_IntersToAddDesktopNumber + "次插屏变添加桌面", "当前第" + this.NUM_hasShowInters + "次");
            if (this.NUM_hasShowInters == this.NUM_IntersToAddDesktopNumber) {
                this.getAddDesktopFlag((suc) => {
                    if (suc) {
                        console.log("XminigameSDK", "插屏变添加桌面");
                        this.addDesktop((res) => { });
                    }
                });
                return;
            }
        }

        if (this.SW_IntersBaseControl) {
            if (this.NUM_hasShowInters < this.NUM_IntersStart) {
                console.log("XminigameSDK", "插屏开始次数未达到", this.NUM_hasShowInters, "目标次数", this.NUM_IntersStart);
                return;
            }

            if (this.NUM_intersNowInterval < this.NUM_IntersIntervalNum) {
                console.log("XminigameSDK", "插屏间隔次数未达到", this.NUM_intersNowInterval, "目标次数", this.NUM_IntersIntervalNum)
                this.NUM_intersNowInterval++;
                return;
            }

            if (this.NUM_IntersNowIntervalTime < this.NUM_IntersIntervalTime) {
                console.log("XminigameSDK", "插屏间隔时间未达到", this.NUM_IntersNowIntervalTime, "目标时间", this.NUM_IntersIntervalTime);
                if (this.SW_AddDesktop && this.NUM_IntersNowToAddDesktop < this.NUM_AutoAddDeskMostTimes) {
                    this.getAddDesktopFlag((suc) => {
                        if (suc) {
                            this.NUM_IntersNowToAddDesktop++;
                            this.addDesktop(function () {
                                console.log("XminigameSDK", "插屏间隔弹桌面")
                            });
                        }
                    });
                }
                return;
            }
        }

        this.NUM_intersNowInterval = 0;

        //有插屏延迟的情况下延迟展示插屏
        if (this.NUM_IntersDelayTime > 0) {
            let random = Math.floor(Math.random() * 100);
            if (random < this.NUM_IntersDelayP) {
                console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                setTimeout(() => {
                    if (this.loadSucc_SystemInters) this.showSystemInters();
                }, this.NUM_IntersDelayTime)
            } else {
                if (this.loadSucc_SystemInters) this.showSystemInters();
            }
        }
        else {
            if (this.loadSucc_SystemInters) this.showSystemInters();
        }
    }

    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            this.callback_Video = videoCallback;
            console.log("XminigameSDK", "WX showVideo========================")
            this.videoAd.show()
                .then(() => {
                    console.log("XminigameSDK", "WX 激励视频广告显示成功");
                })
                .catch(err => {
                    console.log("XminigameSDK", "WX 激励视频广告播放失败：", JSON.stringify(err));
                    // 可以手动加载一次
                    this.videoAd.load().then(() => {
                        console.log("XminigameSDK", "WX 激励视频广告手动加载成功");
                        // 加载成功后需要再显示广告
                        this.videoAd.show().catch(err => {
                            console.log("XminigameSDK", "WX 激励视频广告播放失败：", JSON.stringify(err));
                            this.loadSucc_Video = false;
                            this.callback_Video(false);
                        });
                    });
                });
        }
    }

    getNativeIconFlag() {
        return this.loadSucc_NativeIcon;
    }

    showNativeIcon(width, height, x, y) {

        if (this.isShow_NativeIcon) {
            console.log("XminigameSDK", "原生icon正在展示中,请勿多次show return");
            return;
        }
        this.isShow_NativeIcon = true;


        // @ts-ignore
        let windowWidth = Number(wx.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(wx.getSystemInfoSync().windowHeight);

        // 存放一开始传入的参数y
        let tempY = y;

        // cocos以左下角为(0,0) 转换为WX的以左上角为(0,0)
        y = cc.winSize.height - y;
        this.param_nativeIcon.x = x * (windowWidth / cc.winSize.width);
        this.param_nativeIcon.y = y * (windowHeight / cc.winSize.height);

        if (this.nativeAd) this.nativeAd.destroy();
        if (this.SW_Native && this.ID_Native != "") this.createNative();

        setTimeout(() => {
            console.log("XminigameSDK", "WX showNativeIcon===============================");
            this.nativeAd.show();
        }, 500);

        this.timeout_updateNativeIcon =
            setTimeout(() => {
                console.log("XminigameSDK", "WX 刷新原生ICON广告================");
                this.hideNativeIcon();
                this.showNativeIcon(0, 0, this.param_nativeIcon.x, tempY);
            }, 30 * 1000)

    }

    hideNativeIcon() {
        console.log("XminigameSDK", "WX hideNativeIcon===========================");
        this.isShow_NativeIcon = false;
        if (this.timeout_updateNativeIcon) {
            clearTimeout(this.timeout_updateNativeIcon);
        }
        this.nativeAd && this.nativeAd.destroy();
    }

    getNativeImageFlag() {
        return false;
    }
    showNativeImage(width, height, x, y) {
    }
    hideNativeImage() {
    }

    getNativePasterFlag() {
        return false;
    }
    showNativePaster() {
    }

    getNativeAdInfo(type) {
        return null;
    }
    reportNativeAdShow(adId) {
    }
    reportNativeAdClick(adId) {
    }

    getNavigateIconFlag() {
        return this.loadSucc_NavigateIcon && this.loadSucc_PushGameList && !this.isShow_NavigateIcon;
    }

    showNavigateIcon(width, height, x, y) {
        if (!(this.loadSucc_NavigateIcon && this.loadSucc_PushGameList)) {
            console.log("XminigameSDK", "互推icon资源未加载完成");
            return;
        }
        if (this.isShow_NavigateIcon) {
            console.log("XminigameSDK", "已存在互推列表,请勿多次调用showNavigateIcon");
            return;
        }
        this.isShow_NavigateIcon = true;


        // 根据权重获取游戏
        var allWeight = 0;
        for (var i = 0; i < this.pushGameList.length; i++) {
            // 所有权重之和
            allWeight += this.pushGameList[i].sort;
        }

        var random = Math.floor(Math.random() * allWeight);
        var weightNow = 0;
        let pushGameInfo = null;
        let index = 0;
        for (let i = 0; i < this.pushGameList.length; i++) {
            // 随机数大于当前权重 并且 随机数小于 当前权重加上下一个游戏的权重
            if (random >= weightNow && random < weightNow + this.pushGameList[i].sort) {
                pushGameInfo = this.pushGameList[i];
                index = i;
                break;
            }
            weightNow += this.pushGameList[i].sort;
        }

        console.log("XminigameSDK", "showNavigateIcon===========================");


        let scene = cc.director.getScene();

        this.node_navigateIcon = new cc.Node("node_navigateIcon");
        scene.addChild(this.node_navigateIcon);
        this.node_navigateIcon.addComponent(cc.Sprite);
        this.node_navigateIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateIconRes.NavigateIconBg);
        this.node_navigateIcon.width = width;
        this.node_navigateIcon.height = height;
        this.node_navigateIcon.x = x;
        this.node_navigateIcon.y = y;
        this.node_navigateIcon.zIndex = 29999;

        this.node_navigateIcon.runAction(cc.repeatForever(cc.sequence(cc.scaleBy(0.2, 1.1), cc.rotateTo(0.1, 30), cc.rotateTo(0.1, -25), cc.rotateTo(0.1, 20), cc.rotateTo(0.1, 0), cc.scaleBy(0.2, 1 / 1.1), cc.delayTime(5.0))));

        this.node_navigateIcon.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.jumpToMiniGame(pushGameInfo);
        });

        if (this.AdGroup != "") this.node_navigateIcon.group = this.AdGroup;

        // 黄色边框
        var NavigateIconMask = new cc.Node("NavigateIconMask");
        this.node_navigateIcon.addChild(NavigateIconMask);
        NavigateIconMask.addComponent(cc.Mask);
        NavigateIconMask.getComponent(cc.Mask).type = cc.Mask.Type.IMAGE_STENCIL;
        NavigateIconMask.getComponent(cc.Mask).spriteFrame = new cc.SpriteFrame(this.navigateIconRes.NavigateIconMask);
        NavigateIconMask.getComponent(cc.Mask).alphaThreshold = 0.5;
        NavigateIconMask.width = width * 0.92;
        NavigateIconMask.height = height * 0.92;

        // 圆角icon遮罩
        var navigateIconImage = new cc.Node("navigateIconImage");
        NavigateIconMask.addChild(navigateIconImage);
        navigateIconImage.addComponent(cc.Sprite);
        navigateIconImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pushGameListIconTexture[index]);
        navigateIconImage.width = NavigateIconMask.width;
        navigateIconImage.height = NavigateIconMask.height;

        // 更多游戏标题
        var title = new cc.Node("title");
        this.node_navigateIcon.addChild(title);
        title.addComponent(cc.Sprite);
        title.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateIconRes.NavigateIconMoreGame);
        title.width = width * 0.9;
        title.height = height * 0.19;
        title.x = 0;
        title.y = title.height / 2 - height / 2 + height * 0.05;

        this.interval_updateNavigateIcon =
            setInterval(() => {
                this.hideNavigateIcon();
                this.showNavigateIcon(width, height, x, y);
            }, 20 * 1000);
    }

    hideNavigateIcon() {
        this.isShow_NavigateIcon = false;
        if (this.interval_updateNavigateIcon) clearInterval(this.interval_updateNavigateIcon);
        if (this.node_navigateIcon) {
            console.log("XminigameSDK", "hideNavigateIcon===========================");
            this.node_navigateIcon.removeFromParent();
            this.node_navigateIcon = null;
        }
    }

    getNavigateGroupFlag() {
        return this.loadSucc_NavigateGroup && this.loadSucc_PushGameList && !this.isShow_NavigateGroup;
    }

    showNavigateGroup(type, side, size, y) {
        if (!(this.loadSucc_NavigateGroup && this.loadSucc_PushGameList)) {
            console.log("XminigameSDK", "互推icon资源未加载完成");
            return;
        }

        if (this.pushGameList.length < 6) {
            console.log("XminigameSDK", "后台配置互推游戏样式数量小于6个,无法展示");
            return;
        }

        if (this.isShow_NavigateGroup) {
            console.log("XminigameSDK", "已存在互推列表,请勿多次调用showNavigateGroup");
            return;
        }
        this.isShow_NavigateGroup = true;

        let scene = cc.director.getScene();


        // 定时器,隐藏互推列表按钮
        let navigateGroupHideFunc = () => {
            NavigateGroupIconBtn.width = size;
            NavigateGroupIconBtn.height = size;

            if (this.timeout_hideNavigateGroupIcon) clearTimeout(this.timeout_hideNavigateGroupIcon);

            if (!isOpenNavigateGroup && NavigateGroupIconBtn.active) {
                this.timeout_hideNavigateGroupIcon =
                    setTimeout(() => {
                        console.log("XminigameSDK", "隐藏一半互推列表icon");
                        cc.tween(NavigateGroupIconBtn)
                            .by(0.5, { position: cc.v3(NavigateGroupIconBtn.x <= 0 ? -NavigateGroupIconBtn.width / 2 : NavigateGroupIconBtn.width / 2, 0, 0) })
                            .start()
                    }, 10000);
            }
        }




        // 互推列表背景
        this.node_navigateGroup = new cc.Node("node_navigateGroup");
        scene.addChild(this.node_navigateGroup);
        this.node_navigateGroup.x = cc.winSize.width / 2;
        this.node_navigateGroup.y = cc.winSize.height / 2;
        if (this.AdGroup != "") this.node_navigateGroup.group = this.AdGroup;

        // 互推列表icon按钮
        let NavigateGroupIconBtn = new cc.Node("NavigateGroupIconBtn");
        this.node_navigateGroup.addChild(NavigateGroupIconBtn);
        NavigateGroupIconBtn.addComponent(cc.Sprite);
        NavigateGroupIconBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateGroupRes.NavigateGroupIconBtn);
        NavigateGroupIconBtn.width = size;
        NavigateGroupIconBtn.height = size;

        // 如果参数side是left,默认互推列表icon在左侧中间
        if (side == "left") {
            // 互推列表icon在左侧中间
            NavigateGroupIconBtn.x = NavigateGroupIconBtn.width / 2 - cc.winSize.width / 2;
            NavigateGroupIconBtn.y = y;
        }
        else {
            // 互推列表icon在右侧中间
            NavigateGroupIconBtn.x = cc.winSize.width / 2 - NavigateGroupIconBtn.width / 2;
            NavigateGroupIconBtn.y = y;
        }

        // 互推列表是否打开
        let isOpenNavigateGroup = false;

        // 在左侧打开或在右侧打开互推列表
        let openNavigateGroup = (left: boolean) => {

            let AllNavigateGameList = this.pushGameList;
            var dataArr = [];
            for (let index = 0; index < AllNavigateGameList.length; index++) {
                dataArr[index] = AllNavigateGameList[index];
                dataArr[index].index = index;
            }
            var getInfom = () => {
                // 总权重
                var allWeight = 0;
                for (var i = 0; i < dataArr.length; i++) {
                    allWeight += dataArr[i].sort;
                }

                var random = Math.floor(Math.random() * allWeight);
                var weightNow = 0;
                for (let i = 0; i < dataArr.length; i++) {
                    // 如果随机数大于等于当前权重 并且 随机数小于 当前权重+下一个游戏的权重
                    if (random >= weightNow && random < weightNow + dataArr[i].sort) {
                        // 返回这个游戏在所有互推游戏中的索引
                        var inform = dataArr[i];
                        // 删除这个游戏
                        dataArr.splice(i, 1);
                        return inform;
                    }
                    // 否则当前权重继续增加下一个游戏的权重
                    weightNow += dataArr[i].sort;
                }
            }

            /**
             * 是否已打开互推列表
             */
            if (left) {
                console.log("XminigameSDK", "在左侧打开互推游戏列表");
                NavigateGroupIconBtn.active = false;
                // 互推游戏列表 左
                let NavigateGroupListLeft = new cc.Node("NavigateGroupListLeft");
                this.node_navigateGroup.addChild(NavigateGroupListLeft);
                NavigateGroupListLeft.addComponent(cc.Sprite);
                NavigateGroupListLeft.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateGroupRes.NavigateGroupListLeft);
                NavigateGroupListLeft.height = cc.winSize.height / 2;
                NavigateGroupListLeft.width = NavigateGroupListLeft.height / 4.8;
                NavigateGroupListLeft.x = -NavigateGroupListLeft.width / 2 - cc.winSize.width / 2;
                NavigateGroupListLeft.y = 0;
                cc.tween(NavigateGroupListLeft)
                    .by(0.2, { position: cc.v3(NavigateGroupListLeft.width, 0, 0) })
                    .call(() => {
                        isOpenNavigateGroup = true;
                        navigateGroupHideFunc();
                    })
                    .start();

                // 左侧缩进按钮
                let NavigateGroupLeftTuck = new cc.Node();
                NavigateGroupListLeft.addChild(NavigateGroupLeftTuck);
                NavigateGroupLeftTuck.addComponent(cc.Sprite);
                NavigateGroupLeftTuck.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateGroupRes.NavigateGroupLeftTuck);
                NavigateGroupLeftTuck.width = NavigateGroupListLeft.width * 0.5;
                NavigateGroupLeftTuck.height = NavigateGroupLeftTuck.width * 1.2;
                NavigateGroupLeftTuck.x = NavigateGroupListLeft.width * 0.65;
                NavigateGroupLeftTuck.y = NavigateGroupListLeft.height * 0.3;
                NavigateGroupLeftTuck.on(cc.Node.EventType.TOUCH_END, () => {
                    if (!isOpenNavigateGroup) return;
                    cc.tween(NavigateGroupListLeft)
                        .by(0.5, { position: cc.v3(-NavigateGroupListLeft.width, 0, 0) })
                        .call(() => {
                            isOpenNavigateGroup = false;
                            NavigateGroupIconBtn.active = true;
                            navigateGroupHideFunc();
                            NavigateGroupListLeft.destroy();
                        })
                        .start();
                })

                // icon区域遮罩
                let iconAreaMask = new cc.Node();
                NavigateGroupListLeft.addChild(iconAreaMask);
                iconAreaMask.addComponent(cc.Mask);
                iconAreaMask.getComponent(cc.Mask).type = 0;
                iconAreaMask.width = NavigateGroupListLeft.width * 0.8;
                iconAreaMask.height = NavigateGroupListLeft.height * 0.85;
                iconAreaMask.x = -NavigateGroupListLeft.width / 13;
                iconAreaMask.y = -NavigateGroupListLeft.height / 22;

                var iconArea = new cc.Node();
                iconAreaMask.addChild(iconArea);
                iconArea.x = 0;
                iconArea.y = 0;


                // icon 6为互推游戏的个数
                for (let i = 0; i < 6; i++) {
                    let inform = getInfom();

                    var icon = new cc.Node();
                    iconArea.addChild(icon);
                    icon.addComponent(cc.Sprite);
                    icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pushGameListIconTexture[inform.index]);
                    icon.width = iconAreaMask.width * 0.9;
                    icon.height = icon.width;
                    icon.x = 0;
                    icon.y = -(i - 2) * (icon.height * 1.15);
                    icon.on(cc.Node.EventType.TOUCH_START, () => {
                        this.jumpToMiniGame(inform);
                    })
                    this.nodeArr_NavigateGroupGetIcon[i] = icon;
                }


                cc.tween(iconArea)
                    .repeatForever(
                        cc.tween()
                            .delay(1)
                            .by(3, { position: cc.v3(0, icon.height * 1.15) })
                            .call(() => {
                                this.nodeArr_NavigateGroupGetIcon[0].y -= 6 * (icon.height * 1.15);
                                let tempIcon = this.nodeArr_NavigateGroupGetIcon[0];
                                for (let i = 0; i < 6; i++) {
                                    if (i < 6 - 1) {
                                        this.nodeArr_NavigateGroupGetIcon[i] = this.nodeArr_NavigateGroupGetIcon[i + 1];
                                    }
                                }
                                this.nodeArr_NavigateGroupGetIcon[6 - 1] = tempIcon;
                            })
                    )
                    .start();


            } else {
                console.log("XminigameSDK", "在右侧打开互推游戏列表");
                NavigateGroupIconBtn.active = false;
                // 互推游戏列表 右
                let NavigateGroupListRight = new cc.Node("NavigateGroupListRight");
                this.node_navigateGroup.addChild(NavigateGroupListRight);
                NavigateGroupListRight.addComponent(cc.Sprite);
                NavigateGroupListRight.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateGroupRes.NavigateGroupListRight);
                NavigateGroupListRight.height = cc.winSize.height / 2;
                NavigateGroupListRight.width = NavigateGroupListRight.height / 4.8;
                NavigateGroupListRight.x = NavigateGroupListRight.width / 2 + cc.winSize.width / 2;
                NavigateGroupListRight.y = 0;
                cc.tween(NavigateGroupListRight)
                    .by(0.2, { position: cc.v3(-NavigateGroupListRight.width, 0, 0) })
                    .call(() => {
                        isOpenNavigateGroup = true;
                        navigateGroupHideFunc();
                    })
                    .start();

                // 右侧缩进按钮
                let NavigateGroupRightTuck = new cc.Node();
                NavigateGroupListRight.addChild(NavigateGroupRightTuck);
                NavigateGroupRightTuck.addComponent(cc.Sprite);
                NavigateGroupRightTuck.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateGroupRes.NavigateGroupRightTuck);
                NavigateGroupRightTuck.width = NavigateGroupListRight.width * 0.5;
                NavigateGroupRightTuck.height = NavigateGroupRightTuck.width * 1.2;
                NavigateGroupRightTuck.x = -NavigateGroupListRight.width * 0.65;
                NavigateGroupRightTuck.y = NavigateGroupListRight.height * 0.3;
                NavigateGroupRightTuck.on(cc.Node.EventType.TOUCH_END, () => {
                    if (!isOpenNavigateGroup) return;
                    cc.tween(NavigateGroupListRight)
                        .by(0.5, { position: cc.v3(NavigateGroupListRight.width, 0, 0) })
                        .call(() => {
                            isOpenNavigateGroup = false;
                            NavigateGroupIconBtn.active = true;
                            navigateGroupHideFunc();
                            NavigateGroupListRight.destroy();
                        })
                        .start();
                })

                // icon区域遮罩
                let iconAreaMask = new cc.Node();
                NavigateGroupListRight.addChild(iconAreaMask);
                iconAreaMask.addComponent(cc.Mask);
                iconAreaMask.getComponent(cc.Mask).type = 0;
                iconAreaMask.width = NavigateGroupListRight.width * 0.8;
                iconAreaMask.height = NavigateGroupListRight.height * 0.85;
                iconAreaMask.x = NavigateGroupListRight.width / 13;
                iconAreaMask.y = -NavigateGroupListRight.height / 22;

                var iconArea = new cc.Node();
                iconAreaMask.addChild(iconArea);
                iconArea.x = 0;
                iconArea.y = 0;

                // icon 6为互推游戏的个数
                for (let i = 0; i < 6; i++) {
                    let inform = getInfom();

                    var icon = new cc.Node();
                    iconArea.addChild(icon);
                    icon.addComponent(cc.Sprite);
                    icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pushGameListIconTexture[inform.index]);
                    icon.width = iconAreaMask.width * 0.9;
                    icon.height = icon.width;
                    icon.x = 0;
                    icon.y = -(i - 2) * (icon.height * 1.15);
                    icon.on(cc.Node.EventType.TOUCH_START, () => {
                        this.jumpToMiniGame(inform);
                    })
                    this.nodeArr_NavigateGroupGetIcon[i] = icon;
                }


                cc.tween(iconArea)
                    .repeatForever(
                        cc.tween()
                            .delay(1)
                            .by(3, { position: cc.v3(0, icon.height * 1.15) })
                            .call(() => {
                                this.nodeArr_NavigateGroupGetIcon[0].y -= 6 * (icon.height * 1.15);
                                let tempIcon = this.nodeArr_NavigateGroupGetIcon[0];
                                for (let i = 0; i < 6; i++) {
                                    if (i < 5) {
                                        this.nodeArr_NavigateGroupGetIcon[i] = this.nodeArr_NavigateGroupGetIcon[i + 1];
                                    }
                                }
                                this.nodeArr_NavigateGroupGetIcon[5] = tempIcon;
                            })
                    )
                    .start();
            }
        }



        let startClickPos;
        let endMoveScreenPos;
        // 触碰到该节点时
        NavigateGroupIconBtn.on(cc.Node.EventType.TOUCH_START, ((evnet: cc.Event) => {
            // @ts-ignore
            let touch: cc.Touch = evnet.touch;
            startClickPos = touch.getLocation();
        }))

        // 当手指在目标节点区域内离开屏幕时
        NavigateGroupIconBtn.on(cc.Node.EventType.TOUCH_END, ((evnet: cc.Event) => {
            // @ts-ignore
            let touch: cc.Touch = evnet.touch;
            endMoveScreenPos = touch.getLocation();

            // 位移x、y
            let offsetX = Math.abs(endMoveScreenPos.x - startClickPos.x);
            let offsetY = Math.abs(endMoveScreenPos.y - startClickPos.y);
            if (offsetX <= 20 && offsetY <= 20) {
                console.log("XminigameSDK", "点击icon 展开互推列表");
                if (endMoveScreenPos.x <= cc.winSize.width / 2) {
                    openNavigateGroup(true);
                }
                else {
                    openNavigateGroup(false);
                }
            }

            // 重设位置,将按钮放在屏幕边缘
            NavigateGroupIconBtn.setPosition(NavigateGroupIconBtn.parent.convertToNodeSpaceAR(cc.v2(endMoveScreenPos.x >= cc.winSize.width / 2 ? cc.winSize.width - NavigateGroupIconBtn.width / 2 : NavigateGroupIconBtn.width / 2, endMoveScreenPos.y)));

            if (NavigateGroupIconBtn.active) navigateGroupHideFunc();
        }))

        // 当手指在节点上移动时
        NavigateGroupIconBtn.on(cc.Node.EventType.TOUCH_MOVE, ((evnet: cc.Event) => {
            // @ts-ignore
            let touch: cc.Touch = evnet.touch;
            NavigateGroupIconBtn.setPosition(NavigateGroupIconBtn.parent.convertToNodeSpaceAR(touch.getLocation()));
        }))

        // 定时隐藏
        navigateGroupHideFunc();
    }

    hideNavigateGroup() {
        this.isShow_NavigateGroup = false;
        if (this.timeout_hideNavigateGroupIcon) clearTimeout(this.timeout_hideNavigateGroupIcon);
        if (this.node_navigateGroup) {
            console.log("XminigameSDK", "hideNavigateGroup===========================")
            this.node_navigateGroup.removeFromParent();
            this.node_navigateGroup = null;
        }
    }

    getNavigateSettleFlag() {
        return this.loadSucc_NavigateSettle && this.loadSucc_PushGameList && !this.isShow_NavigateSettle;
    }

    showNavigateSettle(type, x, y) {
        if (!(this.loadSucc_NavigateSettle && this.loadSucc_PushGameList)) {
            console.log("XminigameSDK", "结算互推资源未加载完成");
            return;
        }

        if (this.pushGameList.length < 6) {
            console.log("XminigameSDK", "后台配置互推游戏样式数量小于6个,无法展示");
            return;
        }

        if (type != 1 && type != 2) {
            console.log("XminigameSDK", "结算互推只存在类型1和类型2 return");
            return;
        }

        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "已存在结算互推,请勿多次调用showNavigateSettle");
            return;
        }
        this.isShow_NavigateSettle = true;

        let scene = cc.director.getScene();

        var dataArr = [];
        for (let index = 0; index < this.pushGameList.length; index++) {
            dataArr[index] = this.pushGameList[index];
            dataArr[index].index = index;
        }
        var getInfom = function () {
            var allWeight = 0;
            for (var i = 0; i < dataArr.length; i++) {
                allWeight += dataArr[i].sort;
            }

            var random = Math.floor(Math.random() * allWeight);
            var weightNow = 0;
            for (let i = 0; i < dataArr.length; i++) {
                if (random >= weightNow && random < weightNow + dataArr[i].sort) {
                    var inform = dataArr[i];
                    dataArr.splice(i, 1);
                    return inform;
                }
                weightNow += dataArr[i].sort;
            }
        }


        if (type == 1 && (cc.winSize.height / cc.winSize.width) <= (16 / 9)) {
            console.log("XminigameSDK", "该设备分辨率低于16/9 改为展示类型2");
            type = 2;
            y = 0;
        }

        console.log("XminigameSDK", "WX showNavigateSettle==================", "type：", type, "y:", y);

        switch (type) {
            case 1:
                {
                    this.isShow_NavigateSettle1 = true;
                    this.hideBanner();

                    this.node_navigateSettle = new cc.Node("node_navigateSettle");
                    scene.addChild(this.node_navigateSettle);
                    if (this.AdGroup != "") this.node_navigateSettle.group = this.AdGroup;
                    this.node_navigateSettle.addComponent(cc.Sprite);
                    this.node_navigateSettle.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateSettleRes.NavigateSettle1Bg);
                    if (cc.winSize.width < cc.winSize.height) {
                        this.node_navigateSettle.width = cc.winSize.width * 9 / 10;
                        this.node_navigateSettle.height = this.node_navigateSettle.width * 2 / 3;
                    } else {
                        this.node_navigateSettle.width = cc.winSize.height * 9 / 10;
                        this.node_navigateSettle.height = this.node_navigateSettle.width * 2 / 3;
                    }
                    // 横坐标默认居中,纵坐标默认贴近底部
                    this.node_navigateSettle.x = cc.winSize.width / 2;
                    this.node_navigateSettle.y = this.node_navigateSettle.height / 2 + y;

                    for (let i = 0; i < 6; i++) {
                        let inform = getInfom();

                        let IconNode = new cc.Node("IconNode");
                        this.node_navigateSettle.addChild(IconNode);
                        IconNode.width = this.node_navigateSettle.width / 4;
                        IconNode.height = IconNode.width;
                        IconNode.x = (i % 3 - 1) * (IconNode.width * 4 / 3);
                        IconNode.y = i < 3 ? IconNode.width * 3 / 5 : -IconNode.width * 7 / 10;

                        let NavigateSettleIconMask = new cc.Node("NavigateSettleIconMask");
                        IconNode.addChild(NavigateSettleIconMask);
                        NavigateSettleIconMask.addComponent(cc.Mask);
                        NavigateSettleIconMask.getComponent(cc.Mask).type = cc.Mask.Type.IMAGE_STENCIL;
                        NavigateSettleIconMask.getComponent(cc.Mask).spriteFrame = new cc.SpriteFrame(this.navigateSettleRes.NavigateSettleIconMask);
                        NavigateSettleIconMask.getComponent(cc.Mask).alphaThreshold = 0.1;
                        NavigateSettleIconMask.width = IconNode.width;
                        NavigateSettleIconMask.height = IconNode.width;

                        let icon = new cc.Node("icon");
                        NavigateSettleIconMask.addChild(icon);
                        icon.addComponent(cc.Sprite);
                        if (this.pushGameListIconTexture[inform.index]) {
                            icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pushGameListIconTexture[inform.index]);
                        }
                        icon.width = NavigateSettleIconMask.width;
                        icon.height = NavigateSettleIconMask.height;

                        let NavigateSettleIconYellow = new cc.Node("button");
                        IconNode.addChild(NavigateSettleIconYellow);
                        NavigateSettleIconYellow.addComponent(cc.Sprite);
                        NavigateSettleIconYellow.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateSettleRes.NavigateSettleIconYellow);
                        NavigateSettleIconYellow.width = IconNode.width + 8;
                        NavigateSettleIconYellow.height = IconNode.height + 8;

                        let NavigateSettleNameBg = new cc.Node("NavigateSettleNameBg");
                        IconNode.addChild(NavigateSettleNameBg);
                        NavigateSettleNameBg.addComponent(cc.Sprite);
                        NavigateSettleNameBg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateSettleRes.NavigateSettleNameBg);
                        NavigateSettleNameBg.width = IconNode.width;
                        NavigateSettleNameBg.height = IconNode.width / 5;
                        NavigateSettleNameBg.y = -IconNode.height / 2 - NavigateSettleNameBg.height / 1.6;

                        let iconName = new cc.Node("iconName");
                        NavigateSettleNameBg.addChild(iconName);
                        iconName.addComponent(cc.Label);
                        iconName.getComponent(cc.Label).fontSize = 35;
                        iconName.getComponent(cc.Label).verticalAlign = 1;
                        iconName.getComponent(cc.Label).string = inform.pushGameName.length > 5 ? inform.pushGameName.substring(0, 5) + "..." : inform.pushGameName;

                        icon.on(cc.Node.EventType.TOUCH_START, () => {
                            this.jumpToMiniGame(inform);
                        })
                    }
                }
                break;
            case 2:
                {
                    this.node_navigateSettle = new cc.Node("node_navigateSettle");
                    scene.addChild(this.node_navigateSettle);
                    this.node_navigateSettle.addComponent(cc.Sprite);
                    this.node_navigateSettle.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateSettleRes.NavigateSettle2Bg);
                    if (cc.winSize.width < cc.winSize.height) {
                        this.node_navigateSettle.width = cc.winSize.width;
                        this.node_navigateSettle.height = this.node_navigateSettle.width * 0.3;
                    } else {
                        this.node_navigateSettle.width = cc.winSize.width / 2;
                        this.node_navigateSettle.height = this.node_navigateSettle.width * 0.25;
                    }
                    this.node_navigateSettle.x = cc.winSize.width / 2;
                    this.node_navigateSettle.y = this.node_navigateSettle.height / 2 + y;

                    if (this.AdGroup != "") { this.node_navigateSettle.group = this.AdGroup; }

                    for (let i = 0; i < 5; i++) {
                        let inform = getInfom();

                        let button = new cc.Node("button");
                        this.node_navigateSettle.addChild(button);
                        button.width = this.node_navigateSettle.width / 6;
                        button.height = button.width;
                        button.x = -this.node_navigateSettle.width / 5 * (i - 2);
                        button.y = button.height * 0.1;

                        let NavigateSettleIconYellow = new cc.Node("NavigateSettleIconYellow");
                        button.addChild(NavigateSettleIconYellow);
                        NavigateSettleIconYellow.addComponent(cc.Sprite);
                        NavigateSettleIconYellow.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.navigateSettleRes.NavigateSettleIconYellow);
                        NavigateSettleIconYellow.width = button.width + 8;
                        NavigateSettleIconYellow.height = button.height + 8;

                        let NavigateSettleIconMask = new cc.Node("NavigateSettleIconMask");
                        NavigateSettleIconYellow.addChild(NavigateSettleIconMask);
                        NavigateSettleIconMask.addComponent(cc.Mask);
                        NavigateSettleIconMask.getComponent(cc.Mask).type = cc.Mask.Type.IMAGE_STENCIL;
                        NavigateSettleIconMask.getComponent(cc.Mask).spriteFrame = new cc.SpriteFrame(this.navigateSettleRes.NavigateSettleIconMask);
                        NavigateSettleIconMask.getComponent(cc.Mask).alphaThreshold = 0.1;
                        NavigateSettleIconMask.width = button.width;
                        NavigateSettleIconMask.height = button.height;

                        let icon = new cc.Node("icon");
                        NavigateSettleIconMask.addChild(icon);
                        icon.addComponent(cc.Sprite);
                        icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.pushGameListIconTexture[inform.index]);
                        icon.width = button.width;
                        icon.height = button.height;

                        let nameLabel = new cc.Node("titleLabel");
                        button.addChild(nameLabel);
                        nameLabel.color = cc.Color.BLACK;
                        nameLabel.addComponent(cc.Label);
                        let gameName = inform.pushGameName;
                        if (inform.pushGameName.length > 4) { gameName = gameName.substring(0, 4) + "..."; }
                        nameLabel.getComponent(cc.Label).string = gameName;
                        nameLabel.getComponent(cc.Label).fontSize = 30;
                        nameLabel.getComponent(cc.Label).overflow = cc.Label.Overflow.SHRINK;
                        nameLabel.getComponent(cc.Label).enableWrapText = false;
                        nameLabel.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                        nameLabel.width = icon.width;
                        nameLabel.height = icon.height * 0.4;
                        nameLabel.x = 0;
                        nameLabel.y = -icon.height / 2 - nameLabel.height / 2 - 10;

                        icon.on(cc.Node.EventType.TOUCH_START, (event) => {
                            this.jumpToMiniGame(inform);
                        })
                    }
                }
                break;
            default:
                break;
        }


    }

    hideNavigateSettle() {
        this.isShow_NavigateSettle = false;
        this.isShow_NavigateSettle1 = false;
        if (this.node_navigateSettle) {
            console.log("XminigameSDK", "hideNavigateSettle===========================");
            this.node_navigateSettle.removeFromParent();
            this.node_navigateSettle = null;
        }
    }

    getNavigateBoxBannerFlag() {
        return false;
    }
    showNavigateBoxBanner() {
    }
    hideNavigateBoxBanner() {
    }

    getNavigateBoxPortalFlag() {
        return false;
    }
    showNavigateBoxPortal() {
    }

    setGroup(group) {
        this.AdGroup = group;
    }

    hasAddDesktopFunc() {
        return false;
    }

    getAddDesktopFlag(callback) {
        callback(false);
    }

    addDesktop(callback) {
        callback(false);
    }

    phoneVibrate(type) {
        if (type == "long") {
            // @ts-ignore
            wx.vibrateLong({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "WX vibrateLong调用失败", JSON.stringify(res));
                }
            });
        }
        else if (type == "short") {
            // @ts-ignore
            wx.vibrateShort({
                type: "heavy",
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "WX vibrateShort调用失败", JSON.stringify(res));
                }
            });
        }
    }

    startGameVideo(duration) {
    }
    pauseGameVideo() {
    }
    resumeGameVideo() {
    }
    stopGameVideo(callback) {
    }
    shareVideo(title, desc, topics, videoPath, callback) {
    }

    jumpToMoreGamesCenter() {
    }

    showMoreGamesBanner() {
    }
    hideMoreGamesBanner() {
    }

    showFavoriteGuide(type, content, position) {
    }

    getUserData(callback) {
        console.log("XminigameSDK", "getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "getUserInfo=====================");
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: false
        }
        userInfo.head = LocalStorage.getData("avatarUrl");
        userInfo.name = LocalStorage.getData("nickName");
        userInfo.sex = LocalStorage.getData("gender");
        callback(userInfo);
    }

    getBoxFlag() {
        return false;
    }
    showAppBox() {
    }

    getBlockFlag() {
        return this.loadSucc_Block;
    }

    showBlock(type, x, y, blockSize) {
        // // @ts-ignore
        // let windowWidth = Number(wx.getSystemInfoSync().windowWidth);
        // // @ts-ignore
        // let windowHeight = Number(wx.getSystemInfoSync().windowHeight);

        // // cocos以左下角为(0,0) 转换为WX的以左上角为(0,0)
        // this.param_block.blockX = x * (windowWidth / cc.winSize.width)
        // this.param_block.blockY = (cc.winSize.height - y) * (windowHeight / cc.winSize.height)
        // this.param_block.type = type;
        // this.param_block.blockSize = blockSize;

        // if (this.loadSucc_Block) this.createBlock();

        // setTimeout(() => {
        //     console.log("XminigameSDK", "WX showBlock==========================");
        //     this.blockAd.show();
        // }, 500);

        // this.timeout_updateBlock =
        //     setTimeout(() => {
        //         console.log("XminigameSDK", "WX 刷新格子(积木)广告==========================");
        //         this.blockAd.destroy();
        //         this.showBlock(type, x, y, blockSize);
        //     }, 30 * 1000)
    }
    hideBlock() {
        // if (this.timeout_updateBlock) clearTimeout(this.timeout_updateBlock);
        // if (this.blockAd) {
        //     console.log("XminigameSDK", "WX hideBlock==========================");
        //     this.blockAd.destroy();
        //     this.blockAd = null;
        // }
    }

    getVideoIntersFlag() {
        return false;
    }
    showVideoInters(callback) {
    }

    exitTheGame() {
    }

    reportAnalytics(params, data) {
        // @ts-ignore
        wx.uma.trackEvent(params, data);
    }

    showAuthentication(callback) {
    }

    visitorExperience(callback) {
    }

    showNativeAd(width, height, viewX, viewY) {
    }

    getOPPOShowMoreGameFlag() {
        return false;
    }
    showOPPOMoreGame() {
    }

    hasNetwork(callback) {
    }

    showReviewAlert() {
    }

    showiOSADWithScene(key, type) {
    }

    showiOSADWithType(key, type) {
    }

    videoUIShow(key) {
    }

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) { }

    getErrBannerFlag() {
        this.NUM_NowGetErrBannerFlag++;
        if (this.NUM_NowGetErrBannerFlag == this.NUM_BannerErrMust) {
            console.log("XminigameSDK", "b 第" + this.NUM_BannerErrMust + "次出现");
            return true;
        }
        if (this.NUM_BannerErrP > 0) {
            if (this.NUM_NowErrBanner >= this.NUM_BannerErrMost) {
                console.log("XminigameSDK", "已达上限 b");
                return false;
            }
            console.log("XminigameSDK", "Pb", this.NUM_BannerErrP);
            let num = Math.floor(Math.random() * 100);
            if (num < this.NUM_BannerErrP) {
                this.NUM_NowErrBanner++;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    showErrBanner(callback) {
        if (this.isShow_ErrBanner) {
            console.log("XminigameSDK", "已经调用过showErrBanner,请勿重复调用");
            return;
        }
        this.isShow_ErrBanner = true;

        this.hideBanner();

        // 初始化回调次数
        this.NUM_errBannerHasCallback = 0;

        console.log("XminigameSDK", "showErrBanner==================");

        let errBannerResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/ErrBanner/BlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/ErrBanner/ErrBannerReward.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/ErrBanner/ErrBannerButton.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/ErrBanner/ErrBannerProgress.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/ErrBanner/ErrBannerBar.png",
        ]

        let scene = cc.director.getScene();

        this.node_ErrBanner = new cc.Node("node_ErrBanner");
        scene.addChild(this.node_ErrBanner);
        if (this.AdGroup != "") this.node_ErrBanner.group = this.AdGroup;

        LoadRes.loadResArray(errBannerResArr, (err, texture) => {
            // 背景
            let errBannerBg = new cc.Node("errBannerBg");
            this.node_ErrBanner.addChild(errBannerBg);
            errBannerBg.addComponent(cc.Sprite);
            errBannerBg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            errBannerBg.width = cc.winSize.width;
            errBannerBg.height = cc.winSize.height;
            errBannerBg.x = cc.winSize.width / 2;
            errBannerBg.y = cc.winSize.height / 2;
            errBannerBg.opacity = 200;

            // 神秘奖励
            let reward = new cc.Node("reward");
            this.node_ErrBanner.addChild(reward);
            reward.addComponent(cc.Sprite);
            reward.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
            reward.width = cc.winSize.width * 0.62;
            reward.height = reward.width * 1.15;
            reward.x = cc.winSize.width / 2;
            reward.y = cc.winSize.height * 0.7;

            // 点击按钮
            let button = new cc.Node("button");
            this.node_ErrBanner.addChild(button);
            button.addComponent(cc.Sprite);
            button.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[2]);
            button.addComponent(cc.Widget);
            button.getComponent(cc.Widget).isAlignBottom = true;
            button.getComponent(cc.Widget).bottom = cc.winSize.height / 20;
            button.width = cc.winSize.width * 0.75;
            button.height = button.width * 0.38;
            button.x = cc.winSize.width / 2;



            // 进度条背景
            let progressBar = new cc.Node("progressBar");
            this.node_ErrBanner.addChild(progressBar);
            progressBar.addComponent(cc.Sprite);
            progressBar.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[3]);
            progressBar.addComponent(cc.ProgressBar);
            progressBar.getComponent(cc.Sprite).type = cc.Sprite.Type.FILLED;
            progressBar.getComponent(cc.Sprite).fillStart = 0;
            progressBar.getComponent(cc.Sprite).fillRange = 1;


            // 进度条
            let bar = new cc.Node("bar");
            progressBar.addChild(bar);
            let barSprite = bar.addComponent(cc.Sprite);
            barSprite.spriteFrame = new cc.SpriteFrame(texture[4]);
            barSprite.fillType = cc.Sprite.FillType.HORIZONTAL;
            barSprite.type = cc.Sprite.Type.FILLED;
            barSprite.fillStart = 0;
            barSprite.fillRange = 1;
            progressBar.getComponent(cc.ProgressBar).barSprite = bar.getComponent(cc.Sprite);

            progressBar.getComponent(cc.ProgressBar).mode = cc.ProgressBar.Mode.FILLED;
            progressBar.getComponent(cc.ProgressBar).totalLength = progressBar.width;
            progressBar.getComponent(cc.ProgressBar).progress = 0;

            progressBar.width = cc.winSize.width * 0.75;
            progressBar.height = progressBar.width * 0.06;
            progressBar.x = cc.winSize.width / 2;
            progressBar.y = cc.winSize.height / 2;
            progressBar.addComponent(cc.Widget);
            progressBar.getComponent(cc.Widget).isAlignBottom = true;
            progressBar.getComponent(cc.Widget).bottom = cc.winSize.height / 5;
            bar.height = progressBar.height;
            bar.x = -(progressBar.width / 2);
            bar.anchorX = 0;


            // 监听背景点击
            errBannerBg.on(cc.Node.EventType.TOUCH_START, (event) => {
            })
            // 进度条缩减定时器
            let interval_barCutDown = null;
            // 进度条的进度
            let pBar = progressBar.getComponent(cc.ProgressBar).progress;
            // 监听按钮点击
            button.on(cc.Node.EventType.TOUCH_START, (event) => {
                if (interval_barCutDown == null) {
                    interval_barCutDown = setInterval(() => {
                        if (pBar >= 0.005) {
                            pBar -= 0.005;
                            progressBar.getComponent(cc.ProgressBar).progress = pBar;
                        }
                    }, 100)
                }
                pBar += 0.05;
                progressBar.getComponent(cc.ProgressBar).progress = pBar;

                if (pBar >= 0.5 && !this.errBannerHasShowBanner) {
                    // 游戏回到前台
                    // @ts-ignore
                    wx.onShow((res) => {
                        if (this.NUM_errBannerHasCallback >= 1) return;
                        this.NUM_errBannerHasCallback++;
                        this.hideErrBanner();
                        callback(true);
                    })
                    this.showBanner();
                    this.errBannerHasShowBanner = true;
                    setTimeout(() => {
                        this.hideBanner();
                    }, 2000);
                }
                if (pBar >= 0.99) {
                    if (interval_barCutDown != null) clearInterval(interval_barCutDown);
                    if (this.NUM_errBannerHasCallback >= 1) return;
                    this.NUM_errBannerHasCallback++;
                    this.hideErrBanner();
                    callback(true);
                }
            })
        })
    }

    hideErrBanner() {
        // @ts-ignore
        wx.offShow(() => {
        })
        if (this.isShow_ErrBanner) {
            console.log("XminigameSDK", "hideErrBanner==================");
            this.isShow_ErrBanner = false;
            this.errBannerHasShowBanner = false;
            if (this.node_ErrBanner) {
                this.node_ErrBanner.removeFromParent();
                this.node_ErrBanner = null;
            }
        }
    }

    getErrVideoFlag() {
        this.NUM_NowGetErrVideoFlag++;
        if (this.NUM_NowGetErrVideoFlag == this.NUM_VideoErrMust) {
            console.log("XminigameSDK", "v 第" + this.NUM_VideoErrMust + "次出现");
            return true;
        }
        if (this.NUM_NowErrVideo >= this.NUM_VideoErrMost) {
            console.log("XminigameSDK", "已达上限 v");
            return false;
        }
        if (!this.loadSucc_Video) {
            console.log("XminigameSDK", "视频广告未加载完成");
            return false;
        }
        if (this.NUM_VideoErrP > 0) {
            console.log("XminigameSDK", "Pv", this.NUM_VideoErrP);
            let num = Math.floor(Math.random() * 100);
            if (num < this.NUM_VideoErrP) {
                this.NUM_NowErrVideo++;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    buyProps(money, propId, propName, callback) {
        callback(false, "");
    }

    payComplete(orderId) {
    }


    /**
     * 内部方法
     */
    /**
     * 检查banner是否加载成功
     */
    checkBannerLoadSucc() {
        this.loadSucc_Banner = this.SW_SystemBanner && this.loadSucc_SystemBanner;
        console.log("XminigameSDK", "banner加载成功?", this.loadSucc_Banner, ++this.NUM_CheckBannerLoadSucc);

        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);

        if (this.loadSucc_Banner) {
            this.showBanner();
        } else {
            if (this.NUM_CheckBannerLoadSucc >= this.NUM_MaxCheckBannerLoadSucc) return;
            this.timeout_checkBannerLoadSucc =
                setTimeout(() => {
                    this.checkBannerLoadSucc();
                }, 5 * 1000)
        }
    }

    /**
     * 展示系统banner
     */
    showSystemBanner() {
        if (this.bannerAd && this.loadSucc_SystemBanner) {
            console.log("XminigameSDK", "WX showSystemBanner========================");
            this.bannerAd.show();
        }
    }

    /**
     * 刷新系统banner
     */
    updateSystemBanner() {
        // 关闭上一个showBanner产生的定时器
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        this.interval_updateBanner =
            setInterval(() => {
                console.log("XminigameSDK", "WX updateSystemBanner========================");
                this.bannerAd.destroy();
                this.bannerAd = null;
                this.createSystemBanner();
            }, this.NUM_BannerUpdateTime * 1000)
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.bannerAd) {
            console.log("XminigameSDK", "WX hideSystemBanner========================");
            this.bannerAd.hide();
        }
    }

    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters) {
            console.log("XminigameSDK", "WX showSystemInters==================");
            this.systemIntersAd.show();
        }
    }


    /**
     * 点击互推游戏跳转
     */
    jumpToMiniGame(pushGameInfo) {
        // @ts-ignore
        wx.navigateToMiniProgram({
            appId: pushGameInfo.pushGamePackage,
            path: "?foo=bar",
            success(res) {
                ServerCenter.getInstance().collectAdPush(pushGameInfo.pushGamePackage, (suc, res) => {
                    if (suc && res.status == 200) {
                        console.log("XminigameSDK", "statistics success");
                    } else {
                        console.log("XminigameSDK", "statistics fail");
                    }
                });
                // 打开成功
                console.log("XminigameSDK", "WX 跳转成功");
            },
            fail(err) {
                console.log("XminigameSDK", "WX 跳转失败：", JSON.stringify(err));
            }
        })
    }


    /**
     * 插屏间隔计时器
     */
    runIntersInterval() {
        if (this.NUM_IntersIntervalTime > 0) {
            setInterval(() => {
                this.NUM_IntersNowIntervalTime++;
            }, 1000);
        }
    }

}

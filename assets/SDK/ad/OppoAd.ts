import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class OppoAd implements AdInterface {
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
     * 盒子广告ID,互推盒子九宫格广告ID
     */
    ID_Box = "";
    /**
     * 积木广告ID,互推盒子横幅广告ID
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
    NUM_BannerMostShow = 999;

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
    pushGameList = [];






    /**
     * 系统banner广告对象
     */
    bannerAd = null;
    /**
     * banner加载成功(系统banner或者原生banner)
     */
    loadSucc_Banner = false;
    /**
     * 系统banner加载成功
     */
    loadSucc_SystemBanner = false;
    /**
     * 原生banner加载成功
     */
    loadSucc_NativeBanner = false;
    /**
     * 已经调用过showBanner?
     */
    hasShowBanner = false;
    /**
     * 正在展示系统banner
     */
    isShow_SystemBanner = false;
    /**
     * 正在展示原生banner
     */
    isShow_NativeBanner = false;
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
     * 延迟加载视频定时器
     */
    timeout_loadVideo = null;



    /**
     * 原生广告对象
     */
    nativeAd = null;
    /**
     * 自定义原生广告对象
     */
    customNativeAd = null;
    /**
     * 原生icon广告是否加载成功
     */
    loadSucc_NativeIcon = false;
    /**
     * 是否正在展示原生icon
     */
    isShow_NativeIcon = false;
    /**
     * 是否正在展示原生大图
     */
    isShow_NativeImage = false;
    /**
     * 原生大图广告是否加载成功
     */
    loadSucc_NativeImage = false;
    /**
     * 原生广告信息
     */
    nativeAdInfo = null;
    /**
     * 研发获取原生广告信息
     */
    firstNativeAdInfo = null;
    /**
     * 自定义原生广告信息
     */
    customNativeAdInfo = null;
    /**
     * 保存原生icon展示时的位置
     */
    param_nativeIcon = null;
    /**
     * 保存原生大图展示时的位置
     */
    param_nativeImage = null;
    /**
     * 原生icon刷新定时器
     */
    timeout_updateNativeIcon = null;
    /**
     * 原生大图刷新定时器
     */
    timeout_updateNativeImage = null;
    /**
     * 原生icon节点
     */
    node_nativeIcon = null;
    /**
     * 原生大图节点
     */
    node_nativeImage = null;
    /**
     * 已经上报展示的原生广告id
     */
    hasReport_NativeAdId = [""];
    /**
     * 已经上报展示的自定义原生广告id
     */
    hasReport_CustomNativeAdId = [""];

    /**
     * 拉取到的自定义原生广告id
     */
    customNativeAdIdArray = [""];

    /**
     * 其他原生资源
     */
    nativeOtherRes = null;
    /**
     * 其他原生资源是否加载成功
     */
    loadSucc_NativeOther = false;

    /**
     * 原生banner资源
     */
    nativeBannerRes = null;
    /**
     * 原生banner节点
     */
    node_nativeBanner = null;

    /**
     * 原生贴片节点
     */
    node_nativePaster = null;




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
     * 互推盒子横幅广告对象
     */
    navigateBoxBannerAd = null;
    /**
     * 互推盒子横幅广告是否加载成功
     */
    loadSucc_NavigateBoxBanner = false;
    /**
     * 互推盒子九宫格广告对象
     */
    navigateBoxPortalAd = null;
    /**
     * 互推盒子九宫格广告是否加载成功
     */
    loadSucc_NavigateBoxPortal = false;
    /**
     * 临时保存 互推盒子九宫格出现前是否调用过showBanner
     */
    temp_hasShowBanner = false;

    /**
     * 正在展示结算互推(互推盒子)
     */
    isShow_NavigateSettle = false;



    /**
     * 当前已经进入Wuchu视频次数
     */
    NUM_NowErrVideo = 0;
    /**
     * 当前已经调用getErrVideoFlag次数
     */
    NUM_NowGetErrVideoFlag = 0;


    /**
     * 当前已经调用贴片次数
     */
    NUM_NowHasShowPaster = 0;
    /**
     * 当前已经进入wuchu贴片次数
     */
    NUM_NowErrPaster = 0;



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
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        if (this.SW_Box && this.ID_Box != "") this.createNavigateBoxPortal();
        if (this.SW_Box && this.ID_Block != "") this.createNavigateBoxBanner();
        if (this.SW_Native && this.ID_Native != "") {
            this.createNative();
            this.loadNativeOtherRes();
            if (this.SW_NativeBanner) this.loadNativeBannerRes();
        }
        if (this.SW_Native && this.ID_NativeCustom != "") this.createCustomNative();
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {

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
        this.bannerAd = qg.createBannerAd({
            adUnitId: this.ID_SystemBanner,
            style: {}
        })

        this.loadSucc_SystemBanner = true;

        // 监听系统banner错误
        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 系统banner加载/展示失败：", JSON.stringify(err));
        })

        // 监听系统banner隐藏
        this.bannerAd.onHide(() => {
            console.log("XminigameSDK", "OPPO 系统banner关闭", this.NUM_BannerUpdateTime + "S之后再次刷新")
            this.updateBanner();
        })
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
        this.videoAd = qg.createRewardedVideoAd({
            posId: this.ID_Video
        })

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "OPPO 视频广告加载完成");
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "OPPO 视频加载失败：", JSON.stringify(err));
            if (this.videoAd) {
                setTimeout(() => {
                    this.videoAd && this.videoAd.load()
                }, 30 * 1000)
            }
        })

        //监听视频广告播放完成
        this.videoAd.onClose(res => {
            if (res.isEnded) {
                console.log("XminigameSDK", "OPPO 激励视频广告完成，发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(true);
                    this.videoAd.load();
                }
            } else {
                console.log("XminigameSDK", "OPPO 激励视频广告关闭，不发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(false);
                    this.videoAd.load();
                }
            }
        })

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
        this.nativeAd = qg.createNativeAd({
            posId: this.ID_Native
        })

        this.nativeAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null,
        };

        this.firstNativeAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null,
            NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
            NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
        };

        this.nativeAd.onLoad((res) => {

            let index = 0;
            if (typeof res.adList != undefined && res.adList.length != 0) {
                index = res.adList.length - 1;
            } else {
                console.log("XminigameSDK", "OPPO 原生广告列表为空 return");
                return;
            }

            console.log("XminigameSDK", "OPPO 原生广告加载成功：", JSON.stringify(res.adList[index]))

            if (res.adList[index].icon != "" && res.adList[index].imgUrlList.length > 0) {
                console.log("XminigameSDK", "OPPO 原生广告同时存在原生ICON和大图");
            } else {
                console.log("XminigameSDK", "OPPO 原生广告只存在原生ICON或大图");
            }

            this.firstNativeAdInfo.adId = res.adList[index].adId;
            this.firstNativeAdInfo.title = res.adList[index].title;
            this.firstNativeAdInfo.desc = res.adList[index].desc;

            this.nativeAdInfo.adId = res.adList[index].adId;
            this.nativeAdInfo.title = res.adList[index].title;
            this.nativeAdInfo.desc = res.adList[index].desc;


            if (res.adList && res.adList[index].icon != "") {
                let arr = new Array();
                arr[0] = res.adList[index].icon;
                LoadRes.loadResArray(arr, (err, texture) => {
                    if (err) {
                        console.log("XminigameSDK", "OPPO 原生ICON加载失败");
                        this.nativeAdInfo.Native_icon = null;
                        this.loadSucc_NativeIcon = false;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生ICON加载成功");
                    this.nativeAdInfo.Native_icon = texture[0];
                    this.loadSucc_NativeIcon = true;
                });
                this.firstNativeAdInfo.Native_icon = res.adList[index].icon;
            } else {
                this.nativeAdInfo.Native_icon = null;
                this.loadSucc_NativeIcon = false;

                this.firstNativeAdInfo.Native_icon = null;
            }

            if (res.adList && res.adList[index].imgUrlList.length > 0) {
                let arr = new Array();
                arr[0] = res.adList[index].imgUrlList[0];
                LoadRes.loadResArray(arr, (err, texture) => {
                    if (err) {
                        console.log("XminigameSDK", "OPPO 原生大图加载失败");
                        this.nativeAdInfo.Native_BigImage = null;
                        this.loadSucc_NativeImage = false;
                        return;
                    }
                    console.log("XminigameSDK", "OPPO 原生大图加载成功");
                    this.nativeAdInfo.Native_BigImage = texture[0];
                    this.loadSucc_NativeImage = true;
                });
                this.firstNativeAdInfo.Native_BigImage = res.adList[index].imgUrlList[0];
            } else {
                this.nativeAdInfo.Native_BigImage = null;
                this.loadSucc_NativeImage = false;

                this.firstNativeAdInfo.Native_BigImage = null;
            }

        });


        //监听原生广告加载错误
        this.nativeAd.onError(err => {
            console.log("XminigameSDK", "OPPO 原生广告加载失败：", JSON.stringify(err))
        });

        this.nativeAd.load();

        this.nativeAdAutoUpdate();
    }

    /**
     * 创建自定义原生广告
     */
    createCustomNative() {
        console.log("XminigameSDK", "--createCustomNative--");
        if (CheckConfig.stringHasSpace(this.ID_NativeCustom)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道自定义原生广告ID中含有空字符串,请检查后台自定义原生广告ID*********************");
            return;
        }
        if (this.ID_Native == this.ID_NativeCustom) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道原生广告ID和自定义原生广告ID相同,请检查后台原生与自定义原生广告ID*********************");
            return;
        }

        // @ts-ignore
        this.customNativeAd = qg.createNativeAd({
            posId: this.ID_NativeCustom
        })

        this.customNativeAdInfo = {
            adId: null,
            title: null,
            desc: null,
            Native_icon: null,
            Native_BigImage: null,
            NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
            NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
        };

        this.customNativeAd.onLoad((res) => {

            let index = res.adList.length - 1;

            console.log("XminigameSDK", "OPPO 自定义原生广告加载成功：", JSON.stringify(res.adList[index]))

            this.customNativeAdInfo.adId = String(res.adList[index].adId);
            this.customNativeAdInfo.title = String(res.adList[index].title);
            this.customNativeAdInfo.desc = String(res.adList[index].desc);

            this.customNativeAdIdArray.unshift(this.customNativeAdInfo.adId);

            if (res.adList && res.adList[index].icon != "") {
                this.customNativeAdInfo.Native_icon = res.adList[index].icon;
            } else {
                this.customNativeAdInfo.Native_icon = null;
            }

            if (res.adList && res.adList[index].imgUrlList.length > 0) {
                this.customNativeAdInfo.Native_BigImage = res.adList[index].imgUrlList[0];
            } else {
                this.customNativeAdInfo.Native_BigImage = null;
            }

        });


        //监听原生广告加载错误
        this.customNativeAd.onError(err => {
            console.log("XminigameSDK", "OPPO 自定义原生广告加载失败：", JSON.stringify(err))
        });

        this.customNativeAd.load();

        this.customNativeAdAutoUpdate();
    }

    /**
     * 创建互推盒子横幅广告
     */
    createNavigateBoxBanner() {
        console.log("XminigameSDK", "--createNavigateBoxBanner--");
        if (CheckConfig.stringHasSpace(this.ID_Block)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道互推盒子横幅广告ID中含有空字符串,请检查后台互推盒子横幅广告ID*********************");
            return;
        }

        // @ts-ignore
        if (qg.getSystemInfoSync().platformVersionCode < 1076) {
            console.log("XminigameSDK", "OPPO 版本较低,不支持互推盒子广告");
            return;
        }

        // @ts-ignore
        this.navigateBoxBannerAd = qg.createGameBannerAd({
            adUnitId: this.ID_Block
        })

        this.loadSucc_NavigateBoxBanner = true;

        // 监听互推盒子横幅广告加载失败
        this.navigateBoxBannerAd.onError((err) => {
            // this.loadSucc_NavigateBoxBanner = false;
            console.log("XminigameSDK", "OPPO 互推盒子横幅广告出错:", JSON.stringify(err));
        })
    }

    /**
     * 创建互推盒子九宫格广告
     */
    createNavigateBoxPortal() {
        console.log("XminigameSDK", "--createNavigateBoxPortal--");
        if (CheckConfig.stringHasSpace(this.ID_Box)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道互推盒子九宫格广告ID中含有空字符串,请检查后台互推盒子九宫格广告ID*********************");
            return;
        }

        // @ts-ignore
        if (qg.getSystemInfoSync().platformVersionCode < 1076) {
            console.log("XminigameSDK", "OPPO 版本较低,不支持互推盒子广告");
            return;
        }

        // @ts-ignore
        this.navigateBoxPortalAd = qg.createGamePortalAd({
            adUnitId: this.ID_Box
        })

        // 监听互推盒子九宫格广告加载成功
        this.navigateBoxPortalAd.onLoad(() => {
            console.log("XminigameSDK", "OPPO 互推盒子九宫格广告加载完成");
            this.loadSucc_NavigateBoxPortal = true;
        })

        // 监听互推盒子九宫格广告加载失败
        this.navigateBoxPortalAd.onError((err) => {
            console.log("XminigameSDK", "OPPO 互推盒子九宫格广告加载/展示失败：", JSON.stringify(err));
            this.loadSucc_NavigateBoxPortal = false;
            setTimeout(() => {
                this.navigateBoxPortalAd.load();
            }, 20 * 1000);
        })

        // 监听互推盒子九宫格广告关闭
        this.navigateBoxPortalAd.onClose(() => {
            console.log("XminigameSDK", "OPPO 互推盒子九宫格广告关闭");
            // 关闭后再次加载互推盒子九宫格
            this.navigateBoxPortalAd.load();
            // 如果banner在展示时被互推盒子九宫格关闭则再次showBanner
            this.temp_hasShowBanner && this.showBanner();
        })

        this.navigateBoxPortalAd.load();
    }

    /**
     * 加载原生banner广告资源
     */
    loadNativeBannerRes() {
        console.log("XminigameSDK", "--loadNativeBannerRes--");

        this.nativeBannerRes = {
            NativeBannerBg: null,
            NativeBannerButton: null,
            NativeClose: null,
            NativeAdTip: null,
        }

        let nativeBannerResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBannerBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBannerButton.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
        ]

        LoadRes.loadResArray(nativeBannerResArr, (err, texture) => {
            this.nativeBannerRes.NativeBannerBg = texture[0];
            this.nativeBannerRes.NativeBannerButton = texture[1];
            this.nativeBannerRes.NativeClose = texture[2];
            this.nativeBannerRes.NativeAdTip = texture[3];
            this.loadSucc_NativeBanner = true;
            console.log("XminigameSDK", "原生banner资源加载成功");
        })
    }


    /**
     * 加载其他原生广告资源(原生大图、原生ICON的关闭,广告角标)
     */
    loadNativeOtherRes() {
        console.log("XminigameSDK", "--loadNativeOtherRes--");

        this.nativeOtherRes = {
            NativeAdTip: null,
            NativeClose: null,
            NativeButton: null,
            NativeMask: null,
            NativeBlank: null,
        }

        let nativeOtherResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeAdTip.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeClose.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeButton.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeInterMask.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBlank.png",
        ]

        LoadRes.loadResArray(nativeOtherResArr, (err, texture) => {
            this.nativeOtherRes.NativeAdTip = texture[0];
            this.nativeOtherRes.NativeClose = texture[1];
            this.nativeOtherRes.NativeButton = texture[2];
            this.nativeOtherRes.NativeMask = texture[3];
            this.nativeOtherRes.NativeBlank = texture[4];
            this.loadSucc_NativeOther = true;
            console.log("XminigameSDK", "其他原生资源加载成功");
        })

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

        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "OPPO 正在展示互推盒子 return");
            return;
        }

        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        // 已经调用过showBanner
        this.hasShowBanner = true;

        // 两个开关同时打开
        if (this.SW_SystemBanner && this.SW_NativeBanner) {
            if (this.SW_SystemBannerFirst) {
                console.log("XminigameSDK", "系统banner优先");
                if (this.loadSucc_SystemBanner) {
                    this.showSystemBanner();
                } else if (this.loadSucc_NativeBanner) {
                    console.log("XminigameSDK", "系统banner未加载完成,改为展示原生banner");
                    this.showNativeBanner();
                }
            } else {
                console.log("XminigameSDK", "原生banner优先");
                if (this.loadSucc_NativeBanner) {
                    this.showNativeBanner();
                } else if (this.loadSucc_SystemBanner) {
                    console.log("XminigameSDK", "原生banner未加载完成,改为展示系统banner");
                    this.showSystemBanner();
                }
            }
        } else if (this.SW_SystemBanner) {
            this.showSystemBanner();
        } else if (this.SW_NativeBanner) {
            this.showNativeBanner();
        }
        // 刷新Banner
        this.updateBanner();
    }

    hideBanner() {
        this.hasShowBanner = false;
        this.hideNativeBanner();
        this.hideSystemBanner();
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        if (this.SW_AddDesktop && this.SW_IntersIntervalToAddDesktop && this.NUM_AutoAddDeskMostTimes > 0 && this.NUM_IntersToAddDesktopNumber > 0) {
            return true;
        } else {
            console.log("XminigameSDK", "桌面开关未开启或次数未设置");
            return false;
        }
    }

    showInters() {
        this.NUM_hasShowInters++;
        if (this.NUM_hasShowInters == this.NUM_IntersToAddDesktopNumber && this.NUM_IntersNowToAddDesktop < this.NUM_AutoAddDeskMostTimes) {
            this.getAddDesktopFlag((suc) => {
                if (suc) {
                    this.NUM_IntersNowToAddDesktop++;
                    this.NUM_hasShowInters = 0;
                    console.log("XminigameSDK", "插屏变添加桌面");
                    this.addDesktop((res) => { });
                }
            });
        } else {
            console.log("XminigameSDK", "插屏变添加桌面次数未达到或自动弹添加桌面次数已达上限或已成功添加桌面");
        }
    }

    getVideoFlag() {
        if (!this.loadSucc_Video && this.timeout_loadVideo == null) {
            this.timeout_loadVideo =
                setTimeout(() => {
                    if (this.videoAd) this.videoAd.destroy();
                    this.createVideo();
                    this.timeout_loadVideo = null;
                }, 1000);
        }
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        this.callback_Video = videoCallback;
        if (this.videoAd) {
            console.log("XminigameSDK", "OPPO showVideo===========================")
            this.videoAd.show();
            this.loadSucc_Video = false;
        }
    }

    getNativeIconFlag() {
        return this.loadSucc_NativeOther && this.loadSucc_NativeIcon;
    }

    showNativeIcon(width, height, x, y) {
        if (!this.loadSucc_NativeIcon || !this.loadSucc_NativeOther) {
            console.log("XminigameSDK", "原生icon或资源未加载成功 return");
            return;
        }

        if (this.isShow_NativeIcon) {
            console.log("XminigameSDK", "原生icon正在展示中,请勿多次show return");
            return;
        }
        this.isShow_NativeIcon = true;

        this.param_nativeIcon = {
            width: width,
            height: height,
            x: x,
            y: y,
        }

        console.log("XminigameSDK", "showNativeIcon===========================");

        // 上报原生广告展示
        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        let scene = cc.director.getScene();

        this.node_nativeIcon = new cc.Node("node_nativeIcon");
        scene.addChild(this.node_nativeIcon);
        this.node_nativeIcon.addComponent(cc.Sprite);
        this.node_nativeIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeAdInfo.Native_icon);
        this.node_nativeIcon.zIndex = 30000;
        this.node_nativeIcon.width = width;
        this.node_nativeIcon.height = height;
        this.node_nativeIcon.x = x;
        this.node_nativeIcon.y = y;

        if (this.AdGroup != "") this.node_nativeIcon.group = this.AdGroup;

        var NativeAdTip = new cc.Node("NativeAdTip");
        this.node_nativeIcon.addChild(NativeAdTip);
        NativeAdTip.addComponent(cc.Sprite);
        NativeAdTip.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeAdTip);
        NativeAdTip.width = width / 3;
        NativeAdTip.height = NativeAdTip.width / 70 * 34;
        NativeAdTip.x = width / 2 - NativeAdTip.width / 2;
        NativeAdTip.y = height / 2 - NativeAdTip.height / 2;

        var NativeClose = new cc.Node("NativeClose");
        this.node_nativeIcon.addChild(NativeClose);
        NativeClose.addComponent(cc.Sprite);
        NativeClose.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeClose);
        NativeClose.width = 45;
        NativeClose.height = 45;
        NativeClose.x = -this.node_nativeIcon.width / 2 + NativeClose.width / 2;
        NativeClose.y = this.node_nativeIcon.height / 2 - NativeClose.width / 2;

        var titleLabel = new cc.Node("titleLabel");
        this.node_nativeIcon.addChild(titleLabel);
        titleLabel.addComponent(cc.Label);
        if (cc.winSize.width < cc.winSize.height) {
            titleLabel.getComponent(cc.Label).fontSize = 40 * (cc.view.getDesignResolutionSize().width / 1080);
        } else {
            titleLabel.getComponent(cc.Label).fontSize = 40 * (cc.view.getDesignResolutionSize().height / 1080);
        }
        titleLabel.getComponent(cc.Label).lineHeight = titleLabel.getComponent(cc.Label).fontSize;
        titleLabel.color = cc.color(0xFF, 0xFF, 0xFF);
        if (this.nativeAdInfo.title.length <= 5) {
            titleLabel.getComponent(cc.Label).string = this.nativeAdInfo.title;
        } else {
            titleLabel.getComponent(cc.Label).string = "";
        }
        titleLabel.y = -height / 2 - 30;

        //关闭原生ICON广告
        NativeClose.on(cc.Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "手动关闭原生ICON");
            this.node_nativeIcon.removeFromParent();
            this.node_nativeIcon = null;
            event.stopPropagation();
        })

        //点击原生广告
        this.node_nativeIcon.on(cc.Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "点击原生ICON");
            this.reportNativeAdClick(tempid)
        });

        // 刷新原生icon
        this.timeout_updateNativeIcon = setTimeout(() => {
            console.log("XminigameSDK", "原生icon刷新");
            this.hideNativeIcon();
            this.showNativeIcon(this.param_nativeIcon.width, this.param_nativeIcon.height, this.param_nativeIcon.x, this.param_nativeIcon.y);
        }, this.NUM_NativeUpdateTime * 1000);

    }

    hideNativeIcon() {
        if (this.isShow_NativeIcon) {
            console.log("XminigameSDK", "hideNativeIcon===========================");
            this.isShow_NativeIcon = false;
            if (this.timeout_updateNativeIcon) {
                clearTimeout(this.timeout_updateNativeIcon);
            }
            if (this.node_nativeIcon) {
                this.node_nativeIcon.removeFromParent();
                this.node_nativeIcon = null;
            }
        }
    }

    getNativeImageFlag() {
        return this.loadSucc_NativeOther && this.loadSucc_NativeImage;
    }

    showNativeImage(width, height, x, y) {
        if (!this.loadSucc_NativeImage || !this.loadSucc_NativeOther) {
            console.log("XminigameSDK", "原生大图或资源未加载成功 return");
            return;
        }

        if (this.isShow_NativeImage) {
            console.log("XminigameSDK", "原生大图正在展示中,请勿多次show");
            return;
        }
        this.isShow_NativeImage = true;

        this.param_nativeImage = {
            width: width,
            height: height,
            x: x,
            y: y,
        }

        console.log("XminigameSDK", "OPPO showNativeImage===========================");

        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        let scene = cc.director.getScene();

        this.node_nativeImage = new cc.Node("node_nativeImage");
        scene.addChild(this.node_nativeImage);
        this.node_nativeImage.addComponent(cc.Sprite);
        this.node_nativeImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeAdInfo.Native_BigImage);
        this.node_nativeImage.zIndex = 30000;
        this.node_nativeImage.width = width;
        this.node_nativeImage.height = height;
        this.node_nativeImage.x = x;
        this.node_nativeImage.y = y;
        if (this.AdGroup != "") this.node_nativeImage.group = this.AdGroup;

        var NativeAdTip = new cc.Node("NativeAdTip");
        this.node_nativeImage.addChild(NativeAdTip);
        NativeAdTip.addComponent(cc.Sprite);
        NativeAdTip.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeAdTip);
        NativeAdTip.addComponent(cc.Widget);
        NativeAdTip.getComponent(cc.Widget).isAlignLeft = true;
        NativeAdTip.getComponent(cc.Widget).isAlignTop = true;
        NativeAdTip.getComponent(cc.Widget).left = 0;
        NativeAdTip.getComponent(cc.Widget).top = 0;
        NativeAdTip.width = width / 5;
        NativeAdTip.height = NativeAdTip.width / 70 * 34;

        var NativeClose = new cc.Node("NativeClose");
        this.node_nativeImage.addChild(NativeClose);
        NativeClose.addComponent(cc.Sprite);
        NativeClose.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeClose);
        NativeClose.addComponent(cc.Widget);
        NativeClose.getComponent(cc.Widget).isAlignRight = true;
        NativeClose.getComponent(cc.Widget).isAlignTop = true;
        NativeClose.getComponent(cc.Widget).right = 0;
        NativeClose.getComponent(cc.Widget).top = 0;
        NativeClose.width = 45;
        NativeClose.height = 45;

        //关闭原生大图广告
        NativeClose.on(cc.Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "手动关闭原生大图");
            this.hideNativeImage();
            event.stopPropagation();
        })

        //点击原生广告
        this.node_nativeImage.on(cc.Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "点击原生大图");
            this.reportNativeAdClick(tempid);
        });

    }

    hideNativeImage() {
        this.isShow_NativeImage = false;
        if (this.node_nativeImage) {
            this.node_nativeImage.removeFromParent();
            this.node_nativeImage = null;
        }
    }

    getNativePasterFlag() {
        return this.SW_NativePaster && this.loadSucc_NativeOther && this.loadSucc_NativeImage;
    }
    showNativePaster() {
        if (!this.getNativePasterFlag()) return;

        if (this.node_nativePaster != null) {
            this.node_nativePaster.removeFromParent();
            this.node_nativePaster = null;
        }

        console.log("XminigameSDK", "showNativePaster===========================")

        // 上报
        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        let scene = cc.director.getScene();

        this.node_nativePaster = new cc.Node("node_nativePaster");
        scene.addChild(this.node_nativePaster);
        this.node_nativePaster.width = cc.winSize.width;
        this.node_nativePaster.height = cc.winSize.height;
        this.node_nativePaster.x = cc.winSize.width / 2;
        this.node_nativePaster.y = cc.winSize.height / 2;
        this.node_nativePaster.zIndex = 30003;
        if (this.AdGroup != "") this.node_nativePaster.group = this.AdGroup;
        this.node_nativePaster.on(cc.Node.EventType.TOUCH_START, function (event) {
        })

        // 黑色背景
        // let NativeMask = new cc.Node("NativeMask");
        // this.node_nativePaster.addChild(NativeMask);
        // NativeMask.addComponent(cc.Sprite);
        // NativeMask.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeMask);
        // NativeMask.width = this.node_nativePaster.width;
        // NativeMask.height = this.node_nativePaster.height;
        // NativeMask.opacity = 150;

        // 贴片白色底框
        let NativeBlank = new cc.Node("NativeBlank");
        this.node_nativePaster.addChild(NativeBlank);
        NativeBlank.addComponent(cc.Sprite);
        NativeBlank.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeBlank);

        if (cc.winSize.width < cc.winSize.height) {
            NativeBlank.width = this.node_nativePaster.width * 0.96;
            NativeBlank.height = NativeBlank.width / 2;
            NativeBlank.y = NativeBlank.height / 2;

            // 查看广告按钮
            let NativeButton = new cc.Node("NativeButton");
            NativeBlank.addChild(NativeButton);
            NativeButton.addComponent(cc.Sprite);
            NativeButton.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeButton);
            NativeButton.width = NativeBlank.width * 0.5;
            NativeButton.height = NativeButton.width * 0.35;
            NativeButton.y = - NativeBlank.height / 2 - NativeButton.height;

            //点击按钮
            NativeButton.on(cc.Node.EventType.TOUCH_START, (event) => {
                this.node_nativePaster.removeFromParent();
                this.node_nativePaster = null;
                this.reportNativeAdClick(tempid);
            });
        } else {
            NativeBlank.width = this.node_nativePaster.width * 0.48;
            NativeBlank.height = NativeBlank.width / 2;
        }

        // 大图
        let bigImage = new cc.Node("bigImage");
        NativeBlank.addChild(bigImage);
        bigImage.addComponent(cc.Sprite);
        bigImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeAdInfo.Native_BigImage);
        bigImage.width = NativeBlank.width * 0.98;
        bigImage.height = bigImage.width / 2;

        //点击大图
        bigImage.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.reportNativeAdClick(tempid);
            this.node_nativePaster.removeFromParent();
            this.node_nativePaster = null;
        });

        // 广告角标
        let NativeAdTip = new cc.Node("NativeAdTip");
        bigImage.addChild(NativeAdTip);
        NativeAdTip.addComponent(cc.Sprite);
        NativeAdTip.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeAdTip);
        NativeAdTip.width = 70;
        NativeAdTip.height = NativeAdTip.width / 70 * 34;
        NativeAdTip.x = bigImage.width / 2 - NativeAdTip.width / 2;
        NativeAdTip.y = NativeAdTip.height / 2 - bigImage.height / 2;

        // 关闭按钮
        let NativeClose = new cc.Node("NativeClose");
        NativeBlank.addChild(NativeClose);
        NativeClose.addComponent(cc.Sprite);
        NativeClose.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeOtherRes.NativeClose);
        NativeClose.width = bigImage.height / 7;
        NativeClose.height = NativeClose.width;
        NativeClose.x = NativeClose.width - bigImage.width / 2;
        NativeClose.y = bigImage.height / 2 - NativeClose.height;

        //监听点击关闭按钮
        NativeClose.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.node_nativePaster.removeFromParent();
            this.node_nativePaster = null;
            event.stopPropagation();

            this.NUM_NowHasShowPaster++;
            if (this.NUM_NowHasShowPaster == this.NUM_NativePasterErrMust) {
                console.log("XminigameSDK", "p 第" + this.NUM_NativePasterErrMust + "次出现");
                this.reportNativeAdClick(tempid);
                return;
            }
            if (this.NUM_NowErrPaster >= this.NUM_NativePasterErrMost) {
                console.log("XminigameSDK", "已达上限 p");
                return;
            }
            if (this.NUM_NativePasterErrP > 0) {
                let num = Math.floor(Math.random() * 100);
                console.log("XminigameSDK", "Pp", this.NUM_NativePasterErrP, "num", num);
                if (num < this.NUM_NativePasterErrP) {
                    this.NUM_NowErrPaster++;
                    this.reportNativeAdClick(tempid);
                    return;
                }
            }
        });
    }

    getNativeAdInfo(type) {
        if (type == 1) {
            console.log("XminigameSDK", "获取原生广告");
            return this.firstNativeAdInfo;
        } else {
            console.log("XminigameSDK", "获取自定义原生广告");
            return this.customNativeAdInfo;
        }
    }

    reportNativeAdShow(adId) {
        // 如果该id在 拉取到的自定义原生广告id 数组中
        if (this.customNativeAdIdArray.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 该自定义原生广告id是否已上报展示?", this.hasReport_CustomNativeAdId.indexOf(adId) != -1);
            if (this.hasReport_CustomNativeAdId.indexOf(adId) != -1) return;

            console.log("XminigameSDK", "OPPO 自定义原生广告上报展示", adId);
            this.hasReport_CustomNativeAdId.unshift(adId);

            this.customNativeAd.reportAdShow({
                adId: adId
            })
        } else {
            console.log("XminigameSDK", "OPPO 该原生广告id是否已上报展示?", this.hasReport_NativeAdId.indexOf(adId) != -1);
            if (this.hasReport_NativeAdId.indexOf(adId) != -1) return;

            console.log("XminigameSDK", "OPPO 原生广告上报展示", adId);
            this.hasReport_NativeAdId.unshift(adId);

            this.nativeAd.reportAdShow({
                adId: adId
            })
        }
    }

    reportNativeAdClick(adId) {
        // 如果该id在 拉取到的自定义原生广告id 数组中
        if (this.customNativeAdIdArray.indexOf(adId) != -1) {
            console.log("XminigameSDK", "OPPO 自定义原生广告上报点击", adId);
            this.customNativeAd.reportAdClick({
                adId: adId
            })
        } else {
            console.log("XminigameSDK", "OPPO 原生广告上报点击", adId);
            this.nativeAd.reportAdClick({
                adId: adId
            })
        }
    }

    getNavigateIconFlag() {
        return false;
    }
    showNavigateIcon(width, height, x, y) {
    }
    hideNavigateIcon() {
    }

    getNavigateGroupFlag() {
        return false;
    }
    showNavigateGroup(type, side, size, y) {
    }
    hideNavigateGroup() {
    }

    getNavigateSettleFlag() {
        return false;
    }
    showNavigateSettle(type, x, y) {
    }
    hideNavigateSettle() {
    }

    getNavigateBoxBannerFlag() {
        return this.loadSucc_NavigateBoxBanner;
    }

    showNavigateBoxBanner() {
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "已经调用过showNavigateBoxBanner,请勿重复调用");
            return;
        }
        this.isShow_NavigateSettle = true;

        if (this.loadSucc_NavigateBoxBanner) {
            this.hideBanner();
            console.log("XminigameSDK", "showNavigateBoxBanner=====================");
            this.navigateBoxBannerAd.show();
        }
    }

    hideNavigateBoxBanner() {
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "hideNavigateBoxBanner=====================");
            this.isShow_NavigateSettle = false;
            if (this.navigateBoxBannerAd) {
                this.navigateBoxBannerAd.hide()
            }
        }
    }


    getNavigateBoxPortalFlag() {
        return this.loadSucc_NavigateBoxPortal;
    }

    showNavigateBoxPortal() {
        if (this.loadSucc_NavigateBoxPortal) {
            this.temp_hasShowBanner = this.hasShowBanner;
            this.hideBanner();
            this.navigateBoxPortalAd.show();
        }
    }

    setGroup(group) {
        this.AdGroup = group;
    }

    hasAddDesktopFunc() {
        return true;
    }

    getAddDesktopFlag(callback) {
        // @ts-ignore
        qg.hasShortcutInstalled({
            success: (res) => {
                // 判断图标未存在时，创建图标
                if (res == false) {
                    console.log("XminigameSDK", "OPPO 不存在桌面图标");
                    callback(true);
                } else {
                    console.log("XminigameSDK", "OPPO 已存在桌面图标");
                    callback(false);
                }
            },
            fail: (err) => {
                console.log("XminigameSDK", "OPPO qg.hasShortcutInstalled err：", JSON.stringify(err));
                callback(false);
            },
            complete: () => { }
        })
    }

    addDesktop(callback) {
        // @ts-ignore
        qg.installShortcut({
            success: () => {
                console.log("XminigameSDK", "OPPO 添加桌面成功");
                // 执行用户创建图标奖励
                callback(true);
            },
            fail: (err) => {
                console.log("XminigameSDK", "OPPO 添加桌面失败:" + JSON.stringify(err));
                callback(false);
            },
            complete: () => { }
        })
    }

    phoneVibrate(type) {
        if (type == "short") {
            // @ts-ignore
            qg.vibrateShort({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            })
        } else if (type == "long") {
            // @ts-ignore
            qg.vibrateLong({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            })
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
        console.log("XminigameSDK", "OPPO getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "OPPO getUserInfo=====================");
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
        userInfo.power = true;
        callback(userInfo);
    }

    getBoxFlag() {
        return false;
    }
    showAppBox() {
    }

    getBlockFlag() {
        return false;
    }
    showBlock(type, x, y, blockSize) {
    }
    hideBlock() {
    }

    getVideoIntersFlag() {
        return false;
    }
    showVideoInters(callback) {
    }

    exitTheGame() {
    }

    reportAnalytics(params, data) {
    }

    showAuthentication(callback) {
    }

    visitorExperience(callback) {
    }

    showNativeAd(width, height, viewX, viewY) {
    }

    getOPPOShowMoreGameFlag() {
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
        return false;
    }

    showErrBanner(callback) {
        callback(false);
    }

    hideErrBanner() {
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
        if (!this.getVideoFlag()) {
            console.log("XminigameSDK", "OPPO 视频广告未加载完成");
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

        this.loadSucc_Banner = (this.loadSucc_NativeBanner && (this.loadSucc_NativeIcon || this.loadSucc_NativeImage)) || this.loadSucc_SystemBanner;

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
     * 展示原生banner
     */
    showNativeBanner() {
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "OPPO 正在展示互推盒子 return");
            return;
        }

        this.isShow_NativeBanner = true;

        let scene = cc.director.getScene();

        //原生广告id
        let tempid = this.nativeAdInfo.adId;
        this.reportNativeAdShow(tempid);

        console.log("XminigameSDK", "showNativeBanner========================");

        this.node_nativeBanner = new cc.Node("node_nativeBanner");
        scene.addChild(this.node_nativeBanner);
        this.node_nativeBanner.addComponent(cc.Sprite);
        this.node_nativeBanner.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeBannerRes.NativeBannerBg);
        this.node_nativeBanner.addComponent(cc.Widget);
        this.node_nativeBanner.getComponent(cc.Widget).isAlignHorizontalCenter = true;
        this.node_nativeBanner.getComponent(cc.Widget).isAlignBottom = true;
        this.node_nativeBanner.getComponent(cc.Widget).bottom = 0;
        if (cc.winSize.width < cc.winSize.height) {
            this.node_nativeBanner.width = cc.winSize.width;
            this.node_nativeBanner.height = cc.winSize.width * 0.18;
        }
        else {
            this.node_nativeBanner.width = cc.winSize.width / 2;
            this.node_nativeBanner.height = this.node_nativeBanner.width * 0.18;
        }

        if (this.AdGroup != "") this.node_nativeBanner.group = this.AdGroup;
        this.node_nativeBanner.zIndex = 29999;

        this.node_nativeBanner.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.reportNativeAdClick(tempid);
        });

        // 广告
        let adTip = new cc.Node("adTip");
        this.node_nativeBanner.addChild(adTip);
        adTip.addComponent(cc.Sprite);
        adTip.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeBannerRes.NativeAdTip);
        adTip.height = 0.2 * this.node_nativeBanner.height;
        adTip.width = adTip.height / 0.45;
        adTip.x = this.node_nativeBanner.width / 2 - adTip.width / 2;
        adTip.y = this.node_nativeBanner.height / 2 - adTip.height / 2;

        // 点击安装
        let bannerButton = new cc.Node("bannerButton");
        this.node_nativeBanner.addChild(bannerButton);
        bannerButton.addComponent(cc.Sprite);
        bannerButton.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeBannerRes.NativeBannerButton);
        bannerButton.width = this.node_nativeBanner.width * 0.255;
        bannerButton.height = bannerButton.width * 0.351;
        bannerButton.x = this.node_nativeBanner.width / 2 - this.node_nativeBanner.width * 0.185;
        bannerButton.y = 0;

        if (this.loadSucc_NativeImage) {
            // 大图
            let image = new cc.Node("image");
            this.node_nativeBanner.addChild(image);
            image.addComponent(cc.Sprite);
            image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeAdInfo.Native_BigImage);
            image.height = this.node_nativeBanner.height;
            image.width = image.height * 2;
            image.x = image.width / 2 - this.node_nativeBanner.width / 2;
            image.y = 0;
        } else if (this.loadSucc_NativeIcon) {
            // icon
            let icon = new cc.Node("icon");
            this.node_nativeBanner.addChild(icon);
            icon.addComponent(cc.Sprite);
            icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeAdInfo.Native_BigImage);
            icon.height = this.node_nativeBanner.height * 0.8;
            icon.width = icon.height;
            icon.x = icon.width * 0.8 - this.node_nativeBanner.width / 2;
            icon.y = 0;
        }

        // 标题或描述
        let titleLabel = new cc.Node("titleLabel");
        this.node_nativeBanner.addChild(titleLabel);
        titleLabel.addComponent(cc.Label);
        if (cc.winSize.width < cc.winSize.height) {
            titleLabel.getComponent(cc.Label).fontSize = 35 * (cc.view.getDesignResolutionSize().width / 1080);
        } else {
            titleLabel.getComponent(cc.Label).fontSize = 35 * (cc.view.getDesignResolutionSize().height / 1080);
        }
        if (this.nativeAdInfo.desc == "") {
            titleLabel.getComponent(cc.Label).string = this.nativeAdInfo.title;
        } else {
            titleLabel.getComponent(cc.Label).string = this.nativeAdInfo.desc;
        }
        titleLabel.getComponent(cc.Label).overflow = cc.Label.Overflow.CLAMP;
        titleLabel.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        titleLabel.getComponent(cc.Label).verticalAlign = cc.Label.VerticalAlign.CENTER;
        titleLabel.getComponent(cc.Label).lineHeight = titleLabel.getComponent(cc.Label).fontSize;
        titleLabel.color = cc.color(0xFF, 0x00, 0x00);
        titleLabel.width = this.node_nativeBanner.width - this.node_nativeBanner.height * 2 - bannerButton.width - 0.2 * this.node_nativeBanner.height / 0.45;
        titleLabel.height = this.node_nativeBanner.height;
        titleLabel.y = 0;
        titleLabel.x = -this.node_nativeBanner.width / 2 + this.node_nativeBanner.height * 2.1 + titleLabel.width / 2;

        let closeICON = new cc.Node("closeICON");
        this.node_nativeBanner.addChild(closeICON);
        closeICON.addComponent(cc.Sprite);
        closeICON.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeBannerRes.NativeClose);
        closeICON.width = 0.27 * this.node_nativeBanner.height;
        closeICON.height = 0.27 * this.node_nativeBanner.height;
        closeICON.x = -this.node_nativeBanner.width / 2 + closeICON.width / 2;
        closeICON.y = this.node_nativeBanner.height / 2 - closeICON.width / 2;

        let closeButton = new cc.Node("closeButton");
        this.node_nativeBanner.addChild(closeButton);
        closeButton.width = closeICON.height;
        closeButton.height = closeICON.height;
        closeButton.x = -this.node_nativeBanner.width / 2 + closeICON.width / 2;
        closeButton.y = this.node_nativeBanner.height / 2 - closeICON.width / 2;
        closeButton.zIndex = 29999;


        // 监听原生banner关闭
        closeButton.on(cc.Node.EventType.TOUCH_START, (event) => {
            console.log("XminigameSDK", "原生banner关闭", this.NUM_BannerUpdateTime + "S后再次刷新");
            this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            this.updateBanner();
            // 清除触摸事件的冒泡
            event.stopPropagation();
        });

    }


    /**
     * 展示系统banner
     */
    showSystemBanner() {
        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "OPPO 正在展示互推盒子 return");
            return;
        }
        console.log("XminigameSDK", "OPPO showSystemBanner========================");
        this.isShow_SystemBanner = true;
        this.bannerAd.show();
    }


    /**
     * 刷新banner
     */
    updateBanner() {
        if (this.NUM_BannerMostShow <= this.NUM_BannerClose) {
            console.log("XminigameSDK", "banner最大关闭(最多展示)次数", this.NUM_BannerMostShow, " 已达上限 return");
            // 清除banner刷新定时器
            if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
            return;
        }
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);

        // 刷新广告条
        this.interval_updateBanner = setInterval(() => {

            if (this.NUM_BannerMostShow <= this.NUM_BannerClose) {
                console.log("XminigameSDK", "banner最大关闭(最多展示)次数", this.NUM_BannerMostShow, " 已达上限 return");
                // 清除banner刷新定时器
                if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
                return;
            }

            if (this.SW_SystemBanner && this.SW_NativeBanner) {
                if (this.SW_SystemBannerFirst) {
                    console.log("XminigameSDK", "系统banner优先");
                    if (this.loadSucc_SystemBanner) {
                        console.log("XminigameSDK", "刷新系统banner");
                        this.updateSystemBanner();
                    } else if (this.loadSucc_NativeBanner) {
                        console.log("XminigameSDK", "系统banner未加载完成,改为刷新原生banner");
                        this.updateNativeBanner();
                    }
                } else {
                    console.log("XminigameSDK", "原生banner优先");
                    if (this.loadSucc_NativeBanner) {
                        console.log("XminigameSDK", "刷新原生banner");
                        this.updateNativeBanner();
                    } else if (this.loadSucc_SystemBanner) {
                        console.log("XminigameSDK", "原生banner未加载完成,改为刷新系统banner");
                        this.updateSystemBanner();
                    }
                }
            } else if (this.SW_SystemBanner) {
                this.updateSystemBanner();
            } else if (this.SW_NativeBanner) {
                this.updateNativeBanner();
            }
        }, this.NUM_BannerUpdateTime * 1000)

    }


    /**
     * 刷新系统banner
     */
    updateSystemBanner() {
        console.log("XminigameSDK", "OPPO updateSystemBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.showSystemBanner();
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.isShow_SystemBanner && this.bannerAd) {
            console.log("XminigameSDK", "OPPO hideSystemBanner========================");
            this.isShow_SystemBanner = false;
            this.bannerAd.offHide();
            this.bannerAd.hide();
        }
    }


    /**
     * 刷新原生banner
     */
    updateNativeBanner() {
        console.log("XminigameSDK", "OPPO updateNativeBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.showNativeBanner();
    }

    /**
     * 隐藏原生banner
     */
    hideNativeBanner() {
        if (this.isShow_NativeBanner) {
            console.log("XminigameSDK", "OPPO hideNativeBanner========================");
            this.isShow_NativeBanner = false;
            this.node_nativeBanner.removeFromParent();
            this.node_nativeBanner = null;
        }
    }



    /**
     * 原生广告自动刷新
     */
    nativeAdAutoUpdate() {
        setInterval(() => {
            this.nativeAd && this.nativeAd.load();
        }, this.NUM_NativeUpdateTime * 1000)
    }

    /**
     * 自定义原生广告自动刷新
     */
    customNativeAdAutoUpdate() {
        setInterval(() => {
            this.customNativeAd && this.customNativeAd.load();
        }, this.NUM_NativeUpdateTime * 1000)
    }


}

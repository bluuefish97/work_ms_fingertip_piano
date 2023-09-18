import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class HuaweiAd implements AdInterface {
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
    NUM_BannerUpdateTime = 60;
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
    pushGameList = [];









    /**
     * 系统插屏广告对象
     */
    systemIntersAd = null;
    /**
     * 系统插屏是否加载成功
     */
    loadSucc_SystemInters = false;
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
     * banner加载成功(系统banner或者原生banner)
     */
    loadSucc_Banner = false;
    /**
     * 系统banner加载成功
     */
    loadSucc_SystemBanner = false;
    /**
     * 已经调用过showBanner?
     */
    hasShowBanner = false;
    /**
     * 正在展示系统banner
     */
    isShow_SystemBanner = false;
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
     * 原生广告对象
     */
    nativeAd = null;
    /**
     * 已创建原生广告?
     */
    hasCreateNative = false;
    /**
     * 是否拉取的是新的原生广告
     */
    loadSucc_NewNativeAd = false;
    /**
     * 正在展示的原生广告id 0-原生banner 1-原生插屏
     */
    nativeAdShowInfo = ["", ""];
    /**
     * 原生广告信息
     */
    nativeAdInfo = null;



    /**
     * 原生banner资源
     */
    nativeBannerRes = null;
    /**
     * 原生banner拉取的原生广告信息
     */
    res_NativeBannerLoadNative = null;
    /**
     * 原生banner是否加载成功
     */
    loadSucc_NativeBanner = false;
    /**
     * 正在展示原生banner
     */
    isShow_NativeBanner = false;
    /**
     * 原生banner节点
     */
    node_nativeBanner = null;



    /**
     * 原生插屏资源
     */
    nativeIntersRes = null;
    /**
     * 原生插屏拉取的原生广告信息
     */
    res_NativeIntersLoadNative = null;
    /**
     * 原生插屏资源是否加载成功
     */
    loadSucc_NativeInters = false;
    /**
     * 原生插屏节点
     */
    node_nativeInters = null;



    /**
     * 判断这次原生广告加载成功的时候是否展示原生banner
     */
    createNative_NativeBanner = false;
    /**
     * 判断这次原生广告加载成功的时候是否展示原生插屏
     */
    createNative_NativeInters = false;




    /**
     * 隐私协议节点
     */
    node_privacyAgreement = null;
    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;



    /**
     * 广告资源分组
     */
    AdGroup = "";



    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "createAd======================");

        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();

        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        if (this.SW_Native && this.ID_Native != "") {
            this.onGameShow();
            if (this.SW_NativeBanner) this.loadNativeBannerRes();
            if (this.SW_NativeInters) this.loadNativeInterRes();
        }
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
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
        this.systemIntersAd = qg.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        });

        //监听插屏加载完成
        this.systemIntersAd.onLoad((res) => {
            console.log("XminigameSDK", "HW 系统插屏广告加载完成");
            this.systemIntersAd.show();
        })

        //监听插屏广告加载错误
        this.systemIntersAd.onError((err) => {
            console.log("XminigameSDK", "HW 系统插屏加载失败：", JSON.stringify(err));
        })

        //监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            console.log("XminigameSDK", "HW 用户手动关闭系统插屏");
            this.NUM_IntersNowIntervalTime = 0;
        });

        //加载一次
        this.systemIntersAd.load();
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
        let windowWidth = qg.getSystemInfoSync().windowWidth;
        // @ts-ignore
        let windowHeight = qg.getSystemInfoSync().windowHeight;

        // @ts-ignore
        this.bannerAd = qg.createBannerAd({
            adUnitId: this.ID_SystemBanner,
            style: {
                top: windowHeight - 57,
                left: windowWidth < windowHeight ? (windowWidth - 360) / 2 : 0,
                height: 57,
                width: 360
            }
        })

        this.bannerAd.onLoad(() => {
            console.log("XminigameSDK", "HW 系统banner展示成功");
            this.isShow_SystemBanner = true;
        })

        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "HW 系统banner加载错误：", JSON.stringify(err));
        })

        this.bannerAd.onClose(() => {
            console.log("XminigameSDK", "HW 系统banner被用户关闭", this.NUM_BannerUpdateTime, "S后再次刷新");
        })

        if (this.hasShowBanner) {
            this.bannerAd.show();
        }
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
        this.videoAd = hbs.createRewardedVideoAd({
            adUnitId: this.ID_Video,
        });

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "HW 视频广告加载完成");
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "HW 视频加载失败：" + JSON.stringify(err));
            this.loadSucc_Video = false;
            if (this.videoAd) {
                setTimeout(() => {
                    this.videoAd && this.videoAd.load()
                }, 30 * 1000)
            }
        })

        //监听视频广告播放完成
        this.videoAd.onClose(res => {
            if (res.isEnded) {
                console.log("XminigameSDK", "HW 激励视频广告完成，发放奖励");
                if (this.callback_Video) {
                    this.callback_Video(true);
                    this.videoAd.load();
                }
            } else {
                console.log("XminigameSDK", "HW 激励视频广告取消关闭，不发放奖励");
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
        this.nativeAd = hbs.createNativeAd({
            adUnitId: this.ID_Native
        })


        this.nativeAdInfo = {
            adId: null,
            title: "",
            source: "",
            Native_icon: null,
            Native_BigImage: null
        };

        this.hasCreateNative = true;


        this.nativeAd.onLoad((res) => {

            console.log("XminigameSDK", "HW 原生广告加载成功", JSON.stringify(res.adList[0]));

            this.loadSucc_NewNativeAd = true;

            let ad = res.adList[0];

            if (ad.adId != undefined && ad.adId != "") this.nativeAdInfo.adId = ad.adId;
            if (ad.title != undefined && ad.title != "") this.nativeAdInfo.title = ad.title;
            if (ad.source != undefined && ad.source != "") this.nativeAdInfo.source = ad.source;

            if (ad && ad.imgUrlList != undefined && ad.imgUrlList.length > 0) {
                cc.loader.load(ad.imgUrlList[0], (err, texture) => {
                    this.nativeAdInfo.Native_BigImage = texture;
                    if (this.createNative_NativeBanner) {
                        this.createNative_NativeBanner = false;
                        this.res_NativeBannerLoadNative = this.nativeAdInfo;
                        this.showNativeBanner();
                    }
                    else if (this.createNative_NativeInters) {
                        this.createNative_NativeInters = false;
                        this.res_NativeIntersLoadNative = this.nativeAdInfo;
                        this.showNativeInters();
                    }
                });
            } else {
                this.nativeAdInfo.Native_BigImage = null;
            }

        });


        //监听原生广告加载错误
        this.nativeAd.onError(err => {
            console.log("XminigameSDK", "HW 原生广告加载失败：", JSON.stringify(err))
        });

        this.nativeAd.load();
    }
    /**
     * 创建自定义原生广告
     */
    // createCustomNative() {
    //     console.log("XminigameSDK", "--createCustomNative--");
    //     if (CheckConfig.stringHasSpace(this.ID_Native)) {
    //         console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道自定义原生广告ID中含有空字符串,请检查后台自定义原生广告ID*********************");
    //     }

    //     // @ts-ignore
    //     this.customNativeAd = hbs.createNativeAd({
    //         adUnitId: this.ID_NativeCustom
    //     })


    //     this.customNativeAdInfo = {
    //         adId: null,
    //         title: "",
    //         source: "",
    //         Native_icon: null,
    //         Native_BigImage: null
    //     };

    //     this.hasCreateNative = true;

    //     this.customNativeAd.onLoad((res) => {

    //         console.log("XminigameSDK", "HW 自定义原生广告加载成功", JSON.stringify(res.adList[0]));

    //         let ad = res.adList[0];

    //         if (ad.adId != undefined && ad.adId != "") this.customNativeAdInfo.adId = String(ad.title);
    //         if (ad.title != undefined && ad.title != "") this.customNativeAdInfo.title = String(ad.title);
    //         if (ad.source != undefined && ad.source != "") this.customNativeAdInfo.source = String(ad.source);


    //     });


    //     //监听原生广告加载错误
    //     this.customNativeAd.onError(err => {
    //         console.log("XminigameSDK", "HW 原生广告加载失败：", JSON.stringify(err))
    //     });

    //     this.customNativeAd.load();
    // }



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
     * 加载原生插屏广告资源
     */
    loadNativeInterRes() {
        console.log("XminigameSDK", "--loadNativeInterRes--");

        this.nativeIntersRes = {
            NativeInterMask: null,
            NativeIntersBg: null,
            NativeIntersButton: null,
            NativeIntersClose: null,
            NativeIntersAdTip: null,
        }

        let nativeIntersResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/BlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/Bg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/Button.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/Close.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/NativeInters2/AdTip.png",
        ]

        LoadRes.loadResArray(nativeIntersResArr, (err, texture) => {
            this.nativeIntersRes.NativeInterMask = texture[0];
            this.nativeIntersRes.NativeIntersBg = texture[1];
            this.nativeIntersRes.NativeIntersButton = texture[2];
            this.nativeIntersRes.NativeIntersClose = texture[3];
            this.nativeIntersRes.NativeIntersAdTip = texture[4];
            this.loadSucc_NativeInters = true;
            console.log("XminigameSDK", "原生插屏资源加载成功");
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

        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        // 已经调用过showBanner
        this.hasShowBanner = true;

        this.loadSucc_SystemBanner = this.SW_SystemBanner && this.ID_SystemBanner != "";

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
        // // 防止非预加载导致无法关闭
        // if (this.hasShowBanner) {
        // }
        this.hasShowBanner = false;
        this.hideNativeBanner();
        this.hideSystemBanner();
        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
        if (this.timeout_checkBannerLoadSucc) clearTimeout(this.timeout_checkBannerLoadSucc);
    }

    getIntersFlag() {
        return this.loadSucc_NativeInters || (this.SW_AddDesktop && this.NUM_AutoAddDeskMostTimes > 0) || this.ID_SystemInters != "";
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
        // 两个开关都打开的情况
        if (this.SW_SystemInters && this.SW_NativeInters) {
            // 系统插屏优先
            if (Math.floor(Math.random() * 100) >= this.NUM_NativeIntersP) {
                console.log("XminigameSDK", "系统插屏优先");
                if (this.ID_SystemInters != "") {
                    console.log("XminigameSDK", "系统插屏可以展示");
                    //有插屏延迟的情况下延迟展示插屏
                    if (this.NUM_IntersDelayTime > 0) {
                        let random = Math.floor(Math.random() * 100);
                        if (random < this.NUM_IntersDelayP) {
                            console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                            setTimeout(() => {
                                this.showSystemInters();
                            }, this.NUM_IntersDelayTime)
                        } else {
                            this.showSystemInters();
                        }
                    }
                    else {
                        this.showSystemInters();
                    }
                }
                else {
                    console.log("XminigameSDK", "系统插屏没有加载完成");
                    if (this.loadSucc_NativeInters) {
                        console.log("XminigameSDK", "改为展示原生插屏");
                        //有插屏延迟的情况下延迟展示插屏
                        if (this.NUM_IntersDelayTime > 0) {
                            let random = Math.floor(Math.random() * 100);
                            if (random < this.NUM_IntersDelayP) {
                                console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                                setTimeout(() => {
                                    this.showNativeInters();
                                }, this.NUM_IntersDelayTime)
                            } else {
                                this.showNativeInters();
                            }
                        }
                        else {
                            this.showNativeInters();
                        }
                    }
                }
            }
            else {
                console.log("XminigameSDK", "原生插屏优先");
                if (this.loadSucc_NativeInters) {
                    console.log("XminigameSDK", "原生插屏可以展示");
                    //有插屏延迟的情况下延迟展示插屏
                    if (this.NUM_IntersDelayTime > 0) {
                        let random = Math.floor(Math.random() * 100);
                        if (random < this.NUM_IntersDelayP) {
                            console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                            setTimeout(() => {
                                this.showNativeInters();
                            }, this.NUM_IntersDelayTime)
                        } else {
                            this.showNativeInters();
                        }
                    }
                    else {
                        this.showNativeInters();
                    }
                }
                else {
                    console.log("XminigameSDK", "原生插屏没有加载到");
                    if (this.ID_SystemInters != "") {
                        console.log("XminigameSDK", "改为展示系统插屏");
                        //有插屏延迟的情况下延迟展示插屏
                        if (this.NUM_IntersDelayTime > 0) {
                            let random = Math.floor(Math.random() * 100);
                            if (random < this.NUM_IntersDelayP) {
                                console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                                setTimeout(() => {
                                    this.showSystemInters();
                                }, this.NUM_IntersDelayTime)
                            } else {
                                this.showSystemInters();
                            }
                        }
                        else {
                            this.showSystemInters();
                        }
                    }
                }

            }
        }
        // 只打开了系统插屏开关的情况
        else if (this.SW_SystemInters) {
            console.log("XminigameSDK", "只打开了系统插屏");
            //有插屏延迟的情况下延迟展示插屏
            if (this.NUM_IntersDelayTime > 0) {
                let random = Math.floor(Math.random() * 100);
                if (random < this.NUM_IntersDelayP) {
                    console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                    setTimeout(() => {
                        this.showSystemInters();
                    }, this.NUM_IntersDelayTime)
                } else {
                    this.showSystemInters();
                }
            }
            else {
                this.showSystemInters();
            }
        }
        // 只打开了原生插屏的情况
        else if (this.SW_NativeInters) {
            console.log("XminigameSDK", "只打开了原生插屏");
            if (this.loadSucc_NativeInters) {
                //有插屏延迟的情况下延迟展示插屏
                if (this.NUM_IntersDelayTime > 0) {
                    let random = Math.floor(Math.random() * 100);
                    if (random < this.NUM_IntersDelayP) {
                        console.log("XminigameSDK", "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
                        setTimeout(() => {
                            this.showNativeInters();
                        }, this.NUM_IntersDelayTime)
                    } else {
                        this.showNativeInters();
                    }
                }
                else {
                    this.showNativeInters();
                }
            }
        }
        // 两个插屏开关都没有打开
        else {
            console.log("XminigameSDK", "系统插屏开关和原生插屏开关都没有打开");
        }

    }

    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            console.log("XminigameSDK", "HW showVideo========================");
            this.callback_Video = videoCallback;
            this.videoAd.show();
        }
    }

    getNativeIconFlag() {
        return false;
    }
    showNativeIcon(width, height, x, y) {
    }
    hideNativeIcon() {
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
    }
    reportNativeAdShow(adId) {
        console.log("XminigameSDK", "HW 原生广告上报展示", "广告ID为:" + adId);
        this.nativeAd.reportAdShow({
            adId: adId
        })
    }
    reportNativeAdClick(adId) {
        console.log("XminigameSDK", "HW 原生广告上报点击", "广告ID为:" + adId);
        this.nativeAd.reportAdClick({
            adId: adId
        })
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
        return true;
    }

    getAddDesktopFlag(callback) {
        // @ts-ignore
        hbs.hasInstalled({
            success: function (res) {
                if (res) {
                    console.log("XminigameSDK", "HW 已创建桌面图标");
                    callback(false);
                } else {
                    console.log("XminigameSDK", "HW 未创建桌面图标");
                    callback(true);
                }
            },
            fail: function (data) {
                console.log("XminigameSDK", "HW 添加桌面未知错误:" + data);
                callback(false);
            }
        })
    }

    addDesktop(callback) {
        // @ts-ignore
        hbs.install({
            success: function (res) {
                console.log("XminigameSDK", "HW 添加桌面成功");
                callback(true);
            },
            fail: function (erromsg, errocode) {
                console.log("XminigameSDK", "HW 添加桌面失败:" + JSON.stringify(erromsg));
                callback(false);
            }
        });
    }

    phoneVibrate(type) {
    }

    startGameVideo(duration) {
    }
    pauseGameVideo() {
    }
    resumeGameVideo() {
    }
    stopGameVideo(callback) {
        callback(null);
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        callback(null);
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
        console.log("XminigameSDK", "HW getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "HW getUserInfo=====================");
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: false
        }
        // @ts-ignore
        hbs.authorize({
            scope: 'userInfo',
            params: {
                appid: GetConfig.getAppId(),
                type: "token",
                scope: 'scope.baseProfile',
                state: "200"
            },
            success: (res) => {
                console.log("XminigameSDK", "HW authorize success", res);
                userInfo.name = res.nickname;
                if (res.avatar.default != undefined) userInfo.head = res.avatar.default;
                userInfo.power = true;
                LocalStorage.setData("avatarUrl", userInfo.head);
                LocalStorage.setData("nickName", userInfo.name);
                callback(userInfo);
            },
            fail: () => {
                console.log("XminigameSDK", "HW authorize fail");
                userInfo.power = false;
                callback(userInfo);
            },
        })
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

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) {
        if (this.isShow_PrivacyAgreement) {
            console.log("XminigameSDK", "已经调用过showPrivacyAgreement,请勿重复调用");
            return;
        }
        this.isShow_PrivacyAgreement = true;

        console.log("XminigameSDK", "HW showPrivacyAgreement==================");

        if (companyLogUrl == "") companyLogUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/companyLogUrl_Xplay.png";
        if (htmlUrl == "") htmlUrl = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/htmlUrl_Xplay.html";

        let privacyAgreementResArr = [
            companyLogUrl,
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/PrivacyAgreementBtn.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/Agree.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/PrivacyAgreement/Close.png",
        ]

        LoadRes.loadResArray(privacyAgreementResArr, (err, texture) => {
            let scene = cc.director.getScene();

            this.node_privacyAgreement = new cc.Node("node_privacyAgreement");
            scene.addChild(this.node_privacyAgreement);
            this.node_privacyAgreement.x = cc.winSize.width / 2;
            this.node_privacyAgreement.y = cc.winSize.height / 2;
            if (cc.winSize.width < cc.winSize.height) {
                this.node_privacyAgreement.scale = cc.view.getDesignResolutionSize().width / 1080;
            } else {
                this.node_privacyAgreement.scale = cc.view.getDesignResolutionSize().height / 1080;
            }
            if (this.AdGroup != "") this.node_privacyAgreement.group = this.AdGroup;
            this.node_privacyAgreement.zIndex = 30000;

            let main = new cc.Node("main");
            this.node_privacyAgreement.addChild(main);
            main.addComponent(cc.Sprite);
            main.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            main.x = 0;
            main.y = 0;

            let privacyAgreementBtn = new cc.Node("privacyAgreementBtn");
            main.addChild(privacyAgreementBtn);
            privacyAgreementBtn.addComponent(cc.Sprite);
            privacyAgreementBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
            privacyAgreementBtn.addComponent(cc.Widget);
            privacyAgreementBtn.getComponent(cc.Widget).isAlignRight = true;
            privacyAgreementBtn.getComponent(cc.Widget).right = 236;
            privacyAgreementBtn.getComponent(cc.Widget).isAlignBottom = true;
            privacyAgreementBtn.getComponent(cc.Widget).bottom = 207;

            let agree = new cc.Node("agree");
            main.addChild(agree);
            agree.addComponent(cc.Sprite);
            agree.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[2]);
            agree.addComponent(cc.Widget);
            agree.getComponent(cc.Widget).isAlignRight = true;
            agree.getComponent(cc.Widget).right = 23;
            agree.getComponent(cc.Widget).isAlignBottom = true;
            agree.getComponent(cc.Widget).bottom = 50.5;

            let close = new cc.Node("close");
            main.addChild(close);
            close.addComponent(cc.Sprite);
            close.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[3]);
            close.addComponent(cc.Widget);
            close.getComponent(cc.Widget).isAlignLeft = true;
            close.getComponent(cc.Widget).left = 24.5;
            close.getComponent(cc.Widget).isAlignBottom = true;
            close.getComponent(cc.Widget).bottom = 51.5;


            // 监听用户点击隐私协议
            privacyAgreementBtn.on(cc.Node.EventType.TOUCH_END, () => {
                // @ts-ignore
                hbs.openDeeplink({
                    uri: htmlUrl
                })
            })

            // 监听用户点击同意
            agree.on(cc.Node.EventType.TOUCH_END, () => {
                this.hidePrivacyAgreement();
                callback(true);
            })

            // 监听用户点击关闭
            close.on(cc.Node.EventType.TOUCH_END, () => {
                this.hidePrivacyAgreement();
                callback(false);
            })
        })
    }

    getErrBannerFlag() {
        return false;
    }

    showErrBanner(callback) {
        callback(false);
    }

    hideErrBanner() {
    }

    getErrVideoFlag() {
        return false;
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

        this.loadSucc_SystemBanner = this.SW_SystemBanner && this.ID_SystemBanner != "";

        this.loadSucc_Banner = this.loadSucc_NativeBanner || this.loadSucc_SystemBanner;

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
        this.createNative_NativeBanner = true;

        // 如果还未创建原生广告
        if (!this.hasCreateNative) {
            this.createNative();
            return;
        }
        // 如果已经创建了原生广告 并且已经拉取新的原生广告
        else if (this.loadSucc_NewNativeAd) {
            this.loadSucc_NewNativeAd = false;
            this.createNative_NativeBanner = false;
        }
        // 未拉取新的原生广告
        else {
            this.loadNewNative();
            return;
        }

        this.isShow_NativeBanner = true;

        let scene = cc.director.getScene();

        console.log("XminigameSDK", "showNativeBanner========================");

        //原生广告id
        let tempid = this.res_NativeBannerLoadNative.adId;
        this.reportNativeAdShow(tempid);

        this.nativeAdShowInfo[0] = tempid;

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
            console.log("XminigameSDK", "原生banner关闭", this.NUM_BannerUpdateTime + "S后再次刷新");
            this.hideNativeBanner();
            // 广告关闭统计
            this.NUM_BannerClose++;
            this.updateBanner();
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
        bannerButton.active = false;
        bannerButton.addComponent(cc.Sprite);
        bannerButton.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeBannerRes.NativeBannerButton);
        bannerButton.width = this.node_nativeBanner.width * 0.255;
        bannerButton.height = bannerButton.width * 0.351;
        bannerButton.x = this.node_nativeBanner.width / 2 - this.node_nativeBanner.width * 0.185;
        bannerButton.y = 0;

        // 大图
        let image = new cc.Node("image");
        this.node_nativeBanner.addChild(image);
        image.addComponent(cc.Sprite);
        image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.res_NativeBannerLoadNative.Native_BigImage);
        image.height = this.node_nativeBanner.height;
        image.width = image.height * 2;
        image.x = image.width / 2 - this.node_nativeBanner.width / 2;
        image.y = 0;

        // 标题或描述
        let titleLabel = new cc.Node("titleLabel");
        this.node_nativeBanner.addChild(titleLabel);
        titleLabel.addComponent(cc.Label);
        if (cc.winSize.width < cc.winSize.height) {
            titleLabel.getComponent(cc.Label).fontSize = 35 * (cc.view.getDesignResolutionSize().width / 1080);
        } else {
            titleLabel.getComponent(cc.Label).fontSize = 35 * (cc.view.getDesignResolutionSize().height / 1080);
        }
        if (this.res_NativeBannerLoadNative.source == "") {
            titleLabel.getComponent(cc.Label).string = this.res_NativeBannerLoadNative.title;
        } else {
            titleLabel.getComponent(cc.Label).string = this.res_NativeBannerLoadNative.source;
        }
        titleLabel.getComponent(cc.Label).overflow = cc.Label.Overflow.CLAMP;
        titleLabel.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        titleLabel.getComponent(cc.Label).verticalAlign = cc.Label.VerticalAlign.CENTER;
        titleLabel.getComponent(cc.Label).lineHeight = titleLabel.getComponent(cc.Label).fontSize;
        titleLabel.color = cc.color(0xFF, 0x00, 0x00);
        titleLabel.width = this.node_nativeBanner.width - image.width - bannerButton.width - 0.2 * this.node_nativeBanner.height / 0.45;
        titleLabel.height = this.node_nativeBanner.height;
        titleLabel.y = 0;
        titleLabel.x = -this.node_nativeBanner.width / 2 + this.node_nativeBanner.height * 2.2 + titleLabel.width / 2;

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
        console.log("XminigameSDK", "HW showSystemBanner========================");
        this.createSystemBanner();
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

            this.loadSucc_SystemBanner = this.SW_SystemBanner && this.ID_SystemBanner != "";

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
        console.log("XminigameSDK", "HW updateSystemBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.createSystemBanner();
    }

    /**
     * 隐藏系统banner
     */
    hideSystemBanner() {
        if (this.isShow_SystemBanner) {
            console.log("XminigameSDK", "HW hideSystemBanner========================");
            this.isShow_SystemBanner = false;
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
    }


    /**
     * 刷新原生banner
     */
    updateNativeBanner() {
        console.log("XminigameSDK", "HW updateNativeBanner========================");
        this.hideNativeBanner();
        this.hideSystemBanner();
        this.showNativeBanner();
    }

    /**
     * 隐藏原生banner
     */
    hideNativeBanner() {
        if (this.isShow_NativeBanner) {
            console.log("XminigameSDK", "HW hideNativeBanner========================");
            this.isShow_NativeBanner = false;
            this.nativeAdShowInfo[0] = "";
            if (this.node_nativeBanner) {
                this.node_nativeBanner.removeFromParent();
                this.node_nativeBanner = null;
            }
        }
    }


    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.ID_SystemInters == "") {
            console.log("XminigameSDK", "HW 插屏未加载完成或后台系统插屏广告id为空");
            return;
        }
        console.log("XminigameSDK", "HW showSystemInters========================");
        if (this.systemIntersAd) {
            this.systemIntersAd.load();
        } else {
            this.createSystemInters();
        }
    }


    /**
     * 展示原生插屏
     */
    showNativeInters() {
        this.createNative_NativeInters = true;

        // 如果还未创建原生广告
        if (!this.hasCreateNative) {
            this.createNative();
            return;
        }
        // 如果已经创建了原生广告 并且已经拉取新的原生广告
        else if (this.loadSucc_NewNativeAd) {
            this.loadSucc_NewNativeAd = false;
            this.createNative_NativeInters = false;
        }
        // 未拉取新的原生广告
        else {
            this.loadNewNative();
            return;
        }

        let scene = cc.director.getScene();

        console.log("XminigameSDK", "showNativeInters========================");

        //原生广告id
        let tempid = this.res_NativeIntersLoadNative.adId;
        this.reportNativeAdShow(tempid);

        this.nativeAdShowInfo[1] = tempid;

        // 插屏节点的背景
        this.node_nativeInters = new cc.Node("node_nativeInters");
        scene.addChild(this.node_nativeInters);
        this.node_nativeInters.zIndex = 30003;
        this.node_nativeInters.width = 2560;
        this.node_nativeInters.height = 2560;
        this.node_nativeInters.x = cc.winSize.width / 2;
        this.node_nativeInters.y = cc.winSize.height / 2;
        if (this.AdGroup != "") this.node_nativeInters.group = this.AdGroup;
        this.node_nativeInters.on(cc.Node.EventType.TOUCH_START, function (event) {
        })

        let NativeInterMask = new cc.Node("NativeInterMask");
        this.node_nativeInters.addChild(NativeInterMask);
        NativeInterMask.addComponent(cc.Sprite);
        NativeInterMask.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeIntersRes.NativeInterMask);
        NativeInterMask.width = this.node_nativeInters.width;
        NativeInterMask.height = this.node_nativeInters.height;
        NativeInterMask.opacity = 150;

        let NativeIntersBg = new cc.Node("NativeIntersBg");
        this.node_nativeInters.addChild(NativeIntersBg);
        NativeIntersBg.addComponent(cc.Sprite);
        NativeIntersBg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeIntersRes.NativeIntersBg);

        if (cc.winSize.width < cc.winSize.height) {
            NativeIntersBg.width = cc.winSize.width * 0.95;
            NativeIntersBg.height = NativeIntersBg.width * 0.65;
            NativeIntersBg.y = cc.winSize.height * 0.05;

            // 查看广告按钮
            let NativeIntersButton = new cc.Node("NativeIntersButton");
            NativeIntersBg.addChild(NativeIntersButton);
            NativeIntersButton.addComponent(cc.Sprite);
            NativeIntersButton.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeIntersRes.NativeIntersButton);
            NativeIntersButton.width = NativeIntersBg.width * 0.6;
            NativeIntersButton.height = NativeIntersButton.width * 0.25;
            NativeIntersButton.y = -NativeIntersBg.height / 2 - NativeIntersButton.height / 2 - NativeIntersButton.height * 0.3;

            //点击原生插屏
            NativeIntersButton.on(cc.Node.EventType.TOUCH_START, (event) => {
                this.reportNativeAdClick(tempid);
                this.nativeAdShowInfo[1] = "";
                this.node_nativeInters.removeFromParent();
                this.node_nativeInters = null;
                this.NUM_IntersNowIntervalTime = 0;
            });
        }
        // 横屏
        else {
            NativeIntersBg.height = cc.winSize.height * 0.6;
            NativeIntersBg.width = NativeIntersBg.height * 1.5;
            NativeIntersBg.y = cc.winSize.height * 0.1;

            // 查看广告按钮
            let NativeIntersButton = new cc.Node("NativeIntersButton");
            NativeIntersBg.addChild(NativeIntersButton);
            NativeIntersButton.addComponent(cc.Sprite);
            NativeIntersButton.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeIntersRes.NativeIntersButton);
            NativeIntersButton.width = NativeIntersBg.width * 0.6;
            NativeIntersButton.height = NativeIntersButton.width * 0.25;
            NativeIntersButton.y = -NativeIntersBg.height / 2 - NativeIntersButton.height / 2 - NativeIntersButton.height * 0.3;

            //点击原生插屏
            NativeIntersButton.on(cc.Node.EventType.TOUCH_START, (event) => {
                this.reportNativeAdClick(tempid);
                this.nativeAdShowInfo[1] = "";
                this.node_nativeInters.removeFromParent();
                this.node_nativeInters = null;
                this.NUM_IntersNowIntervalTime = 0;
            });
        }

        //点击原生插屏
        NativeIntersBg.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.reportNativeAdClick(tempid);
            this.nativeAdShowInfo[1] = "";
            this.node_nativeInters.removeFromParent();
            this.node_nativeInters = null;
            this.NUM_IntersNowIntervalTime = 0;
        });

        // 来源文字
        let sourceLabel = new cc.Node("sourceLabel");
        NativeIntersBg.addChild(sourceLabel);
        sourceLabel.addComponent(cc.Label);
        if (cc.winSize.width < cc.winSize.height) {
            sourceLabel.getComponent(cc.Label).fontSize = 30 * (cc.view.getDesignResolutionSize().width / 1080);
        } else {
            sourceLabel.getComponent(cc.Label).fontSize = 30 * (cc.view.getDesignResolutionSize().height / 1080);
        }
        sourceLabel.getComponent(cc.Label).overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        sourceLabel.getComponent(cc.Label).string = this.res_NativeIntersLoadNative.source;
        sourceLabel.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        sourceLabel.getComponent(cc.Label).lineHeight = sourceLabel.getComponent(cc.Label).fontSize;
        sourceLabel.color = cc.Color.RED;
        sourceLabel.width = NativeIntersBg.width * 0.2;
        sourceLabel.height = NativeIntersBg.height * 0.2;
        sourceLabel.x = sourceLabel.width / 2 - NativeIntersBg.width / 2;
        sourceLabel.y = NativeIntersBg.height / 2 - sourceLabel.height * 0.6;

        // 标题文字
        let titleLabel = new cc.Node("titleLabel");
        NativeIntersBg.addChild(titleLabel);
        titleLabel.addComponent(cc.Label);
        if (cc.winSize.width < cc.winSize.height) {
            titleLabel.getComponent(cc.Label).fontSize = 70 * (cc.view.getDesignResolutionSize().width / 1080);
        } else {
            titleLabel.getComponent(cc.Label).fontSize = 70 * (cc.view.getDesignResolutionSize().height / 1080);
        }
        if (this.res_NativeIntersLoadNative.title.length >= 6) this.res_NativeIntersLoadNative.title = this.res_NativeIntersLoadNative.title.substring(0, 10);
        titleLabel.getComponent(cc.Label).string = this.res_NativeIntersLoadNative.title;
        titleLabel.getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        titleLabel.getComponent(cc.Label).overflow = cc.Label.Overflow.SHRINK;
        titleLabel.getComponent(cc.Label).lineHeight = titleLabel.getComponent(cc.Label).fontSize;
        titleLabel.color = cc.color(0xFF, 0xFF, 0xFF);
        titleLabel.width = NativeIntersBg.width * 0.8;
        titleLabel.height = NativeIntersBg.width * 0.2;
        titleLabel.y = NativeIntersBg.height / 2 - titleLabel.height / 2 - NativeIntersBg.height * 0.05;

        // 大图
        console.log("XminigameSDK", "原生插屏广告大图展示");
        let bigImage = new cc.Node("bigImage");
        NativeIntersBg.addChild(bigImage);
        bigImage.addComponent(cc.Sprite);
        bigImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.res_NativeIntersLoadNative.Native_BigImage);
        bigImage.width = NativeIntersBg.width * 0.95;
        bigImage.height = bigImage.width * 0.5;
        bigImage.y = bigImage.height / 2 - NativeIntersBg.height * 0.47;

        // 广告角标
        let NativeIntersAdTip = new cc.Node("NativeIntersAdTip");
        NativeIntersBg.addChild(NativeIntersAdTip);
        NativeIntersAdTip.addComponent(cc.Sprite);
        NativeIntersAdTip.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeIntersRes.NativeIntersAdTip);
        NativeIntersAdTip.width = NativeIntersBg.width * 0.08;
        NativeIntersAdTip.height = NativeIntersAdTip.width * 0.53;
        NativeIntersAdTip.x = NativeIntersAdTip.width / 2 - NativeIntersBg.width / 2;
        NativeIntersAdTip.y = NativeIntersAdTip.height / 2 - NativeIntersBg.height / 2;

        // 关闭按钮
        let NativeIntersClose = new cc.Node("NativeIntersClose");
        NativeIntersBg.addChild(NativeIntersClose);
        NativeIntersClose.addComponent(cc.Sprite);
        NativeIntersClose.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.nativeIntersRes.NativeIntersClose);
        NativeIntersClose.zIndex = 30010;
        NativeIntersClose.x = NativeIntersBg.width / 2 - NativeIntersClose.width / 2 * 1.25 * NativeIntersBg.width / 914;
        NativeIntersClose.y = NativeIntersBg.height / 2 - NativeIntersClose.width / 2 * 1.25 * NativeIntersBg.width / 914;
        NativeIntersClose.width = NativeIntersBg.width / 15;
        NativeIntersClose.height = NativeIntersClose.width;

        // 关闭插屏
        NativeIntersClose.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.NUM_IntersNowIntervalTime = 0;
            this.nativeAdShowInfo[1] = "";
            this.node_nativeInters.removeFromParent();
            this.node_nativeInters = null;
            event.stopPropagation();
        });
    }


    /**
     * 拉取新的原生广告
     */
    loadNewNative() {
        this.nativeAd && this.nativeAd.load();
    }

    /**
     * 拉取新的自定义原生广告
     */
    // loadNewCustomNative() {
    //     this.customNativeAd && this.customNativeAd.load();
    // }

    /**
     * 关闭隐私协议
     */
    hidePrivacyAgreement() {
        if (this.isShow_PrivacyAgreement) {
            console.log("XminigameSDK", "hidePrivacyAgreement========================");
            this.isShow_PrivacyAgreement = false;
            if (this.node_privacyAgreement) {
                this.node_privacyAgreement.removeFromParent();
                this.node_privacyAgreement = null;
            }
        }
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


    /**
     * 监听游戏进入前台
     */
    onGameShow() {
        // @ts-ignore
        hbs.onShow(() => {
            console.log("XminigameSDK", "HW 游戏回到前台,是否有原生广告展示中:", this.nativeAdShowInfo[0] != "" || this.nativeAdShowInfo[1] != "");
            if (this.nativeAdShowInfo[0] != "") {
                this.reportNativeAdShow(this.nativeAdShowInfo[0]);
            }
            if (this.nativeAdShowInfo[1] != "") {
                this.reportNativeAdShow(this.nativeAdShowInfo[1]);
            }
        });
    }

}

import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class XiaomiAd implements AdInterface {
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
     * 视频广告是否正在播放
     */
    isShow_Video = false;




    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK " + GetConfig.getChannelName() + " createAd======================");

        if (this.SW_SystemInters && this.ID_SystemInters != "") this.createSystemInters();
        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();

        if (this.SW_Video && this.ID_Video != "") this.createVideo();
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
        console.log("XminigameSDK " + "--createSystemInters--");
        if (CheckConfig.stringHasSpace(this.ID_SystemInters)) {
            console.log("XminigameSDK " + "channelId:" + GetConfig.getChannelId() + " 当前渠道系统插屏广告ID中含有空字符串,请检查后台系统插屏广告ID*********************");
            return;
        }

        // @ts-ignore
        this.systemIntersAd = qg.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        });

        //监听插屏广告加载完成
        this.systemIntersAd.onLoad(() => {
            console.log("XminigameSDK " + "XM 插屏广告加载完成")
            this.loadSucc_SystemInters = true
        })

        //监听插屏广告加载出错
        this.systemIntersAd.onError(err => {
            console.log("XminigameSDK " + "XM 插屏广告加载失败：" + JSON.stringify(err))
            this.loadSucc_SystemInters = false;
            setTimeout(() => {
                this.systemIntersAd && this.systemIntersAd.load()
            }, 30 * 1000)
        })

        //监听插屏广告关闭
        this.systemIntersAd.onClose(() => {
            console.log("XminigameSDK " + "XM 系统插屏广告关闭");
            this.NUM_IntersNowIntervalTime = 0;
            this.loadSucc_SystemInters = false;
            // 系统插屏关闭后10s后再次load
            setTimeout(() => {
                this.createSystemInters();
            }, 10 * 1000);
        })
    }

    /**
     * 创建视频广告
     */
    createVideo() {
        console.log("XminigameSDK " + "--createVideo--");
        if (CheckConfig.stringHasSpace(this.ID_Video)) {
            console.log("XminigameSDK " + "channelId:" + GetConfig.getChannelId() + " 当前渠道视频广告ID中含有空字符串,请检查后台视频广告ID*********************");
            return;
        }

        // @ts-ignore
        this.videoAd = qg.createRewardedVideoAd({
            adUnitId: this.ID_Video
        });

        //监听视频广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK " + "XM 视频广告加载完成")
            this.loadSucc_Video = true;
        })

        //监听视频广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK " + "XM 视频广告加载失败：" + JSON.stringify(err))
            this.loadSucc_Video = false;
            setTimeout(() => {
                this.videoAd && this.videoAd.load()
            }, 30 * 1000)
        })

        //监听视频广告播放完成
        this.videoAd.onClose(res => {
            setTimeout(() => {
                if (res.isEnded) {
                    console.log("XminigameSDK " + "XM 激励视频广告完成,发放奖励");
                    if (this.callback_Video) {
                        this.callback_Video(true);
                        this.videoAd.load();
                    }
                } else {
                    console.log("XminigameSDK " + "XM 激励视频广告取消关闭,不发放奖励");
                    if (this.callback_Video) {
                        this.callback_Video(false);
                        this.videoAd.load();
                    }
                }
            }, 500)
        })

        // 加载一次
        this.videoAd.load();
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner() {
    }

    hideBanner() {
    }

    getIntersFlag() {
        return this.loadSucc_SystemInters;
    }

    showInters() {
        // 插屏间隔弹添加桌面
        this.NUM_hasShowInters++;
        if (this.SW_IntersIntervalToAddDesktop && this.NUM_hasShowInters <= this.NUM_IntersToAddDesktopNumber) {
            console.log("XminigameSDK " + "第" + this.NUM_IntersToAddDesktopNumber + "次插屏变添加桌面 " + "当前第" + this.NUM_hasShowInters + "次");
            if (this.NUM_hasShowInters == this.NUM_IntersToAddDesktopNumber) {
                this.getAddDesktopFlag((suc) => {
                    if (suc) {
                        console.log("XminigameSDK " + "插屏变添加桌面");
                        this.addDesktop((res) => { });
                    }
                });
                return;
            }
        }

        if (this.SW_IntersBaseControl) {
            if (this.NUM_hasShowInters < this.NUM_IntersStart) {
                console.log("XminigameSDK " + "插屏开始次数未达到 " + this.NUM_hasShowInters + " 目标次数 " + this.NUM_IntersStart);
                return;
            }

            if (this.NUM_intersNowInterval < this.NUM_IntersIntervalNum) {
                console.log("XminigameSDK " + "插屏间隔次数未达到 " + this.NUM_intersNowInterval + " 目标次数 " + this.NUM_IntersIntervalNum)
                this.NUM_intersNowInterval++;
                return;
            }

            if (this.NUM_IntersNowIntervalTime < this.NUM_IntersIntervalTime) {
                console.log("XminigameSDK " + "插屏间隔时间未达到 " + this.NUM_IntersNowIntervalTime + " 目标时间 " + this.NUM_IntersIntervalTime);
                if (this.SW_AddDesktop && this.NUM_IntersNowToAddDesktop < this.NUM_AutoAddDeskMostTimes) {
                    this.getAddDesktopFlag((suc) => {
                        if (suc) {
                            this.NUM_IntersNowToAddDesktop++;
                            this.addDesktop(function () {
                                console.log("XminigameSDK " + "插屏间隔弹桌面")
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
                console.log("XminigameSDK " + "插屏延迟时间(ms):" + this.NUM_IntersDelayTime);
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
            console.log("XminigameSDK " + "XM showVideo========================")
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
        return null;
    }
    reportNativeAdShow(adId) {
    }
    reportNativeAdClick(adId) {
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
        if (type == "short") {
            // @ts-ignore
            qg.vibrateShort();
        }
        else if (type == "long") {
            // @ts-ignore
            qg.vibrateLong();
        }
    }

    startGameVideo(duration) {
    }
    pauseGameVideo() {
    }
    resumeGameVideo() {
    }
    stopGameVideo(callback) {
        callback(false);
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        callback(false);
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
        console.log("XminigameSDK " + "getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK " + "getUserInfo=====================");
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: false
        }
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
        callback(false);
    }

    exitTheGame() {
    }

    reportAnalytics(params, data) {
    }

    showAuthentication(callback) {
        callback(false);
    }

    visitorExperience(callback) {
        callback(false);
    }

    showNativeAd(width, height, viewX, viewY) {
    }

    getOPPOShowMoreGameFlag() {
        return false;
    }
    showOPPOMoreGame() {
    }

    hasNetwork(callback) {
        callback(false);
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
        callback(false);
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
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters) {
            console.log("XminigameSDK " + "XM showSystemInters==================");
            this.systemIntersAd.show();
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
}

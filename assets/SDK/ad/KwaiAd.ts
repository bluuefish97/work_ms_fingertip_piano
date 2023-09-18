import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class KwaiAd implements AdInterface {
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
     * 录屏地址
     */
    videoPath = null;
    /**
     * 录屏摄像机
     */
    gameRecorder = null;
    /**
     * 录屏回调
     */
    callback_Recorder = null;




    /**
     * 创建广告
     */
    createAd() {
        console.log("XminigameSDK", GetConfig.getChannelName(), "createAd======================");
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
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
        this.videoAd = kwaigame.createRewardedVideoAd({
            adUnitId: this.ID_Video
        })

        this.loadSucc_Video = true;

        this.videoAd.onClose((result) => {
            console.log("XminigameSDK", "激励视频取消播放");
            this.callback_Video(false);
        });

        this.videoAd.onReward((result) => {
            console.log("XminigameSDK", "激励视频播放完成");
            this.callback_Video(true);
        });
    }


    getChannelId() {
        return GetConfig.getChannelId();
    }

    showBanner() {
    }

    hideBanner() {
    }

    getIntersFlag() {
        return false;
    }
    showInters() {
    }


    getVideoFlag() {
        return this.loadSucc_Video;
    }

    showVideo(videoCallback, reason?) {
        if (this.videoAd && this.loadSucc_Video) {
            this.callback_Video = videoCallback;
            console.log('XminigameSDK', 'KS showVideo========================')
            this.videoAd.show({
                success: () => {
                },
                fail: (error) => {
                    console.log("XminigameSDK", "激励视频播放失败: " + JSON.stringify(error));
                }
            })
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
    }

    startGameVideo(duration) {

        this.videoPath = null;

        // @ts-ignore
        this.gameRecorder = kwaigame.createMediaRecorder();
        if (this.gameRecorder === null) {
            console.log("XminigameSDK", "当前版本App不支持录屏");
            return;
        }

        this.gameRecorder.onStart(res => {
            console.log("XminigameSDK", "KS 录屏开始");
        });

        this.gameRecorder.onStop(res => {
            console.log("XminigameSDK", 'KS 录屏结束', JSON.stringify(res));
            this.videoPath = res.videoID;
            this.callback_Recorder(this.videoPath);
        });

        this.gameRecorder.onError((err) => {
            console.log("XminigameSDK", "发生录屏错误：", JSON.stringify(err));
        });

        this.gameRecorder.start();
    }
    pauseGameVideo() {
        console.log("XminigameSDK", "KS 暂停录屏==================");
        this.gameRecorder && this.gameRecorder.pause();
    }
    resumeGameVideo() {
        console.log("XminigameSDK", "KS 继续录屏==================");
        this.gameRecorder && this.gameRecorder.resume();
    }
    stopGameVideo(callback) {
        this.callback_Recorder = callback;
        console.log("XminigameSDK", "KS stopGameVideo==================");
        this.gameRecorder && this.gameRecorder.stop();
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        this.gameRecorder && this.gameRecorder.publishVideo({
            mouldId: title,
            video: videoPath,
            callback: (error) => {
                if (error != null && error != undefined) {
                    console.log("XminigameSDK", "KS 分享录屏失败: ", JSON.stringify(error));
                    if (error.code == -10014) console.log("XminigameSDK", "录屏时间过短");
                    callback(false);
                } else {
                    console.log("XminigameSDK", "KS 分享录屏成功");
                    callback(true);
                }
            }
        })
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
        console.log("XminigameSDK", "BL getUserData=====================");
        let userData = {
            userId: LocalStorage.getData("userId"),
            token: LocalStorage.getData("token"),
            userType: LocalStorage.getData("userType"),
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "BL getUserInfo=====================");
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
        kwaigame.authorize({
            scope: "Scope.userInfo",
            success: () => {
                console.log("XminigameSDK", "BL 授权获取用户信息成功");
            },
            fail: (error) => {
                console.log("XminigameSDK", "BL 授权获取用户信息失败：" + JSON.stringify(error));
            },
            complete: () => {
                console.log("XminigameSDK", "BL 授权获取用户信息完成");
            }
        });
        // @ts-ignore
        kwaigame.getUserInfo({
            success: (result) => {
                console.log("XminigameSDK", "获取用户信息成功：" + JSON.stringify(result));
                userInfo.head = result.userHead;
                userInfo.name = result.userName;
                userInfo.sex = result.gender;
                userInfo.power = true;
                LocalStorage.setData("avatarUrl", userInfo.head);
                LocalStorage.setData("nickName", userInfo.name);
                LocalStorage.setData("gender", userInfo.sex);
                callback(userInfo);
            },
            fail: (error) => {
                console.log("XminigameSDK", "获取用户信息失败: " + JSON.stringify(error));
                userInfo.power = false;
                callback(userInfo);
            },
            complete: () => {
                console.log("XminigameSDK", "获取用户信息完成");
            }
        });

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
}

import GetConfig from "../utils/GetConfig";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";


export default class BlankAd implements AdInterface {
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
     * 创建广告
     */
    createAd() {
    }

    /**
     * 加载互推
     */
    startLoadPushGamaes() {
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
        return false;
    }

    showVideo(callback, reason?) {
        callback(false);
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
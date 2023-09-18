import { AdInterface } from "./AdInterface";

let videoCallback = null;
let videoIntersCallBack = null;
let payCallback = null;

export default class AndroidAd implements AdInterface {
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
     * 当前已经进入Wuchu视频次数
     */
    NUM_NowErrVideo = 0;
    /**
     * 当前已经调用getErrVideoFlag次数
     */
    NUM_NowGetErrVideoFlag = 0;




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
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "reqeustChannelValue", "()Ljava/lang/String;");
    }

    showBanner() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showBanner","calling_method_params":0}`);
    }

    hideBanner() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideBanner",'calling_method_params':0}`);
    }

    getIntersFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getIntersFlag");
    }

    showInters() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{'calling_method_name':'showInters','calling_method_params':0}`);
    }
    getVideoFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getVideoFlag");
    }

    showVideo(callback, reason?) {
        videoCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showVideo","calling_method_params":0}`);
    }

    getNativeIconFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getIconNativeFlag");
    }
    showNativeIcon(width, height, x, y) {
        let winSize = cc.winSize;
        let size = width / winSize.width;
        let posX = (x - width / 2) / winSize.width;
        let posY = (winSize.height - (y + width / 2)) / winSize.height;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V",
            `{"calling_method_name":"showNativeIcon","calling_method_params":{"icon_size":${size},"viewX":${posX},"viewY":${posY}}}`);
    }
    hideNativeIcon() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNativeIcon",'calling_method_params':0}`);
    }

    getNativeImageFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "getBigNativeFlag", "()Z");
    }
    showNativeImage(width, height, x, y) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "showSettlePasterBanner", "()V");
    }
    hideNativeImage() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "hideSettlePasterBanner", "()V");
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
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "onClickNativaAd", "()V");
    }

    getNavigateIconFlag() {
        return true;
    }
    showNavigateIcon(width, height, x, y) {
        let winSize = cc.winSize;
        let size = width / winSize.width;
        let posX = (x - width / 2) / winSize.width;
        let posY = (winSize.height - (y + width / 2)) / winSize.height;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNavigateIcon","calling_method_params":{"icon_size":${size},"icon_x":${posX},"icon_y":${posY}}}`);
    }
    hideNavigateIcon() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNavigateIcon",'calling_method_params':0}`);
    }

    getNavigateGroupFlag() {
        return true;
    }
    showNavigateGroup(type, side, size, y) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNavigateGroup","calling_method_params":{"type":${type},"slide":${side}}}`);
    }
    hideNavigateGroup() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNavigateGroup",'calling_method_params':0}`);
    }

    getNavigateSettleFlag() {
        return true;
    }
    showNavigateSettle(type, x, y) {
        let winSize = cc.winSize;
        let posX = x / winSize.width;
        let posY = (winSize.height - y) / winSize.height;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNavigateSettle","calling_method_params":{"type":${type},"viewX":${posX},"viewY":${posY}}}`);
    }
    hideNavigateSettle() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"hideNavigateSettle",'calling_method_params':0}`);
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
    }

    phoneVibrate(type) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"shakePhone","calling_method_params":${type}}`);
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
    }

    getUserInfo(callback) {
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
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getVideoIntersFlag");
    }
    showVideoInters(callback) {
        videoIntersCallBack = callback;
        //有延迟的情况下延迟展示
        if (this.NUM_IntersVideoDelayTime > 0) {
            let random = Math.floor(Math.random() * 100);
            if (random < this.NUM_IntersVideoDelayP) {
                console.log("XminigameSDK", "插屏视频延迟时间(ms):" + this.NUM_IntersVideoDelayTime);
                setTimeout(() => {
                    // @ts-ignore
                    jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showVideoInters","calling_method_params":0}`);
                }, this.NUM_IntersVideoDelayTime)
            } else {
                // @ts-ignore
                jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showVideoInters","calling_method_params":0}`);
            }
        }
        else {
            // @ts-ignore
            jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showVideoInters","calling_method_params":0}`);
        }
    }

    exitTheGame() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{'calling_method_name':'exit'}`);
    }

    reportAnalytics(params, data) {
        let reportData = JSON.stringify({ calling_method_name: "reportAnalytics", calling_method_params: { "eventName": params, "data": data } });
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", reportData);
    }

    showAuthentication(callback) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showAuthentication","calling_method_params":0}`);
    }

    visitorExperience(callback) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"TouristModel","calling_method_params":0}`);
    }

    showNativeAd(width, height, viewX, viewY) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showNativeAd","calling_method_params":{"width":${width},"height":${height},"viewX":${viewX},"viewY":${viewY}}}`);
    }

    getOPPOShowMoreGameFlag() {
        // @ts-ignore
        return jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "SendMessageGetAdFlag", "(Ljava/lang/String;)Z", "getShowMoreGameFlag");
    }
    showOPPOMoreGame() {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "ReceiveCppMessage", "(Ljava/lang/String;)V", `{"calling_method_name":"showOPPOMoreGame","calling_method_params":0}`);
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
            console.log("XminigameSDK", "WX 视频广告未加载完成");
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
        payCallback = callback;
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "pay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", `${money}`, `${propId}`, `${propName}`);
    }

    payComplete(orderId) {
        // @ts-ignore
        jsb.reflection.callStaticMethod("com/asc/sdk/ndk/AndroidNDKHelper", "completePay", "(Ljava/lang/String;)V", `${orderId}`);
    }



    /**
     * 内部方法
     */

}

//视频回调
{
    (<any>window).AndroidVideoCallback = function (result: string) {
        console.log("XminigameSDK", "视频是否播放完成?", result == "1");
        videoCallback && videoCallback(result == "1");
    }
}

//视频插屏回调
{
    (<any>window).AndroidVideoIntersCallBack = function () {
        //do something 视频播放完成所做的操作 恢复游戏
        console.log("XminigameSDK", "videoInsertCallBack")
        videoIntersCallBack && videoIntersCallBack();
    }
}

//订单支付回调
{
    (<any>window).AndroidPayCallback = function (paySucc: string, orderId: string) {
        console.log("XminigameSDK", orderId, "该订单是否支付成功?", paySucc == "1");
        payCallback && payCallback(paySucc == "1", orderId);
    }
}
import AdCenter from "./ad/AdCenter";
import { sdkConfig } from "./SdkConfig";
import ServerCenter from "./server/ServerCenter";
import LocalStorage from "./utils/LocalStorage";


/**
 * 接口调用类(详细的可在网站文档观看使用指南)
 * http://cnwebserver.xplaymobile.com:4000/
 */
export default class ASCAd {
    private static instance: ASCAd;

    /**
     * 已经初始化广告？防止多次初始化操作
     */
    hasInit = false;

    /**
     * ASCAd 单例
     */
    public static getInstance(): ASCAd {
        if (!ASCAd.instance) {
            ASCAd.instance = new ASCAd();
        }
        return ASCAd.instance;
    }


    /**
     * ALL
     * 设置渠道ID
     * 必须要在调用该ASCAd类其他方法之前调用,否则会不生效！
     */
    setChannelId(channelId) {
        console.log("XminigameSDK", "setChannelId", channelId);
        sdkConfig.channelId = channelId;
    }


    /**
     * ALL(必接)
     * 初始化广告
     */
    initAd() {
        console.log("XminigameSDK", "initAd");
        if (!this.hasInit) ServerCenter.getInstance().initAd();
    }


    /**
     * Android
     * 获取渠道ID,根据返回值区分渠道
     * "1005" - 小米
     * "1007" - oppo
     * "1008" - vivo
     * "1012" - 华为
     * "1238" - 广告渠道
     */
    getChannelId() {
        let flag = AdCenter.getInstance().getChannelId();
        console.log("XminigameSDK", "getChannelId:" + flag)
        return flag;
    }


    /** 
     * ALL
     * 展示横幅
     */
    showBanner() {
        console.log("XminigameSDK", "showBanner");
        AdCenter.getInstance().showBanner();
    }
    /** 
     * ALL
     * 隐藏横幅
     */
    hideBanner() {
        console.log("XminigameSDK", "hideBanner");
        AdCenter.getInstance().hideBanner();
    }


    /** 
     * ALL
     * 获取插屏是否可以展示标志
     */
    getIntersFlag() {
        let flag = AdCenter.getInstance().getIntersFlag();
        console.log("XminigameSDK", "getIntersFlag:" + flag)
        return flag;
    }
    /** 
     * ALL
     * 展示插屏
     */
    showInters() {
        console.log("XminigameSDK", "showInters");
        AdCenter.getInstance().showInters();
    }


    /** 
     * ALL
     * 获取视频是否可以展示标志
     * 为false时需要提示 暂无视频广告
     */
    getVideoFlag() {
        let flag = AdCenter.getInstance().getVideoFlag();
        console.log("XminigameSDK", "getVideoFlag:" + flag)
        return flag;
    }
    /** 
     * ALL
     * 展示视频
     * @param callback 视频播放回调
     * @param reason IOS渠道播放视频原因
     */
    showVideo(callback, reason?) {
        console.log("XminigameSDK", "showVideo");
        AdCenter.getInstance().showVideo(callback, reason);
    }


    /** 
     * OPPO & VIVO & WX & Android
     * 获取原生ICON是否可以展示标志
     */
    getNativeIconFlag() {
        let flag = AdCenter.getInstance().getNativeIconFlag();
        console.log("XminigameSDK", "getNativeIconFlag:" + flag)
        return flag;
    }
    /**
     * OPPO & VIVO & WX & Android
     * 展示原生ICON
     * @param width ICON的宽(微信无法设置,可填任意值)
     * @param height ICON的高(微信无法设置,可填任意值)
     * @param x ICON的横坐标
     * @param y ICON的横坐标
     */
    showNativeIcon(width, height, x, y) {
        console.log("XminigameSDK", "showNativeIcon");
        AdCenter.getInstance().showNativeIcon(width, height, x, y);
    }
    /** 
     * OPPO & VIVO & WX & Android
     * 隐藏原生ICON
     */
    hideNativeIcon() {
        console.log("XminigameSDK", "hideNativeIcon");
        AdCenter.getInstance().hideNativeIcon();
    }

    /**
     * OPPO & VIVO
     * 获取原生大图是否可以展示标志
     */
    getNativeImageFlag() {
        let flag = AdCenter.getInstance().getNativeImageFlag();
        console.log("XminigameSDK", "getNativeImageFlag:" + flag)
        return flag;
    }
    /**
     * OPPO & VIVO & Android
     * 展示原生大图
     * Android渠道其参数可任意
     * @param width 原生大图的宽 ps:建议宽：高 = 2:1 否则图片可能模糊
     * @param height 原生大图的高
     * @param x 原生大图的横坐标
     * @param y 原生大图的横坐标
     */
    showNativeImage(width, height, x, y) {
        console.log("XminigameSDK", "showNativeImage");
        AdCenter.getInstance().showNativeImage(width, height, x, y);
    }
    /** 
     * OPPO & VIVO & Android
     * 隐藏原生大图
     */
    hideNativeImage() {
        console.log("XminigameSDK", "hideNativeImage");
        AdCenter.getInstance().hideNativeImage();
    }

    /**
     * OPPO
     * 获取原生贴片是否可以展示标志
     */
    getNativePasterFlag() {
        let flag = AdCenter.getInstance().getNativePasterFlag();
        console.log("XminigameSDK", "getNativePasterFlag:" + flag)
        return flag;
    }
    /**
     * OPPO
     * 展示原生贴片
     */
    showNativePaster() {
        console.log("XminigameSDK", "showNativePaster");
        AdCenter.getInstance().showNativePaster();
    }

    /**
     * OPPO & VIVO
     * 自由获取原生广告信息
     * @param type 1-后台原生广告id拉取的原生广告 2-后台自定义原生广告id拉取的原生广告
     */
    getNativeAdInfo(type) {
        let info = AdCenter.getInstance().getNativeAdInfo(type);
        console.log("XminigameSDK", "getNativeAdInfo:" + JSON.stringify(info));
        return info;
    }
    /**
     * OPPO & VIVO
     * 上报原生广告展示
     * @param adId 获取的原生广告的adId
     */
    reportNativeAdShow(adId) {
        console.log("XminigameSDK", "reportNativeAdShow");
        AdCenter.getInstance().reportNativeAdShow(adId);
    }
    /**
     * OPPO & VIVO & Android
     * 上报原生广告点击
     * Android渠道其参数可任意
     * @param adId 获取的原生广告的adId
     */
    reportNativeAdClick(adId) {
        console.log("XminigameSDK", "reportNativeAdClick");
        AdCenter.getInstance().reportNativeAdClick(adId);
    }

    /**
     * Android & IOS & WX
     * 获取互推ICON是否可以展示标签
     */
    getNavigateIconFlag() {
        let flag = AdCenter.getInstance().getNavigateIconFlag();
        console.log("XminigameSDK", "getNavigateIconFlag:" + flag);
        return flag;
    }
    /**
     * Android & IOS & WX
     * 展示互推ICON
     * @param width ICON的宽
     * @param height ICON的高
     * @param x ICON的横坐标
     * @param y ICON的纵坐标
     */
    showNavigateIcon(width, height, x, y) {
        console.log("XminigameSDK", "showNavigateIcon");
        AdCenter.getInstance().showNavigateIcon(width, height, x, y);
    }
    /** 
     * Android & IOS & WX
     * 隐藏互推ICON
     */
    hideNavigateIcon() {
        console.log("XminigameSDK", "hideNavigateIcon");
        AdCenter.getInstance().hideNavigateIcon();
    }

    /**
     * Android & IOS & WX
     * 获取互推列表是否可以展示标志
     */
    getNavigateGroupFlag() {
        let flag = AdCenter.getInstance().getNavigateGroupFlag();
        console.log("XminigameSDK", "getNavigateGroupFlag:" + flag);
        return flag;
    }
    /**
     * Android & IOS & WX
     * 展示互推列表(OPPO仅竖版可用)
     * @param type vertical-竖版 (不支持--horizontal-横版)
     * @param side left-左侧 right-右侧
     * @param size OPPO - 按钮大小
     * @param y OPPO - 按钮的纵坐标,默认0,处在屏幕左侧或者右侧中间
     */
    showNavigateGroup(type, side, size, y) {
        console.log("XminigameSDK", "showNavigateGroup");
        AdCenter.getInstance().showNavigateGroup(type, side, size, y);
    }
    /**
     * Android & IOS & WX
     * 隐藏互推列表
     */
    hideNavigateGroup() {
        console.log("XminigameSDK", "hideNavigateGroup");
        AdCenter.getInstance().hideNavigateGroup();
    }

    /**
     * Android & IOS & WX
     * 获取结算互推能否展示
     */
    getNavigateSettleFlag() {
        let flag = AdCenter.getInstance().getNavigateSettleFlag();
        console.log("XminigameSDK", "getNavigateSettleFlag:" + flag);
        return flag;
    }
    /**
     * Android & IOS & WX
     * 展示结算互推
     * @param type 1-大窗口类型,2-两边类型,3-横条类型,4-横幅类型
     * @param x 结算互推的横坐标
     * @param y 结算互推的纵坐标
     */
    showNavigateSettle(type, x, y) {
        console.log("XminigameSDK", "showNavigateSettle");
        AdCenter.getInstance().showNavigateSettle(type, x, y);
    }
    /**
     * Android & IOS & WX
     * 隐藏结算互推
     */
    hideNavigateSettle() {
        console.log("XminigameSDK", "hideNavigateSettle");
        AdCenter.getInstance().hideNavigateSettle();
    }

    /**
     * OPPO
     * 获取互推盒子横幅广告能否展示标志
     */
    getNavigateBoxBannerFlag() {
        let flag = AdCenter.getInstance().getNavigateBoxBannerFlag();
        console.log("XminigameSDK", "getNavigateBoxBannerFlag:" + flag);
        return flag;
    }
    /**
     * OPPO
     * 展示互推盒子横幅广告
     */
    showNavigateBoxBanner() {
        console.log("XminigameSDK", "showNavigateBoxBanner");
        AdCenter.getInstance().showNavigateBoxBanner();
    }
    /**
     * OPPO
     * 隐藏互推盒子横幅广告
     */
    hideNavigateBoxBanner() {
        console.log("XminigameSDK", "hideNavigateBoxBanner");
        AdCenter.getInstance().hideNavigateBoxBanner();
    }

    /**
     * OPPO
     * 获取互推盒子九宫格广告能否展示标志
     */
    getNavigateBoxPortalFlag() {
        let flag = AdCenter.getInstance().getNavigateBoxPortalFlag();
        console.log("XminigameSDK", "getNavigateBoxPortalFlag:" + flag);
        return flag;
    }
    /**
     * OPPO
     * 展示互推盒子九宫格广告
     */
    showNavigateBoxPortal() {
        console.log("XminigameSDK", "showNavigateBoxPortal");
        AdCenter.getInstance().showNavigateBoxPortal();
    }

    /**
     * OPPO & VIVO & WX & HW
     * 设置渲染层级最高的组
     * 以下方法仅针对cocos、cocos3d引擎UI使用多个摄像机的情况，如果没有用到多个摄像机请忽略
     * 为了保证sdk的原生广告和互推等UI始终显示在最上层，请将组设置成最上层。
     * @param group 
     */
    setGroup(group) {
        console.log("XminigameSDK", "setGroup", group);
        AdCenter.getInstance().setGroup(group);
    }


    /**
     * ALL
     * 判断渠道是否拥有添加桌面接口
     */
    hasAddDesktopFunc() {
        let flag = AdCenter.getInstance().hasAddDesktopFunc();
        console.log("XminigameSDK", "hasAddDesktopFunc:" + flag);
        return flag;
    }
    /**
     * OPPO & VIVO & QQ & Tiktok & HW
     * 获取能否添加桌面图标标志
     * @param callback 
     */
    getAddDesktopFlag(callback) {
        console.log("XminigameSDK", "getAddDesktopFlag");
        return AdCenter.getInstance().getAddDesktopFlag(callback);
    }
    /**
     * OPPO & VIVO & QQ & Tiktok & HW
     * 添加桌面图标
     * @param callback 
     */
    addDesktop(callback) {
        console.log("XminigameSDK", "addDesktop");
        AdCenter.getInstance().addDesktop(callback);
    }


    /**
     * ALL
     * 手机震动
     * @param type short-短震动 long-长震动
     */
    phoneVibrate(type) {
        console.log("XminigameSDK", "phoneVibrate", type);
        AdCenter.getInstance().phoneVibrate(type);
    }


    /**
     * TIKTOK & KS
     * 开始录屏
     * @param duration 录屏的时长,单位s,必须大于3s,最大值300s(5分钟) KS可填任意数
     */
    startGameVideo(duration) {
        console.log("XminigameSDK", "startGameVideo", duration);
        AdCenter.getInstance().startGameVideo(duration);
    }

    /**
     * TIKTOK & KS
     * 暂停录屏
     */
    pauseGameVideo() {
        console.log("XminigameSDK", "pauseGameVideo");
        AdCenter.getInstance().pauseGameVideo();
    }

    /**
     * TIKTOK & KS
     * 继续录屏(暂停录屏之后)
     */
    resumeGameVideo() {
        console.log("XminigameSDK", "resumeGameVideo");
        AdCenter.getInstance().resumeGameVideo();
    }

    /**
     * TIKTOK & KS
     * 停止录屏
     * @param callback 停止录屏后的回调,返回视频地址 KS返回录屏的ID
     */
    stopGameVideo(callback) {
        console.log("XminigameSDK", "stopGameVideo");
        AdCenter.getInstance().stopGameVideo(callback);
    }

    /**
     * TIKTOK & KS
     * 分享视频
     * @param title 这是抖音分享视频的标题 KS可在快手后台申请样式添加样式ID,无样式ID需为""
     * @param desc 这是头条分享视频的描述 KS可填任意
     * @param topics 这是抖音分享视频的话题 KS可填任意
     * @param videoPath TT-视频地址 KS-录屏ID 停止录屏返回的地址或ID
     * @param callback 分享视频的回调
     */
    shareVideo(title, desc, topics, videoPath, callback) {
        console.log("XminigameSDK", "shareVideo");
        AdCenter.getInstance().shareVideo(title, desc, topics, videoPath, callback);
    }



    /**
     * TIKTOK
     * 跳转到更多游戏中心,按钮绑定点击事件即可
     */
    jumpToMoreGamesCenter() {
        console.log("XminigameSDK", "jumpToMoreGamesCenter");
        AdCenter.getInstance().jumpToMoreGamesCenter();
    }

    /**
     * TIKTOK
     * 展示更多游戏横幅
     */
    showMoreGamesBanner() {
        console.log("XminigameSDK", "showMoreGamesBanner");
        AdCenter.getInstance().showMoreGamesBanner();
    }
    /**
     * TIKTOK
     * 隐藏更多游戏横幅
     */
    hideMoreGamesBanner() {
        console.log("XminigameSDK", "hideMoreGamesBanner");
        AdCenter.getInstance().hideMoreGamesBanner();
    }

    /**
     * TIKTOK
     * 收藏
     * @param type "tip"-顶部气泡 "bar"-底部弹窗
     * @param content 弹窗文案,最多显示 12 个字符,建议默认使用 一键添加到我的小程序
     * @param position 弹窗类型为 bar 时的位置参数 "bottom"-贴近底部 "overtab"-悬于页面 tab 区域上方
     */
    showFavoriteGuide(type, content, position) {
        console.log("XminigameSDK", "showFavoriteGuide");
        AdCenter.getInstance().showFavoriteGuide(type, content, position);
    }

    /**
     * ALL
     * 获取用户数据
     * @callback {userId:"",token:"",userType:0}
     * userType-0,游客类型;
     * userType-1,用户类型;
     */
    getUserData(callback) {
        console.log("XminigameSDK", "getUserData");
        AdCenter.getInstance().getUserData(callback);
    }

    /**
     * TIKTOK & OPPO & KS & HW & BL
     * 获取用户信息
     * @callback {head:"",name:"",sex:"0",power:false}
     * power-false,未授权获取用户信息
     * power-true,已授权获取用户信息
     * sex "M"为男,"F"为女,"0"为未知
     */
    getUserInfo(callback) {
        console.log("XminigameSDK", "getUserInfo");
        AdCenter.getInstance().getUserInfo(callback);
    }

    /**
     * Tiktok
     * 强制游客登录之后再次获取用户信息
     * @param callback 登录成功返回true,失败返回false
     */
    mustLogin(callback) {
        console.log("XminigameSDK", "mustLogin");
        ServerCenter.getInstance().mustLogin(callback);
    }


    /** 
     * QQ
     * 获取盒子是否可以展示标志
     */
    getBoxFlag() {
        let flag = AdCenter.getInstance().getBoxFlag();
        console.log("XminigameSDK", "getBoxFlag:" + flag);
        return flag;
    }
    /**
     * QQ
     * 展示盒子广告
     */
    showAppBox() {
        console.log("XminigameSDK", "showAppBox");
        AdCenter.getInstance().showAppBox();
    }


    /** 
     * QQ & WX
     * 获取积木是否可以展示标志
     */
    getBlockFlag() {
        let flag = AdCenter.getInstance().getBlockFlag();
        console.log("XminigameSDK", "getBlockFlag:" + flag);
        return flag;
    }
    /**
     * QQ & WX
     * 展示积木/格子广告
     * @param type QQ: "landscape"-横向展示 "vertical"-竖向展示   WX：广告组件的主题颜色,"white"-白色 "black"-黑色
     * @param x 积木广告左上角横坐标
     * @param y 积木广告左上角纵坐标
     * @param blockSize QQ：积木广告数量：1~5 实际数量以拉取的为准   WX：格子数量:5或者8  5个为单行列表,8个为双行列表
     */
    showBlock(type, x, y, blockSize) {
        console.log("XminigameSDK", "showBlock");
        AdCenter.getInstance().showBlock(type, x, y, blockSize);
    }
    /** 
     * QQ & WX
     * 关闭积木广告
     */
    hideBlock() {
        console.log("XminigameSDK", "hideBlock");
        AdCenter.getInstance().hideBlock();
    }


    /** 
     * Android & IOS
     * 是否加载到插屏视频广告
     */
    getVideoIntersFlag() {
        let flag = AdCenter.getInstance().getVideoIntersFlag();
        console.log("XminigameSDK", "getVideoIntersFlag:" + flag);
        return flag;
    }
    /**
     * Android & IOS
     * 展示插屏视频广告
     */
    showVideoInters(callback) {
        console.log("XminigameSDK", "showVideoInters");
        AdCenter.getInstance().showVideoInters(callback);
    }


    /**
     * Android & IOS
     * 退出游戏
     */
    exitTheGame() {
        console.log("XminigameSDK", "exitTheGame");
        AdCenter.getInstance().exitTheGame();
    }


    /**
     * Android & IOS & Tiktok & WX
     * 自定义事件上报
     * @param params Android&IOS&WX-友盟后台自定义事件ID,Tiktok-字节后台自定义事件ID
     * @param data Android&IOS&WX-友盟后台自定义事件参数,Tiktok-字节后台自定义事件参数
     */
    reportAnalytics(params, data) {
        console.log("XminigameSDK", "reportAnalytics");
        AdCenter.getInstance().reportAnalytics(params, data);
    }


    /**
     * Android & IOS
     * Android无回调
     * 实名认证(防沉迷)
     */
    showAuthentication(callback) {
        console.log("XminigameSDK", "showAuthentication");
        AdCenter.getInstance().showAuthentication(callback);
    }
    /**
     * Android & IOS
     * Android无回调
     * 游客体验
     */
    visitorExperience(callback) {
        console.log("XminigameSDK", "visitorExperience");
        AdCenter.getInstance().visitorExperience(callback);
    }


    /**
     * Android
     * 展示原生广告
     * width ：宽
     * height ：高
     * viewX：界面的左上角距离整个界面左边的占比  
     * viewY：界面的左上角距离整个界面上边的占比
     */
    showNativeAd(width, height, viewX, viewY) {
        console.log("XminigameSDK", "showNativeAd");
        AdCenter.getInstance().showNativeAd(width, height, viewX, viewY);
    }


    /**
     * Android
     * 能否展示oppo超休闲（首页更多游戏按钮）
     */
    getOPPOShowMoreGameFlag() {
        let flag = AdCenter.getInstance().getOPPOShowMoreGameFlag();
        console.log("XminigameSDK", "getOPPOShowMoreGameFlag:" + flag);
        return flag;
    }
    /**
     * Android
     * oppo超休闲（首页更多游戏）
     */
    showOPPOMoreGame() {
        console.log("XminigameSDK", "showOPPOMoreGame");
        AdCenter.getInstance().showOPPOMoreGame();
    }


    /**
     * IOS
     * 是否有网络
     */
    hasNetwork(callback) {
        console.log("XminigameSDK", "hasNetwork", AdCenter.getInstance().hasNetwork(callback));
        AdCenter.getInstance().hasNetwork(callback);
    }


    /**
     * IOS
     * 展示评论
     */
    showReviewAlert() {
        console.log("XminigameSDK", "showReviewAlert");
        AdCenter.getInstance().showReviewAlert();
    }


    /**
     * IOS
     * 每个视频播放之前  0:插屏  1:视频
     */
    showiOSADWithScene(key, type) {
        console.log("XminigameSDK", "showiOSADWithScene");
        AdCenter.getInstance().showiOSADWithScene(key, type);
    }
    /**
     * IOS
     * 弹出广告激励视频回调中使用
     */
    showiOSADWithType(key, type) {
        console.log("XminigameSDK", "showiOSADWithType");
        AdCenter.getInstance().showiOSADWithType(key, type);
    }
    /**
     * IOS
     * 弹出插屏之前视频界面 和 弹出插屏之后回调调用  0:插屏  1:视频
     */
    videoUIShow(key) {
        console.log("XminigameSDK", "videoUIShow");
        AdCenter.getInstance().videoUIShow(key);
    }


    /**
     * HW
     * 展示隐私协议(华为必接)
     * @param companyLogUrl
     * 公司Log的图片链接(服务器地址),如果属于益欣则可以填 ""
     * @param htmlUrl
     * 点击隐私协议后跳转到的html网页地址(服务器地址),如果属于益欣则可以填 ""
     * @param callback
     * 用户点击同意则回调true
     * 用户点击取消则回调false
     */
    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) {
        console.log("XminigameSDK", "showPrivacyAgreement");
        AdCenter.getInstance().showPrivacyAgreement(companyLogUrl, htmlUrl, callback);
    }


    /**
     * WX
     * 能否展示Wuchubanner
     */
    getErrBannerFlag() {
        let flag = AdCenter.getInstance().getErrBannerFlag();
        console.log("XminigameSDK", "getErrBannerFlag:" + flag);
        return flag;
    }
    /**
     * WX
     * 展示Wuchubanner
     */
    showErrBanner(callback) {
        console.log("XminigameSDK", "showErrBanner");
        AdCenter.getInstance().showErrBanner(callback);
    }
    /**
     * WX
     * 隐藏Wuchubanner
     */
    hideErrBanner() {
        console.log("XminigameSDK", "hideErrBanner");
        AdCenter.getInstance().hideErrBanner();
    }

    /**
     * WX & OPPO & Android
     * 能否进入视频Wuchu模式
     */
    getErrVideoFlag() {
        let flag = AdCenter.getInstance().getErrVideoFlag();
        console.log("XminigameSDK", "getErrVideoFlag:" + flag);
        return flag;
    }

    /**
     * Android
     * 购买道具
     * @param money 金额
     * @param propId 道具ID
     * @function callback(paySucc,orderId)
     * paySucc - true或者false,是否支付成功
     * orderId - 订单id
     */
    buyProps(money, propId, propName, callback) {
        console.log("XminigameSDK", "buyProps");
        AdCenter.getInstance().buyProps(money, propId, propName, callback);
    }
    /**
     * Android
     * 道具下发成功后调用,和上面的方法配合使用
     * @param orderId 订单id
     */
    payComplete(orderId) {
        console.log("XminigameSDK", "payComplete");
        AdCenter.getInstance().payComplete(orderId);
    }

    getAreaShieldingSwtich(){
        if(!LocalStorage.getJsonData('adConfig')){
            return  true;
        }else{
            return  LocalStorage.getJsonData('adConfig').areaShieldingSwtich;
        }
     
    }


}
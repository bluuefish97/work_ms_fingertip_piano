export interface AdInterface {

    /**
     * 变量区域*******************************************
     */
    /**
     * 广告开关区域*********************************
     */
    /**
     * 系统banner广告开关
     */
    SW_SystemBanner;
    /**
     * 系统插屏广告开关
     */
    SW_SystemInters;
    /**
     * 视频广告开关
     */
    SW_Video;
    /**
     * 原生广告开关
     */
    SW_Native;
    /**
     * 原生banner广告开关
     */
    SW_NativeBanner;
    /**
     * 原生插屏广告开关
     */
    SW_NativeInters;
    /**
     * 盒子广告开关
     */
    SW_Box;


    /**
     * 广告ID区域*************************************
     */
    /**
     * 系统banner广告ID
     */
    ID_SystemBanner;
    /**
     * 系统插屏广告ID
     */
    ID_SystemInters;
    /**
     * 原生广告ID
     */
    ID_Native;
    /**
     * 原生自定义广告ID
     */
    ID_NativeCustom;
    /**
     * 视频广告ID
     */
    ID_Video;
    /**
     * 盒子广告ID
     */
    ID_Box;
    /**
     * 积木广告ID
     */
    ID_Block;


    /**
     * 插屏二合一区域**********************************
     */
    /**
     * 原生插屏出现概率
     */
    NUM_NativeIntersP;


    /**
     * 动态控制区域***************************
     */
    /**
     * 原生插屏上报次数(降低原生广告点击率)--废弃
     */
    NUM_NativeIntersReport;
    /**
     * bannerWuchu模式出现概率
     */
    NUM_BannerErrP;
    /**
     * bannerWuchu模式最多出现次数
     */
    NUM_BannerErrMost;
    /**
     * bannerWuchu模式第几次必出
     */
    NUM_BannerErrMust;

    /**
     * 视频Wuchu模式出现概率
     */
    NUM_VideoErrP;
    /**
     * 视频Wuchu模式最多出现次数
     */
    NUM_VideoErrMost;
    /**
     * 视频Wuchu模式第几次必出
     */
    NUM_VideoErrMust;

    /**
     * 原生贴片开关
     */
    SW_NativePaster;
    /**
     * 原生贴片Wuchu模式出现概率
     */
    NUM_NativePasterErrP;
    /**
     * 原生贴片Wuchu模式最多出现次数
     */
    NUM_NativePasterErrMost;
    /**
     * 原生贴片Wuchu模式第几次必出
     */
    NUM_NativePasterErrMust;



    /**
     * 广告基础控制区域******************************
     */
    /**
     * banner控制区域***************************
     */
    /**
     * banner刷新时间
     */
    NUM_BannerUpdateTime;
    /**
     * 系统banner优先？
     */
    SW_SystemBannerFirst;
    /**
     * banner最多展示次数
     */
    NUM_BannerMostShow;

    /**
     * 插屏控制区域*****************************
     */
    /**
     * 插屏基础控制
     */
    SW_IntersBaseControl;
    /**
     * 插屏第几次开始展示
     */
    NUM_IntersStart;
    /**
     * 插屏展示间隔次数
     */
    NUM_IntersIntervalNum;
    /**
     * 插屏间隔最小时间
     */
    NUM_IntersIntervalTime;
    /**
     * 插屏延迟时间(ms)
     */
    NUM_IntersDelayTime;
    /**
     * 插屏延迟概率
     */
    NUM_IntersDelayP;

    /**
     * 插屏视频控制区域**************************
     */
    /**
     * 插屏视频延迟时间(ms)
     */
    NUM_IntersVideoDelayTime;
    /**
     * 插屏视频延迟展示概率0-100(%)
     */
    NUM_IntersVideoDelayP;

    /**
     * 原生控制区域******************************
     */
    /**
     * 原生广告刷新时间
     */
    NUM_NativeUpdateTime;


    /**
     * 桌面开关区域************************************
     */
    /**
     * 添加桌面图标开关
     */
    SW_AddDesktop;
    /**
     * 插屏间隔弹桌面图标开关
     */
    SW_IntersIntervalToAddDesktop;
    /**
     * 自动弹添加桌面次数
     */
    NUM_AutoAddDeskMostTimes;
    /**
     * 第几次插屏变添加桌面
     */
    NUM_IntersToAddDesktopNumber;


    /**
     * 互推区域
     */
    /**
     * 互推统计开关(默认开启)
     */
    SW_Statistics;
    /**
     * 互推icon开关
     */
    SW_NavigateIcon;
    /**
     * 互推列表开关
     */
    SW_NavigateGroup;
    /**
     * 结算互推开关
     */
    SW_NavigateSettle;
    /**
     * 互推游戏
     */
    pushGameList;






    /**
     * 方法区
     */
    // 创建广告
    createAd();

    // 互推
    startLoadPushGamaes();


    getChannelId();

    showBanner();
    hideBanner();

    getIntersFlag();
    showInters();

    getVideoFlag();
    showVideo(callback, reason?);

    getNativeIconFlag();
    showNativeIcon(width, height, x, y);
    hideNativeIcon();

    getNativeImageFlag();
    showNativeImage(width, height, x, y);
    hideNativeImage();

    getNativePasterFlag();
    showNativePaster();

    getNativeAdInfo(type);
    reportNativeAdShow(adId);
    reportNativeAdClick(adId);

    getNavigateIconFlag();
    showNavigateIcon(width, height, x, y);
    hideNavigateIcon();

    getNavigateGroupFlag();
    showNavigateGroup(type, side, size, y);
    hideNavigateGroup();

    getNavigateSettleFlag();
    showNavigateSettle(type, x, y);
    hideNavigateSettle();

    getNavigateBoxBannerFlag();
    showNavigateBoxBanner();
    hideNavigateBoxBanner();

    getNavigateBoxPortalFlag();

    showNavigateBoxPortal();

    setGroup(group);

    hasAddDesktopFunc();
    getAddDesktopFlag(callback);
    addDesktop(callback);

    phoneVibrate(type);

    startGameVideo(duration);
    pauseGameVideo();
    resumeGameVideo();
    stopGameVideo(callback);
    shareVideo(title, desc, topics, videoPath, callback);

    jumpToMoreGamesCenter();

    showMoreGamesBanner();
    hideMoreGamesBanner();

    showFavoriteGuide(type, content, position);

    getUserData(callback);
    getUserInfo(callback);

    getBoxFlag();
    showAppBox();

    getBlockFlag();
    showBlock(type, x, y, blockSize);
    hideBlock();

    getVideoIntersFlag();
    showVideoInters(callback);

    exitTheGame();

    reportAnalytics(params, data);

    showAuthentication(callback);

    visitorExperience(callback);

    showNativeAd(width, height, viewX, viewY);

    getOPPOShowMoreGameFlag();
    showOPPOMoreGame();

    hasNetwork(callback);

    showReviewAlert();

    showiOSADWithScene(key, type);
    showiOSADWithType(key, type);
    videoUIShow(key);

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback);

    getErrBannerFlag();

    showErrBanner(callback);
    hideErrBanner();

    getErrVideoFlag();

    buyProps(money, propId, propName, callback);
    payComplete(orderId);

}

import CheckConfig from "../utils/CheckConfig";
import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import LocalStorage from "../utils/LocalStorage";
import { AdInterface } from "./AdInterface";

export default class TencentqqAd implements AdInterface {
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
     * 盒子广告对象
     */
    boxAd = null;
    /**
     * 盒子广告是否加载成功
     */
    loadSucc_Box = false;



    /**
     * 积木广告对象
     */
    blockAd = null;
    /**
     * 积木广告是否加载成功
     */
    loadSucc_Block = false;
    /**
     * 当前总共查询积木广告加载是否成功的次数
     */
    NUM_CheckBlockLoadSucc = 0;
    /**
     * 最多查询积木广告加载是否成功的次数
     */
    NUM_MaxCheckBlockLoadSucc = 5;
    /**
     * 积木广告的参数
     */
    param_block = {
        blockSize: 5,
        blockType: "landscape",
        blockX: 32,
        blockY: 32,
    };
    /**
     * 积木广告刷新定时器
     */
    timeout_updateBlock = null;



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

        if (this.NUM_IntersIntervalTime > 0) this.runIntersInterval();

        if (this.SW_SystemBanner && this.ID_SystemBanner != "") this.createSystemBanner();
        if (this.SW_SystemInters && this.ID_SystemInters != "") this.createSystemInters();
        if (this.SW_Video && this.ID_Video != "") this.createVideo();
        if (this.SW_Box && this.ID_Box != "") this.createBox();
        if (this.ID_Block != "") this.createBlock();
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
        var windowWidth = Number(qq.getSystemInfoSync().windowWidth);
        // @ts-ignore
        var windowHeight = Number(qq.getSystemInfoSync().windowHeight);

        // @ts-ignore
        this.bannerAd = qq.createBannerAd({
            adUnitId: this.ID_SystemBanner,
            style: {
                left: 0,
                top: 0,
                width: (windowHeight > windowWidth) ? windowWidth : 400,//iOS似乎无法通过onResize重设banner宽高
                height: 120
            },
            testDemoType: "65"
        })

        this.bannerAd.onResize((size) => {
            if (windowHeight > windowWidth || cc.winSize.height > cc.winSize.width) {
                this.bannerAd.style.width = windowWidth;
                this.bannerAd.style.height = windowWidth;
            }
            else {
                this.bannerAd.style.width = windowWidth / 2;
                this.bannerAd.style.height = windowWidth / 2;
            }
            this.bannerAd.style.top = windowHeight - size.height;
            this.bannerAd.style.left = (windowWidth - size.width) / 2;
        })

        this.bannerAd.onLoad(() => {
            console.log("XminigameSDK", "QQ banner加载成功");
            this.loadSucc_SystemBanner = true;
            if (this.hasShowBanner) {
                this.showSystemBanner();
            }
        })

        this.bannerAd.onError((err) => {
            console.log("XminigameSDK", "QQ banner加载失败：", JSON.stringify(err))
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
        this.systemIntersAd = qq.createInterstitialAd({
            adUnitId: this.ID_SystemInters
        });

        //监听插屏广告加载完成
        this.systemIntersAd.onLoad(() => {
            console.log("XminigameSDK", "QQ 系统插屏广告加载完成")
            this.loadSucc_SystemInters = true
        })

        //监听插屏广告加载出错
        this.systemIntersAd.onError(err => {
            console.log("XminigameSDK", "QQ 系统插屏广告加载失败：" + JSON.stringify(err))
            this.loadSucc_SystemInters = false;
            setTimeout(() => {
                this.systemIntersAd && this.systemIntersAd.load()
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
        this.videoAd = qq.createRewardedVideoAd({
            adUnitId: this.ID_Video
        })

        //监听视屏广告加载完成
        this.videoAd.onLoad(() => {
            console.log("XminigameSDK", "QQ 视频广告加载完成")
            this.loadSucc_Video = true;
        })

        //监听视屏广告加载出错
        this.videoAd.onError(err => {
            console.log("XminigameSDK", "QQ 视频加载失败：", JSON.stringify(err))
            this.loadSucc_Video = false;
            setTimeout(() => {
                this.videoAd && this.videoAd.load()
            }, 30 * 1000)
        })

        //监听视屏广告播放完成
        this.videoAd.onClose(res => {
            setTimeout(() => {
                if (res.isEnded) {
                    console.log("XminigameSDK", "QQ 激励视频广告完成，发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(true);
                        this.videoAd.load();
                    }
                } else {
                    console.log("XminigameSDK", "QQ 激励视频广告取消，不发放奖励")
                    if (this.callback_Video) {
                        this.callback_Video(false);
                        this.videoAd.load();
                    }
                }
            }, 500);
        })

        // 加载一次
        this.videoAd.load();
    }

    /**
     * 创建盒子广告
     */
    createBox() {
        console.log("XminigameSDK", "--createBox--");
        if (CheckConfig.stringHasSpace(this.ID_Box)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道盒子广告ID中含有空字符串,请检查后台盒子广告ID*********************");
            return;
        }

        // @ts-ignore
        this.boxAd = qq.createAppBox({
            adUnitId: this.ID_Box
        });

        // 加载盒子广告
        this.boxAd.load().then(() => {
            console.log("XminigameSDK", "QQ 加载盒子广告完成===================");
            this.loadSucc_Box = true;
        })

        // 监听用户关闭盒子广告
        this.boxAd.onClose(() => {
            console.log("XminigameSDK", "QQ 关闭盒子广告");
            this.boxAd.load().then(() => {
                console.log("XminigameSDK", "QQ 加载盒子广告完成===================");
                this.loadSucc_Box = true;
            })
        })
    }

    /**
     * 创建积木广告
     */
    createBlock() {
        console.log("XminigameSDK", "--createBlock--");
        if (CheckConfig.stringHasSpace(this.ID_Block)) {
            console.log("XminigameSDK", "channelId:", GetConfig.getChannelId(), "当前渠道积木广告ID中含有空字符串,请检查后台积木广告ID*********************");
            return;
        }

        console.log("XminigameSDK", "this.param_block:", JSON.stringify(this.param_block));

        // @ts-ignore
        this.blockAd = qq.createBlockAd({
            adUnitId: this.ID_Block,
            size: this.param_block.blockSize,
            orientation: this.param_block.blockType,
            style: {
                left: this.param_block.blockX,
                top: this.param_block.blockY
            },
        })

        // 监听积木广告加载
        this.blockAd.onLoad(() => {
            console.log("XminigameSDK", "QQ 积木广告加载成功");
            this.loadSucc_Block = true;
        })

        // 监听积木广告错误
        this.blockAd.onError((err) => {
            this.NUM_CheckBlockLoadSucc++;
            console.log("XminigameSDK", this.NUM_CheckBlockLoadSucc, "QQ 积木广告加载失败：", JSON.stringify(err));
            if (this.NUM_CheckBlockLoadSucc >= this.NUM_MaxCheckBlockLoadSucc) return;
            this.loadSucc_Block = false;
            setTimeout(() => {
                this.createBlock();
            }, 20 * 1000);
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
        return this.loadSucc_SystemInters || (this.SW_AddDesktop && this.NUM_AutoAddDeskMostTimes > 0);
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
            console.log("XminigameSDK", "QQ showVideo========================")
            this.loadSucc_Video = false;
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
        this.AdGroup = group;
    }

    hasAddDesktopFunc() {
        return true;
    }

    getAddDesktopFlag(callback) {
        // @ts-ignore
        qg.hasShortcutInstalled({
            success: function (res) {
                // 判断图标未存在时，创建图标
                if (res == false) {
                    callback(true);
                }
            },
            fail: function (err) {
                console.log("XminigameSDK", JSON.stringify(err));
            },
            complete: function () { }
        })
    }

    addDesktop(callback) {
        // @ts-ignore
        qq.saveAppToDesktop({
            success: function () {
                console.log("XminigameSDK", "QQ 创建桌面图标成功")
                // 执行用户创建图标奖励
                callback(true);
            },
            fail: function (err) {
                console.log("XminigameSDK", "QQ 创建桌面图标失败：", JSON.stringify(err));
                callback(false);
            },
            complete: function () { }
        })
    }

    phoneVibrate(type) {
        if (type == "long") {
            // @ts-ignore
            qq.vibrateLong({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "QQ vibrateLong调用失败：", JSON.stringify(res));
                }
            });
        }
        else if (type == "short") {
            // @ts-ignore
            qq.vibrateShort({
                success(res) {
                },
                fail(res) {
                    console.log("XminigameSDK", "QQ vibrateShort调用失败：", JSON.stringify(res));
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
        console.log("XminigameSDK", "QQ getUserData=====================");
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
        return this.loadSucc_Box;
    }

    showAppBox() {
        if (this.loadSucc_Box && this.boxAd) {
            console.log("XminigameSDK", "QQ 展示盒子广告=====================");
            this.boxAd.show();
        }
    }

    getBlockFlag() {
        return this.loadSucc_Block;
    }

    showBlock(type, x, y, blockSize) {

        // @ts-ignore
        let windowWidth = Number(qq.getSystemInfoSync().windowWidth);
        // @ts-ignore
        let windowHeight = Number(qq.getSystemInfoSync().windowHeight);

        this.param_block = {
            blockX: x * (windowWidth / cc.winSize.width),
            blockY: (cc.winSize.height - y) * (windowHeight / cc.winSize.height),
            blockType: type,
            blockSize: blockSize,
        }
        if (this.ID_Block != "") this.createBlock();
        setTimeout(() => {
            console.log("XminigameSDK", "QQ showBlock=====================");
            this.blockAd.show();
        }, 500);
        this.timeout_updateBlock =
            setTimeout(() => {
                console.log("XminigameSDK", "QQ updateBlock=====================");
                this.blockAd.destroy();
                this.showBlock(type, x, y, blockSize);
            }, 30 * 1000)
    }

    hideBlock() {
        if (this.blockAd) {
            console.log("XminigameSDK", "QQ hideBlock=====================");
            this.blockAd.destroy();
        }
        if (this.timeout_updateBlock) clearTimeout(this.timeout_updateBlock);
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
            button.getComponent(cc.Widget).bottom = cc.winSize.height / 30;
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
                    qq.onShow((res) => {
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
        qq.offShow(() => {
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
        if (this.bannerAd) {
            console.log("XminigameSDK", "QQ showSystemBanner========================");
            this.hasShowBanner = true;
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
                console.log("XminigameSDK", "QQ updateSystemBanner========================");
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
            console.log("XminigameSDK", "QQ hideSystemBanner========================");
            this.bannerAd.hide();
        }

        if (this.interval_updateBanner) clearInterval(this.interval_updateBanner);
    }

    /**
     * 展示系统插屏
     */
    showSystemInters() {
        if (this.systemIntersAd && this.loadSucc_SystemInters) {
            console.log("XminigameSDK", "QQ showSystemBanner========================");
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

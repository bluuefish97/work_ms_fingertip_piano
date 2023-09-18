import GetConfig from "../utils/GetConfig";
import LoadRes from "../utils/LoadRes";
import { AdInterface } from "./AdInterface";

export default class TestAd implements AdInterface {
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
     * 正在展示的测试广告
     */
    /**
     * 已经调用showBanner
     */
    hasShowBanner = false;
    /**
     * 正在展示插屏
     */
    isShow_Inters = false;
    /**
     * 正在展示视频
     */
    isShow_Video = false;
    /**
     * 正在展示原生icon
     */
    isShow_NativeIcon = false;
    /**
     * 正在展示原生大图
     */
    isShow_NativeImage = false;
    /**
     * 正在展示互推icon
     */
    isShow_NavigateIcon = false;
    /**
     * 正在展示互推列表
     */
    isShow_NavigateGroup = false;
    /**
     * 正在展示结算互推
     */
    isShow_NavigateSettle = false;
    /**
     * 正在展示结算互推类型1
     */
    isShow_NavigateSettle1 = false;
    /**
     * 正在展示互推盒子横幅
     */
    isShow_NavigateBoxBanner = false;
    /**
     * 正在展示互推盒子九宫格
     */
    isShow_NavigateBoxPortal = false;
    /**
     * 正在展示更多游戏横幅
     */
    isShow_MoreGamesBanner = false;
    /**
     * 正在展示积木广告
     */
    isShow_Block = false;
    /**
     * 正在展示隐私协议
     */
    isShow_PrivacyAgreement = false;
    /**
     * 正在展示Wuchubanner
     */
    isShow_ErrBanner = false;



    /**
     * 测试节点区域
     */
    /**
     * 测试banner节点
     */
    node_testBanner = null;
    /**
     * 测试插屏节点
     */
    node_testInters = null;
    /**
     * 测试原生贴图节点
     */
    node_testNativePaster = null;
    /**
     * 测试视频节点
     */
    node_testVideo = null;
    /**
     * 测试原生icon节点
     */
    node_testNativeIcon = null;
    /**
     * 测试原生大图节点
     */
    node_testNativeImage = null;
    /**
     * 测试互推icon节点
     */
    node_testNavigateIcon = null;
    /**
     * 测试互推列表节点
     */
    node_testNavigateGroup = null;
    /**
     * 测试结算互推节点
     */
    node_testNavigateSettle = null;
    /**
     * 测试互推盒子横幅节点
     */
    node_testNavigateBoxBanner = null;
    /**
     * 测试互推盒子九宫格节点
     */
    node_testNavigateBoxPortal = null;
    /**
     * 测试更多游戏横幅节点
     */
    node_testMoreGamesBanner = null;
    /**
     * 测试积木节点
     */
    node_testBlock = null;
    /**
     * 测试隐私协议节点
     */
    node_testPrivacyAgreement = null;
    /**
     * 测试Wuchubanner节点
     */
    node_testErrBanner = null;


    /**
     * 测试Wuchubanner已调用showBanner
     */
    errBannerHasShowBanner = false;



    /**
     * 广告分组
     */
    AdGroup = "";




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
        if (this.isShow_NavigateSettle1) {
            console.log("XminigameSDK", "正在展示结算互推1,无法showBanner");
            return;
        }

        // 已经调用过showBanner
        if (this.hasShowBanner) {
            console.log("XminigameSDK", "已经调用过showBanner,请勿重复调用");
            return;
        }
        this.hasShowBanner = true;

        console.log("XminigameSDK", "Test showBanner==================");

        let testBannerRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBanner.png"
        ]

        LoadRes.loadResArray(testBannerRes, (err, texture) => {
            this.node_testBanner = new cc.Node("node_testBanner");
            this.getScene().addChild(this.node_testBanner);
            this.node_testBanner.addComponent(cc.Sprite);
            this.node_testBanner.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            this.node_testBanner.addComponent(cc.Widget);
            this.node_testBanner.getComponent(cc.Widget).isAlignHorizontalCenter = true;

            if (cc.winSize.width < cc.winSize.height) {
                this.node_testBanner.width = cc.winSize.width;
                this.node_testBanner.height = this.node_testBanner.width * 0.18;
            } else {
                this.node_testBanner.width = cc.winSize.width / 2;
                this.node_testBanner.height = this.node_testBanner.width * 0.18;
            }
            this.node_testBanner.y = this.node_testBanner.height / 2;
            this.node_testBanner.zIndex = 30000;
            if (this.AdGroup != "") this.node_testBanner.group = this.AdGroup;
        })

    }

    hideBanner() {
        this.hasShowBanner = false;
        if (this.node_testBanner) {
            console.log("XminigameSDK", "Test hideBanner==================");
            this.node_testBanner.removeFromParent();
            this.node_testBanner = null;
        }
    }

    getIntersFlag() {
        return true;
    }

    showInters() {
        // 正在展示插屏
        if (this.isShow_Inters) {
            console.log("XminigameSDK", "已经调用过showInters,请勿重复调用");
            return;
        }
        this.isShow_Inters = true;

        console.log("XminigameSDK", "Test showInters==================");

        let testIntersRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestIntersClose.png"
        ]

        LoadRes.loadResArray(testIntersRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testInters = new cc.Node("node_testInters");
            scene.addChild(this.node_testInters);
            this.node_testInters.addComponent(cc.Sprite);
            this.node_testInters.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);

            this.node_testInters.width = cc.winSize.width;
            this.node_testInters.height = cc.winSize.height;
            this.node_testInters.x = cc.winSize.width / 2;
            this.node_testInters.y = cc.winSize.height / 2;

            this.node_testInters.zIndex = 30003;
            this.node_testInters.opacity = 150;
            if (this.AdGroup != "") this.node_testInters.group = this.AdGroup;

            this.node_testInters.on(cc.Node.EventType.TOUCH_START, function (event) {
            })

            let text = new cc.Node("text");
            this.node_testInters.addChild(text);
            text.color = cc.Color.RED;
            text.addComponent(cc.Label);
            text.getComponent(cc.Label).string = "这是一个测试插屏,请点击右上角关闭";
            text.getComponent(cc.Label).fontSize = 50;
            text.getComponent(cc.Label).lineHeight = 50;

            let TestIntersClose = new cc.Node("TestIntersClose");
            this.node_testInters.addChild(TestIntersClose);
            TestIntersClose.addComponent(cc.Sprite);
            TestIntersClose.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
            TestIntersClose.x = cc.winSize.width / 2 * 3 / 4;
            TestIntersClose.y = cc.winSize.height / 2 * 3 / 5;
            TestIntersClose.zIndex = 30010;

            TestIntersClose.on(cc.Node.EventType.TOUCH_START, (event) => {
                console.log("XminigameSDK", "关闭测试插屏");
                this.isShow_Inters = false;
                this.node_testInters.removeFromParent();
                this.node_testInters = null;
            });
        })
    }

    getVideoFlag() {
        return true;
    }

    showVideo(videoCallback, reason?) {
        // 正在展示视频
        if (this.isShow_Video) {
            console.log("XminigameSDK", "已经调用过showVideo,请勿重复调用");
            return;
        }
        this.isShow_Video = true;

        console.log("XminigameSDK", "Test showVideo==================");

        let testVideoRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
        ]

        LoadRes.loadResArray(testVideoRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testVideo = new cc.Node("node_testVideo");
            scene.addChild(this.node_testVideo);
            this.node_testVideo.addComponent(cc.Sprite);
            this.node_testVideo.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            this.node_testVideo.addComponent(cc.Widget);
            this.node_testVideo.getComponent(cc.Widget).isAlignVerticalCenter = true;
            this.node_testVideo.getComponent(cc.Widget).isAlignHorizontalCenter = true;
            this.node_testVideo.width = cc.winSize.width;
            this.node_testVideo.height = cc.winSize.height;
            this.node_testVideo.opacity = 200;
            this.node_testVideo.zIndex = 29999;
            if (this.AdGroup != "") this.node_testVideo.group = this.AdGroup;
            this.node_testVideo.on(cc.Node.EventType.TOUCH_START, (event) => {
            });

            let titleLabel = new cc.Node("titleLabel");
            this.node_testVideo.addChild(titleLabel);
            titleLabel.addComponent(cc.Label);
            titleLabel.getComponent(cc.Label).fontSize = 50;
            titleLabel.getComponent(cc.Label).lineHeight = 50;
            titleLabel.getComponent(cc.Label).string = "视频播放回调的测试";
            titleLabel.width = cc.winSize.width;
            titleLabel.y = cc.winSize.height / 5;

            // 播放成功
            let succBtn = new cc.Node("succBtn");
            this.node_testVideo.addChild(succBtn);
            succBtn.addComponent(cc.Label);
            succBtn.getComponent(cc.Label).fontSize = 30;
            succBtn.getComponent(cc.Label).lineHeight = 30;
            succBtn.getComponent(cc.Label).string = "播放成功";
            succBtn.x = -cc.winSize.width / 5;
            succBtn.y = -cc.winSize.height / 5;
            succBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
                this.isShow_Video = false;
                this.node_testVideo.removeFromParent();
                this.node_testVideo = null;
                videoCallback(true);
            });

            // 播放失败
            let failBtn = new cc.Node("failBtn");
            this.node_testVideo.addChild(failBtn);
            failBtn.addComponent(cc.Label);
            failBtn.getComponent(cc.Label).fontSize = 30;
            failBtn.getComponent(cc.Label).lineHeight = 30;
            failBtn.getComponent(cc.Label).string = "播放失败";
            failBtn.x = cc.winSize.width / 5;
            failBtn.y = -cc.winSize.height / 5;
            failBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
                this.isShow_Video = false;
                this.node_testVideo.removeFromParent();
                this.node_testVideo = null;
                videoCallback(false);
            });
        })
    }

    getNativeIconFlag() {
        return true;
    }

    showNativeIcon(width, height, x, y) {
        if (this.isShow_NativeIcon) {
            console.log("XminigameSDK", "已经调用过showNativeIcon,请勿重复调用");
            return;
        }
        this.isShow_NativeIcon = true;

        console.log("XminigameSDK", "Test showNativeIcon==================");

        let testNativeIconRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNativeIcon.png",
        ]

        LoadRes.loadResArray(testNativeIconRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testNativeIcon = new cc.Node("node_testNativeIcon");
            scene.addChild(this.node_testNativeIcon);
            this.node_testNativeIcon.addComponent(cc.Sprite);
            this.node_testNativeIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);

            this.node_testNativeIcon.width = width;
            this.node_testNativeIcon.height = height;
            this.node_testNativeIcon.x = x;
            this.node_testNativeIcon.y = y;
            this.node_testNativeIcon.zIndex = 29999;
            if (this.AdGroup != "") this.node_testNativeIcon.group = this.AdGroup;
        });
    }

    hideNativeIcon() {
        this.isShow_NativeIcon = false;
        if (this.node_testNativeIcon) {
            console.log("XminigameSDK", "Test hideNativeIcon==================");
            this.node_testNativeIcon.removeFromParent();
            this.node_testNativeIcon = null;
        }
    }

    getNativeImageFlag() {
        return true;
    }

    showNativeImage(width, height, x, y) {
        if (this.isShow_NativeImage) {
            console.log("XminigameSDK", "已经调用过showNativeImage,请勿重复调用");
            return;
        }
        this.isShow_NativeImage = true;

        console.log("XminigameSDK", "Test showNativeImage==================");

        let testNativeImageRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNativeImage.png",
        ]

        LoadRes.loadResArray(testNativeImageRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testNativeImage = new cc.Node("node_testNativeImage");
            scene.addChild(this.node_testNativeImage);
            this.node_testNativeImage.addComponent(cc.Sprite);
            this.node_testNativeImage.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);

            this.node_testNativeImage.width = width;
            this.node_testNativeImage.height = height;
            this.node_testNativeImage.x = x;
            this.node_testNativeImage.y = y;
            this.node_testNativeImage.zIndex = 29999;
            if (this.AdGroup != "") this.node_testNativeImage.group = this.AdGroup;
        });
    }

    hideNativeImage() {
        this.isShow_NativeImage = false;
        if (this.node_testNativeImage) {
            console.log("XminigameSDK", "Test hideNativeImage==================");
            this.node_testNativeImage.removeFromParent();
            this.node_testNativeImage = null;
        }
    }

    getNativePasterFlag() {
        return true;
    }
    showNativePaster() {
        console.log("XminigameSDK", "Test showNativePaster==================");

        let testNativePasterRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestIntersClose.png"
        ]

        LoadRes.loadResArray(testNativePasterRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testNativePaster = new cc.Node("node_testNativePaster");
            scene.addChild(this.node_testNativePaster);
            this.node_testNativePaster.addComponent(cc.Sprite);
            this.node_testNativePaster.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);

            this.node_testNativePaster.width = cc.winSize.width;
            this.node_testNativePaster.height = cc.winSize.height;
            this.node_testNativePaster.x = cc.winSize.width / 2;
            this.node_testNativePaster.y = cc.winSize.height / 2;

            this.node_testNativePaster.zIndex = 30003;
            this.node_testNativePaster.opacity = 150;
            if (this.AdGroup != "") this.node_testNativePaster.group = this.AdGroup;

            this.node_testNativePaster.on(cc.Node.EventType.TOUCH_START, function (event) {
            })

            let text = new cc.Node("text");
            this.node_testNativePaster.addChild(text);
            text.color = cc.Color.RED;
            text.addComponent(cc.Label);
            text.getComponent(cc.Label).string = "这是一个测试原生贴片,请点击右上角关闭";
            text.getComponent(cc.Label).fontSize = 50;
            text.getComponent(cc.Label).lineHeight = 50;

            let TestIntersClose = new cc.Node("TestIntersClose");
            this.node_testNativePaster.addChild(TestIntersClose);
            TestIntersClose.addComponent(cc.Sprite);
            TestIntersClose.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
            TestIntersClose.x = cc.winSize.width / 2 * 3 / 4;
            TestIntersClose.y = cc.winSize.height / 2 * 3 / 5;
            TestIntersClose.zIndex = 30010;

            TestIntersClose.on(cc.Node.EventType.TOUCH_START, (event) => {
                console.log("XminigameSDK", "关闭测试原生贴片");
                this.isShow_Inters = false;
                this.node_testNativePaster.removeFromParent();
                this.node_testNativePaster = null;
            });
        })
    }

    getNativeAdInfo(type) {
        console.log("XminigameSDK", "Test getNativeAdInfo==================");
        return {
            adId: "88888888",
            title: "测试标题",
            desc: "测试详情",
            Native_icon: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdIcon.png",
            Native_BigImage: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdImage.png",
            NativeAdTip: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdAdTip.png",
            NativeClose: "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestGetNativeAdClose.png",
        }
    }

    reportNativeAdShow(adId) {
        console.log("XminigameSDK", "Test reportNativeAdShow==================", adId);
    }
    reportNativeAdClick(adId) {
        console.log("XminigameSDK", "Test reportNativeAdClick==================", adId);
    }

    getNavigateIconFlag() {
        return true;
    }

    showNavigateIcon(width, height, x, y) {
        if (this.isShow_NavigateIcon) {
            console.log("XminigameSDK", "已经调用过showNavigateIcon,请勿重复调用");
            return;
        }
        this.isShow_NavigateIcon = true;

        console.log("XminigameSDK", "Test showNavigateIcon==================");

        let testNavigateIconRes = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateIcon.png",
        ]

        LoadRes.loadResArray(testNavigateIconRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testNavigateIcon = new cc.Node("node_testNavigateIcon");
            scene.addChild(this.node_testNavigateIcon);
            this.node_testNavigateIcon.addComponent(cc.Sprite);
            this.node_testNavigateIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);

            this.node_testNavigateIcon.width = width;
            this.node_testNavigateIcon.height = height;
            this.node_testNavigateIcon.x = x;
            this.node_testNavigateIcon.y = y;
            this.node_testNavigateIcon.zIndex = 29999;
            if (this.AdGroup != "") this.node_testNavigateIcon.group = this.AdGroup;
        });
    }

    hideNavigateIcon() {
        this.isShow_NavigateIcon = false;
        if (this.node_testNavigateIcon) {
            console.log("XminigameSDK", "Test hideNavigateIcon==================");
            this.node_testNavigateIcon.removeFromParent();
            this.node_testNavigateIcon = null;
        }
    }

    getNavigateGroupFlag() {
        return true;
    }

    showNavigateGroup(type, side, size, y) {
        if (this.isShow_NavigateGroup) {
            console.log("XminigameSDK", "已经调用过showNavigateGroup,请勿重复调用");
            return;
        }
        this.isShow_NavigateGroup = true;

        console.log("XminigameSDK", "Test showNavigateGroup==================");

        let scene = this.getScene();
        this.node_testNavigateGroup = new cc.Node("node_testNavigateGroup");
        scene.addChild(this.node_testNavigateGroup);
        this.node_testNavigateGroup.x = cc.winSize.width / 2;
        this.node_testNavigateGroup.y = cc.winSize.height / 2;

        let testNavigateGroupRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupIconBtn.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupLeftTuck.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupRightTuck.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupListLeft.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateGroupListRight.png",
            ]

        LoadRes.loadResArray(testNavigateGroupRes, (err, texture) => {
            let TestNavigateGroupIconBtn = new cc.Node("TestNavigateGroupIconBtn");
            this.node_testNavigateGroup.addChild(TestNavigateGroupIconBtn);
            TestNavigateGroupIconBtn.addComponent(cc.Sprite);
            TestNavigateGroupIconBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            TestNavigateGroupIconBtn.width = size;
            TestNavigateGroupIconBtn.height = size;
            // 如果参数side是left,默认互推列表icon在左侧中间
            if (side == "left") {
                // 互推列表icon在左侧中间
                TestNavigateGroupIconBtn.x = TestNavigateGroupIconBtn.width / 2 - cc.winSize.width / 2;
                TestNavigateGroupIconBtn.y = y;
            } else {
                // 互推列表icon在右侧中间
                TestNavigateGroupIconBtn.x = cc.winSize.width / 2 - TestNavigateGroupIconBtn.width / 2;
                TestNavigateGroupIconBtn.y = y;
            }

            let isOpenNavigateGroup = false;

            // 在左侧打开或在右侧打开互推列表
            let openNavigateGroup = (left: boolean) => {
                TestNavigateGroupIconBtn.active = false;
                if (left) {
                    console.log("XminigameSDK", "在左侧打开互推游戏列表");
                    // 互推游戏列表 左
                    let TestNavigateGroupListLeft = new cc.Node("TestNavigateGroupListLeft");
                    this.node_testNavigateGroup.addChild(TestNavigateGroupListLeft);
                    TestNavigateGroupListLeft.addComponent(cc.Sprite);
                    TestNavigateGroupListLeft.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[3]);
                    // 竖屏
                    TestNavigateGroupListLeft.height = cc.winSize.height / 2;
                    TestNavigateGroupListLeft.width = TestNavigateGroupListLeft.height / 4.8;
                    TestNavigateGroupListLeft.x = -TestNavigateGroupListLeft.width / 2 - cc.winSize.width / 2;
                    TestNavigateGroupListLeft.y = 0;
                    cc.tween(TestNavigateGroupListLeft)
                        .by(0.2, { position: cc.v3(TestNavigateGroupListLeft.width, 0, 0) })
                        .call(() => {
                            isOpenNavigateGroup = true;
                        })
                        .start();

                    // 左侧缩进按钮
                    let leftTuck = new cc.Node();
                    TestNavigateGroupListLeft.addChild(leftTuck);
                    leftTuck.addComponent(cc.Sprite);
                    leftTuck.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
                    leftTuck.width = TestNavigateGroupListLeft.width * 0.5;
                    leftTuck.height = leftTuck.width * 1.2;
                    leftTuck.x = TestNavigateGroupListLeft.width * 0.65;
                    leftTuck.y = TestNavigateGroupListLeft.height * 0.3;
                    leftTuck.on(cc.Node.EventType.TOUCH_END, () => {
                        if (!isOpenNavigateGroup) return;
                        cc.tween(TestNavigateGroupListLeft)
                            .by(0.5, { position: cc.v3(-TestNavigateGroupListLeft.width, 0, 0) })
                            .call(() => {
                                isOpenNavigateGroup = false;
                                TestNavigateGroupIconBtn.active = true;
                                TestNavigateGroupIconBtn.width = size;
                                TestNavigateGroupIconBtn.height = size;
                                TestNavigateGroupListLeft.destroy();
                            })
                            .start();
                    })

                } else {
                    console.log("XminigameSDK", "在右侧打开互推游戏列表");
                    // 互推游戏列表 右
                    let TestNavigateGroupListRight = new cc.Node("TestNavigateGroupListRight");
                    this.node_testNavigateGroup.addChild(TestNavigateGroupListRight);
                    TestNavigateGroupListRight.addComponent(cc.Sprite);
                    TestNavigateGroupListRight.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[4]);
                    // 竖屏
                    TestNavigateGroupListRight.height = cc.winSize.height / 2;
                    TestNavigateGroupListRight.width = TestNavigateGroupListRight.height / 4.8;
                    TestNavigateGroupListRight.x = TestNavigateGroupListRight.width / 2 + cc.winSize.width / 2;
                    TestNavigateGroupListRight.y = 0;
                    cc.tween(TestNavigateGroupListRight)
                        .by(0.2, { position: cc.v3(-TestNavigateGroupListRight.width, 0, 0) })
                        .call(() => {
                            isOpenNavigateGroup = true;
                        })
                        .start();

                    // 右侧缩进按钮
                    let rightTuck = new cc.Node();
                    TestNavigateGroupListRight.addChild(rightTuck);
                    rightTuck.addComponent(cc.Sprite);
                    rightTuck.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[2]);
                    rightTuck.width = TestNavigateGroupListRight.width * 0.5;
                    rightTuck.height = rightTuck.width * 1.2;
                    rightTuck.x = -TestNavigateGroupListRight.width * 0.65;
                    rightTuck.y = TestNavigateGroupListRight.height * 0.3;
                    rightTuck.on(cc.Node.EventType.TOUCH_END, () => {
                        if (!isOpenNavigateGroup) return;
                        cc.tween(TestNavigateGroupListRight)
                            .by(0.5, { position: cc.v3(TestNavigateGroupListRight.width, 0, 0) })
                            .call(() => {
                                isOpenNavigateGroup = false;
                                TestNavigateGroupIconBtn.active = true;
                                TestNavigateGroupIconBtn.width = size;
                                TestNavigateGroupIconBtn.height = size;
                                TestNavigateGroupListRight.destroy();
                            })
                            .start();
                    })
                }
            }

            TestNavigateGroupIconBtn.on(cc.Node.EventType.TOUCH_END, () => {
                if (TestNavigateGroupIconBtn.x <= 0) {
                    openNavigateGroup(true);
                } else {
                    openNavigateGroup(false);
                }
            })
        })
    }

    hideNavigateGroup() {
        this.isShow_NavigateGroup = false;
        if (this.node_testNavigateGroup) {
            console.log("XminigameSDK", "Test hideNavigateGroup==================");
            this.node_testNavigateGroup.removeFromParent();
            this.node_testNavigateGroup = null;
        }
    }

    getNavigateSettleFlag() {
        return true;
    }

    showNavigateSettle(type, x, y) {
        if (type != 1 && type != 2) {
            console.log("XminigameSDK", "结算互推只存在类型1和类型2 return");
            return;
        }

        if (this.isShow_NavigateSettle) {
            console.log("XminigameSDK", "已经调用过showNavigateSettle,请勿重复调用");
            return;
        }
        this.isShow_NavigateSettle = true;

        if (type == 1 && (cc.winSize.height / cc.winSize.width) <= (16 / 9)) {
            console.log("XminigameSDK", "该游戏为横屏游戏或设备分辨率低于16/9 改为展示类型2");
            type = 2;
            y = 0;
        }

        console.log("XminigameSDK", "Test showNavigateSettle==================");

        let testNavigateSettleRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateSettle1.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateSettle4.png",
            ]

        LoadRes.loadResArray(testNavigateSettleRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testNavigateSettle = new cc.Node("node_testNavigateSettle");
            scene.addChild(this.node_testNavigateSettle);
            if (this.AdGroup != "") this.node_testNavigateSettle.group = this.AdGroup;
            this.node_testNavigateSettle.zIndex = 30000;

            switch (type) {
                case 1:
                    {
                        this.isShow_NavigateSettle1 = true;
                        this.hideBanner();

                        this.node_testNavigateSettle.addComponent(cc.Sprite);
                        this.node_testNavigateSettle.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
                        if (cc.winSize.width < cc.winSize.height) {
                            this.node_testNavigateSettle.width = cc.winSize.width * 9 / 10;
                            this.node_testNavigateSettle.height = this.node_testNavigateSettle.width * 2 / 3;
                        } else {
                            this.node_testNavigateSettle.width = cc.winSize.height * 9 / 10;
                            this.node_testNavigateSettle.height = this.node_testNavigateSettle.width * 2 / 3;
                        }
                        // 横坐标默认居中,纵坐标默认贴近底部
                        this.node_testNavigateSettle.x = cc.winSize.width / 2;
                        this.node_testNavigateSettle.y = this.node_testNavigateSettle.height / 2 + y;
                    }
                    break;
                case 2:
                    {
                        this.node_testNavigateSettle.addComponent(cc.Sprite);
                        this.node_testNavigateSettle.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
                        if (cc.winSize.width < cc.winSize.height) {
                            this.node_testNavigateSettle.width = cc.winSize.width;
                            this.node_testNavigateSettle.height = this.node_testNavigateSettle.width * 0.3;
                        } else {
                            this.node_testNavigateSettle.width = cc.winSize.width / 2;
                            this.node_testNavigateSettle.height = this.node_testNavigateSettle.width * 0.25;
                        }
                        // 横坐标默认居中,纵坐标默认贴近底部
                        this.node_testNavigateSettle.x = cc.winSize.width / 2;
                        this.node_testNavigateSettle.y = this.node_testNavigateSettle.height / 2 + y;
                    }
                    break;
                default:
                    break;
            }
        })
    }

    hideNavigateSettle() {
        this.isShow_NavigateSettle = false;
        this.isShow_NavigateSettle1 = false;
        if (this.node_testNavigateSettle) {
            console.log("XminigameSDK", "Test hideNavigateSettle==================");
            this.node_testNavigateSettle.removeFromParent();
            this.node_testNavigateSettle = null;
        }
    }

    getNavigateBoxBannerFlag() {
        return true;
    }

    showNavigateBoxBanner() {
        if (this.isShow_NavigateBoxBanner) {
            console.log("XminigameSDK", "已经调用过showNavigateBoxBanner,请勿重复调用");
            return;
        }
        this.isShow_NavigateBoxBanner = true;

        this.hideBanner();

        console.log("XminigameSDK", "Test showNavigateBoxBanner==================");

        let testNavigateBoxBannerRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateBoxBanner.png",
            ]

        LoadRes.loadResArray(testNavigateBoxBannerRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testNavigateBoxBanner = new cc.Node("node_testNavigateBoxBanner");
            scene.addChild(this.node_testNavigateBoxBanner);
            if (this.AdGroup != "") this.node_testNavigateBoxBanner.group = this.AdGroup;
            this.node_testNavigateBoxBanner.zIndex = 30000;
            this.node_testNavigateBoxBanner.addComponent(cc.Sprite);
            this.node_testNavigateBoxBanner.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            if (cc.winSize.width < cc.winSize.height) {
                this.node_testNavigateBoxBanner.width = cc.winSize.width * 9 / 10;
                this.node_testNavigateBoxBanner.height = this.node_testNavigateBoxBanner.width / 3;
            } else {
                this.node_testNavigateBoxBanner.width = cc.winSize.height * 9 / 10;
                this.node_testNavigateBoxBanner.height = this.node_testNavigateBoxBanner.width / 3;
            }
            // 横坐标默认居中,纵坐标默认贴近底部
            this.node_testNavigateBoxBanner.x = cc.winSize.width / 2;
            this.node_testNavigateBoxBanner.y = this.node_testNavigateBoxBanner.height / 2;
        })
    }

    hideNavigateBoxBanner() {
        this.isShow_NavigateBoxBanner = false;
        if (this.node_testNavigateBoxBanner) {
            console.log("XminigameSDK", "Test hideNavigateBoxBanner==================");
            this.node_testNavigateBoxBanner.removeFromParent();
            this.node_testNavigateBoxBanner = null;
        }
    }

    getNavigateBoxPortalFlag() {
        return true;
    }

    showNavigateBoxPortal() {
        if (this.isShow_NavigateBoxPortal) {
            console.log("XminigameSDK", "已经调用过showNavigateBoxPortal,请勿重复调用");
            return;
        }
        this.isShow_NavigateBoxPortal = true;

        let tempHasShowBanner = this.hasShowBanner;
        this.hideBanner();

        console.log("XminigameSDK", "Test showNavigateBoxPortal==================");

        let testNavigateBoxPortalRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateBoxPortal.png",
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestNavigateBoxPortalClose.png",
            ]

        LoadRes.loadResArray(testNavigateBoxPortalRes, (err, texture) => {
            let scene = this.getScene();
            // 背景
            this.node_testNavigateBoxPortal = new cc.Node("TestBlackBg");
            scene.addChild(this.node_testNavigateBoxPortal);
            this.node_testNavigateBoxPortal.addComponent(cc.Sprite);
            this.node_testNavigateBoxPortal.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            this.node_testNavigateBoxPortal.addComponent(cc.Widget);
            this.node_testNavigateBoxPortal.getComponent(cc.Widget).isAlignVerticalCenter = true;
            this.node_testNavigateBoxPortal.getComponent(cc.Widget).isAlignHorizontalCenter = true;
            this.node_testNavigateBoxPortal.width = cc.winSize.width;
            this.node_testNavigateBoxPortal.height = cc.winSize.height;
            this.node_testNavigateBoxPortal.zIndex = 30000;
            if (this.AdGroup != "") this.node_testNavigateBoxPortal.group = this.AdGroup;

            // 九宫格
            let testNavigateBoxPortal = new cc.Node("testNavigateBoxPortal");
            this.node_testNavigateBoxPortal.addChild(testNavigateBoxPortal);
            testNavigateBoxPortal.addComponent(cc.Sprite);
            testNavigateBoxPortal.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
            testNavigateBoxPortal.width = 520;
            testNavigateBoxPortal.height = 628;

            // 关闭按钮
            let TestNavigateBoxPortalClose = new cc.Node("TestNavigateBoxPortalClose");
            testNavigateBoxPortal.addChild(TestNavigateBoxPortalClose);
            TestNavigateBoxPortalClose.addComponent(cc.Sprite);
            TestNavigateBoxPortalClose.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[2]);
            TestNavigateBoxPortalClose.width = 50;
            TestNavigateBoxPortalClose.height = 50;
            TestNavigateBoxPortalClose.x = testNavigateBoxPortal.width / 2 - TestNavigateBoxPortalClose.width / 2;
            TestNavigateBoxPortalClose.y = testNavigateBoxPortal.height * 13 / 32 - TestNavigateBoxPortalClose.height / 2;
            TestNavigateBoxPortalClose.on(cc.Node.EventType.TOUCH_START, (event) => {
                if (this.node_testNavigateBoxPortal) {
                    this.node_testNavigateBoxPortal.removeFromParent();
                    this.node_testNavigateBoxPortal = null;
                }
                if (tempHasShowBanner) {
                    this.showBanner();
                }
            });

        })

    }

    setGroup(group) {
        this.AdGroup = group;
    }

    hasAddDesktopFunc() {
        return true;
    }

    getAddDesktopFlag(callback) {
        callback(true);
    }

    addDesktop(callback) {
        callback(true);
    }

    phoneVibrate(type) {
    }

    startGameVideo(duration) {
        console.log("XminigameSDK", "Test startGameVideo==================", duration);
    }
    pauseGameVideo() {
        console.log("XminigameSDK", "Test pauseGameVideo==================");
    }
    resumeGameVideo() {
        console.log("XminigameSDK", "Test resumeGameVideo==================");
    }
    stopGameVideo(callback) {
        console.log("XminigameSDK", "Test stopGameVideo==================");
        callback("0");
    }
    shareVideo(title, desc, topics, videoPath, callback) {
        console.log("XminigameSDK", "Test shareVideo==================");
        callback(true);
    }

    jumpToMoreGamesCenter() {
        console.log("XminigameSDK", "Test jumpToMoreGamesCenter==================");
    }

    showMoreGamesBanner() {
        console.log("XminigameSDK", "Test showMoreGamesBanner==================");
        if (this.isShow_MoreGamesBanner) {
            console.log("XminigameSDK", "已经调用过showMoreGamesBanner,请勿重复调用");
            return;
        }
        this.isShow_MoreGamesBanner = true;

        this.hideBanner();

        console.log("XminigameSDK", "Test showMoreGamesBanner==================");

        let testMoreGamesBannerRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestMoreGamesBanner.png",
            ]

        LoadRes.loadResArray(testMoreGamesBannerRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testMoreGamesBanner = new cc.Node("node_testMoreGamesBanner");
            scene.addChild(this.node_testMoreGamesBanner);
            this.node_testMoreGamesBanner.addComponent(cc.Sprite);
            this.node_testMoreGamesBanner.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            this.node_testMoreGamesBanner.addComponent(cc.Widget);
            this.node_testMoreGamesBanner.getComponent(cc.Widget).isAlignBottom = true;
            this.node_testMoreGamesBanner.getComponent(cc.Widget).isAlignHorizontalCenter = true;
            this.node_testMoreGamesBanner.width = 900;
            this.node_testMoreGamesBanner.height = 312;
            this.node_testMoreGamesBanner.zIndex = 30000;
            if (this.AdGroup != "") this.node_testMoreGamesBanner.group = this.AdGroup;
        })
    }

    hideMoreGamesBanner() {
        this.isShow_MoreGamesBanner = false;
        if (this.node_testMoreGamesBanner) {
            console.log("XminigameSDK", "Test hideMoreGamesBanner==================");
            this.node_testMoreGamesBanner.removeFromParent();
            this.node_testMoreGamesBanner = null;
        }
    }

    showFavoriteGuide(type, content, position) {
        console.log("XminigameSDK", "Test showFavoriteGuide==================");
        console.log("XminigameSDK", "Test 没有测试收藏引导");
    }

    getUserData(callback) {
        console.log("XminigameSDK", "Test getUserData==================");
        let userData = {
            userId: "testUserId",
            token: "testToken",
            userType: 1,//用户类型
        }
        callback(userData);
    }

    getUserInfo(callback) {
        console.log("XminigameSDK", "Test getUserInfo==================");
        let userInfo = {
            head: "",
            name: "",
            sex: "",
            city: "",
            province: "",
            country: "",
            power: true //已授权用户
        }
        callback(userInfo);
    }

    getBoxFlag() {
        return false;
    }
    showAppBox() {
        console.log("XminigameSDK", "Test showAppBox==================");
        console.log("XminigameSDK", "Test 没有测试盒子广告");
    }

    getBlockFlag() {
        return true;
    }

    showBlock(type, x, y, blockSize) {
        if (this.isShow_Block) {
            console.log("XminigameSDK", "已经调用过showBlock,请勿重复调用");
            return;
        }
        this.isShow_Block = true;

        console.log("XminigameSDK", "Test showBlock==================");

        let testBlockRes =
            [
                "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlockIcon.png",
            ]
        LoadRes.loadResArray(testBlockRes, (err, texture) => {
            let scene = this.getScene();
            this.node_testBlock = new cc.Node("node_testBlock");
            scene.addChild(this.node_testBlock);
            this.node_testBlock.addComponent(cc.Sprite);
            this.node_testBlock.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            this.node_testBlock.width = 200;
            this.node_testBlock.height = 200;
            this.node_testBlock.x = x + this.node_testBlock.width / 2;
            this.node_testBlock.y = y - this.node_testBlock.height / 2;
            this.node_testBlock.zIndex = 29999;
            if (this.AdGroup != '') this.node_testBlock.group = this.AdGroup;
        })
    }

    hideBlock() {
        this.isShow_Block = false;
        if (this.node_testBlock) {
            console.log("XminigameSDK", "Test hideBlock==================");
            this.node_testBlock.removeFromParent();
            this.node_testBlock = null;
        }
    }

    getVideoIntersFlag() {
        return true;
    }
    showVideoInters(callback) {
        console.log("XminigameSDK", "Test showVideoInters==================");
        callback(true);
    }

    exitTheGame() {
        console.log("XminigameSDK", "Test exitTheGame==================");
    }

    reportAnalytics(params, data) {
        console.log("XminigameSDK", "Test reportAnalytics==================");
    }

    showAuthentication(callback) {
        console.log("XminigameSDK", "Test showAuthentication==================");
    }

    visitorExperience(callback) {
        console.log("XminigameSDK", "Test visitorExperience==================");
    }

    showNativeAd(width, height, viewX, viewY) {
        console.log("XminigameSDK", "Test showNativeAd==================");
    }

    getOPPOShowMoreGameFlag() {
        return true;
    }
    showOPPOMoreGame() {
        console.log("XminigameSDK", "Test showOPPOMoreGame==================");
    }

    hasNetwork(callback) {
        console.log("XminigameSDK", "Test hasNetwork==================");
        callback(true);
    }

    showReviewAlert() {
        console.log("XminigameSDK", "Test showReviewAlert==================");
    }

    showiOSADWithScene(key, type) {
        console.log("XminigameSDK", "Test showiOSADWithScene==================");
    }

    showiOSADWithType(key, type) {
        console.log("XminigameSDK", "Test showiOSADWithType==================");
    }

    videoUIShow(key) {
        console.log("XminigameSDK", "Test videoUIShow==================");
    }

    showPrivacyAgreement(companyLogUrl, htmlUrl, callback) {
        if (this.isShow_PrivacyAgreement) {
            console.log("XminigameSDK", "已经调用过showPrivacyAgreement,请勿重复调用");
            return;
        }
        this.isShow_PrivacyAgreement = true;

        console.log("XminigameSDK", "Test showPrivacyAgreement==================");

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

            this.node_testPrivacyAgreement = new cc.Node("node_testPrivacyAgreement");
            scene.addChild(this.node_testPrivacyAgreement);
            this.node_testPrivacyAgreement.x = cc.winSize.width / 2;
            this.node_testPrivacyAgreement.y = cc.winSize.height / 2;
            if (cc.winSize.width < cc.winSize.height) {
                this.node_testPrivacyAgreement.scale = cc.view.getDesignResolutionSize().width / 1080;
            } else {
                this.node_testPrivacyAgreement.scale = cc.view.getDesignResolutionSize().height / 1080;
            }
            if (this.AdGroup != "") this.node_testPrivacyAgreement.group = this.AdGroup;
            this.node_testPrivacyAgreement.zIndex = 30000;

            let main = new cc.Node("main");
            this.node_testPrivacyAgreement.addChild(main);
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
                console.log("XminigameSDK", "点击隐私协议");
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
        return true;
    }

    showErrBanner(callback) {
        if (this.isShow_ErrBanner) {
            console.log("XminigameSDK", "已经调用过showErrBanner,请勿重复调用");
            return;
        }
        this.isShow_ErrBanner = true;

        this.hideBanner();

        console.log("XminigameSDK", "Test showErrBanner==================");

        let errBannerResArr = [
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestBlackBg.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestErrBannerReward.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestErrBannerButton.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestErrBannerProgress.png",
            "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Test/TestErrBannerBar.png",
        ]

        let scene = this.getScene();

        this.node_testErrBanner = new cc.Node("node_testErrBanner");
        scene.addChild(this.node_testErrBanner);
        if (this.AdGroup != "") this.node_testErrBanner.group = this.AdGroup;

        LoadRes.loadResArray(errBannerResArr, (err, texture) => {
            // 背景
            let errBannerBg = new cc.Node("errBannerBg");
            this.node_testErrBanner.addChild(errBannerBg);
            errBannerBg.addComponent(cc.Sprite);
            errBannerBg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]);
            errBannerBg.width = cc.winSize.width;
            errBannerBg.height = cc.winSize.height;
            errBannerBg.x = cc.winSize.width / 2;
            errBannerBg.y = cc.winSize.height / 2;
            errBannerBg.opacity = 200;

            // 神秘奖励
            let reward = new cc.Node("reward");
            this.node_testErrBanner.addChild(reward);
            reward.addComponent(cc.Sprite);
            reward.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
            reward.width = cc.winSize.width * 0.62;
            reward.height = reward.width * 1.15;
            reward.x = cc.winSize.width / 2;
            reward.y = cc.winSize.height * 0.7;

            // 点击按钮
            let button = new cc.Node("button");
            this.node_testErrBanner.addChild(button);
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
            this.node_testErrBanner.addChild(progressBar);
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
                    this.showBanner();
                    this.errBannerHasShowBanner = true;
                    setTimeout(() => {
                        this.hideBanner();
                    }, 2000);
                }
                if (pBar >= 0.99) {
                    if (interval_barCutDown != null) clearInterval(interval_barCutDown);
                    this.hideErrBanner();
                    callback(true);
                }
                // console.log("pBar:", pBar);
            })
        })
    }

    hideErrBanner() {
        this.isShow_ErrBanner = false;
        this.errBannerHasShowBanner = false;
        if (this.node_testErrBanner) {
            console.log("XminigameSDK", "Test hideErrBanner==================");
            this.node_testErrBanner.removeFromParent();
            this.node_testErrBanner = null;
        }
    }

    getErrVideoFlag() {
        return false;
    }

    buyProps(money, propId, propName, callback) {
        callback(true, "testOrderId");
    }

    payComplete(orderId) {
        console.log("XminigameSDK", "Test payComplete==================", orderId);
    }


    /**
     * 内部方法
     */
    getScene() {
        return cc.director.getScene();
    }

    hidePrivacyAgreement() {
        this.isShow_PrivacyAgreement = false;
        if (this.node_testPrivacyAgreement) {
            console.log("XminigameSDK", "Test hidePrivacyAgreement==================");
            this.node_testPrivacyAgreement.removeFromParent();
            this.node_testPrivacyAgreement = null;
        }
    }

}

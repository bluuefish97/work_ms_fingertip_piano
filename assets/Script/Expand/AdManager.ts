
import ASCAd from "../../SDK/ASCAd";
import { Platform } from "../Common/CommonEnum";
import CommonGlobal from "../Common/CommonGlobal";
import GameManager from "../Common/GameManager";
import TipsManager from "../Common/TipsManager";
import audioEngineMamager from "./audioEngineMamager";
import NativeBanner from "./NativeBanner";

export default class AdManager {
    private static videoCallback;//视频回调函数
    private static videoInsertCallback;//视频回调函数

    /**是否有视频广告*/
    public static hasVideo() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return true
        return ASCAd.getInstance().getVideoFlag();
    };

    /**
     * 展示视频广告
     * @param callback 视频播放完成回调
     */
    public static showVideo(callback) {
        //广告播放完成回调
        this.videoCallback = function (isEnd) {
            audioEngineMamager.getInstance().setMusicVolume(CommonGlobal.getInstance().userData.BgSoundScale);//恢复声音
            audioEngineMamager.getInstance().setAllEffectsVolunm(1);
            if (isEnd) {
                console.log("广告播放完成")
            }
            else {
                console.log("广告播放未完成")
                TipsManager.getInstance().showTips("广告播放未完成");
            }
            callback(isEnd);
        };

        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) {
            this.videoCallback && this.videoCallback(true)
        } else {
            if (this.hasVideo()) {
                audioEngineMamager.getInstance().setMusicVolume(0);//关闭声音
                audioEngineMamager.getInstance().setAllEffectsVolunm(0);//关闭所有音效
                ASCAd.getInstance().showVideo(this.videoCallback);
            }
            else {
                TipsManager.getInstance().showTips("暂无广告");
            }
        }

    };

    /** 是否有视频插屏*/
    public static hasVideoinsert() {
        return ASCAd.getInstance().getVideoIntersFlag();
    };

    /**
    * 展示视频插屏广告
    * @param callback 视频播放完成回调
    */
    public static showVideoInters(callback) {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return
        this.videoInsertCallback = function () {
            audioEngineMamager.getInstance().setMusicVolume(CommonGlobal.getInstance().userData.BgSoundScale);//恢复声音
            audioEngineMamager.getInstance().setAllEffectsVolunm(1);
            if (callback) callback();
        };
        if (this.hasVideoinsert()) {
            audioEngineMamager.getInstance().setMusicVolume(0);//关闭声音
            audioEngineMamager.getInstance().setAllEffectsVolunm(0);//关闭所有音效
            ASCAd.getInstance().showVideoInters(this.videoInsertCallback);
        }
    };

    /** 是否有插屏*/
    public static hasInsert() {
        return ASCAd.getInstance().getIntersFlag();
    };

    /** 展示插屏广告*/
    public static showInsertAD(callback?) {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        if (this.hasVideoinsert()) this.showVideoInters(callback);
        else if (this.hasInsert()) ASCAd.getInstance().showInters();
    };

    /** 展示广告条*/
    public static showBanner() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().showBanner();
    };

    /** 隐藏Banner条*/
    public static hideBanner() {
        ASCAd.getInstance().hideBanner();
    };

    /** 获取QQ盒子标志*/
    public static getQQBoxFlag() {
        return ASCAd.getInstance().getBoxFlag();
    };

    /**展示QQ游戏盒子 */
    public static showQQAppBox() {
        ASCAd.getInstance().showAppBox();
    }

    /** 是否有结算页推荐*/
    public static hasNavigateSettle() {
        return ASCAd.getInstance().getNavigateSettleFlag();
    };

    /** 展示结算页推荐*/
    public static showNavigateSettle(type: number, y: number) {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().showNavigateSettle(type, cc.winSize.width / 2, y);
    };

    /** 隐藏结算页面推荐*/
    public static hideNavigateSettle() {
        ASCAd.getInstance().hideNavigateSettle();
    };

    /**设置 侧边互推列表 */
    public static showNavigateGroup(type: string, side: string, size: number, y: number) {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().showNavigateGroup(type, side, size, y);
    }

    /**展示互推ICON */
    public static showPushIcon(width, height, x, y) {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().showNavigateIcon(width, height, x, y)
    };

    /**隐藏互推ICON */
    public static hidePushIcon() {
        ASCAd.getInstance().hideNavigateIcon();
    };

    /** 获取互推盒子横幅广告能否展示标志*/
    public static getNavigateBoxBannerFlag() {
        return ASCAd.getInstance().getNavigateBoxBannerFlag();
    };

    /** 展示互推横幅*/
    public static showNavigateBoxBanner() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().showNavigateBoxBanner();
    };

    /**OPPO 隐藏互推盒子横幅广 */
    public static hideNavigateBoxBanner() {
        ASCAd.getInstance().hideNavigateBoxBanner();
    };

    /**OPPO 获取互推盒子九宫格广告能否展示标志 */
    public static getNavigateBoxPortalFlag() {
        return ASCAd.getInstance().getNavigateBoxPortalFlag();
    };

    /**OPPO 展示互推盒子九宫格广告 */
    public static showNavigateBoxPortal() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().showNavigateBoxPortal();
    };

    /**Android oppo超休闲（首页更多游戏） */
    public static showOPPOMoreGame() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().showOPPOMoreGame();
    };

    /** 获得当前广告的信息 */
    public static getNativeInfo() {
        return ASCAd.getInstance().getNativeAdInfo(1)
    };

    /** 上报展示原生广告的id */
    public static reportNative(id: any) {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().reportNativeAdShow(id);
    };

    /** 打开原生广告 */
    public static nativeClick(id: any) {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        ASCAd.getInstance().reportNativeAdClick(id);
    };

    /** 判断是否可以展示原生贴片广告 */
    public static getNativePasterFlag() {
        return ASCAd.getInstance().getNativePasterFlag();
    };

    /** 展示原生贴片广告 */
    public static showNativePaster() {
        ASCAd.getInstance().showNativePaster();
    };

    // 展示贴片banner
    public static showNativeBanner() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        GameManager.getInstance().getNativeBannerNode().getComponent(NativeBanner).showNativeBanner();
    };

    // 隐藏贴片banner
    public static hideNativeBanner() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        GameManager.getInstance().getNativeBannerNode().getComponent(NativeBanner).hideNativeBanner();
    };

    /** 点击贴片banner广告 */
    public static clickNativeAD() {
        if (CommonGlobal.getInstance().platform == Platform.Android_NoAD) return

        GameManager.getInstance().getNativeBannerNode().getComponent(NativeBanner).OnClickAD();
    };

    /** 获得贴片banner是否显示 */
    public static isShowNativeAD() {
        return GameManager.getInstance().getNativeBannerNode().active == true
    };

}


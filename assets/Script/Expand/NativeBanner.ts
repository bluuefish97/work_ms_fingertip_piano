import ASCAd from "../../SDK/ASCAd";
import AdManager from "./AdManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NativeBanner extends cc.Component {

    // 关闭当前贴片广告的样式
    closeBTN: cc.Node = null

    // 底图样式
    baseNode: cc.Node = null

    // 顶部的控制组件
    titleCon: cc.Node = null

    // 当前贴片上进行显示的广告信息
    curADInfo = null

    // 表当前广告是否首次加载完成
    dealADOK = false

    /** 重新加载广告的函数 */
    private loadADFunc: any = null;

    onLoad() {
        this.defination();
        this.setBTNEvent();

        this.node.active = false;
    };

    defination() {
        this.closeBTN = this.node.getChildByName("BTN_Close");
        this.baseNode = this.node.getChildByName("NativeBanner_Base");
        this.titleCon = this.node.getChildByName("GRP_Title");

        this.node.zIndex = 10000;
    };

    /** 重新刷新当前的广告样式 */
    RefreshBanner() {
        ASCAd.getInstance().hideBanner();
        console.log("刷新当前的贴片广告样式");

        const self = this;
        // 表是否需要进行刷新当前的广告
        let changeInfo = true;

        // 当前广告的信息
        let curInfo = AdManager.getNativeInfo();
        console.log("curADInfo: ", JSON.stringify(curInfo));

        /** 如果当前无法进行广告拉去成功,则对其进行进行判断是否要展示普通banner广告 */
        if (!curInfo || !curInfo.adId || !curInfo.Native_BigImage) {
            // 如果之前已经存在广告,则使用之前的广告,反之则对其进行隐藏并显示普通的banner广告
            if (this.dealADOK == false) {
                ASCAd.getInstance().showBanner();
                this.hideNativeBanner();
                return
            } else {
                changeInfo = false;
            }
        }

        if (changeInfo == true) {
            this.curADInfo = curInfo;
        }

        /** 上报展示原生广告的id */
        AdManager.reportNative(this.curADInfo.adId);

        /** 如果存在关闭按钮,则将其进行赋值 */
        if (this.curADInfo.NativeClose) {
            // 加载广告的关闭图片
            let image = new Image();
            image.onload = function () {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                self.closeBTN.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)

                console.log("加载图片切换成功")
            }

            image.onerror = error => {
            };
            image.src = self.curADInfo.NativeClose;
            image.crossOrigin = "anonymous";
        }

        /** 如果存在长banner条,则将其进行赋值 */
        if (this.curADInfo.Native_BigImage) {
            // 加载广告的Banner图片
            let image = new Image();
            image.onload = function () {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                self.baseNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture)

                console.log("加载图片切换成功")
            }

            image.onerror = error => {
            };
            image.src = self.curADInfo.Native_BigImage;
            image.crossOrigin = "anonymous";
        }

        clearInterval(this.loadADFunc);
        // 设置自动刷新广告列表信息
        this.loadADFunc = setInterval(() => {
            if (this.node.active == true) {
                console.log("自动刷新广告信息");
                this.RefreshBanner();
            }
        }, 30000)

    };

    /** 展示当前的原生贴片banner条 */
    showNativeBanner() {
        this.node.active = true;
        this.titleCon.active = true;
        this.RefreshBanner();
    };

    /** 隐藏当前的原生贴片banner条 */
    hideNativeBanner() {
        this.node.active = false;
        this.titleCon.active = false;
    };


    /** 设置当前按钮的监听事件 */
    setBTNEvent() {
        this.baseNode.on(cc.Node.EventType.TOUCH_END, this.OnClickAD, this);
        this.closeBTN.on(cc.Node.EventType.TOUCH_END, this.OnClickClose, this);
    };

    /** 点击关闭当前的贴片banner */
    OnClickClose() {
        this.hideNativeBanner();
    };

    /** 点击当前的广告条 */
    OnClickAD() {
        if (!this.curADInfo || !this.curADInfo.adId) {
            console.log("广告id为空,无法打开对应的广告")
            return
        }
        AdManager.nativeClick(this.curADInfo.adId);
    };

}

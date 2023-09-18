
import ASCAd from "./ASCAd";
import LoadRes from "./utils/LoadRes";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TestCocos extends cc.Component {

    public videoPath;
    public moreGamesBanner;
    public node_privacyAgreement;

    start() {
        // // @ts-ignore
        // kwaigame.readyGo(); // 快手渠道请在游戏首屏加载完成之后调用
        // // @ts-ignore
        // kwaigame.init({
        //     appId: GetConfig.getAppId()
        // });

        ASCAd.getInstance().initAd();

        // console.log("cc.view.getFrameSize():", cc.view.getFrameSize());
        // console.log("cc.view.getVisibleSize():", cc.view.getVisibleSize());
        // console.log("cc.winSize:", cc.winSize);
        // // 获取设计分辨率Canvas宽高
        // console.log("cc.getDesignResolutionSize:", cc.view.getDesignResolutionSize());
    }

    showBanner() {
        ASCAd.getInstance().showBanner();
    }
    hideBanner() {
        ASCAd.getInstance().hideBanner();
    }


    showInters() {
        ASCAd.getInstance().getIntersFlag() && ASCAd.getInstance().showInters();
    }


    showVideo() {
        if (ASCAd.getInstance().getVideoFlag()) {
            ASCAd.getInstance().showVideo((suc) => {
                if (suc) {
                    console.log("激励视频播放完成");
                } else {
                    console.log("激励视频播放取消");
                }
            });
        } else {
            //提示暂无视频广告
        }
    }


    // 获取原生广告
    getNativeAdInfo1() {
        ASCAd.getInstance().getNativeAdInfo(1);
    }
    // 获取自定义原生广告
    getNativeAdInfo2() {
        ASCAd.getInstance().getNativeAdInfo(2);
    }


    showNativeIcon() {
        ASCAd.getInstance().getNativeIconFlag() && ASCAd.getInstance().showNativeIcon(200, 200, cc.winSize.width / 4, cc.winSize.height / 2);
    }
    hideNativeIcon() {
        ASCAd.getInstance().hideNativeIcon();
    }


    showNativeImage() {
        ASCAd.getInstance().getNativeImageFlag() && ASCAd.getInstance().showNativeImage(600, 300, cc.winSize.width / 2, 200);
    }
    hideNativeImage() {
        ASCAd.getInstance().hideNativeImage();
    }

    showNativePaster() {
        ASCAd.getInstance().getNativePasterFlag() && ASCAd.getInstance().showNativePaster();
    }


    showCustomNativeAd() {
        let nativeAdInfo = ASCAd.getInstance().getNativeAdInfo(1);

        // 1、判断是否正常获取自定义原生广告
        if (nativeAdInfo != null && typeof nativeAdInfo.adId != "undefined" && nativeAdInfo.adId != null) {

            // 2、如果运营要求使用原生大图的样式则判断是否拉取到原生大图,因为原生广告是广告主投放的,会存在拉取不到某些参数的情况
            if (nativeAdInfo.Native_BigImage == null) {
                console.log("该原生广告中不存在大图 return");
                return;
            }

            // 3、加载nativeAdInfo中的图片
            // 我这边cocos封装了一个加载图片数组方法 用cc.loader.load循环加载
            let resUrlArray = [];
            resUrlArray[0] = nativeAdInfo.Native_BigImage; //大图
            resUrlArray[1] = nativeAdInfo.NativeAdTip; //广告角标
            resUrlArray[2] = nativeAdInfo.NativeClose; //关闭按钮
            // 如果运营要求外部还要有一个查看广告按钮之类的样式,则找美术人员做一个按钮样式
            resUrlArray[3] = "https://tencentcnd.minigame.xplaymobile.com/Other/SDK/SDKImage4/Native/NativeBannerButton.png"; //关闭按钮

            LoadRes.loadResArray(resUrlArray, (err, texture) => {
                let scene = cc.director.getScene();

                // 3、使用--按要求调整好图片位置和大小并上报原生广告展示
                // 上报原生广告展示
                ASCAd.getInstance().reportNativeAdShow(nativeAdInfo.adId);

                // 大图节点
                let image = new cc.Node("image");
                // 将其放在某个节点下,这里直接放在场景节点下,与Canvas同级, 该图锚点默认为中点,左下角为(0,0)
                scene.addChild(image);
                image.addComponent(cc.Sprite);
                image.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[0]); //资源索引与上面数组索引对应
                image.addComponent(cc.Widget);
                image.getComponent(cc.Widget).isAlignHorizontalCenter = true;
                image.getComponent(cc.Widget).isAlignBottom = true;
                image.getComponent(cc.Widget).bottom = 0;//这样大图会贴近铺满场景底部
                image.width = cc.winSize.width;
                image.height = image.width / 2; //建议大小默认2:1

                // 广告角标
                let adTip = new cc.Node("adTip");
                image.addChild(adTip);
                adTip.addComponent(cc.Sprite);
                adTip.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[1]);
                // 广告角标位置贴近左上
                adTip.addComponent(cc.Widget);
                adTip.getComponent(cc.Widget).isAlignLeft = true;
                adTip.getComponent(cc.Widget).left = 0;
                adTip.getComponent(cc.Widget).isAlignTop = true;
                adTip.getComponent(cc.Widget).top = 0;
                adTip.width = image.width / 5;
                adTip.height = adTip.width / 70 * 34; //设置广告角标大小

                // 关闭按钮
                let close = new cc.Node("close");
                image.addChild(close);
                close.addComponent(cc.Sprite);
                close.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[2]);
                // 关闭按钮位置贴近右上
                close.addComponent(cc.Widget);
                close.getComponent(cc.Widget).isAlignRight = true;
                close.getComponent(cc.Widget).right = 0;
                close.getComponent(cc.Widget).isAlignTop = true;
                close.getComponent(cc.Widget).top = 0;
                close.width = 50;
                close.height = 50; //设置关闭按钮大小

                // 查看广告按钮
                let button = new cc.Node("button");
                image.addChild(button);
                button.addComponent(cc.Sprite);
                button.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture[3]);
                button.width = 300;
                button.height = 200; //设置查看广告按钮大小
                button.y = cc.winSize.height / 2; //这里我随意设置了他的位置在屏幕中间

                // 4、监听--使用的大图和查看广告按钮需要监听触摸事件,触摸事件回调必须上报原生广告点击
                image.on(cc.Node.EventType.TOUCH_START, () => {
                    // 上报原生广告点击
                    ASCAd.getInstance().reportNativeAdClick(nativeAdInfo.adId);
                })
                button.on(cc.Node.EventType.TOUCH_START, () => {
                    // 上报原生广告点击
                    ASCAd.getInstance().reportNativeAdClick(nativeAdInfo.adId);
                })

                // 5、关闭按钮
                close.on(cc.Node.EventType.TOUCH_START, (event) => {
                    // 销毁大图节点
                    image.removeFromParent();
                    // 防止触摸冒泡
                    event.stopPropagation();
                })
            })

        }
        // 不正常,打印日志查看
        else {
            console.log("nativeAdInfo:", JSON.stringify(nativeAdInfo))
        }
    }


    showNavigateBoxBanner() {
        ASCAd.getInstance().getNavigateBoxBannerFlag() && ASCAd.getInstance().showNavigateBoxBanner();
    }
    hideNavigateBoxBanner() {
        ASCAd.getInstance().hideNavigateBoxBanner();
    }


    showNavigateBoxPortal() {
        if (ASCAd.getInstance().getNavigateBoxPortalFlag()) {
            ASCAd.getInstance().showNavigateBoxPortal();
        } else {
            // 提示暂无广告
            console.log("提示暂无广告");
        }
    }


    addDesktop() {
        ASCAd.getInstance().getAddDesktopFlag((succ) => {
            if (succ) {
                ASCAd.getInstance().addDesktop((suc) => {
                    if (suc) {
                        console.log("添加桌面成功");
                    }
                })
            }
        })
    }


    phoneVibrateLong() {
        ASCAd.getInstance().phoneVibrate("long");
    }
    phoneVibrateShort() {
        ASCAd.getInstance().phoneVibrate("short");
    }


    getUserData() {
        ASCAd.getInstance().getUserData((res) => {
            console.log("XminigameSDK", "getUserData", JSON.stringify(res));
        });
    }


    getUserInfo() {
        ASCAd.getInstance().getUserInfo((res) => {
            console.log("XminigameSDK", "getUserInfo", JSON.stringify(res));
        });
    }


    // 抖音收藏
    showFavoriteGuide() {
        ASCAd.getInstance().showFavoriteGuide("bar", "一键添加到我的小程序", "bottom");
    }


    // 抖音更多游戏横幅
    showMoreGamesBanner() {
        ASCAd.getInstance().showMoreGamesBanner();
    }
    hideMoreGamesBanner() {
        ASCAd.getInstance().hideMoreGamesBanner();
    }


    // 抖音快手开始录屏
    startGameVideo() {
        ASCAd.getInstance().startGameVideo(60);
    }
    // 抖音快手暂停录屏
    pauseGameVideo() {
        ASCAd.getInstance().pauseGameVideo();
    }
    // 抖音快手继续录屏
    resumeGameVideo() {
        ASCAd.getInstance().resumeGameVideo();
    }
    // 抖音快手结束录屏
    stopGameVideo() {
        ASCAd.getInstance().stopGameVideo(videoPath => {
            console.log("视频录制成功");
            this.videoPath = videoPath;
        });
    }
    // 抖音快手分享录屏
    shareVideo() {
        ASCAd.getInstance().shareVideo("这是抖音分享视频的标题", "这是头条分享视频的描述", "这是抖音分享视频的话题", this.videoPath, res => {
            if (res) {
                console.log("分享成功");
            } else {
                console.log("分享失败");
            }
        });
    }
    // 抖音强制登录
    mustLogin() {
        ASCAd.getInstance().mustLogin((suc) => {
            if (suc) {
                console.log("强制登录成功");
            } else {
                console.log("强制登录失败");
            }
        });
    }
    // 抖音跳转到更多游戏中心
    jumpToMoreGamesCenter() {
        ASCAd.getInstance().jumpToMoreGamesCenter();
    }


    // 微信互推icon
    showNavigateIcon() {
        ASCAd.getInstance().getNavigateIconFlag() && ASCAd.getInstance().showNavigateIcon(200, 200, cc.winSize.width * 0.8, cc.winSize.height * 0.6);
    }
    hideNavigateIcon() {
        ASCAd.getInstance().hideNavigateIcon();
    }

    // 微信互推列表
    showNavigateGroup() {
        ASCAd.getInstance().getNavigateGroupFlag() && ASCAd.getInstance().showNavigateGroup("vertcal", "right", 200, 0);
    }
    hideNavigateGroup() {
        ASCAd.getInstance().hideNavigateGroup();
    }

    // 微信结算互推
    // 结算互推1
    showNavigateSettle1() {
        ASCAd.getInstance().getNavigateSettleFlag() && ASCAd.getInstance().showNavigateSettle(1, 0, 0);
    }
    // 结算互推2
    showNavigateSettle2() {
        ASCAd.getInstance().getNavigateSettleFlag() && ASCAd.getInstance().showNavigateSettle(2, 0, 0);
    }
    hideNavigateSettle() {
        ASCAd.getInstance().hideNavigateSettle();
    }

    // 微信格子(积木)广告
    // 1*5
    showBlock5() {
        ASCAd.getInstance().getBlockFlag() && ASCAd.getInstance().showBlock("white", 0, cc.winSize.height, 5);
    }
    // 2*4
    showBlock8() {
        ASCAd.getInstance().getBlockFlag() && ASCAd.getInstance().showBlock("white", 0, cc.winSize.height, 8);
    }
    hideBlock() {
        ASCAd.getInstance().hideBlock();
    }


    // QQ盒子广告
    showAppBox() {
        ASCAd.getInstance().getBoxFlag() && ASCAd.getInstance().showAppBox();
    }

    // QQ积木广告
    showBlock() {
        ASCAd.getInstance().getBlockFlag() && ASCAd.getInstance().showBlock("landscape", 32, 32, 5);
    }


    // 华为隐私协议
    showPrivacyAgreement() {
        ASCAd.getInstance().showPrivacyAgreement("", "", (suc) => {
            if (suc) {
                console.log("点击同意");
            } else {
                console.log("点击取消");
            }
        })
    }


    // 微信Wuchubanner
    showErrBanner() {
        if (ASCAd.getInstance().getErrBannerFlag()) {
            ASCAd.getInstance().showErrBanner((suc) => {
                if (suc) {
                    console.log("进度条已经达到,发放奖励");
                }
            })
        } else {
            // 使用其他广告
        }
    }


    // 安卓内购
    buyProp() {
        let tempOrderId = "";
        let callback = () => {
            // 下发道具
            console.log("下发道具");
            // 道具下发成功后必须调用
            ASCAd.getInstance().payComplete(tempOrderId);
        }
        ASCAd.getInstance().buyProps("1.00", "8888", "肉蛋葱鸡", (paySucc, orderId) => {
            if (paySucc) {
                tempOrderId = orderId;
                // 支付成功,下发道具
                callback();
            } else {
                // 支付失败
            }
        })
    }

}

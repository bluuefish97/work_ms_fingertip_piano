/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：基础音乐组件的中介
*****************************************************/

import { MusicInfo } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AdManager from "../../../Expand/AdManager";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import NormalMusicUnit from "../Unit/NormalMusicUnit";

export default class NormalMusicMediator extends Mediator {

    // 基础音乐组件的单元
    private baseMusicUnit: NormalMusicUnit = null;

    // 基础音乐的数据
    public baseMusicInfo: MusicInfo = null;

    // 歌曲组件所处的类型(0随机,其余则为指定对应的皮肤)
    private skinGroupType: number = 0;

    /** 当前节点是否为AD标签 */
    private isADUnit: boolean = false;

    /** 当前广告存储的信息 */
    private curADInfo: any = null;

    /** 重新加载广告的函数 */
    private loadADFunc: any = null;

    /** 当前歌曲条解锁时处于的广告类型 */
    // 1 新歌速递 2 结算页
    private adTypeNum: number = 0;



    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return;
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return;
        }

        this.baseMusicUnit = viewNode.getComponent(NormalMusicUnit);
        this.setBTNEvent();
    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.RefreshMusicResponse,
            AllCommandDefine.UnlockMusicResponse,
            AllCommandDefine.PlayMusicReponse,
            AllCommandDefine.PauseMusicResponse,
            AllCommandDefine.FavourMusicResponse,
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        if (info && info.musicinfo && this.isADUnit == false) {
            let musicInfo = info.musicinfo as MusicInfo;
            switch (notification.getName()) {
                case AllCommandDefine.RefreshMusicResponse:
                    this.refreshLimitMusicData(musicInfo);
                    break

                case AllCommandDefine.UnlockMusicResponse:
                    this.unlockMusic(musicInfo);
                    break

                case AllCommandDefine.PlayMusicReponse:
                    this.playMusic(musicInfo);
                    break

                case AllCommandDefine.PauseMusicResponse:
                    this.pauseMusic(musicInfo);
                    break

                case AllCommandDefine.FavourMusicResponse:
                    this.FavourMusic(musicInfo);
                    break

                default:
                    break;
            }
        }
    };



    //  ------------------------------------------------------------------------------
    //  内置函数

    /** 刷新指定音乐的样式 */
    public refreshLimitMusicData(curInfo: MusicInfo) {
        const curId = curInfo.MusicId;
        if (this.baseMusicInfo) {
            if (curId == this.baseMusicInfo.MusicId) {
                this.baseMusicInfo = curInfo;
                this.refreshMusicData();
            }
        }
    };

    /** 解锁歌曲 */
    private unlockMusic(curInfo: MusicInfo) {
        const curId = curInfo.MusicId;
        if (this.baseMusicInfo) {
            if (curId == this.baseMusicInfo.MusicId) {
                this.baseMusicInfo.IsUnlock = curInfo.IsUnlock;
                this.refreshMusicData();
            }
        }
    };

    /** 播放当前歌曲 */
    private playMusic(curInfo: MusicInfo) {
        const curId = curInfo.MusicId;
        if (this.baseMusicInfo) {
            if (curId == this.baseMusicInfo.MusicId) {
                this.baseMusicUnit.setMusicType("play");
            } else {
                this.baseMusicUnit.setMusicType("pause");
            }
        }

    };

    /** 暂停当前歌曲 */
    private pauseMusic(curInfo: MusicInfo) {
        const curId = curInfo.MusicId;
        if (this.baseMusicInfo) {
            if (curId == this.baseMusicInfo.MusicId) {
                this.baseMusicUnit.setMusicType("pause");
            }
        }

    };

    /** 重新偏好音乐设置 */
    private FavourMusic(curInfo: MusicInfo) {
        const curId = curInfo.MusicId;
        const curLike = curInfo.IsLike;

        if (this.baseMusicInfo) {
            if (curId == this.baseMusicInfo.MusicId) {
                this.baseMusicInfo.IsLike = curLike
                this.baseMusicUnit.setFavourType(curLike);
            }
        }

    };

    /** 刷新音乐的样式 */
    public refreshMusicData() {
        this.baseMusicUnit.setSongNameLB(this.baseMusicInfo.MusicName);
        this.baseMusicUnit.setSingerNameLB(this.baseMusicInfo.SingerName);
        this.baseMusicUnit.setScoreLB(this.baseMusicInfo.ScoreNum);
        this.baseMusicUnit.setStarNum(this.baseMusicInfo.StarNum);
        this.baseMusicUnit.setSongHeadSP(this.baseMusicInfo.OrderNumber);
        this.baseMusicUnit.setLockState(this.baseMusicInfo.IsUnlock, this.baseMusicInfo.UnlockType);
        this.baseMusicUnit.setDiamondLB(this.baseMusicInfo.UnlockCost);
        this.baseMusicUnit.setMusicType(CommonGlobal.getInstance().playingMusicId == this.baseMusicInfo.MusicId ? "play" : "pause");
        this.baseMusicUnit.setFavourType(this.baseMusicInfo.IsLike);

        this.baseMusicUnit.setIsHotTag(false);
        this.baseMusicUnit.setIsNewTag(false);

        switch (this.baseMusicInfo.TipStr) {
            case "hot":
                this.baseMusicUnit.setIsHotTag(true);
                break

            case "new":
                this.baseMusicUnit.setIsNewTag(true);
                break

            default:
                break
        }

        if (this.baseMusicInfo.NewStr) {
            this.baseMusicUnit.setIsNewTag(true);
        }

    };

    /** 控制预制的显示 */
    public setPrefabActive(isShow: boolean) {
        this.baseMusicUnit.setPrefabActive(isShow);
    };

    /** 设置动画节点是否显示 */
    public setAnimNodeActive(isShow: boolean) {
        this.baseMusicUnit.setAnimNodeActive(isShow);
    };

    /** 设置歌曲的移动动画 */
    public setMusicAnim(isIn = true, curCall?: Function) {
        this.baseMusicUnit.setMusicAnim(isIn, curCall);
    };

    /** 设置当前歌曲所处于的类型,并通过当前的类型从而来决定进入游戏之后所使用的皮肤类型 */
    public setSkinGroupType(typeNum: number) {
        this.skinGroupType = typeNum;
    };

    /** 是否设置为广告条 */
    public setADType(curBool: boolean) {
        this.isADUnit = curBool;
        this.baseMusicUnit.setADType(curBool);
    };

    /** 更新广告的信息 */
    public updateADInfo() {
        console.log("更新广告信息");

        const self = this;
        // 当前广告的信息
        let curInfo = AdManager.getNativeInfo();
        console.log("curADInfo: ", JSON.stringify(curInfo));

        /** 如果当前无法进行广告拉去成功,则对其进行进行判断是否要展示普通banner广告 */
        if (!curInfo || !curInfo.adId || (!curInfo.Native_BigImage && !curInfo.Native_icon)) {
            console.log("广告信息不存在")
            // 如果之前已经存在广告,则使用之前的广告,反之则对其进行隐藏
            if (this.curADInfo) {
                curInfo = this.curADInfo;
            } else {
                this.baseMusicUnit.node.active = false;
                return
            }
        }

        // 存储广告信息
        if (curInfo) {
            this.curADInfo = curInfo;
        }

        /** 上传id */
        AdManager.reportNative(this.curADInfo.adId);

        // 相关图片来源
        let imgUrl = null;
        if (this.curADInfo.Native_icon) {
            imgUrl = this.curADInfo.Native_icon;
        } else if (this.curADInfo.Native_BigImage) {
            imgUrl = this.curADInfo.Native_BigImage;
        }

        // 如果图片资源存在,则进行加载当前的图片
        if (imgUrl) {
            // 加载广告的关闭图片
            let image = new Image();
            image.onload = function () {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                let curTexture = new cc.SpriteFrame(texture);
                self.baseMusicUnit.setADSongHeadSP(curTexture);

                console.log("加载图片切换成功")
            }

            image.onerror = error => {
            };
            image.src = imgUrl;
            image.crossOrigin = "anonymous";
        }

        // 设置标题
        this.baseMusicUnit.setADTitleLB(this.curADInfo.title);
        // 设置详情
        this.baseMusicUnit.setADDetailLB(this.curADInfo.desc);

        this.baseMusicUnit.setMusicType("");

        clearInterval(this.loadADFunc);
        // 设置自动刷新广告列表信息
        this.loadADFunc = setInterval(() => {
            if (this.baseMusicUnit.node.active == true) {
                console.log("自动刷新广告信息");
                this.updateADInfo();
            }
        }, 30000)

    };

    /** 设置当前组件的广告类型数字 */
    public setAdTypeNum(curNum: number) {
        this.adTypeNum = curNum;
    };




    //  ------------------------------------------------------------------------------
    //  监听事件

    /** 设置按钮的监听事件 */
    private setBTNEvent() {
        this.baseMusicUnit.setPauseEvt(() => {
            this.pauseEvt();
        })

        this.baseMusicUnit.setPlayEvt(() => {
            this.playEvt();
        })

        this.baseMusicUnit.setFavourEvt(() => {
            this.favourEvt();
        })

        this.baseMusicUnit.setStartEvt(() => {
            this.startEvt();
        })

        this.baseMusicUnit.setDiamondEvt(() => {
            this.diamondEvt();
        })

        this.baseMusicUnit.setVideoEvt(() => {
            this.videoEvt();
        })

        this.baseMusicUnit.setBaseEvt(() => {
            this.baseEvt();
        })

        this.baseMusicUnit.setADEvt(() => {
            this.ADEvt();
        })

    };

    /** 设置暂停播放歌曲的监听事件 */
    private pauseEvt() {
        const self = this;
        CommonFacade.getInstance().sendNotification(AllCommandDefine.PauseMusicRequest, ({
            musicinfo: self.baseMusicInfo
        }))
    };

    /** 设置播放歌曲的监听事件 */
    private playEvt() {
        const self = this;
        this.baseMusicUnit.setMusicType("loading");
        CommonFacade.getInstance().sendNotification(AllCommandDefine.PlayMusicRequest, ({
            musicinfo: self.baseMusicInfo,
            needSetTime: true
        }))
    };

    /** 设置偏好的监听事件 */
    private favourEvt() {
        const self = this;
        this.baseMusicInfo.IsLike = !this.baseMusicInfo.IsLike;

        CommonFacade.getInstance().sendNotification(AllCommandDefine.FavourMusicRequest, ({
            musicinfo: self.baseMusicInfo
        }))
    };

    /** 设置开始游戏的监听事件 */
    private startEvt() {
        const self = this;
        CommonFacade.getInstance().sendNotification(AllCommandDefine.StartGameRequest, ({
            musicinfo: self.baseMusicInfo,
            skinType: self.skinGroupType,
            startNode: self.baseMusicUnit.getStartBTN()
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "startSong", 1);

    };

    /** 设置钻石解锁的监听事件 */
    private diamondEvt() {
        const self = this;
        CommonFacade.getInstance().sendNotification(AllCommandDefine.UnlockMusicRequest, ({
            musicinfo: self.baseMusicInfo,
            skinType: self.skinGroupType,
            startNode: self.baseMusicUnit.getStartBTN()
        }))

        AnalyticsManager.getInstance().reportAnalytics("btnClick_eventAnalytics", "diaUnlock", 1);

    };

    /** 设置视频解锁的监听事件 */
    private videoEvt() {
        const self = this;
        CommonFacade.getInstance().sendNotification(AllCommandDefine.UnlockMusicRequest, ({
            musicinfo: self.baseMusicInfo,
            skinType: self.skinGroupType,
            startNode: self.baseMusicUnit.getStartBTN()
        }))

        AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "songUnlock", 1);

        switch (this.adTypeNum) {
            case 1:
                AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "newSongGet", 1);
                break

            case 2:
                AnalyticsManager.getInstance().reportAnalytics("adBtnClick_eventAnalytics", "songUnlock_settle", 1);
                break

            default:
                console.log("未定义类型或者普通类型")
                break
        }
    };

    /** 设置歌条事件 */
    private baseEvt() {
        // 防止广告组件点击
        if (this.isADUnit == true) return

        const self = this;
        // 如果当前播放的歌曲不为当前的歌曲
        if (CommonGlobal.getInstance().playingMusicId != this.baseMusicInfo.MusicId) {
            this.baseMusicUnit.setMusicType("loading");
            CommonFacade.getInstance().sendNotification(AllCommandDefine.PlayMusicRequest, ({
                musicinfo: self.baseMusicInfo,
                needSetTime: true
            }))
        } else {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.PauseMusicRequest, ({
                musicinfo: self.baseMusicInfo
            }))
        }
    };

    /** 设置广告按钮事件 */
    private ADEvt() {
        if (!this.curADInfo || !this.curADInfo.adId) {
            console.log("广告id为空,无法打开对应的广告")
            return
        }

        AdManager.nativeClick(this.curADInfo.adId);
    };


}

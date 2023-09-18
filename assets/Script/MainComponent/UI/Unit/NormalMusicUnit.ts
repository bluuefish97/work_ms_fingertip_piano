/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：基础音乐组件的单元
*****************************************************/

import { Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import DownloadManager from "../../../Expand/DownloadManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NormalMusicUnit extends cc.Component {

    /** 动画控制总节点 */
    @property(cc.Node)
    private animNode: cc.Node = null;

    /** 基础的底部节点 */
    private baseNode: cc.Node = null;

    /** 音乐歌曲条的头部组件 */
    private headCon: cc.Node = null;
    /** 音乐歌曲条的图片节点 */
    private headSP: cc.Node = null;
    /** 暂停按钮的节点 */
    private pauseBTN: cc.Node = null;
    /** 播放按钮的节点 */
    private playBTN: cc.Node = null;
    /** 加载歌曲的节点 */
    private loadingSP: cc.Node = null;

    /** 非广告组件样式 */
    private noADCon: cc.Node = null;

    /** 歌曲名称文本遮罩 */
    private songNameMask: cc.Node = null;
    /** 歌曲名称节点 */
    private songNameLB: cc.Node = null;
    /** 歌手名称节点 */
    private singerNameLB: cc.Node = null;

    /** 偏好按钮 */
    private favourBTN: cc.Node = null;
    /** 喜爱图片 */
    private favourSP: cc.Node = null;
    /** 不喜爱图片 */
    private unfavourSP: cc.Node = null;

    /** 标签总节点 */
    private tagCon: cc.Node = null;
    /** 新歌标签节点 */
    private newSP: cc.Node = null;
    /** 热门歌曲标签节点 */
    private hotSP: cc.Node = null;

    /** 普通歌曲样式 */
    private normalCon: cc.Node = null;
    /** 星星控制总节点 */
    private starListNode: cc.Node = null;
    /** 星星列表 */
    private starList: cc.Node[] = [];
    /** 亮的星星列表 */
    private starLightList: cc.Node[] = [];
    /** 灰色的星星列表 */
    private starGrayList: cc.Node[] = [];
    /** 分数控制总节点 */
    private scoreCon: cc.Node = null;
    /** 分数文本节点 */
    private scoreLB: cc.Node = null;
    /** 开始按钮的节点 */
    private startBTN: cc.Node = null;
    /** 抖音端开始按钮的节点 */
    private douyinStartBTN: cc.Node = null;

    /** 锁定歌曲样式 */
    private unlockCon: cc.Node = null;
    /** 钻石按钮 */
    private diamondBTN: cc.Node = null;
    /** 钻石文本 */
    private diamondLB: cc.Node = null;
    /** 视频按钮 */
    private videoBTN: cc.Node = null;
    /** 抖音端视频图标 */
    private douyinSP: cc.Node = null;
    /** 普通端视频图标 */
    private videoSP: cc.Node = null;

    /** 广告组件样式 */
    private ADCon: cc.Node = null;
    /** 广告组件的标题文本 */
    private adTitleLB: cc.Node = null;
    /** 广告组件详情遮罩 */
    private adDetailMask: cc.Node = null;
    /** 广告组件详情文本 */
    private adDetailLB: cc.Node = null;
    /** 广告组件点开按钮 */
    private adBTN: cc.Node = null;

    /** 当前歌曲所处于的状态 0表处于尚未播放的状态中,1表正在加载,2表播放中 */
    private curMusicStatus: number = 0;

    /** 当前节点是否为AD标签 */
    private isADUnit: boolean = false;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
        this.setDouyinStatus();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.baseNode = this.animNode.getChildByName("SP_Base");

        // 顶部图片节点
        this.headCon = this.animNode.getChildByName("GRP_Head");
        this.headSP = this.headCon.getChildByName("HeadMask").getChildByName("SP_Head");
        this.pauseBTN = this.headCon.getChildByName("BTN_Pause");
        this.playBTN = this.headCon.getChildByName("BTN_Play");
        this.loadingSP = this.headCon.getChildByName("SP_Loading");

        // 非广告组件
        this.noADCon = this.animNode.getChildByName("GRP_NoAD");
        this.songNameMask = this.noADCon.getChildByName("Mask_SongName");
        this.songNameLB = this.songNameMask.getChildByName("LB_SongName");
        this.singerNameLB = this.noADCon.getChildByName("LB_SingerName");
        this.favourBTN = this.noADCon.getChildByName("BTN_Favour");
        this.favourSP = this.favourBTN.getChildByName("SP_Favour");
        this.unfavourSP = this.favourBTN.getChildByName("SP_UnFavour");
        this.tagCon = this.noADCon.getChildByName("GRP_Tag");
        this.newSP = this.tagCon.getChildByName("SP_New");
        this.hotSP = this.tagCon.getChildByName("SP_Hot");

        this.normalCon = this.noADCon.getChildByName("GRP_Normal");
        this.starListNode = this.normalCon.getChildByName("StarList");
        this.starList = [];
        this.starLightList = [];
        this.starGrayList = [];
        for (let i = 0; i < this.starListNode.childrenCount; i++) {
            this.starList[i] = this.starListNode.children[i];
            this.starLightList[i] = this.starList[i].getChildByName("SP_Light");
            this.starGrayList[i] = this.starList[i].getChildByName("SP_Gray");
        }
        this.scoreCon = this.normalCon.getChildByName("GRP_Score");
        this.scoreLB = this.scoreCon.getChildByName("LB_Score");
        this.startBTN = this.normalCon.getChildByName("BTN_Start");
        this.douyinStartBTN = this.normalCon.getChildByName("BTN_DouyinStart");

        this.unlockCon = this.noADCon.getChildByName("GRP_Unlock");
        this.diamondBTN = this.unlockCon.getChildByName("BTN_Diamond");
        this.diamondLB = this.diamondBTN.getChildByName("LB_Diamond");
        this.videoBTN = this.unlockCon.getChildByName("BTN_Video");
        this.douyinSP = this.videoBTN.getChildByName("SP_Douyin");
        this.videoSP = this.videoBTN.getChildByName("SP_Video");

        // 广告组件
        this.ADCon = this.animNode.getChildByName("GRP_AD");
        this.adTitleLB = this.ADCon.getChildByName("LB_Title");
        this.adDetailMask = this.ADCon.getChildByName("Mask_Detail");
        this.adDetailLB = this.adDetailMask.getChildByName("LB_Detail");
        this.adBTN = this.ADCon.getChildByName("BTN_AD");

    };

    /** 设置抖音端的样式 */
    private setDouyinStatus() {
        this.douyinSP.active = false;
        this.videoSP.active = false;
        this.startBTN.active = false;
        this.douyinStartBTN.active = false;

        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            this.douyinSP.active = true;
            this.douyinStartBTN.active = true;
        } else {
            this.videoSP.active = true;
            this.startBTN.active = true;
        }
    };

    /** 设置当前歌曲的头部图片样式 */
    public setSongHeadSP(headNum: number) {
        const self = this;
        let curNum = headNum % 18;
        DownloadManager.loadBundleAsset("CDPicture", curNum.toString(), cc.SpriteFrame, (err, res) => {
            if (err) console.log("CDPicture 资源加载出错 ", err);
            else {
                console.log("CDPicture 资源加载成功 ");

                self.headSP.getComponent(cc.Sprite).spriteFrame = res;
            }
        })
    };

    /** 设置当前音乐的播放状态 */
    public setMusicType(curMusicType: string) {
        this.pauseBTN.active = false;
        this.loadingSP.active = false;
        this.playBTN.active = false;

        if (curMusicType == "pause") {
            this.playBTN.active = true;
            this.curMusicStatus = 0;
        } else if (curMusicType == "loading") {
            this.loadingSP.active = true;
            this.curMusicStatus = 1;
        } else if (curMusicType == "play") {
            this.pauseBTN.active = true;
            this.curMusicStatus = 2;
        }

        if (this.curMusicStatus != 0) {
            this.moveLBNode(this.songNameLB, this.songNameMask);
        } else {
            this.resetLBNode(this.songNameLB, this.songNameMask);
        }

    };

    /** 设置当前歌曲的名称 */
    public setSongNameLB(curSongName: string) {
        this.songNameLB.getComponent(cc.Label).string = curSongName;

        this.moveLBNode(this.songNameLB, this.songNameMask);
    };

    /** 设置当前歌手的名称 */
    public setSingerNameLB(curSingerName: string) {
        this.singerNameLB.getComponent(cc.Label).string = curSingerName;
    };

    /** 移动遮罩节点内的文本节点 */
    private moveLBNode(curLBNode: cc.Node, curMaskNode: cc.Node) {
        curLBNode.stopAllActions();

        // 如果底部的文本节点宽度大于外部的遮罩的大小,则对其进行遮罩操作
        if (curLBNode.width > curMaskNode.width) {
            curLBNode.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.moveBy(4, -curLBNode.width, 0),
                        cc.callFunc(() => {
                            curLBNode.x = curLBNode.width
                        }),
                        cc.moveBy(4, -curLBNode.width, 0)
                    )
                )
            )
        }
    };

    /** 对文本节点进行重新设置样式 */
    private resetLBNode(curLBNode: cc.Node, curMaskNode: cc.Node) {
        if (curLBNode.width > curMaskNode.width) {
            curLBNode.stopAllActions();
            curLBNode.x = 0;
        }
    };

    /** 设置当前的偏好按钮的样式 */
    public setFavourType(isFavour: boolean) {
        this.favourSP.active = isFavour;
        this.unfavourSP.active = !isFavour;
    };

    /** 设置是否为新歌标签 */
    public setIsNewTag(isNew: boolean) {
        this.newSP.active = isNew;
    };

    /** 设置是否为热门标签 */
    public setIsHotTag(isHot: boolean) {
        this.hotSP.active = isHot;
    };

    /** 设置星星数 */
    public setStarNum(starNum: number) {
        for (let i = 0; i < this.starListNode.childrenCount; i++) {
            this.starLightList[i].active = (starNum > i);
            this.starGrayList[i].active = !(starNum > i);
        }
    };

    /** 设置分数 */
    public setScoreLB(scoreNum: number) {
        this.scoreLB.getComponent(cc.Label).string = scoreNum.toString();
    };

    /** 设置钻石 */
    public setDiamondLB(diamondNum: number) {
        this.diamondLB.getComponent(cc.Label).string = diamondNum.toString();
    };

    /** 设置当前歌曲的解锁状态 */
    public setLockState(isLock: boolean, lockType: string) {
        this.normalCon.active = false;
        this.unlockCon.active = false;
        this.diamondBTN.active = false;
        this.videoBTN.active = false;

        if (isLock == true) {
            this.normalCon.active = true;
        } else {
            this.unlockCon.active = true;
            if (lockType == "video") {
                this.videoBTN.active = true;
            } else if (lockType == "coin") {
                this.diamondBTN.active = true;
            }
        }
    };

    /** 设置动画节点是否显示 */
    public setAnimNodeActive(isShow: boolean) {
        this.animNode.active = isShow;
    };

    /** 控制当前歌曲预制的显示 */
    public setPrefabActive(isShow: boolean) {
        this.node.active = isShow
    };

    /** 设置歌曲条的移动动画 */
    public setMusicAnim(isIn = true, curCall?: Function) {
        if (this.animNode) {
            this.animNode.active = true;
            // 优先停止全部的动画
            this.animNode.stopAllActions();
            // 在进行重新设置位置并进行移动动画
            this.animNode.setPosition(isIn ? 1080 : 0, 0);

            if (isIn) {
                this.animNode.runAction(
                    cc.sequence(
                        cc.moveBy(0.3, cc.v2(-1080, 0)).easing(cc.easeCircleActionOut()),
                        cc.callFunc(() => {
                            curCall && curCall()
                        })
                    )
                )
            } else {
                this.animNode.runAction(
                    cc.sequence(
                        cc.moveBy(0.3, cc.v2(-1080, 0)).easing(cc.easeCircleActionOut()),
                        cc.callFunc(() => {
                            curCall && curCall()
                        })
                    )
                )
            }
        }
    };

    /** 是否设置为广告条 */
    public setADType(curBool: boolean) {
        this.isADUnit = curBool;
        this.showADPage();
    };

    /** 展示广告条界面信息 */
    public showADPage() {
        this.noADCon.active = !this.isADUnit;
        this.ADCon.active = this.isADUnit;
    };

    /** 设置当前歌曲的头部图片样式 */
    public setADSongHeadSP(headSP: cc.SpriteFrame) {
        this.headSP.getComponent(cc.Sprite).spriteFrame = headSP;
    };

    /** 设置广告组件内顶部组件信息 */
    public setADTitleLB(curTitle: string) {
        this.adTitleLB.getComponent(cc.Label).string = curTitle;
    };

    /** 设置广告组件内顶部详情信息 */
    public setADDetailLB(curDetail: string) {
        this.adDetailLB.getComponent(cc.Label).string = curDetail;
        this.moveLBNode(this.adDetailLB, this.adDetailMask);
    };

    /** 获得开始游戏按钮 */
    public getStartBTN() {
        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            return this.douyinStartBTN
        } else {
            return this.startBTN
        }
    };



    // -------------------------------------------------------------------------------------
    // 定义监听事件

    /** 设置暂停播放歌曲的监听事件 */
    setPauseEvt(curCall: Function) {
        this.pauseBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置播放歌曲的监听事件 */
    setPlayEvt(curCall: Function) {
        this.playBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置偏好的监听事件 */
    setFavourEvt(curCall: Function) {
        this.favourBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置开始游戏的监听事件 */
    setStartEvt(curCall: Function) {
        this.startBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
        this.douyinStartBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置钻石解锁的监听事件 */
    setDiamondEvt(curCall: Function) {
        this.diamondBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置视频解锁的监听事件 */
    setVideoEvt(curCall: Function) {
        this.videoBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置歌条事件 */
    setBaseEvt(curCall: Function) {
        this.baseNode.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置广告按钮事件 */
    setADEvt(curCall: Function) {
        this.adBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}

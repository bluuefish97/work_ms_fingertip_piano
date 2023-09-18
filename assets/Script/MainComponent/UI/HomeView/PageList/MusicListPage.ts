/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：音乐列表的总控制节点
*****************************************************/

import CommonGlobal from "../../../../Common/CommonGlobal";
import { MusicStatus } from "../../../../Expand/MusicManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MusicListPage extends cc.Component {

    /** 滚动条预制 */
    @property(cc.Prefab)
    private scrollPrefab: cc.Prefab = null;

    /** 顶部的按钮控制总节点 */
    private btnList: cc.Node = null;

    /** 包含按钮的节点 */
    private btnContent: cc.Node = null;

    /** 尚未通关歌曲的按钮 */
    private unclearBTN: cc.Node = null;
    /** 尚未通关歌曲选中状态的图片 */
    private unclearSelect: cc.Node = null;
    /** 尚未通关歌曲的文本节点 */
    private unclearText: cc.Node = null;

    /** 已经通关歌曲的按钮 */
    private clearBTN: cc.Node = null;
    /** 已经通关歌曲选中状态的图片 */
    private clearSelect: cc.Node = null;
    /** 已经通关歌曲的文本节点 */
    private clearText: cc.Node = null;

    /** 偏好歌曲的按钮 */
    private favourBTN: cc.Node = null;
    /** 偏好歌曲选中状态的图片 */
    private favourSelect: cc.Node = null;
    /** 偏好歌曲的文本节点 */
    private favourText: cc.Node = null;

    /** 全部歌曲的按钮 */
    private allBTN: cc.Node = null;
    /** 全部歌曲选中状态的图片 */
    private allSelect: cc.Node = null;
    /** 全部歌曲的文本节点 */
    private allText: cc.Node = null;


    /** 控制总滚动条 */
    public scrollCon: cc.Node = null;

    /** 我的歌曲滚动条控制列表 */
    private scrollList = [];

    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defineCommonPar();
        this.defination();
    };



    // ------------------------------------------------------------
    // 函数定义

    private defineCommonPar() {
        this.node.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);
        this.node.setPosition(cc.v2(0, 0));
    };

    /** 节点的定义 */
    private defination() {
        this.btnList = this.node.getChildByName("BTNList");
        this.btnContent = this.btnList.getChildByName("view").getChildByName("content");

        this.unclearBTN = this.btnContent.getChildByName("BTN_UnClear");
        this.unclearSelect = this.unclearBTN.getChildByName("SP_Select");
        this.unclearText = this.unclearBTN.getChildByName("LB_Text");

        this.clearBTN = this.btnContent.getChildByName("BTN_Clear");
        this.clearSelect = this.clearBTN.getChildByName("SP_Select");
        this.clearText = this.clearBTN.getChildByName("LB_Text");

        this.favourBTN = this.btnContent.getChildByName("BTN_Favour");
        this.favourSelect = this.favourBTN.getChildByName("SP_Select");
        this.favourText = this.favourBTN.getChildByName("LB_Text");

        this.allBTN = this.btnContent.getChildByName("BTN_All");
        this.allSelect = this.allBTN.getChildByName("SP_Select");
        this.allText = this.allBTN.getChildByName("LB_Text");


        this.scrollCon = this.node.getChildByName("GRP_Scroll");
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };

    /** 创建滚动条 */
    public createScroll(curCall: Function) {
        const curPrefab = cc.instantiate(this.scrollPrefab);
        curPrefab.parent = this.scrollCon;
        curPrefab.setPosition(cc.v2(0, this.scrollCon.height / 2));

        curCall && curCall(curPrefab);
        return curPrefab
    };

    /** 隐藏全部的界面 */
    public HideAllPage() {
        for (let i = 0; i < this.scrollList.length; i++) {
            if (this.scrollList[i]) {
                this.scheduleOnce(() => {
                    this.scrollList[i].opacity = 0;
                    this.scrollList[i].x = 2000;

                    this.scrollList[i].getComponent(cc.ScrollView).stopAutoScroll();
                }, 0)
            }
        }
    };

    /** 展示当前的指定界面 */
    public showCurPage(curNum: number, curCall: Function) {
        this.HideAllPage();

        this.scheduleOnce(() => {
            let curPage = this.scrollList[curNum];
            if (curPage) {
                curPage.opacity = 255;
                curPage.x = 0;

                curCall && curCall(curPage);
            } else {
                this.scrollList[curNum] = this.createScroll(curCall)
            }
        }, 0)
    };

    /** 刷新按钮的显示 */
    public refreshBTN(musicStatus: MusicStatus) {
        this.unclearSelect.active = musicStatus == MusicStatus.UnClearMusic;
        this.unclearText.active = musicStatus != MusicStatus.UnClearMusic;

        this.clearSelect.active = musicStatus == MusicStatus.ClearMusic;
        this.clearText.active = musicStatus != MusicStatus.ClearMusic;

        this.favourSelect.active = musicStatus == MusicStatus.CollectMusic;
        this.favourText.active = musicStatus != MusicStatus.CollectMusic;

        this.allSelect.active = musicStatus == MusicStatus.AllMusic;
        this.allText.active = musicStatus != MusicStatus.AllMusic;

    };

    /** 设置音乐组件的高度 */
    public setContentHeight(parentNode: cc.Node, maxNum: number) {
        parentNode.height = maxNum * 200 + 200
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 设置展示尚未通关歌曲的监听事件 */
    public setUnclearEvt(curCall: Function) {
        this.unclearBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置展示通关歌曲的监听事件 */
    public setClearEvt(curCall: Function) {
        this.clearBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置展示偏好歌曲的监听事件 */
    public setFavourEvt(curCall: Function) {
        this.favourBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置展示全部歌曲的监听事件 */
    public setAllEvt(curCall: Function) {
        this.allBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}

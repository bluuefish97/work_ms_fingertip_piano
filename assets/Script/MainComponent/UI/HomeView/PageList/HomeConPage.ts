/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：页面切换显示的总节点
*****************************************************/

import Home from "../../../../SceneScript/Home";
import { AllMediatorDefine } from "../../../AllMediatorDefine";
import CommonFacade from "../../../CommonFacade";
import HomeConMediator from "../../Mediator/HomeConMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeConPage extends cc.Component {

    /** 按钮控制总节点 */
    private btnList: cc.Node = null;

    /** 首页按钮 */
    private homeBTN: cc.Node = null;
    /** 首页按钮选中状态的图片 */
    private homeSelect: cc.Node = null;
    /** 首页按钮普通状态中的图片 */
    private homeUnSelect: cc.Node = null;


    /** 我的音乐按钮 */
    private musicBTN: cc.Node = null;
    /** 我的音乐按钮选中状态的图片 */
    private musicSelect: cc.Node = null;
    /** 我的音乐按钮普通状态的图片 */
    private musicUnSelect: cc.Node = null;


    /** 更多按钮 */
    private moreBTN: cc.Node = null;
    /** 更多按钮选中状态的图片 */
    private moreSelect: cc.Node = null;
    /** 更多按钮普通状态的图片 */
    private moreUnSelect: cc.Node = null;

    /** 页面切换的事件 */
    private switchTime = 0.5;

    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
        this.registerMediator();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 注册中介 */
    private registerMediator() {
        CommonFacade.getInstance().registerMediator(new HomeConMediator(AllMediatorDefine.HomeConMediator, this.node));
    };

    /** 节点的定义 */
    private defination() {
        this.btnList = this.node.getChildByName("view").getChildByName("content");

        this.homeBTN = this.btnList.getChildByName("BTN_Home");
        this.homeSelect = this.homeBTN.getChildByName("SP_Select");
        this.homeUnSelect = this.homeBTN.getChildByName("SP_UnSelect");

        this.musicBTN = this.btnList.getChildByName("BTN_Music");
        this.musicSelect = this.musicBTN.getChildByName("SP_Select");
        this.musicUnSelect = this.musicBTN.getChildByName("SP_UnSelect");

        this.moreBTN = this.btnList.getChildByName("BTN_More");
        this.moreSelect = this.moreBTN.getChildByName("SP_Select");
        this.moreUnSelect = this.moreBTN.getChildByName("SP_UnSelect");

    };

    /** 切换动画 */
    public switchAnim(curRootNode: cc.Node, showRootNode: cc.Node, isTurnLeft: boolean, curCall: Function) {
        let moveOutPos = isTurnLeft ? -1080 : 1080;
        let moveInPos = isTurnLeft ? 1080 : -1080;

        curRootNode.stopAllActions();
        cc.tween(curRootNode)
            .to(this.switchTime, { x: moveOutPos }, { easing: cc.easing.circOut })
            .call(() => {
                curRootNode.opacity = 0;
                curCall && curCall()
            })
            .start()

        showRootNode.stopAllActions();
        showRootNode.opacity = 255;
        showRootNode.x = moveInPos;
        cc.tween(showRootNode)
            .to(this.switchTime, { x: 0 }, { easing: cc.easing.circOut })
            .start()

        showRootNode.setSiblingIndex(Home.getInstance().pageListNode.childrenCount - 1)
    };

    /** 刷新按钮的显示 */
    public refreshBTN(showPageNum: number) {
        console.log("显示第" + showPageNum + "个按钮");

        this.homeSelect.active = showPageNum == 0;
        this.homeUnSelect.active = showPageNum != 0;
        this.musicSelect.active = showPageNum == 1;
        this.musicUnSelect.active = showPageNum != 1;
        this.moreSelect.active = showPageNum == 2;
        this.moreUnSelect.active = showPageNum != 2;
    };




    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置主界面按钮的监听事件 */
    public setHomeEvt(curCall: Function) {
        this.homeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置我的音乐按钮的监听事件 */
    public setMusicEvt(curCall: Function) {
        this.musicBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置更多按钮的监听事件 */
    public setMoreEvt(curCall: Function) {
        this.moreBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}

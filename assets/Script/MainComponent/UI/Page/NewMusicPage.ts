/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：新歌速递页面
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewMusicPage extends cc.Component {

    // 音乐条节点
    @property(cc.Prefab)
    private musicPrefab: cc.Prefab = null;

    /** 新歌速递的基础节点 */
    private baseNode: cc.Node = null;

    /** 音乐组件节点 */
    private musicCon: cc.Node = null;

    /** 音乐包含组件节点 */
    private musicContent: cc.Node = null;

    /** 关闭当前页面的按钮 */
    private closeBTN: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defineCommonPar();
        this.defination();
    };

    onEnable() {
        AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "newSongBank", 1);
    };



    // -------------------------------------------------------------------------------------
    // 内置函数

    /** 定义通用数据 */
    private defineCommonPar() {
        this.node.zIndex = 9;
        cc.game.addPersistRootNode(this.node);
    };

    /** 定义节点 */
    private defination() {
        this.baseNode = this.node.getChildByName("SP_Base");
        this.baseNode.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);

        this.musicCon = this.baseNode.getChildByName("GRP_Music");
        this.musicContent = this.musicCon.getChildByName("view").getChildByName("content");

        this.closeBTN = this.baseNode.getChildByName("BTN_Close");
    };

    /** 增加音乐歌曲节点 */
    public createMusicPrefab(curCall: Function) {
        const curPrefab = cc.instantiate(this.musicPrefab);
        curPrefab.parent = this.musicContent;
        curPrefab.getChildByName("AnimNode").active = false;

        curCall && curCall(curPrefab);
    };

    /** 设置页面的弹窗动画 */
    public setPageAnim(curCall: Function) {
        this.baseNode.y = CommonGlobal.getInstance().screenHeight;
        cc.tween(this.baseNode)
            .to(0.5, { y: 0 }, { easing: cc.easing.cubicOut })
            .call(() => {
                curCall && curCall()

                AudioPlayManager.playNewMusicAU();
            })
            .start()
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };



    //---------------------------------------------------------------------------------------------------------------------------------------
    //  监听事件

    /** 设置关闭当前界面的监听事件 */
    public setCloseEvt(curCall: Function) {
        this.closeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}

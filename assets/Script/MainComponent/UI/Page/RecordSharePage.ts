/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：录屏分享界面
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecordSharePage extends cc.Component {

    /** 分享录屏的基础节点 */
    private baseNode: cc.Node = null;

    /** 分享按钮的节点 */
    private shareBTN: cc.Node = null;

    /** 关闭按钮的节点 */
    private closeBTN: cc.Node = null;

    /** 钻石文本节点 */
    private diamondLB: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
        this.node.zIndex = 10;
        cc.game.addPersistRootNode(this.node);
    };

    onEnable(){
        this.setPageAnim();
    };


    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.baseNode = this.node.getChildByName("SP_Base");
        this.baseNode.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);
        
        this.shareBTN = this.baseNode.getChildByName("BTN_Share");
        this.closeBTN = this.baseNode.getChildByName("BTN_Close");

        this.diamondLB = this.baseNode.getChildByName("SP_DiamondLB").getChildByName("LB_Diamond");
    };

    /** 设置页面的弹窗动画 */
    public setPageAnim() {
        this.baseNode.y = CommonGlobal.getInstance().screenHeight;
        cc.tween(this.baseNode)
            .to(0.5, { y: 0 }, { easing: cc.easing.cubicOut })
            .start()
    };


    /** 设置钻石文本 */
    public setDiamondLB(diamondNum: number) {
        this.diamondLB.getComponent(cc.Label).string = "+" + diamondNum.toString();
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 设置分享的事件 */
    public setShareEvt(curCall: Function) {
        this.shareBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置关闭界面的事件 */
    public setCloseEvt(curCall: Function) {
        this.closeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };


}

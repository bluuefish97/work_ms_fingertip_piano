/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.05
功能：奖励宝盒界面
*****************************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardBoxPage extends cc.Component {

    /** 奖励图片节点 */
    private rewardSP: cc.Node = null;

    /** 奖励动画节点 */
    private rewardAnim: cc.Node = null;

    /** 直接获得奖励的按钮 */
    private rewardBTN: cc.Node = null;

    /** 奖励文本节点 */
    private rewardLB: cc.Node = null;

    /** 获得双倍奖励的按钮 */
    private doubleBTN: cc.Node = null;

    /** 关闭界面的按钮 */
    private closeBTN: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
    };

    onEnable() {
        this.setRewardAnim();
    };



    // ------------------------------------------------------------
    // cocos自带函数定义

    /** 定义节点 */
    private defination() {
        this.rewardSP = this.node.getChildByName("SP_Reward");

        this.rewardAnim = this.node.getChildByName("Anim_Reward");

        this.rewardBTN = this.node.getChildByName("BTN_Reward");
        this.rewardLB = this.rewardBTN.getChildByName("LB_Reward");

        this.doubleBTN = this.node.getChildByName("BTN_Double");

        this.closeBTN = this.node.getChildByName("BTN_Close");
    };

    /** 设置奖励动画 */
    private setRewardAnim() {
        // this.rewardAnim.getComponent(sp.Skeleton).setAnimation(0, "animation", true);

        this.rewardSP.stopAllActions();
        this.rewardSP.setScale(0.8);

        this.rewardSP.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.scaleTo(0.4, 1),
                    cc.scaleTo(0.8, 0.8),
                )
            )
        )

    };

    /** 设置奖励文本 */
    public setRewardLB(curStr: number) {
        this.rewardLB.getComponent(cc.Label).string = " + " + curStr.toString();
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };



    // ------------------------------------------------------------
    // cocos自带函数定义

    /** 设置直接获得奖励的监听事件 */
    public setRewardEvt(curCall: Function) {
        this.rewardBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置获得双倍奖励的监听事件 */
    public setDoubleEvt(curCall: Function) {
        this.doubleBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置关闭按钮的监听事件 */
    public setCloseEvt(curCall: Function) {
        this.closeBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}

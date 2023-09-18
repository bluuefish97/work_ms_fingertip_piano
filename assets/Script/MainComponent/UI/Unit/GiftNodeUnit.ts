/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：礼物节点的单元
*****************************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftNodeUnit extends cc.Component {

    /** 普通状态的基础节点 */
    private normalBase: cc.Node = null;
    /** 普通状态的数量文本节点 */
    private normalNumLB: cc.Node = null;

    /** 等待领取奖励的基础节点 */
    private rewardBase: cc.Node = null;
    /** 等待领取奖励的数量文本节点 */
    private rewardNumLB: cc.Node = null;

    /** 普通礼物图片节点 */
    private giftNode: cc.Node = null;

    /** 灰色礼物图片节点 */
    private grayNode: cc.Node = null;


    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.normalBase = this.node.getChildByName("SP_Base");
        this.normalNumLB = this.normalBase.getChildByName("LB_Num");

        this.rewardBase = this.node.getChildByName("SP_Reward");
        this.rewardNumLB = this.rewardBase.getChildByName("LB_Num");

        this.giftNode = this.node.getChildByName("SP_Gift");
        this.grayNode = this.node.getChildByName("SP_Gray");
    };

    /** 设置获得礼物的样式 */
    public setGiftType(typeNum: number) {
        this.giftNode.active = false;
        this.grayNode.active = false;

        this.normalBase.active = false;
        this.rewardBase.active = false;

        // 0尚未解锁,1能够领取,2已经领取
        if (typeNum == 0) {
            this.grayNode.active = true;
            this.normalBase.active = true;
        } else if (typeNum == 1) {
            this.giftNode.active = true;
            this.rewardBase.active = true;

            this.giftNode.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.scaleTo(0.2, 1.2),
                        cc.rotateTo(0.1, 30),
                        cc.rotateTo(0.1, -25),
                        cc.rotateTo(0.1, 20),
                        cc.rotateTo(0.1, 0),
                        cc.scaleTo(0.2, 1),
                        cc.delayTime(3)
                    )
                )
            )
        } else if (typeNum == 2) {
            this.rewardBase.active = true;
        }
    };

    /** 设置当前奖励文本所需要的数量 */
    public setStarNum(rewardNum: number) {
        this.normalNumLB.getComponent(cc.Label).string = rewardNum.toString();
        this.rewardNumLB.getComponent(cc.Label).string = rewardNum.toString();
    };



    // ------------------------------------------------------------
    // 设置监听事件

    /** 设置灰色礼物的监听事件 */
    public setGrayEvt(curCall: Function) {
        this.grayNode.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

    /** 设置高亮礼物的监听事件 */
    public setGiftEvt(curCall: Function) {
        this.giftNode.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };


}

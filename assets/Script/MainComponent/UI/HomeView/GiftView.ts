/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：礼物桌面组件
*****************************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftView extends cc.Component {

    /** 礼物预制 */
    @property(cc.Prefab)
    private giftPrefab: cc.Prefab = null;

    /** 星星文本 */
    private starLB: cc.Node = null;

    /** 奖励列表 */
    private rewardCon: cc.Node = null;

    /** 奖励条 */
    private rewardBar: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.starLB = this.node.getChildByName("GRP_Star").getChildByName("LB_Star");
        this.rewardCon = this.node.getChildByName("GRP_Reward");
        this.rewardBar = this.rewardCon.getChildByName("RewardBar");
    };

    /** 创建奖励节点 */
    public createReward(rewardNum: number, maxNum: number, curCall: Function) {
        let curPrefab = cc.instantiate(this.giftPrefab);
        curPrefab.parent = this.rewardBar;

        // 获得当前的百分比,设置位置
        let perNum = rewardNum / maxNum;
        curPrefab.setPosition(this.rewardBar.width * perNum - this.rewardBar.width * 0.5, 0);

        curCall && curCall(curPrefab)
    };

    /** 设置星星数的文本 */
    public setStarLB(starNum: number) {
        this.starLB.getComponent(cc.Label).string = "X " + starNum.toString();
    };



}

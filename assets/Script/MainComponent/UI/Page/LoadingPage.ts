/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.29
功能：加载游戏资源的界面
*****************************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingPage extends cc.Component {


    /** 普通显示节点 */
    private normalNode: cc.Node = null;

    /** 新玩家显示节点 */
    private newRoleNode: cc.Node = null;

    /** 进度条的总节点 */
    private progressBar: cc.Node = null;

    /** 进度条的文本节点 */
    private progressLB: cc.Node = null;

    /** 加载特效节点 */
    private loadEffect: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
        cc.game.addPersistRootNode(this.node);
    };

    onEnable() {
        this.setLoadType();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.normalNode = this.node.getChildByName("Normal");
        this.newRoleNode = this.node.getChildByName("NewRole");

        this.progressBar = this.node.getChildByName("ProgressBar");
        this.progressLB = this.progressBar.getChildByName("LB_Loading");
        this.loadEffect = this.node.getChildByName("Load_Effect");
    };

    /** 设置加载页面类型 */
    private setLoadType() {
        this.normalNode.active = false;
        this.newRoleNode.active = false;

        // if (CommonGlobal.getInstance().isNewRolePlaying != true) {
        //     this.normalNode.active = true;
        // } else {
        //     this.newRoleNode.active = true;
        // }

        this.newRoleNode.active = true;
    };

    /** 设置进度条的长度 */
    public setProgressBar(perNum: number) {
        this.progressBar.getComponent(cc.ProgressBar).progress = perNum / 100;
        this.progressLB.getComponent(cc.Label).string = "加载中 " + perNum + "%"
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;

        if (isShow == true) {
            this.setProgressBar(0);
            this.loadEffect.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        }
    };

}

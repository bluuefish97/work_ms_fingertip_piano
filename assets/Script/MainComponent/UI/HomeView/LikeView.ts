/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：猜你喜好桌面组件
*****************************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class LikeView extends cc.Component {

    /** 歌曲条预制 */
    @property(cc.Prefab)
    private musicPrefab: cc.Prefab = null;

    /** 切换歌曲的节点 */
    private switchBTN: cc.Node = null;

    /** 歌曲视图节点 */
    private musicViewNode: cc.Node = null;

    /** 歌曲滚动条节点 */
    public musicContentNode: cc.Node = null;


    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.switchBTN = this.node.getChildByName("BTN_Switch");
        this.musicViewNode = this.node.getChildByName("MusicView");
        this.musicContentNode = this.musicViewNode.getChildByName("content");
    };

    /** 创建音乐预制 */
    public createMusicPrefab(curCall: Function) {
        let curPrefab = cc.instantiate(this.musicPrefab);
        curPrefab.parent = this.musicContentNode;
        curPrefab.getChildByName("AnimNode").active = false;

        this.scheduleOnce(() => {
            this.node.height = this.musicContentNode.height + 110 + 20;
        }, 0)

        curCall && curCall(curPrefab);
    };



    //---------------------------------------------------------------------------------------------------------------------------------------
    //  监听事件

    /** 设置切换按钮的监听事件 */
    public setSwitchEvt(curCall: Function) {
        this.switchBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };


}

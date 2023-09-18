/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.27
功能：当前热门歌曲桌面组件
*****************************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class HotView extends cc.Component {

    /** 歌曲条预制 */
    @property(cc.Prefab)
    private musicPrefab: cc.Prefab = null;

    /** 查看全部歌曲的节点 */
    private allBTN: cc.Node = null;

    /** 歌曲视图节点 */
    private musicViewNode: cc.Node = null;

    /** 歌曲滚动条节点 */
    private musicContentNode: cc.Node = null;



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defination();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 节点的定义 */
    private defination() {
        this.allBTN = this.node.getChildByName("BTN_All");
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

    /** 设置查看全部歌曲的监听事件 */
    public setAllMusicEvt(curCall: Function) {
        this.allBTN.on(cc.Node.EventType.TOUCH_END, curCall, this);
    };

}

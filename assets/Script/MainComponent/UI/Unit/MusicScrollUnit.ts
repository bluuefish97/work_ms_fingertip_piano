/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.12
功能：音乐滚动条单元
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MusicScrollUnit extends cc.Component {

    // 音乐条节点
    @property(cc.Prefab)
    private musicPrefab: cc.Prefab = null;

    private viewNode: cc.Node = null;

    private contentNode: cc.Node = null;

    /** 预制的高度 */
    private prefabHeight: number = 220;

    /** 当前滚动条组件预制的y值 */
    private curContentY: number = 0;

    onLoad() {
        this.defination();
    };

    onEnable() {
        this.resetContentY(this.curContentY);
    };

    /** 节点定义 */
    defination() {
        this.node.setContentSize(CommonGlobal.getInstance().screenWidth, CommonGlobal.getInstance().screenHeight);
        this.viewNode = this.node.getChildByName("view");
        this.contentNode = this.viewNode.getChildByName("content");
    };



    //---------------------------------------------------------------------------------------------------------------------------------------
    //  内部函数

    /** 增加音乐歌曲节点 */
    public createMusicPrefab(curCall: Function) {
        const curPrefab = cc.instantiate(this.musicPrefab);
        curPrefab.parent = this.contentNode;
        curPrefab.getChildByName("AnimNode").active = false;

        curCall && curCall(curPrefab);
    };

    /** 控制页面显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };

    /** 设置组件高度 */
    public setContentHeight(musicNum: number) {
        this.contentNode.height = (musicNum + 2) * this.prefabHeight + 600;
    };

    /** 重新设置当前组件的y值 */
    public resetContentY(curNum) {
        this.scheduleOnce(() => {
            this.contentNode.y = curNum;
            this.setContentY(curNum);
        }, 0)
    };

    /** 获得滚动节点 */
    public getContentNode() {
        return this.contentNode;
    };

    /** 清除全部的子节点 */
    public clearAllChild() {
        this.contentNode.destroyAllChildren();
    };

    /** 设置当前滚动的y值 */
    public setContentY(contentY: number) {
        this.curContentY = contentY;
    };
    


    //---------------------------------------------------------------------------------------------------------------------------------------
    //  监听事件

    /** 设置滚动条的监听事件 */
    setScrollEvt(curCall: Function) {
        const self = this;
        this.node.on("scrolling", () => {
            curCall(self.contentNode, self.viewNode)
        }, this);
    };

}

/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.08
功能：顶部的点击事件遮罩
*****************************************************/

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchMaskPage extends cc.Component {

    //---------------数据区---------------------
    private static _instance: TouchMaskPage = null;
    public static getInstance() {
        return TouchMaskPage._instance;
    }



    // ------------------------------------------------------------
    // cocos自带函数定义

    onLoad() {
        this.defineCommonPar();
        this.setPageActive(false);
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 定义通用数据 */
    private defineCommonPar() {
        this.node.zIndex = 10000;
        this.InitTouchMask();
    };

    /** 初始化点击遮罩 */
    private InitTouchMask() {
        if (!TouchMaskPage._instance) {
            TouchMaskPage._instance = this;
            cc.game.addPersistRootNode(this.node); //添加常驻节点
        } else {
            this.node.destroy();
        }
    };

    /** 设置页面的显示 */
    public setPageActive(isShow: boolean) {
        this.node.active = isShow;
    };

}

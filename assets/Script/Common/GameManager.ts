/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.02.23
功能：游戏控制脚本
*****************************************************/

import CommonFacade from "../MainComponent/CommonFacade";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    private static _instance: GameManager;
    public static getInstance(): GameManager {
        return GameManager._instance
    }

    public commonFacade: CommonFacade

    // 互推icon的位置
    private pushiconPos: cc.Node = null;

    // 底部banner节点
    private nativeBannerNode: cc.Node = null;

    onLoad() {
        if (!GameManager._instance) {
            GameManager._instance = this
        } else if (GameManager._instance != this) {
            this.node.destroy();
            return
        }

        cc.game.addPersistRootNode(this.node);
        this.commonFacade = new CommonFacade()

        this.node.zIndex = 10000;
        this.defination();
    };

    defination() {
        this.pushiconPos = this.node.getChildByName("PushIcon_Pos");
        this.nativeBannerNode = this.node.getChildByName("NativeBanner");
    };


    // -------------------------------------------------------------------------------------
    // 内置函数

    /** 获得原生banner节点 */
    getNativeBannerNode() {
        return this.nativeBannerNode
    };

    /** 获得互推icon的位置 */
    getPushIconPos() {
        return this.pushiconPos.position
    };

}

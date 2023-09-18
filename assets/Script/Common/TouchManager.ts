/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.05.07
功能：游戏中点击的粒子特效
*****************************************************/

import AudioPlayManager from "../Expand/AudioPlayManager";
import PoolManager from "../Expand/PoolManager";
import CommonGlobal from "./CommonGlobal";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchManager extends cc.Component {

    private static _instance: TouchManager = null;
    public static getInstance() {
        return TouchManager._instance;
    }

    /** 点击时所产生的特效 */
    @property(cc.Prefab)
    private touchEffectPrefab: cc.Prefab = null;

    onLoad() {
        this.InitTouch();
        this.setButtonEvt();
    };

    /** 对桌面进行初始化操作 */
    private InitTouch() {
        if (!TouchManager._instance) {
            TouchManager._instance = this;
            cc.game.addPersistRootNode(this.node); //添加常驻节点
            this.node.zIndex = 10;
        } else {
            this.node.destroy();
        }
    };

    /** 创建特效 */
    private createEffect(evt) {
        evt.target._touchListener.setSwallowTouches(false);

        if (CommonGlobal.getInstance().isGameing == true) {
            return
        }
        console.log("创建特效")

        let curPosX = evt.getLocation().x
        let curPosY = evt.getLocation().y

        let curPrefab = PoolManager.getInstance().getNode(this.touchEffectPrefab);
        if (!curPrefab) curPrefab = cc.instantiate(this.touchEffectPrefab);
        curPrefab.opacity = 255
        curPrefab.parent = this.node
        curPrefab.setPosition(curPosX - CommonGlobal.getInstance().screenWidth / 2, curPosY - CommonGlobal.getInstance().screenHeight / 2)
        curPrefab.getComponent(cc.ParticleSystem).resetSystem()

        this.scheduleOnce(() => {
            curPrefab.opacity = 0;
            PoolManager.getInstance().putNode(curPrefab);
        }, 1)

        AudioPlayManager.playNormalClickAU();
    };

    /** 设置对应的监听事件 */
    private setButtonEvt() {
        this.setTouchEvt();
    };

    /** 设置点击监听事件 */
    private setTouchEvt() {
        this.node.on(cc.Node.EventType.TOUCH_START, (evt) => {
            this.createEffect(evt);
        }, this)
    };

}

/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.28
功能：更多设置的界面的中介
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import MoreListPage from "../HomeView/PageList/MoreListPage";

export default class MoreListMediator extends Mediator {

    /** 游戏内UI总控制界面 */
    private curPage: MoreListPage = null;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(MoreListPage);
        this.setBTNEvent();
        this.initMoreList();
    };



    // ------------------------------------------------------------
    // 函数定义

    /** 初始化设置界面的数据 */
    private initMoreList() {
        this.setEffectPer(CommonGlobal.getInstance().userData.EffectScale);
        this.setSoundPer(CommonGlobal.getInstance().userData.BgSoundScale);
        this.setShakeType(CommonGlobal.getInstance().userData.IsShake);
        this.setQQLB(CommonGlobal.getInstance().qqStr);
    };

    /** 设置特效声音的进度条的百分比 */
    private setEffectPer(perNum: number) {
        this.curPage.setEffectPer(perNum);
    };

    /** 设置游戏音乐的进度条的百分比 */
    private setSoundPer(perNum: number) {
        this.curPage.setSoundPer(perNum);
    };

    /** 设置震动的类型 */
    private setShakeType(isOpen: boolean) {
        this.curPage.setShakeType(isOpen);
    };

    /** 设置qq的文本 */
    private setQQLB(curString: string) {
        this.curPage.setQQLB(curString);
    };



    // ------------------------------------------------------------
    // 定义监听事件

    /** 设置监听事件 */
    private setBTNEvent() {
        this.curPage.setEffectEvt((evt) => {
            this.effectEvt(evt);
        })

        this.curPage.setSoundEvt((evt) => {
            this.soundEvt(evt);
        })

        this.curPage.setShakeEvt(() => {
            this.shakeEvt();
        })

    };

    /** 设置特效声音的监听事件 */
    private effectEvt(evt) {
        let pos = evt.getLocation();
        let per = this.curPage.calculateEffectPer(pos);
        this.setEffectPer(per);

        CommonGlobal.getInstance().userData.EffectScale = per;
        CommonGlobal.getInstance().saveUserData();
    };

    /** 设置游戏音乐的监听事件 */
    private soundEvt(evt) {
        let pos = evt.getLocation();
        let per = this.curPage.calculateSoundPer(pos);
        this.setSoundPer(per);

        CommonGlobal.getInstance().userData.BgSoundScale = per;
        CommonGlobal.getInstance().saveUserData();
    };

    /** 设置震动的监听事件 */
    private shakeEvt() {
        CommonGlobal.getInstance().userData.IsShake = !CommonGlobal.getInstance().userData.IsShake;
        CommonGlobal.getInstance().saveUserData();

        this.setShakeType(CommonGlobal.getInstance().userData.IsShake);
    };

}

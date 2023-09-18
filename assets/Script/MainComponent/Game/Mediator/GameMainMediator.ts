/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.26
功能：游戏内界面切换总控制的中介
*****************************************************/

import CommonGlobal from "../../../Common/CommonGlobal";
import audioEngineMamager from "../../../Expand/audioEngineMamager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import Game from "../../../SceneScript/Game";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class GameMainMediator extends Mediator {

    /** 游戏内UI总控制界面 */
    private curPage: Game = null;

    /** 是否处于播放歌曲的状态 */
    private isPlayMusic: boolean = false;

    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return
        }

        this.curPage = viewNode.getComponent(Game);

    };

    public listNotificationInterests(): string[] {
        return [
            AllCommandDefine.GameShowReliveResponse,
            AllCommandDefine.GameReliveLogicResponse,
            AllCommandDefine.GameDeadLogicResponse,
            AllCommandDefine.GamePauseLogicResponse,
            AllCommandDefine.GameWinLogicResponse,
            AllCommandDefine.GameFailLogicResponse,
            AllCommandDefine.GameRestartLogicResponse,
            AllCommandDefine.GameStartResponse,
            AllCommandDefine.GameHighResponse,
            AllCommandDefine.GameChangeBGRequest,
            AllCommandDefine.GameShieldResponse
        ];
    };

    public handleNotification(notification: INotification): void {
        let info = notification.getBody();
        let name = notification.getName();
        switch (name) {
            case AllCommandDefine.GameShowReliveResponse:
                this.showRelive();
                break

            case AllCommandDefine.GameReliveLogicResponse:
                this.gameRelive();
                break

            case AllCommandDefine.GameDeadLogicResponse:
                this.gameDead();
                break

            case AllCommandDefine.GamePauseLogicResponse:
                this.gamePause();
                break

            case AllCommandDefine.GameWinLogicResponse:
                this.gameWin();
                break

            case AllCommandDefine.GameFailLogicResponse:
                this.gameFail();
                break

            case AllCommandDefine.GameRestartLogicResponse:
                this.gameRestart();
                break

            case AllCommandDefine.GameStartResponse:
                this.gameStart();
                break

            case AllCommandDefine.GameHighResponse:
                this.changeGameType(info.type);
                break

            case AllCommandDefine.GameChangeBGRequest:
                this.setBGType();
                break

            case AllCommandDefine.GameShieldResponse:
                this.changeShieldType(info.type);
                break

            default:
                break;
        }
    };



    // ------------------------------------------------------------
    // 内置函数

    /** 展示复活界面 */
    private showRelive() {
        this.curPage.showRelive();

        audioEngineMamager.getInstance().pauseMusic();
    };

    /** 游戏暂停 */
    private gamePause() {
        this.curPage.gamePause();
        audioEngineMamager.getInstance().pauseMusic();
    };

    /** 游戏死亡 */
    private gameDead() {
        this.curPage.gameDead();
    };

    /** 游戏复活 */
    private gameRelive() {
        this.curPage.gameRelive();
    };

    /** 游戏胜利 */
    private gameWin() {
        this.curPage.gameWin();
        audioEngineMamager.getInstance().pauseMusic();
    };

    /** 游戏失败 */
    private gameFail() {
        this.curPage.gameFail();
        audioEngineMamager.getInstance().pauseMusic();
    };

    /** 游戏重新开始 */
    private gameRestart() {
        this.curPage.gameRestart();
        this.isPlayMusic = false;
    };

    /** 游戏开始或者游戏继续 */
    private gameStart() {
        if (this.isPlayMusic == false) {
            this.isPlayMusic = true;
            audioEngineMamager.getInstance().stopMusic();
            audioEngineMamager.getInstance().playMusic(CommonGlobal.getInstance().gameMusicData);
            audioEngineMamager.getInstance().setMusicVolume(CommonGlobal.getInstance().userData.BgSoundScale);
        } else {
            audioEngineMamager.getInstance().resumeMusic();
            audioEngineMamager.getInstance().setMusicTime(Game.getInstance().getMusicTime());
            audioEngineMamager.getInstance().setMusicVolume(CommonGlobal.getInstance().userData.BgSoundScale);
        }
    };

    /** 切换当前游戏的状态 */
    private changeGameType(isHigh: boolean) {
        this.curPage.changeGameType(isHigh);
        AudioPlayManager.playGameBGChangeAU();
    };

    /** 切换当前游戏是否处于护盾状态状态 */
    private changeShieldType(isShield: boolean) {
        this.curPage.changeShieldType(isShield);
    };

    /** 切换背景样式 */
    private setBGType() {
        this.curPage.setBGType();
    };

}

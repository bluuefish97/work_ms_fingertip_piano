/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：
功能：
*****************************************************/

import CommonGlobal from "../Common/CommonGlobal";
import LocalStorageManager from "../Expand/LocalStorageManager";
import { Facade } from "../Puremvc/patterns/facade/Facade";
import { AllCommandDefine } from "./AllCommandDefine";
import GameAddScoreCmd from "./Game/Command/GameAddScoreCmd";
import GameReduceHPCmd from "./Game/Command/GameReduceHPCmd";
import GameReliveCmd from "./Game/Command/GameReliveCmd";
import GameRestartCmd from "./Game/Command/GameRestartCmd";
import AddDiamondCmd from "./UI/Command/AddDiamondCmd";
import AddPowerCmd from "./UI/Command/AddPowerCmd";
import FavourMusicCmd from "./UI/Command/FavourMusicCmd";
import LikeViewCmd from "./UI/Command/LikeViewCmd";
import LoadGameCmd from "./UI/Command/LoadGameCmd";
import LoadHomeCmd from "./UI/Command/LoadHomeCmd";
import MusicListCmd from "./UI/Command/MusicListCmd";
import OpenPageCmd from "./UI/Command/OpenPageCmd";
import PauseMusicCmd from "./UI/Command/PauseMusicCmd";
import PlayMusicCmd from "./UI/Command/PlayMusicCmd";
import RefreshMusicCmd from "./UI/Command/RefreshMusicCmd";
import ReliveCmd from "./UI/Command/ReliveCmd";
import RewardBoxCmd from "./UI/Command/RewardBoxCmd";
import SetDiamondCmd from "./UI/Command/SetDiamondCmd";
import SetPowerCmd from "./UI/Command/SetPowerCmd";
import ShowHomeCmd from "./UI/Command/ShowHomeCmd";
import ShowPageCmd from "./UI/Command/ShowPageCmd";
import StartGameCmd from "./UI/Command/StartGameCmd";
import UnlockMusicCmd from "./UI/Command/UnlockMusicCmd";


const { ccclass, property } = cc._decorator;
@ccclass
export default class CommonFacade extends Facade {
    public initializeController(): void {
        console.log("CommonFacade initializeController")
        super.initializeController();

        // 通用
        this.registerCommand(AllCommandDefine.LoadHomeRequest, LoadHomeCmd);
        this.registerCommand(AllCommandDefine.LoadGameRequest, LoadGameCmd);
        this.registerCommand(AllCommandDefine.OpenPageRequest, OpenPageCmd);
        this.registerCommand(AllCommandDefine.ShowHomeRequest, ShowHomeCmd);

        // 音乐
        this.registerCommand(AllCommandDefine.RefreshMusicRequest, RefreshMusicCmd);
        this.registerCommand(AllCommandDefine.UnlockMusicRequest, UnlockMusicCmd);
        this.registerCommand(AllCommandDefine.PlayMusicRequest, PlayMusicCmd);
        this.registerCommand(AllCommandDefine.PauseMusicRequest, PauseMusicCmd);
        this.registerCommand(AllCommandDefine.FavourMusicRequest, FavourMusicCmd);
        this.registerCommand(AllCommandDefine.StartGameRequest, StartGameCmd);

        // 钻石
        this.registerCommand(AllCommandDefine.AddDiamondRequest, AddDiamondCmd);
        this.registerCommand(AllCommandDefine.SetDiamondActiveRequest, SetDiamondCmd);

        // 体力
        this.registerCommand(AllCommandDefine.AddPowerRequest, AddPowerCmd);
        this.registerCommand(AllCommandDefine.SetPowerActiveRequest, SetPowerCmd);

        // UI
        this.registerCommand(AllCommandDefine.LikeViewRequest, LikeViewCmd);
        this.registerCommand(AllCommandDefine.ReliveRequest, ReliveCmd);
        this.registerCommand(AllCommandDefine.ShowPageRequest, ShowPageCmd);
        this.registerCommand(AllCommandDefine.ShowMusicScrollRequest, MusicListCmd);
        this.registerCommand(AllCommandDefine.RewardBoxRequest, RewardBoxCmd);


        // 游戏
        this.registerCommand(AllCommandDefine.GameAddScoreRequest, GameAddScoreCmd);
        this.registerCommand(AllCommandDefine.GameReduceHPRequest, GameReduceHPCmd);
        this.registerCommand(AllCommandDefine.GameReliveRequest, GameReliveCmd);
        this.registerCommand(AllCommandDefine.GameRestartRequest, GameRestartCmd);

    }

    public initializeModel(): void {
        console.log("CommonFacade initializeModel")
        super.initializeModel();

    }

    public initializeView(): void {
        console.log("CommonFacade initializeView")
        super.initializeView();
    }

    public startup(): void {
        cc.log("CommonFacade 创建");

        // this.sendNotification(AllCommandDefine.LoadGameRequest);

        let curBool = LocalStorageManager.getlocalStorageToBoolean("isPlayGame");
        if (curBool == true) {
            this.sendNotification(AllCommandDefine.LoadHomeRequest);
        } else {
            this.sendNotification(AllCommandDefine.LoadGameRequest);
            CommonGlobal.getInstance().isNewRolePlaying = true;
        }
    }

}

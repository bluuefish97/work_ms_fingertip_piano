/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.03.21
功能：游戏进行游玩的控制
*****************************************************/

import { MusicInfo, Platform } from "../../../Common/CommonEnum";
import CommonGlobal from "../../../Common/CommonGlobal";
import AnalyticsManager from "../../../Expand/AnalyticsManager";
import audioEngineMamager from "../../../Expand/audioEngineMamager";
import MusicManager from "../../../Expand/MusicManager";
import PowerManager from "../../../Expand/PowerManager";
import ToolsManager from "../../../Expand/ToolsManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import Home from "../../../SceneScript/Home";
import { AllCommandDefine } from "../../AllCommandDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { OpenPageFunc } from "./OpenPageCmd";

export default class StartGameCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute: " + "StartGameCmd");
        let info = notification.getBody();
        let musicInfo = info.musicinfo as MusicInfo;
        let startNode = info.startNode;

        const playGameFunc = () => {
            this.sendNotification(AllCommandDefine.StartGameResponse, ({
                musicinfo: musicInfo
            }))

            audioEngineMamager.getInstance().stopMusic();

            CommonGlobal.getInstance().gameMusicDataStr = musicInfo.MusicFile;
            CommonGlobal.getInstance().gameMusicJsonStr = musicInfo.MusicJson;
            CommonGlobal.getInstance().gameMusicId = musicInfo.MusicId;
            CommonGlobal.getInstance().gameHighTime = musicInfo.ListenTime;

            // 将当前歌曲从推荐列表中移出
            MusicManager.getInstance().addInRecommendList(musicInfo);

            CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.LoadPage));
            if (Home.getInstance()) {
                Home.getInstance().setPageActive(false);
            }

            CommonGlobal.getInstance().userData.SkinNum = 0;
        }

        // 减少体力开始游戏的回调
        const reduceFunc = () => {
            PowerManager.getInstance().reducePower(CommonGlobal.getInstance().reducePoweNum, playGameFunc);
        }

        // 设置减少体力的动画
        const reduceAnimFunc = () => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.ReducePowerResponse, ({
                curNode: startNode,
                curCall: reduceFunc
            }))
        }

        // 设置自动减少体力的回调
        const reducePowerFunc = () => {
            CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(
                PageName.AddPowerPage,
                reduceAnimFunc
            ))

            AnalyticsManager.getInstance().reportAnalytics("viewShow_eventAnalytics", "powerbank_noPower", 1);
        }

        if (CommonGlobal.getInstance().platform == Platform.Douyin || CommonGlobal.getInstance().platform == Platform.Web) {
            if (CommonGlobal.getInstance().userData.PowerNum >= CommonGlobal.getInstance().reducePoweNum) {
                reduceAnimFunc()
            } else {
                reducePowerFunc()
            }
        } else {
            playGameFunc()
        }

    }
}

/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.03.06
功能：控制歌曲解锁
*****************************************************/


import { MusicInfo } from "../../../Common/CommonEnum";
import AdManager from "../../../Expand/AdManager";
import AudioPlayManager from "../../../Expand/AudioPlayManager";
import DiamondManager from "../../../Expand/DiamondManager";
import MusicManager from "../../../Expand/MusicManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllCommandDefine } from "../../AllCommandDefine";

export default class UnlockMusicCmd extends SimpleCommand {
    public execute(notification: INotification): void {
        console.log("execute:" + "UnlockMusicCmd");

        let info = notification.getBody();          // 解析数据并获得对应的歌曲信息和回调
        let musicInfo = info.musicinfo as MusicInfo;
        let musicType = Number(info.type);
        let skinType = info.skinType;                                   // 游戏设置皮肤

        /** 钻石解锁 */
        if (musicInfo.UnlockType == "video" || musicType == 1) {
            if (AdManager.hasVideo()) {
                AdManager.showVideo((isEnd) => {
                    if (isEnd) {
                        // 解锁当前的歌曲
                        MusicManager.getInstance().unlockMusic(musicInfo.MusicId)

                        // 解锁歌曲刷新页面显示
                        this.sendNotification(AllCommandDefine.UnlockMusicResponse, ({
                            musicinfo: musicInfo
                        }))

                        // 自动游玩当前歌曲
                        this.sendNotification(AllCommandDefine.StartGameRequest, ({
                            musicinfo: musicInfo,
                            skinType: skinType,
                            startNode: info.startNode
                        }))

                        AudioPlayManager.playUnlockMusicAU();
                    }
                })
            }
        } else if (musicInfo.UnlockType == "coin") {
            let diamondCall = () => {
                MusicManager.getInstance().unlockMusic(musicInfo.MusicId)

                // 解锁歌曲刷新页面显示
                this.sendNotification(AllCommandDefine.UnlockMusicResponse, ({
                    musicinfo: musicInfo
                }))

                // 刷新钻石数
                this.sendNotification(AllCommandDefine.RefreshDiamondResponse);

                // 自动游玩当前歌曲
                this.sendNotification(AllCommandDefine.StartGameRequest, ({
                    musicinfo: musicInfo,
                    skinType: skinType,
                    startNode: info.startNode
                }))

                AudioPlayManager.playUnlockMusicAU();
            }

            DiamondManager.getInstance().reduceDiamond(musicInfo.UnlockCost, diamondCall)
        }
    }

}

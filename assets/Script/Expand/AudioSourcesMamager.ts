import { Platform } from "../Common/CommonEnum";
import CommonGlobal from "../Common/CommonGlobal";
import audioEngineMamager from "./audioEngineMamager";
import DownloadManager from "./DownloadManager";

//此处添加音效,名称必须和文件名称一样,尽量只使用英文
export enum AudioSourcesName {
    BoxReward_AU = "BoxReward_AU",                              // 点击获得宝箱奖励的音效
    DownBTN_AU = "DownBTN_AU",                                  // 点击底部菜单栏按钮的音效
    EndStar_AU = "EndStar_AU",                                  // 结算页出现星星的音效
    Favour_AU = "Favour_AU",                                    // 收藏歌曲的音效

    GameBGChange_AU = "GameBGChange_AU",                        // 游戏内背景样式切换的音效
    GameError_AU = "GameError_AU",                              // 游戏内点击错误钢琴块的音效
    GameStart_AU = "GameStart_AU",                              // 游戏内点击开始游戏按钮的音效
    Loading_AU = "Loading_AU",                                  // 加载页面加载时播放的音效
    NormalClick_AU = "NormalClick_AU",                          // 普通的点击音效

    Relive_AU = "Relive_AU",                                    // 复活倒计时的音效
    ShowAddDiamond_AU = "ShowAddDiamond_AU",                    // 展示增加钻石界面的音效
    UnlockMusic_AU = "UnlockMusic_AU",                          // 歌曲解锁的音效

    NewMusic_AU = "NewMusic_AU",                                // 新歌速递的背景音效
}

/**音频资源类 */
export default class AudioSourcesMamager {
    private static instance: AudioSourcesMamager
    public static getInstance(): AudioSourcesMamager {
        if (!AudioSourcesMamager.instance) AudioSourcesMamager.instance = new AudioSourcesMamager();
        return AudioSourcesMamager.instance;
    }

    private AudioSources = {} //音频文件存储
    private playingAudio = {} //正在播放的音效

    /**音效初始化 */
    public SoundsInit() {
        var self = this;
        //如果是安卓IOS,AudioSources文件勾选配置为bundle,把音频文件放在AudioSources文件夹打包在本地
        if (CommonGlobal.getInstance().platform == Platform.Android ||
            CommonGlobal.getInstance().platform == Platform.IOS ||
            CommonGlobal.getInstance().platform == Platform.Web ||
            CommonGlobal.getInstance().platform == Platform.Android_NoAD) {
            cc.assetManager.loadBundle('AudioSources', (err, bundle) => {
                if (err) console.warn("AudioSources文件夹加载失败", err);
                else {
                    console.log("AudioSources文件夹加载成功");
                    for (let key in AudioSourcesName) {
                        bundle.load(key, cc.AudioClip, function (err, res) {
                            if (err) console.warn(err);
                            else {
                                console.log("本地音效", key, "加载成功");
                                self.AudioSources[key] = res;
                            }
                        });
                    }
                }
            });
        }
        //其他平台,从CDN下载后存在本地
        else {
            for (let key in AudioSourcesName) {
                this.DonaldSounds(key);
            }
        }

    };

    /**下载音效资源 */
    private DonaldSounds(name) {
        var self = this;

        // https://tencentcnd.minigame.xplaymobile.com/WanJiaWei/MusicColorRes2/AudioMgr2/MyMusic_AU2.mp3
        DownloadManager.loadMusic(`https://tencentcnd.minigame.xplaymobile.com/WanJiaWei/MusicPiano/Sounds/${name}.mp3`, `${name}`, (err, res) => {
            self.AudioSources[name] = res;
            console.log("网络音效", name, "下载成功");
        })
    };

    /**
     * 播放音效
     * @param SourcesName 音效名称
     * @param volume 音效大小,默认1
     * @param loop 音效是否循环,默认false
     * @param callback  音效播放完成回调
     */
    public playEffect(SourcesName: AudioSourcesName, volume?: number, loop?: boolean, callback?: Function) {
        // console.log("this.AudioSources[SourcesName]: ", JSON.stringify(this.AudioSources[SourcesName]))
        if (!volume) volume = 1;
        if (!loop) loop = false;
        if (callback) this.playingAudio[SourcesName] = audioEngineMamager.getInstance().playEffect(this.AudioSources[SourcesName], volume, loop, callback)
        else this.playingAudio[SourcesName] = audioEngineMamager.getInstance().playEffect(this.AudioSources[SourcesName], volume, loop)
    }
    /**
     * 停止音效
     * @param SourcesName 音效名称
     */
    public stopEffect(SourcesName: AudioSourcesName) {
        if (this.playingAudio[SourcesName] != undefined && this.playingAudio[SourcesName] != null) {
            audioEngineMamager.getInstance().stopEffect(this.playingAudio[SourcesName]);
            this.playingAudio[SourcesName] = null;
        }
        else console.warn(SourcesName, "音效没有播放");
    }

};




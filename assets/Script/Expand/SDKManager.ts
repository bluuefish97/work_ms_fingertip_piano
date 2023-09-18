/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.14
功能：sdk的总管理脚本
*****************************************************/

import ASCAd from "../../SDK/ASCAd";
import { Platform } from "../Common/CommonEnum";
import CommonGlobal from "../Common/CommonGlobal";


export default class SDKManager {

    private static instance: SDKManager
    public static getInstance(): SDKManager {
        if (!SDKManager.instance) SDKManager.instance = new SDKManager();
        return SDKManager.instance;
    }

    // 当前存储的录屏地址
    private curVideoPath: string = null;

    // 当前录屏的时间
    private recordTime: number = 0;

    // 最大录屏时间
    private recordMaxTime: number = 290;

    // 定时器的方法
    private recordFunc = null;

    // 表当前是否处于录屏状态中
    private isRecord: boolean = false;

    /** 广告初始化 */
    initASCAd() {
        // 广告初始化
        ASCAd.getInstance().initAd();
        ASCAd.getInstance().setGroup('UI');
    };

    /** 手机震动 */
    phoneVibrate(type: string) {
        // 如果允许进行震动的情况下,则调用震动函数
        if (CommonGlobal.getInstance().userData.IsShake == true) {
            ASCAd.getInstance().phoneVibrate(type);
        }
    };

    /** 展示更多游戏 */
    showMoreGamesModal() {
        ASCAd.getInstance().jumpToMoreGamesCenter();
    };

    /** 打开公众号 */
    showOfficialAccount() {
        // 抖音
        if (CommonGlobal.getInstance().platform == Platform.Douyin) {
            //@ts-ignore
            if (tt) {
                //@ts-ignore
                tt.openAwemeUserProfile({
                    success: function (res) {
                        console.log('---- open success, res: ', res);
                    },
                    fail: function (err) {
                        console.log('---- open fail, err: ', err);
                    },
                    complete: function (res) {
                    }
                })
            }
        }
        // 快手
        else if (CommonGlobal.getInstance().platform == Platform.Kuaishou) {
            //@ts-ignore
            if (kwaigame) {
                //@ts-ignore
                kwaigame.openUserProfile({
                    accountType: "CPServiceAccount",
                    callback: (result) => {
                        let data = JSON.stringify(result);
                        console.log("result: ", result);
                        console.log("data: ", data);

                        // 错误的原因(1表查询成功)
                        let curErrorCode = result["errorCode"];
                        // 错误信息
                        let curErrorMsg = result["errorMsg"];

                        // 如果不成功,则输出对应的错误信息
                        if (curErrorCode != 1) {
                            console.log("错误信息输出: ", curErrorMsg);
                            return
                        }
                    }
                })
            }
        }
    };

    /** 添加桌面图标 */
    addDeskTop(curCall: Function) {
        ASCAd.getInstance().addDesktop(curCall);
    };

    /** 获得录屏的时间 */
    getRecordTime() {
        return this.recordTime
    };

    /** 获得是否处于录屏中 */
    getRecordType() {
        return this.isRecord
    };

    /** 开始录屏 */
    startGameVideo() {
        this.curVideoPath = null;
        this.recordTime = 0;
        this.isRecord = true;

        this.recordFunc = setInterval(() => {
            this.recordTime += 1

            if (this.recordTime >= this.recordMaxTime) {
                this.stopGameVideo(null);
            }
        }, 1000);
        ASCAd.getInstance().startGameVideo(300);
    };

    /** 停止录屏 */
    stopGameVideo(curCall: Function) {
        clearInterval(this.recordFunc);

        const self = this;
        ASCAd.getInstance().stopGameVideo((videoPath) => {
            console.log('视频录制成功 ', videoPath);
            self.curVideoPath = videoPath;
            self.isRecord = false;

            curCall && curCall(videoPath)
        });
    };

    /** 分享录屏 */
    shareVideo(curCall: Function) {
        ASCAd.getInstance().shareVideo("", "", "", this.curVideoPath, (success) => {
            if (success) {
                curCall && curCall();
            } else {
            }
        });
    };

    /** 获得渠道ID */
    getChannelId(){
        return ASCAd.getInstance().getChannelId()
    };

}

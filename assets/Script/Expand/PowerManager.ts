/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.06.07
功能：体力系统
*****************************************************/

import CommonGlobal from "../Common/CommonGlobal";
import { AllCommandDefine } from "../MainComponent/AllCommandDefine";
import CommonFacade from "../MainComponent/CommonFacade";

export default class PowerManager {

    private static instance: PowerManager
    public static getInstance(): PowerManager {
        if (!PowerManager.instance) PowerManager.instance = new PowerManager();
        return PowerManager.instance;
    };

    /** 倒计时显示数 */
    public powerTimecunt: number = CommonGlobal.getInstance().addPowerTime;

    /** 减少体力 */
    public reducePower(num: number, callback?: () => void, callback2?: () => void) {
        let powerNum = CommonGlobal.getInstance().userData.PowerNum;
        if (powerNum >= num) {
            powerNum -= num;
            CommonGlobal.getInstance().userData.PowerNum = powerNum;
            console.log("当前体力的数量为: ", powerNum);
            CommonGlobal.getInstance().saveUserData();
            CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshPowerResponse);

            setTimeout(() => {
                callback && callback();
            }, 200);
        }
        else {
            console.log("体力数量不足,并弹出体力获得框");

            callback2 && callback2();
        }
    };

    /** 增加体力 */
    public addPower(num: number) {
        let powerNum = CommonGlobal.getInstance().userData.PowerNum;
        powerNum += num;
        powerNum = Math.floor(powerNum);
        CommonGlobal.getInstance().userData.PowerNum = powerNum;
        console.log("当前体力的数量为: ", powerNum);
        CommonGlobal.getInstance().saveUserData();
    };

    /** 恢复体力 */
    public powerRestore(curCall: Function) {
        if (CommonGlobal.getInstance().userData.PowerNum >= CommonGlobal.getInstance().maxPowerNum) {
        } else {
            this.powerTimecunt--;

            if (this.powerTimecunt <= 0) {
                console.log("体力恢复1格");
                this.powerTimecunt = CommonGlobal.getInstance().addPowerTime;
                CommonGlobal.getInstance().userData.PowerNum++;
                CommonGlobal.getInstance().saveUserData();

                curCall && curCall()
            }
        }
    };


}

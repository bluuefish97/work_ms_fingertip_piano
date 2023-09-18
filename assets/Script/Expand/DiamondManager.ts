import CommonGlobal from "../Common/CommonGlobal";
import { AllCommandDefine } from "../MainComponent/AllCommandDefine";
import CommonFacade from "../MainComponent/CommonFacade";
import { PageName } from "../MainComponent/PageName";
import { OpenPageFunc } from "../MainComponent/UI/Command/OpenPageCmd";

export default class DiamondManager {
    private static instance: DiamondManager
    public static getInstance(): DiamondManager {
        if (!DiamondManager.instance) DiamondManager.instance = new DiamondManager();
        return DiamondManager.instance;
    }

    /** 减少钻石 */
    public reduceDiamond(num: number, callback?: () => void) {
        let diamondNum = CommonGlobal.getInstance().userData.DiamondNum;
        if (diamondNum >= num) {
            diamondNum -= num;
            CommonGlobal.getInstance().userData.DiamondNum = diamondNum;
            console.log("当前钻石的数量为: ", diamondNum);
            CommonGlobal.getInstance().saveUserData();

            callback && callback();
        }
        else {
            console.log("钻石数量不足,并弹出钻石获得框");
            CommonFacade.getInstance().sendNotification(AllCommandDefine.OpenPageRequest, new OpenPageFunc(PageName.AddDiamondPage));
        }
    };

    /** 增加钻石 */
    public addDiamond(num: number) {
        let diamondNum = CommonGlobal.getInstance().userData.DiamondNum;
        diamondNum += num;
        diamondNum = Math.floor(diamondNum);
        CommonGlobal.getInstance().userData.DiamondNum = diamondNum;
        console.log("当前钻石的数量为: ", diamondNum)
        CommonGlobal.getInstance().saveUserData();
    };

}

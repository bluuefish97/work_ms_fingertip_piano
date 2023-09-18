import CommonGlobal from "../Common/CommonGlobal";
import TipsManager from "../Common/TipsManager";
import { AllCommandDefine } from "../MainComponent/AllCommandDefine";
import CommonFacade from "../MainComponent/CommonFacade";
import DiamondManager from "./DiamondManager";
import LocalStorageManager from "./LocalStorageManager";
import MusicManager from "./MusicManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class messgaeTS extends cc.Component {

    @property(cc.Label)
    TableURL: cc.Node = null;

    @property(cc.Node)
    InputNode: cc.Node = null;
    @property(cc.Node)
    BTNListNode: cc.Node = null;

    @property(cc.Node)
    InputText: cc.Node = null;

    //表是否进行了解锁当前的界面
    unlockBool: boolean = false

    //内部解锁的字符串
    lockStr: string = "XCJZTEST"

    addDiamondNum: number = 500

    addPowerNum: number = 20

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.TableURL.getComponent(cc.Label).string = "歌单地址:" + MusicManager.getInstance().getCurUseMusicTable()

        cc.assetManager.loadRemote(`https://tencentcnd.minigame.xplaymobile.com/Twogos/LOGO.png`, (err, res) => {
            if (err) { } else {
                var logo = new cc.SpriteFrame(res);
                this.node.getChildByName("GRP_BTN").getChildByName("LOGO").getComponent(cc.Sprite).spriteFrame = logo
            }
        });

        this.unlockBool = LocalStorageManager.getlocalStorageToBoolean("unlockBool");
        this.InputNode.active = !this.unlockBool
        this.BTNListNode.active = this.unlockBool

        var self = this;
        let pointadress = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/TestPassword/TestPassWord.json"
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                self.lockStr = JSON.parse(response)[0].password
            }
        };
        xhr.open("GET", pointadress, true);
        xhr.send();
    }

    close() {
        this.node.destroy();
    };

    addDimond() {
        DiamondManager.getInstance().addDiamond(this.addDiamondNum);
        TipsManager.getInstance().showTips("获得" + this.addDiamondNum + "钻石");
        CommonFacade.getInstance().sendNotification(AllCommandDefine.RefreshDiamondResponse, ({
            type: this.addDiamondNum
        }))
    };

    clearData() {
        cc.sys.localStorage.clear();
        CommonGlobal.getInstance().resetUserData();
        console.log("清除数据");
    };

    //检测测试码是否一致
    CheckCode() {
        const inputStr = this.InputText.getComponent(cc.EditBox).string
        const newStr = inputStr.toUpperCase()

        const upperStr = this.lockStr.toUpperCase()

        if (newStr == upperStr) {
            TipsManager.getInstance().showTips('测试功能开启成功');
            this.unlockBool = true

            this.InputNode.active = !this.unlockBool
            this.BTNListNode.active = this.unlockBool

            LocalStorageManager.setlocalStorage("unlockBool", true)
        } else {
            this.InputText.getComponent(cc.EditBox).string = ""

            TipsManager.getInstance().showTips('测试码有误');
        }
    };

    // 解锁全部歌曲
    LockAllMusic() {
        MusicManager.getInstance().unlockAllMusic();
    };


}

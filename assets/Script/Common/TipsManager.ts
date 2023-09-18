/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.08
功能：提示控制脚本
*****************************************************/

import DownloadManager from "../Expand/DownloadManager";
import { PagePath } from "../MainComponent/PagePath";
import { Platform } from "./CommonEnum";
import CommonGlobal from "./CommonGlobal";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TipsManager extends cc.Component {

    private static _instance: TipsManager;
    public static getInstance(): TipsManager {
        return TipsManager._instance
    }

    /** 提示组件功能 */
    private tipsCon: cc.Node = null;
    /** 提示组件的文本 */
    private tipsLB: cc.Node = null;

    /** 当前连续点击测试按钮的次数 */
    private clickNum: number = 0;

    /** 点击弹出测试框所需要的次数 */
    private clickNeedNum: number = 10;

    onLoad() {
        if (!TipsManager._instance) {
            TipsManager._instance = this
        } else if (TipsManager._instance != this) {
            this.destroy();
        }

        this.node.zIndex = 10000;
        cc.game.addPersistRootNode(this.node);

        this.defination();
    }

    /** 定义节点 */
    defination() {
        this.tipsCon = this.node.getChildByName("GRP_Tips");
        this.tipsLB = this.tipsCon.getChildByName("LB_Tips");
    };

    /** 展示提示 */
    showTips(text: string, time = 1, isTest = false) {
        if (isTest == true) {
            if (CommonGlobal.getInstance().platform != Platform.Web) {
                return
            }
        }

        this.tipsLB.getComponent(cc.Label).string = text;

        this.tipsCon.stopAllActions();
        this.tipsCon.active = true;
        this.tipsCon.zIndex = 10000;
        this.tipsCon.opacity = 255;
        this.tipsCon.scale = 0.3;
        this.tipsCon.y = -300;

        var spawn = cc.spawn(
            cc.scaleTo(0.3, 1.5),
            cc.fadeIn(0.3)
        );
        var spawn2 = cc.spawn(
            cc.moveTo(1, cc.v2(0, 200)),
            cc.fadeOut(time)
        );
        var finished = cc.callFunc(function () {
            this.tipsCon.active = false;
        }, this, null);

        var seq = cc.sequence(spawn, spawn2, finished);
        this.tipsCon.runAction(seq);
    };

    // 点击测试按钮的次数
    onclickTest() {
        const self = this
        if (self.clickNum === 0) {
            self.scheduleOnce(function () {
                self.clickNum = 0
            }, 3)
        } else if (!self.clickNum) {
            self.clickNum = 0
        }
        console.log(self.clickNum);

        self.clickNum++;
        if (self.clickNum >= self.clickNeedNum) {
            self.clickNum = 0;

            DownloadManager.loadResources(PagePath.MessagePath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("测试界面加载失败");
                } else {
                    console.log("测试界面加载完毕");

                    var Node = cc.instantiate(res);
                    Node.setPosition(0, 0);
                    Node.zIndex = 102;
                    cc.director.getScene().addChild(Node);
                }
            })
        }
    };

}

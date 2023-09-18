/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.03.08
功能：展示主界面的样式
*****************************************************/


import DonaldManager from "../../../Expand/DownloadManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import Home from "../../../SceneScript/Home";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import { HomeConName } from "../../PageName";
import { HomeConPath } from "../../PagePath";
import GiftViewMediator from "../Mediator/GiftViewMediator";
import HotViewMediator from "../Mediator/HotViewMediator";
import LikeViewMediator from "../Mediator/LikeViewMediator";
import MoreListMediator from "../Mediator/MoreListMediator";
import MusicListMediator from "../Mediator/MusicListMediator";
import TopViewMediator from "../Mediator/TopViewMediator";


export default class ShowHomeCmd extends SimpleCommand {

    private curCall: Function;
    public execute(notification: INotification): void {
        console.log("execute: " + "ShowHomeCmd");
        console.log("加载场景Home的全部预制")

        let body = notification.getBody() as ShowHomeBody;
        let type = body.type;
        this.curCall = body.callback;

        switch (type) {
            case HomeConName.GRP_Top:
                this.loadTopCon();
                break

            case HomeConName.GRP_Hot:
                this.loadHotCon();
                break

            case HomeConName.GRP_Gift:
                this.loadGiftCon();
                break

            case HomeConName.GRP_Like:
                this.loadLikeCon();
                break

            case HomeConName.MusicListNode:
                this.loadMusicListCon();
                break

            case HomeConName.MoreListNode:
                this.loadMoreCon();
                break

            default:
                break
        }
    };

    /** 加载顶部组件界面 */
    private loadTopCon() {
        const self = this
        DonaldManager.loadResources(HomeConPath.GRP_Top, cc.Prefab, (err: any, res: any) => {
            if (err) {
                console.log("顶部组件加载失败");
            } else {
                console.log("顶部组件加载成功");

                let curParentNode = Home.getInstance().HomeContentNode;
                const curNode = cc.instantiate(res);
                curParentNode.addChild(curNode);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.TopViewMediator)
                CommonFacade.getInstance().registerMediator(new TopViewMediator(AllMediatorDefine.TopViewMediator, curNode));
                self.curCall && self.curCall();
            }
        })
    };

    /** 加载热门组件界面 */
    private loadHotCon() {
        const self = this
        DonaldManager.loadResources(HomeConPath.GRP_Hot, cc.Prefab, (err: any, res: any) => {
            if (err) {
                console.log("热门组件加载失败");
            } else {
                console.log("热门组件加载成功");

                let curParentNode = Home.getInstance().HomeContentNode;
                const curNode = cc.instantiate(res);
                curParentNode.addChild(curNode);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.HotViewMediator)
                CommonFacade.getInstance().registerMediator(new HotViewMediator(AllMediatorDefine.HotViewMediator, curNode));
                self.curCall && self.curCall();
            }
        })
    };

    /** 加载礼物组件界面 */
    private loadGiftCon() {
        const self = this;
        DonaldManager.loadResources(HomeConPath.GRP_Gift, cc.Prefab, (err: any, res: any) => {
            if (err) {
                console.log("礼物组件加载失败");
            } else {
                console.log("礼物组件加载成功");

                let curParentNode = Home.getInstance().HomeContentNode;
                const curNode = cc.instantiate(res);
                curParentNode.addChild(curNode);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.GiftViewMediator);
                CommonFacade.getInstance().registerMediator(new GiftViewMediator(AllMediatorDefine.GiftViewMediator, curNode));
                self.curCall && self.curCall();
            }
        })
    };

    /** 加载偏好组件界面 */
    private loadLikeCon() {
        const self = this;
        DonaldManager.loadResources(HomeConPath.GRP_Like, cc.Prefab, (err: any, res: any) => {
            if (err) {
                console.log("偏好组件加载失败");
            } else {
                console.log("偏好组件加载成功");

                let curParentNode = Home.getInstance().HomeContentNode;
                const curNode = cc.instantiate(res);
                curParentNode.addChild(curNode);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.LikeViewMediator);
                CommonFacade.getInstance().registerMediator(new LikeViewMediator(AllMediatorDefine.LikeViewMediator, curNode));
                self.curCall && self.curCall();
            }
        })
    };

    /** 加载我的音乐组件界面 */
    private loadMusicListCon() {
        const self = this;
        DonaldManager.loadResources(HomeConPath.MusicListNode, cc.Prefab, (err: any, res: any) => {
            if (err) {
                console.log("我的音乐组件加载失败");
            } else {
                console.log("我的音乐组件加载成功");

                let curParentNode = Home.getInstance().pageListNode;
                const curNode = cc.instantiate(res);
                curParentNode.addChild(curNode);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.MusicListMediator);
                CommonFacade.getInstance().registerMediator(new MusicListMediator(AllMediatorDefine.MusicListMediator, curNode));

                self.curCall && self.curCall(curNode);
            }
        })
    };

    /** 加载更多设置组件界面 */
    private loadMoreCon() {
        const self = this;
        DonaldManager.loadResources(HomeConPath.MoreListNode, cc.Prefab, (err: any, res: any) => {
            if (err) {
                console.log("更多设置组件加载失败");
            } else {
                console.log("更多设置组件加载成功");

                let curParentNode = Home.getInstance().pageListNode;
                const curNode = cc.instantiate(res);
                curParentNode.addChild(curNode);

                CommonFacade.getInstance().removeMediator(AllMediatorDefine.MoreListMediator);
                CommonFacade.getInstance().registerMediator(new MoreListMediator(AllMediatorDefine.MoreListMediator, curNode));

                self.curCall && self.curCall(curNode);
            }
        })
    };


}

export class ShowHomeBody {
    type: HomeConName;
    callback: Function;
    constructor(t: HomeConName, c?: Function) {
        this.type = t;
        this.callback = c;
    }
}

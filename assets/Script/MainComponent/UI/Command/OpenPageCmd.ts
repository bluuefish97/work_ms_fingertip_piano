/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.02.24
功能：控制预制体页面展开
*****************************************************/

import DownloadManager from "../../../Expand/DownloadManager";
import { INotification } from "../../../Puremvc/interfaces/INotification";
import { SimpleCommand } from "../../../Puremvc/patterns/command/SimpleCommand";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import { PageName } from "../../PageName";
import { PagePath } from "../../PagePath";
import AddDiamondMediator from "../Mediator/AddDiamondMediator";
import AddPowerMediator from "../Mediator/AddPowerMediator";
import EndPageMediator from "../Mediator/EndPageMediator";
import LoadingPageMediator from "../Mediator/LoadingPageMediator";
import NewMusicMediator from "../Mediator/NewMusicMediator";
import RecordShareMediator from "../Mediator/RecordShareMediator";
import RelivePageMediator, { RelivePageFunc } from "../Mediator/RelivePageMediator";
import RewardBoxMediator from "../Mediator/RewardBoxMediator";

export default class OpenPageCmd extends SimpleCommand {

    public execute(notification: INotification): void {
        console.log("execute:  " + "OpenPageCmd");

        let curFunc = notification.getBody() as OpenPageFunc;
        let curPageType = curFunc.pageType;
        let curCallBack = curFunc.callback1;
        let curCallBack2 = curFunc.callback2;

        switch (curPageType) {
            case PageName.RelivePage:
                this.showRelivePage(curCallBack, curCallBack2);
                break

            case PageName.WinPage:
                this.showEndPage(curCallBack, true);
                break

            case PageName.LosePage:
                this.showEndPage(curCallBack, false);
                break

            case PageName.AddDiamondPage:
                this.showAddDiamondPage(curCallBack);
                break

            case PageName.RecordSharePage:
                this.showRecordSharePage(curCallBack);
                break

            case PageName.LoadPage:
                this.showLoadingPage(curCallBack);
                break

            case PageName.RewardBoxPage:
                this.showRewardBoxPage(curCallBack);
                break

            case PageName.AddPowerPage:
                this.showAddPowerPage(curCallBack);
                break

            case PageName.NewMusicPage:
                this.showNewMusicPage(curCallBack);
                break

            default:
                break
        }
    };

    /** 展开复活界面 */
    private showRelivePage(curCall1 = null, curCall2 = null) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.RelivePageMediator) as RelivePageMediator;
        if (curMediator) {
            curMediator.setCallFunc(curCall1, curCall2);
            curMediator.setPageActive(true);
            curMediator.startReliveTime();
        } else {
            DownloadManager.loadResources(PagePath.RelivePath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("复活界面加载失败");
                } else {
                    console.log("复活界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.RelivePageMediator);
                    CommonFacade.getInstance().registerMediator(new RelivePageMediator(AllMediatorDefine.RelivePageMediator, new RelivePageFunc(curPrefab, curCall1, curCall2)));
                }
            })
        }
    };

    /** 展开结算界面 */
    private showEndPage(curCall = null, isWin: boolean) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.EndPageMediator) as EndPageMediator;
        if (curMediator) {
            curMediator.setPageActive(true);
            curMediator.setEndPageType(isWin);

            curCall && curCall()
        } else {
            DownloadManager.loadResources(PagePath.EndPath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("结算界面加载失败");
                } else {
                    console.log("结算界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.EndPageMediator);
                    CommonFacade.getInstance().registerMediator(new EndPageMediator(AllMediatorDefine.EndPageMediator, curPrefab));
                    curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.EndPageMediator) as EndPageMediator;
                    curMediator.setEndPageType(isWin);

                    curCall && curCall();
                }
            })
        }
    };

    /** 展开增加钻石界面 */
    private showAddDiamondPage(curCall = null) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.AddDiamondMediator) as AddDiamondMediator;
        if (curMediator) {
            curMediator.setPageActive(true);

            curCall && curCall()
        } else {
            DownloadManager.loadResources(PagePath.AddDiamondPath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("增加钻石界面加载失败");
                } else {
                    console.log("增加钻石界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.AddDiamondMediator);
                    CommonFacade.getInstance().registerMediator(new AddDiamondMediator(AllMediatorDefine.AddDiamondMediator, curPrefab));

                    curCall && curCall()
                }
            })
        }
    };

    /** 展开分享录屏界面 */
    private showRecordSharePage(curCall = null) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.RecordShareMediator) as RecordShareMediator;
        if (curMediator) {
            curMediator.setPageActive(true);
            curCall && curCall()
        } else {
            DownloadManager.loadResources(PagePath.RecordSharePath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("分享录屏界面加载失败");
                } else {
                    console.log("分享录屏界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.RecordShareMediator);
                    CommonFacade.getInstance().registerMediator(new RecordShareMediator(AllMediatorDefine.RecordShareMediator, curPrefab));

                    curCall && curCall()
                }
            })
        }
    };

    /** 展开加载界面 */
    private showLoadingPage(curCall = null) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.LoadingPageMediator) as LoadingPageMediator;
        if (curMediator) {
            curMediator.setPageActive(true);
            curMediator.startLoadGame();

            curCall && curCall()
        } else {
            DownloadManager.loadResources(PagePath.LoadingPath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("加载界面加载失败");
                } else {
                    console.log("加载界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.LoadingPageMediator);
                    CommonFacade.getInstance().registerMediator(new LoadingPageMediator(AllMediatorDefine.LoadingPageMediator, curPrefab));
                    curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.LoadingPageMediator) as LoadingPageMediator;
                    curMediator.startLoadGame();

                    curCall && curCall()
                }
            })
        }
    };

    /** 展开宝箱奖励界面 */
    private showRewardBoxPage(curCall = null) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.RewardBoxMediator) as RewardBoxMediator;
        if (curMediator) {
            curMediator.setPageActive(true);
            curCall && curCall()
        } else {
            DownloadManager.loadResources(PagePath.RewardBoxPath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("分享宝箱奖励界面加载失败");
                } else {
                    console.log("分享宝箱奖励界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.RewardBoxMediator);
                    CommonFacade.getInstance().registerMediator(new RewardBoxMediator(AllMediatorDefine.RewardBoxMediator, curPrefab));

                    curCall && curCall()
                }
            })
        }
    };

    /** 展开增加体力界面 */
    private showAddPowerPage(curCall = null) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.AddPowerMediator) as AddPowerMediator;
        if (curMediator) {
            curMediator.setPageActive(true);
            curMediator.setCallFunc(curCall);
        } else {
            DownloadManager.loadResources(PagePath.AddPowerPath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("增加体力界面加载失败");
                } else {
                    console.log("增加体力界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.AddPowerMediator);
                    CommonFacade.getInstance().registerMediator(new AddPowerMediator(AllMediatorDefine.AddPowerMediator, curPrefab));
                    curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.AddPowerMediator) as AddPowerMediator;
                    
                    curMediator.setCallFunc(curCall);
                }
            })
        }
    };

    /** 展开新歌速递界面 */
    private showNewMusicPage(curCall = null) {
        let curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.NewMusicMediator) as NewMusicMediator;
        if (curMediator) {
            curMediator.setPageActive(true);
            curMediator.setPageAnim();

            curCall && curCall()
        } else {
            DownloadManager.loadResources(PagePath.NewMusicPath, cc.Prefab, (err: any, res: any) => {
                if (err) {
                    console.log("增加新歌速递界面加载失败");
                } else {
                    console.log("增加新歌速递界面加载完毕");
                    let parentNode = cc.director.getScene();
                    let curPrefab = cc.instantiate(res);
                    curPrefab.parent = parentNode;

                    CommonFacade.getInstance().removeMediator(AllMediatorDefine.NewMusicMediator);
                    CommonFacade.getInstance().registerMediator(new NewMusicMediator(AllMediatorDefine.NewMusicMediator, curPrefab));
                    curMediator = CommonFacade.getInstance().retrieveMediator(AllMediatorDefine.NewMusicMediator) as NewMusicMediator;
                    curMediator.setPageAnim();

                    curCall && curCall()
                }
            })
        }
    };



}

export class OpenPageFunc {
    pageType: PageName;
    callback1: Function;
    callback2: Function;

    constructor(page: PageName, func?: Function, func2?: Function) {
        this.pageType = page;
        this.callback1 = func;
        this.callback2 = func2;
    }
}


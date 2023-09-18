/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.12
功能：音乐滚动条的中介者
*****************************************************/

import ToolsManager from "../../../Expand/ToolsManager";
import { Mediator } from "../../../Puremvc/patterns/mediator/Mediator";
import { AllMediatorDefine } from "../../AllMediatorDefine";
import CommonFacade from "../../CommonFacade";
import MusicScrollUnit from "../Unit/MusicScrollUnit";
import NormalMusicUnit from "../Unit/NormalMusicUnit";
import NormalMusicMediator from "./NormalMusicMediator";


export default class MusicScrollMediator extends Mediator {

    /** 滚动条的基础节点 */
    private curMusicScroll: MusicScrollUnit = null;

    /** 当前滚动条的y */
    private curContentY: number = 0;

    /** 第一个子节点所代表的id */
    private firstNum: number = 0;

    /** 最多显示的预制数量 */
    private maxShowPrefab: number = 10;

    /** 定义的类型 */
    private defineType: AllMediatorDefine = null;

    /** 当前页面的标签 */
    private curMusicPageType: number = 0;

    /** 创建组件的间隔事件差 */
    private createInterTime: number = 50;

    /** 预制的高度 */
    private prefabHeight = 230

    /** 当前歌曲组件所存储的歌曲信息 */
    private curMusicList = [];

    /** 音乐中介对应列表 */
    private musicMediatorList = [];



    public constructor(mediatorName: string = null, viewComponent: any = null) {
        super(mediatorName, viewComponent);

        if (viewComponent == null) {
            return;
        }

        let viewNode = viewComponent as cc.Node;
        if (!viewNode) {
            return;
        }

        this.curMusicScroll = viewNode.getComponent(MusicScrollUnit);
        this.setButtonEvt();
    };


    //---------------------------------------------------------------------------------------------------------------------------------------
    //  内置函数

    /** 初始化当前滚动条的部分基础信息 */
    public initMusicData(curDef?: AllMediatorDefine, curPageNum?: number) {
        this.defineType = curDef;
        this.curMusicPageType = curPageNum;
    };

    /** 初始化当前的歌曲存储信息 */
    public initMusicList(curList: any) {
        this.curMusicList = curList;
        this.initCreateMusicList();
    };

    /** 初始化音乐列表 */
    private initCreateMusicList() {
        this.curMusicScroll.clearAllChild();

        const self = this;
        for (let i = 0; i < this.maxShowPrefab; i++) {
            this.curMusicScroll.createMusicPrefab((curPrefab) => {
                const curJS = curPrefab.getComponent(NormalMusicUnit);
                curJS.setAnimNodeActive(false);

                CommonFacade.getInstance().removeMediator(self.defineType + "_" + self.curMusicPageType + "_" + i);
                CommonFacade.getInstance().registerMediator(new NormalMusicMediator(self.defineType + "_" + self.curMusicPageType + "_" + i, curPrefab));
                let curMediator = CommonFacade.getInstance().retrieveMediator(self.defineType + "_" + self.curMusicPageType + "_" + i) as NormalMusicMediator;
                if (i < self.curMusicList.length) {
                    curMediator.baseMusicInfo = self.curMusicList[i];
                    curMediator.refreshMusicData();
                } else {
                    curMediator.setPrefabActive(false);
                }
                curPrefab.y = -100 - self.prefabHeight * i

                setTimeout(() => {
                    curJS.setMusicAnim(true);
                }, self.createInterTime * i)

                self.musicMediatorList[i] = i;
            })
        }

        // 数据初始化
        this.firstNum = 0;
        this.curContentY = 0;
        this.curMusicScroll.resetContentY(this.curContentY);
        this.curMusicScroll.setContentHeight(this.curMusicList.length);
    };

    /** 控制页面显示 */
    public setPageActive(isShow: boolean) {
        this.curMusicScroll.setPageActive(isShow);
    };

    /** 刷新歌曲列表的存储信息 */
    public refreshMusicList() {
        this.curMusicScroll.resetContentY(this.curContentY);

        for (let i = 0; i < this.musicMediatorList.length; i++) {
            let curMediator = CommonFacade.getInstance().retrieveMediator(this.defineType + "_" + this.curMusicPageType + "_" + this.musicMediatorList[i]) as NormalMusicMediator;
            curMediator.setAnimNodeActive(false);

            setTimeout(() => {
                curMediator.setMusicAnim(true);
            }, this.createInterTime * i)
        }
    };

    /** 检测当前歌曲列表信息是否进行有修改 */
    public checkListChange(curList: any) {
        let curBool = ToolsManager.checkArraySame(curList, this.curMusicList);
        return curBool
    };



    //---------------------------------------------------------------------------------------------------------------------------------------
    //  监听事件

    /** 设置按钮监听事件 */
    private setButtonEvt() {
        this.curMusicScroll.setScrollEvt((curContent, curView) => {
            this.scrollEvt(curContent, curView);
        })
    };

    /** 设置滚动条的监听事件 */
    private scrollEvt(contentNode: cc.Node, viewNode: cc.Node) {
        // 获得当前的y值
        let offsetY = contentNode.y;

        // 设置移动方向
        let deltaNum = this.curContentY > offsetY;
        let moveUp = false
        if (deltaNum) {
            moveUp = true
        } else {
            moveUp = false
        }
        this.curContentY = contentNode.y;
        this.curMusicScroll.setContentY(this.curContentY);

        let viewNodeY = viewNode.y;
        // 在底部或者顶部时进行返回
        if ((this.curContentY < (0 + viewNodeY) && this.firstNum == 0)
            || (this.curContentY > contentNode.height && (this.firstNum + 9) == this.curMusicList.length - 1))
            return

        if (this.curContentY >= (this.prefabHeight * (this.firstNum + 1) - viewNodeY) && (this.firstNum + 9) < (this.curMusicList.length - 1)) {
            if (this.curMusicList[(this.firstNum + 9) + 1]) {
                let curMediator = CommonFacade.getInstance().retrieveMediator(this.defineType + "_" + this.curMusicPageType + "_" + this.musicMediatorList[0]) as NormalMusicMediator;
                curMediator.baseMusicInfo = this.curMusicList[this.firstNum + 10];
                curMediator.refreshMusicData();

                const curChild = contentNode.children[0]
                contentNode.children[0].setSiblingIndex(9)
                curChild.setPosition(cc.v2(curChild.position.x, curChild.position.y - this.prefabHeight * 10));

                // 重新设置列表
                let firstMusic = this.musicMediatorList[0]
                for (let i = 0; i < this.musicMediatorList.length; i++) {
                    if (i != (this.musicMediatorList.length - 1)) {
                        this.musicMediatorList[i] = this.musicMediatorList[i + 1]
                    } else {
                        this.musicMediatorList[this.musicMediatorList.length - 1] = firstMusic;
                    }
                }

                this.firstNum++
            }
        } else if (this.curContentY <= (this.prefabHeight * this.firstNum - viewNodeY)) {
            if (this.curMusicList[this.firstNum - 1]) {
                let curMediator = CommonFacade.getInstance().retrieveMediator(this.defineType + "_" + this.curMusicPageType + "_" + this.musicMediatorList[9]) as NormalMusicMediator;
                curMediator.baseMusicInfo = this.curMusicList[this.firstNum - 1];
                curMediator.refreshMusicData();

                const curChild = contentNode.children[9]
                contentNode.children[9].setSiblingIndex(0)
                curChild.setPosition(cc.v2(curChild.position.x, curChild.position.y + this.prefabHeight * 10));

                // 重新设置列表
                let firstMusic = this.musicMediatorList[9]
                for (let i = this.musicMediatorList.length - 1; i >= 0; i--) {
                    if (i != 0) {
                        this.musicMediatorList[i] = this.musicMediatorList[i - 1];
                    } else {
                        this.musicMediatorList[i] = firstMusic;
                    }
                }

                this.firstNum--
            }
        }
    };

}

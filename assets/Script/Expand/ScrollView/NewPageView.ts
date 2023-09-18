const { ccclass, property } = cc._decorator;

enum DirectionType {
    Left,
    Right
}

@ccclass
export default class NewPageView extends cc.Component {

    @property({
        type: cc.Enum(DirectionType),
        displayName: "轮播方向"
    })
    directionType: DirectionType = DirectionType.Left;

    @property({
        type: cc.ScrollView,
        displayName: "滚动条"
    })
    scrollView: cc.ScrollView = null;

    @property({
        displayName: "轮播间隔"
    })
    pageTime: number = 1;

    @property({
        displayName: "轮播动画时间"
    })
    turnTime: number = 1;

    @property({
        displayName: "页面比例超过多少时进行翻动"
    })
    perNum: number = 0.5

    @property({
        type: cc.Node,
        displayName: "页图指示器"
    })
    indicator: cc.Node = null;

    @property({
        type: cc.SpriteFrame,
        displayName: "页面指示器图片"
    })
    indicatorSP: cc.SpriteFrame = null;

    private pageViewChild: Array<cc.Node> = new Array<cc.Node>();           //最初的pageview组件的子节点列表
    private curPageViewChild: Array<cc.Node> = new Array<cc.Node>();        //现在的pageview组件的子节点列表（要进行操作的数据）

    private curItemIdx: number = 0;                                         //当前的元素下标
    private curContentX: number = 0;                                        //当前content处于的x坐标

    private firstPosX: number = 0;                                          //将初始位置进行存储
    private startPosX: number = 0;                                          //记录开始时的点
    private endPosX: number = 0;                                            //记录结束时的点

    private isTurning: boolean = false                                      //表是否处于进行切换页面的状态下
    private pageViewType = -1;                                              //表当前移动时的pageview的类型（1向左,2向右）

    private curLen = 0;                                                     //当前列表中所能够进行显示的长度
    private compareNum = 0;                                                 //当前列表中的节点数字
    private loadOk = false                                                  //当前列表加载完毕

    private initOK = false;                                                 // 表组件初始化是否成功

    update() {
        if (this.initOK == true) {
            this.UpdateView();
        }
    };

    /** 设置当前的滚动条 */
    SetCurScroll() {
        this.SetScrollEvt()
        this.curContentX = this.scrollView.content.x

        for (let i = 0; i < this.scrollView.content.childrenCount; i++) {
            this.pageViewChild.push(this.scrollView.content.children[i])
            this.curPageViewChild.push(this.scrollView.content.children[i])
            this.curPageViewChild[i].active = false

            if (i == this.scrollView.content.childrenCount - 1) {
                this.loadOk = true
            }
        }

        this.firstPosX = this.scrollView.content.x
        //列表能够进行显示的长度
        this.curLen = this.curPageViewChild.length
        if (this.curLen >= 5) {
            this.curLen = 5
        }

        //中间节点的数字
        this.compareNum = 0
        if (this.curLen >= 5) {
            this.compareNum = 2
        } else {
            this.compareNum = 1
        }

        this.UpdatePageview();
        this.AutoCarousel();

        this.initOK = true;
    };

    //设置滚动事件
    SetScrollEvt() {
        this.scrollView.node.on("scrolling", this.onScrolling, this);
        this.scrollView.node.on("scroll-ended", this.onTouchUp, this);
        this.scrollView.node.on("scroll-began", this.onScrollBegan, this);

        this.scrollView.node.on(cc.Node.EventType.TOUCH_START, this.CarouselEnd, this)
    };

    //更新pageview组件的样式
    UpdatePageview(turnNum = 0) {
        let activeNum = 0
        for (let i = 0; i < this.curPageViewChild.length; i++) {
            if (this.curPageViewChild[i].active == true) {
                activeNum++
            }
        }

        const self = this
        //表当前的列表中的组件全部进行了隐藏
        if (activeNum == 0) {
            if (this.compareNum == 2) {
                let last1 = this.curPageViewChild[this.curPageViewChild.length - 1]
                let last2 = this.curPageViewChild[this.curPageViewChild.length - 2]

                this.curPageViewChild.splice(this.curPageViewChild.length - 2, 2)
                this.curPageViewChild.unshift(last2, last1)
            } else {
                let last1 = this.curPageViewChild[this.curPageViewChild.length - 1]

                this.curPageViewChild.splice(this.curPageViewChild.length - 1, 1)
                this.curPageViewChild.unshift(last1)
            }

            for (let i = 0; i < this.curLen; i++) {
                this.curPageViewChild[i].active = true

                this.curPageViewChild[i].setSiblingIndex(i)
            }

            this.curItemIdx = 0

            this.UpdateIndicator()
        }
        else {
            //向左移
            if (turnNum == 1) {

                let timeRate = (this.firstPosX + this.curPageViewChild[this.curItemIdx].width - this.scrollView.content.x) / this.curPageViewChild[this.curItemIdx].width

                this.isTurning = true
                this.pageViewType = 1

                this.scrollView.content.runAction(
                    cc.sequence(
                        cc.moveTo(this.turnTime * timeRate, cc.v2(this.firstPosX + this.curPageViewChild[this.curItemIdx].width, this.scrollView.content.y)),
                        cc.callFunc(() => {
                            self.scrollView.content.stopAllActions()

                            self.isTurning = false
                            self.pageViewType = 0
                        })
                    ))
            }
            //向右
            else if (turnNum == 2) {

                let timeRate = (this.scrollView.content.x - this.firstPosX + this.curPageViewChild[this.curItemIdx].width) / this.curPageViewChild[this.curItemIdx].width
                this.isTurning = true
                this.pageViewType = 2

                this.scrollView.content.runAction(
                    cc.sequence(
                        cc.moveTo(this.turnTime * timeRate, cc.v2(this.firstPosX - this.curPageViewChild[this.curItemIdx].width, this.scrollView.content.y)),
                        cc.callFunc(() => {
                            self.scrollView.content.stopAllActions()

                            self.isTurning = false
                            self.pageViewType = 0
                        })
                    ))

            }

            //向原位置进行移动
            else if (turnNum == 0) {
                //原先向右进行了移动
                if (this.pageViewType == 2) {
                    let timeRate = (this.firstPosX - this.scrollView.content.x) / this.curPageViewChild[this.curItemIdx].width

                    this.isTurning = true
                    this.pageViewType = 2

                    this.scrollView.content.runAction(
                        cc.sequence(
                            cc.moveTo(this.turnTime * timeRate, cc.v2(this.firstPosX, this.scrollView.content.y)),
                            cc.callFunc(() => {
                                self.scrollView.content.stopAllActions()

                                self.isTurning = false
                                self.pageViewType = 0
                            })
                        ))
                }
                //原先向左进行了移动
                else if (this.pageViewType == 1) {

                    let timeRate = (this.scrollView.content.x - this.firstPosX) / this.curPageViewChild[this.curItemIdx].width

                    this.isTurning = true
                    this.pageViewType = 1

                    this.scrollView.content.runAction(
                        cc.sequence(
                            cc.moveTo(this.turnTime * timeRate, cc.v2(this.firstPosX, this.scrollView.content.y)),
                            cc.callFunc(() => {
                                self.scrollView.content.stopAllActions()

                                self.isTurning = false
                                self.pageViewType = 0
                            })
                        ))

                }
            }
        }
    };

    onScrollBegan() {
        this.startPosX = this.scrollView.content.position.x
        this.scrollView.content.stopAllActions();
        this.unschedule(this.AutoTurnPage)
    };

    onScrolling() {
        this.curContentX = this.scrollView.content.x
        this.unschedule(this.AutoTurnPage)
    };

    onTouchUp(event) {
        this.scrollView.content.stopAllActions();
        this.endPosX = this.scrollView.content.position.x
        this.curContentX = this.scrollView.content.x
        this.AutoPage()
        this.AutoCarousel()
    };

    CarouselEnd() {
        this.unschedule(this.AutoTurnPage)
    };

    //自动移动到指定的位置
    AutoPage() {
        //获取移动的方向(0不动, 1左移动, 2右移动)
        let curNum = 0
        let cut = this.startPosX - this.endPosX
        if (cut > 0) {
            curNum = 2
        } else if (cut < 0) {
            curNum = 1
        }

        this.scrollView.content.stopAllActions()

        //表处于执行对应的滑动动画时,进行了拖拽操作
        if (this.isTurning) {
            //如果移动方向和原先一致
            if (curNum == this.pageViewType) {
                this.UpdatePageview(curNum)
            } else {
                this.UpdatePageview(0)
            }
        } else {
            this.UpdatePageview(curNum)
        }
    };

    //自动翻页功能(轮播)
    AutoCarousel() {
        this.schedule(this.AutoTurnPage, this.pageTime)
    };

    //轮播方式
    AutoTurnPage() {
        let turnNum = this.directionType
        //向左
        if (turnNum == 0) {
            this.UpdatePageview(1)
        }
        //向右
        else if (turnNum == 1) {
            this.UpdatePageview(2)
        }
    };

    //向指定方向进行切换
    TurnToPage(turnNum: number) {
        if (this.isTurning == true) return

        this.UpdatePageview(turnNum)
        this.unschedule(this.AutoTurnPage)

        this.scheduleOnce(() => {
            this.AutoCarousel()
        }, 0.1)
    };

    //更新页面指示器
    UpdateIndicator() {
        if (this.indicator) {
            let curJS = this.indicator.getComponent(cc.Layout)
            if (curJS == null) {
                curJS = this.indicator.addComponent(cc.Layout)
                curJS.type = cc.Layout.Type.HORIZONTAL;

                for (let i = 0; i < this.pageViewChild.length; i++) {
                    let curNode = new cc.Node(i.toString());
                    let spJS = curNode.addComponent(cc.Sprite)
                    if (this.indicatorSP) {
                        spJS.spriteFrame = this.indicatorSP
                    }

                    curNode.opacity = 128
                    curNode.parent = this.indicator
                }
            } else if (this.indicator.childrenCount == 0) {
                for (let i = 0; i < this.pageViewChild.length; i++) {
                    let curNode = new cc.Node(i.toString());
                    let spJS = curNode.addComponent(cc.Sprite)
                    if (this.indicatorSP) {
                        spJS.spriteFrame = this.indicatorSP
                    }

                    curNode.opacity = 128
                    curNode.parent = this.indicator
                }
            }

            for (let j = 0; j < this.pageViewChild.length; j++) {
                const curNode = this.indicator.children[j]
                if (j != this.curItemIdx) {
                    curNode.opacity = 128
                } else {
                    curNode.opacity = 255
                }
            }
        } else {
            return
        }
    };

    //更新列表
    UpdateView() {
        if (this.loadOk == false) return
        if (this.scrollView.content.childrenCount == 0) return

        let curPosX = this.scrollView.content.x
        if ((Math.abs(curPosX - this.firstPosX) > (this.pageViewChild[0].width - 1))) {
            if ((curPosX - this.firstPosX) < 0) {
                let moveData = this.curPageViewChild[0]
                this.curPageViewChild.splice(0, 1)
                this.curPageViewChild.push(moveData)
                //设置序列号
                for (let j = 0; j < this.pageViewChild.length; j++) {
                    const curData = this.pageViewChild[j]
                    if (curData == this.curPageViewChild[this.compareNum]) {
                        this.curItemIdx = j
                        break
                    }
                }
            } else {
                let moveData = this.curPageViewChild[this.curPageViewChild.length - 1]
                this.curPageViewChild.splice(this.curPageViewChild.length - 1, 1)
                this.curPageViewChild.unshift(moveData)

                //设置序列号
                for (let j = 0; j < this.pageViewChild.length; j++) {
                    const curData = this.pageViewChild[j]
                    if (curData == this.curPageViewChild[this.compareNum]) {
                        this.curItemIdx = j
                        break
                    }
                }
            }
            for (let i = 0; i < this.curPageViewChild.length; i++) {
                this.curPageViewChild[i].active = false

                if (i < 5) {
                    this.curPageViewChild[i].active = true
                    this.curPageViewChild[i].setSiblingIndex(i)
                }
            }
            this.scrollView.content.position = cc.v3(this.firstPosX, this.scrollView.content.y, 0)
            this.UpdateIndicator()
        }
    };

}

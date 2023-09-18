/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.22
功能：持续长按型钢琴块基础底
*****************************************************/

import CommonGlobal from "../../../../Common/CommonGlobal";
import PoolManager from "../../../../Expand/PoolManager";
import Game from "../../../../SceneScript/Game";
import { AllCommandDefine } from "../../../AllCommandDefine";
import CommonFacade from "../../../CommonFacade";
import ErrorKeyUnit from "../KeyUnit/ErrorKeyUnit";
import PressedKeyUnit from "../KeyUnit/PressedKeyUnit";
import BaseKeyBaseUnit from "./BaseKeyBaseUnit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PressedKeyBaseUnit extends BaseKeyBaseUnit {

    /** 错过或者点击之后增加的数量 */
    protected addPressedNum: number = 2;

    /** 用于进行初始化当前的组件 */
    public setPressedList(curList) {
        super.setPressedList(curList);

        let keyList = [];
        let parentList = Game.getInstance().getKeyGroupList()

        // 创建普通钢琴块
        for (let i = 0; i < curList.length; i++) {
            let curKey = PoolManager.getInstance().getNode(this.pressedPre);
            if (!curKey) {
                curKey = cc.instantiate(this.pressedPre);
            }
            curKey.parent = this.node;
            curKey.setPosition(
                cc.v2((-CommonGlobal.getInstance().screenWidth * (curList[i] - 2)) / 4 + -CommonGlobal.getInstance().screenWidth / 8,
                    curKey.position.y)
            );

            // 数据初始化
            const curJS = curKey.getComponent(PressedKeyUnit);
            curJS.resetKey();
            curJS.setKeyNum(this.curKeyNum);
            curJS.setKeyType();
            curJS.setKeySpeed(this.curSpeedNum);
            // 设置高度
            curJS.setCutTime(this.lenTime);
            curJS.setParentJS(this);
            curJS.refreshKeySP();

            keyList.push(curList[i]);
            this.pressedList.push(curKey);
        }

        // 创建不能点击的钢琴块
        for (let j = 0; j < parentList.length; j++) {
            // 如果不为普通钢琴块节点,则进行创建不能点击的钢琴块
            if (keyList.indexOf(j) == -1) {
                let curKey = PoolManager.getInstance().getNode(this.unPressedPre);
                if (!curKey) {
                    curKey = cc.instantiate(this.unPressedPre);
                }

                curKey.parent = this.node;
                curKey.setPosition(
                    cc.v2((-CommonGlobal.getInstance().screenWidth * (j - 2)) / 4 + -CommonGlobal.getInstance().screenWidth / 8,
                        curKey.position.y)
                );

                // 数据初始化
                const curJS = curKey.getComponent(ErrorKeyUnit);
                curJS.resetKey();
                curJS.setKeyNum(this.curKeyNum);
                curJS.setKeySpeed(this.curSpeedNum);
                curJS.setParentJS(this);
                // 设置高度
                curJS.setCutTime(this.lenTime);

                this.errorList.push(curKey);
            }
        }
    };

}

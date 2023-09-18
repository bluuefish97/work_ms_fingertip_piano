
/**工具类 */
class ToolsManager {
    static time: number;

    /**数组去重 1 ES5中常用,运行速度较慢*/
    static unique1(arr: Array<any>) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) { //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j, 1);
                    j--;
                }
            }
        }
        return arr;
    }
    /**数组去重 2  ES6中常用,运行速度较快*/
    static unique2(arr: Array<any>) {
        return Array.from(new Set(arr))
    }

    /**打乱数组 */
    static disruptionArr(arr) {
        for (let i = 0, len = arr.length; i < len; i++) {
            let currentRandom = Math.floor(Math.random() * (len - 1));
            let current = arr[i];
            arr[i] = arr[currentRandom];
            arr[currentRandom] = current;
        }
        return arr
    }

    /**在数组中随机获取N个元素 */
    static selectelement(arr: Array<any>, num: number) {
        var newArr = [];
        for (var i = 0; i < num; i++) {
            var number = Math.floor(Math.random() * arr.length)
            newArr.push(arr[number]);
            arr.splice(number, 1)
        }
        return newArr;
    }

    /**从 n-m 中随机取一个整数   */
    static random(n: number, m: number) {
        n = Number(n)
        m = Number(m)
        var random = Math.floor(Math.random() * (m - n + 1) + n);
        if (isNaN(random)) {
            console.warn("随机数为NAN");
            random = 0;
        }
        return random;
    }
    /**
     * 从数组从剔除某个元素,返回一个新数组
     * @param arr 原始数组
     * @param element 要删除的元素
     */
    static deleteArrElement(arr: Array<any>, element: any) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != element) newArr.push(arr[i])
        }
        return newArr;
    };

    /**节点按贝塞尔路径运动 */
    static flyNodeBybezier(node: cc.Node, targetPosition: cc.Vec2, moveTime: number, bezierposition1: cc.Vec2, bezierposition2: cc.Vec2, callbak) {
        let bezierpoint = [bezierposition1, bezierposition2, targetPosition]
        let move1 = cc.bezierTo(moveTime, bezierpoint)
        let move2 = cc.callFunc(function () {
            if (callbak) callbak();
        })
        node.runAction(cc.sequence(move1, move2))
    }

    /**计算程序运行时间  start:开始计时    end:结束计时并输出运行时间 */
    static programRunTime(type: string) {
        if (type === "start") this.time = new Date().getTime();
        if (type === "end") console.log("运行时间", new Date().getTime() - this.time, "毫秒");
    };

    /** 获取网络时间*/
    static getNetWorkTime() {
        console.log("开始获取网络时间!")
        let url = `https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp`;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
                console.log("网络时间获取成功", JSON.parse(response));
            }
        }
        xhr.onerror = function () {
            console.log("网络时间获取失败")
            return null
        }
        xhr.open("GET", url, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send();
    };

    /** 检测数组是否完全一致 */
    static checkArraySame(list1: any[], list2: any[]) {
        return list1.length == list2.length && list1.every(function (v, i) { return v === list2[i] })
    };

};

export default ToolsManager
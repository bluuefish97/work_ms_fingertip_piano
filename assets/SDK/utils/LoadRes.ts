import GetEngine from "./GetEngine";

/**
 * 加载资源
 */
export default class LoadRes {

    /**
     * 加载资源数组
     */
    static loadResArray(resArray, callback) {
        // Cocos加载图片资源方法
        let ImageArr = new Array();
        var arrNumber = 0;
        for (let index = 0; index < resArray.length; index++) {
            cc.loader.load({ url: resArray[index], type: "png" }, (err, resList) => {
                ImageArr[index] = resList;
                if (err != null || ImageArr[index] == null) {
                    console.log("ASCSDK", "资源加载错误:" + JSON.stringify(err));
                    callback(true, null);
                    return;
                }
                arrNumber++;
                if (arrNumber >= resArray.length) {
                    callback(false, ImageArr);
                }
            })
        }
    }

}
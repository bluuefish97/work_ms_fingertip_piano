
/**数据存储管理类 */
class LocalStorageManager {

    /**存储数据 */
    static setlocalStorage(key: string, value: any) {
        //console.log('数据存储',key)
        var value1 = String(value);
        cc.sys.localStorage.setItem(key, value1);
    };

    /**读取数据 */
    static getlocalStorage(key: string) {
        //console.log('数据读取',key)
        var data = cc.sys.localStorage.getItem(key);
        if (data === "undefined" || data === "NaN" || data == "") data = null;
        return data
    }
    /**读取数据为布尔值 */
    static getlocalStorageToBoolean(key: string) {
        var data = cc.sys.localStorage.getItem(key);
        if (data === "true") data = true;
        else data = false;
        return data
    }

    /**读取数据为数值型 */
    static getlocalStorageToNumber(key: string) {
        var data = cc.sys.localStorage.getItem(key);
        if (data === "undefined" || data === "NaN") data = null;
        data = Number(data)
        if (isNaN(data)) data = 0;
        return data
    }
    /**读取数据为字符型 */
    static getlocalStorageToString(key: string) {
        var data = cc.sys.localStorage.getItem(key);
        if (data === "undefined" || data === "NaN") data = null;
        data = String(data)
        if (isNaN(data)) data = "";
        return data
    }


    /**转换为数值 */
    static changeToNumber(data) {
        if (data == "undefined" || data == "NaN" || data == undefined) data = null;
        data = Number(data)
        if (isNaN(data)) data = 0;
        return data
    };

    /**转换为布尔 */
    static changeToBoolean(data) {
        if (data === "true" || data === true) data = true;
        else data = false;
        return data
    };

}
export default LocalStorageManager

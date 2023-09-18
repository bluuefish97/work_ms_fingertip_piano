import AdCenter from "../../ad/AdCenter";
import ServerInterface from "../../server/ServerInterface";

export default class AndroidSDK implements ServerInterface {

    initAd() {
        AdCenter.getInstance().androidManualModel();
    }

    loginSucc(loginGetToken) {
    }

    loginFail() {
    }

    mustLogin(callback) {
        callback(false);
    }

}
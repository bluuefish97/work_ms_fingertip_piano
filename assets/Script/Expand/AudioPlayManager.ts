import CommonGlobal from "../Common/CommonGlobal";
import AudioSourcesMamager, { AudioSourcesName } from "./AudioSourcesMamager";

class AudioPlayManager {

    static playBoxRewardAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.BoxReward_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playDownBTNAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.DownBTN_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playEndStarAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.EndStar_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playFavourAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.Favour_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playGameBGChangeAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.GameBGChange_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playGameErrorAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.GameError_AU, CommonGlobal.getInstance().userData.EffectScale * 0.5, false);
    };

    static playGameStartAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.GameStart_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playLoadingAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.Loading_AU, CommonGlobal.getInstance().userData.EffectScale, true);
    };

    static stopLoadingAU() {
        AudioSourcesMamager.getInstance().stopEffect(AudioSourcesName.Loading_AU);
    };

    static playNormalClickAU() {
        if (CommonGlobal.getInstance().isGameing == false) {
            AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.NormalClick_AU, CommonGlobal.getInstance().userData.EffectScale * 0.2, false);
        }
    };

    static playReliveAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.Relive_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playShowAddDiamondAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.ShowAddDiamond_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playUnlockMusicAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.UnlockMusic_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static playNewMusicAU() {
        AudioSourcesMamager.getInstance().playEffect(AudioSourcesName.NewMusic_AU, CommonGlobal.getInstance().userData.EffectScale, false);
    };

    static stopNewMusicAU() {
        AudioSourcesMamager.getInstance().stopEffect(AudioSourcesName.NewMusic_AU);
    };

}

export default AudioPlayManager

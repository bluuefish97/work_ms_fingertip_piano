
/**音频播放类*/
export default class audioEngineMamager {
    private static instance: audioEngineMamager
    public static getInstance(): audioEngineMamager {
        if (!audioEngineMamager.instance) audioEngineMamager.instance = new audioEngineMamager();
        return audioEngineMamager.instance;
    }


    private MusicAudioManager: any = null //音乐控制组件
    private EffectAudioManager: Array<any> = [] //音效控制组件

    //----------------------------------------------------------------------------

    //***** */

    /** 初始化音频引擎*/
    public initaudioEngine() {
        if (cc.sys.platform === cc.sys.VIVO_GAME) {
            console.log('VIVO音频接口初始化')
            //@ts-ignore
            this.MusicAudioManager = qg.createInnerAudioContext();
        }
        else if (cc.sys.platform === cc.sys.OPPO_GAME) {
            console.log('OPPO音频接口初始化')
            //@ts-ignore
            this.MusicAudioManager = qg.createInnerAudioContext();
        }

        //@ts-ignore
        else if (typeof qq != "undefined") {
            console.log('QQ音频接口初始化')
            //@ts-ignore
            this.MusicAudioManager = qq.createInnerAudioContext();
        }
        //@ts-ignore
        else if (typeof tt != "undefined") {
            console.log('抖音音频接口初始化')
            //@ts-ignore
            this.MusicAudioManager = tt.createInnerAudioContext();
        }
        else {
            console.log('音频接口初始化')
        }
    };


    /** 播放音乐  callback:播放完成回调*/
    /**
     * 播放音
     * @param music 音乐资源或地址
     * @param loop 是否循环,默认false
     * @param callback 播放完成的回调
     */
    public playMusic(music, loop?: boolean, callback?: Function) {
        if (!loop) loop = false;
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            this.MusicAudioManager.src = music;
            this.MusicAudioManager.loop = loop;
            this.MusicAudioManager.play();
            if (callback) {
                this.MusicAudioManager.offEnded()  //取消播放完成回调
                this.MusicAudioManager.onEnded(callback)  //播放完成回调
            }
        }
        else {
            this.MusicAudioManager = cc.audioEngine.playMusic(music, loop);
            if (callback) cc.audioEngine.setFinishCallback(this.MusicAudioManager, callback);
        }
    };

    /** 暂停音乐*/
    public pauseMusic() {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            if (!this.MusicAudioManager.paused) {
                this.MusicAudioManager.pause();
            }
        }
        else {
            console.log("暂停音乐");
            cc.audioEngine.pauseMusic();
        }
    };

    /** 恢复音乐*/
    public resumeMusic() {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            this.MusicAudioManager.play();
        }
        else {
            console.log("恢复音乐");
            cc.audioEngine.resumeMusic();
        }
    };

    /** 停止音乐*/
    public stopMusic() {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            this.MusicAudioManager.stop();
        }
        else {
            cc.audioEngine.stopMusic();
        }
    };

    /** 获取当前音乐时间*/
    public getCurrentTime() {
        var time = 0;
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            time = this.MusicAudioManager.currentTime;
        }
        else time = cc.audioEngine.getCurrentTime(this.MusicAudioManager)

        if (isNaN(Number(time))) time = 0;
        return time
    };

    /** 获取音乐总时间,抖音无效*/
    public getMusicDritionTime() {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            let time = this.MusicAudioManager.duration;
            return time
        }
        else {
            return cc.audioEngine.getDuration(this.MusicAudioManager)
        }
    };


    /**
     * 从指定位置播放音乐
     * @param time 音乐时间(秒)
     */
    public setMusicTime(time: number) {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            console.log('从指定位置播放')
            this.MusicAudioManager.seek(time)
        }
        else {
            cc.audioEngine.setCurrentTime(this.MusicAudioManager, time);
        }
    };


    /**
     * 设置音乐声音
     * @param Volume 声音大小
     */
    public setMusicVolume(Volume: number) {
        if (Volume <= 0) Volume = 0;
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            this.MusicAudioManager.volume = Volume;
        }
        else {
            cc.audioEngine.setMusicVolume(Volume)
        }
    };





    /**
     * 播放音效
     * @param effecturl 音效资源或地址
     * @param volume 音效大,小默认1
     * @param loop 是否循环,默认false
     * @param callback 音效播放完成回调
     */
    public playEffect(effecturl: string, volume: number, loop: boolean, callback?: Function) {

        var self = this;
        var managerNum = null;
        if (this.EffectAudioManager.length > 0) {
            for (var i = 0; i < this.EffectAudioManager.length; i++) {
                if (this.EffectAudioManager[i] === null) {
                    managerNum = i;
                    break;
                }
                if (i === this.EffectAudioManager.length - 1 && managerNum === null) managerNum = i + 1;
            }

        }
        else managerNum = 0;

        if (cc.sys.platform === cc.sys.VIVO_GAME) {
            //@ts-ignore
            this.EffectAudioManager[managerNum] = qg.createInnerAudioContext();
        }
        else if (cc.sys.platform === cc.sys.OPPO_GAME) {
            //@ts-ignore
            this.EffectAudioManager[managerNum] = qg.createInnerAudioContext();
        }


        //@ts-ignore
        else if (typeof qq != "undefined") {
            //@ts-ignore
            this.EffectAudioManager[managerNum] = qq.createInnerAudioContext();
        }
        //@ts-ignore
        else if (typeof tt != "undefined") {
            //@ts-ignore
            this.EffectAudioManager[managerNum] = tt.createInnerAudioContext();
        }


        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            this.EffectAudioManager[managerNum].src = effecturl;
            this.EffectAudioManager[managerNum].loop = loop;
            this.EffectAudioManager[managerNum].volume = volume;
            this.EffectAudioManager[managerNum].play();
            this.EffectAudioManager[managerNum].onEnded(function () {
                console.log("音效播放完毕,销毁音频组件");
                self.EffectAudioManager[managerNum].destroy();
                self.EffectAudioManager[managerNum] = null;
            })
            if (callback) {
                this.EffectAudioManager[managerNum].offEnded()  //取消播放完成回调
                this.EffectAudioManager[managerNum].onEnded(callback)  //播放完成回调
            }
        }
        else {
            //@ts-ignore
            managerNum = cc.audioEngine.playEffect(effecturl, loop);
            cc.audioEngine.setVolume(managerNum, volume)
            if (callback) cc.audioEngine.setFinishCallback(managerNum, callback);
        }
        return managerNum
    };

    /**
     * 停止音效
     * @param managerNum  音效编号
     */
    public stopEffect(managerNum) {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            this.EffectAudioManager[managerNum].stop();
            this.EffectAudioManager[managerNum].destroy();
            this.EffectAudioManager[managerNum] = null;
        }
        else {
            cc.audioEngine.stop(managerNum)
        }
    };

    /**
     * 停止所有音效
     * 原生平台会导致停止音乐
     */
    public stopAllEffects() {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            for (var i = 0; i < this.EffectAudioManager.length; i++) {
                if (this.EffectAudioManager[i] != null) {
                    this.EffectAudioManager[i].stop();
                    this.EffectAudioManager[i].destroy();
                    this.EffectAudioManager[i] = null;
                }
            }
        }
        else {
            cc.audioEngine.stopAllEffects();
        }

    };
    /**
     * 设置所有音效音量
     * @param volume 音量大小
     */
    public setAllEffectsVolunm(volume: number) {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
            for (var i = 0; i < this.EffectAudioManager.length; i++) {
                if (this.EffectAudioManager[i] != null) {
                    this.EffectAudioManager[i].volume = volume;
                }
            }
        }
        else {
            cc.audioEngine.setEffectsVolume(volume)
        }
    }
    /** 暂停所有音效*/
    public pauseAllEffect() {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
        }
        else {
            console.log("暂停所有音效");
            cc.audioEngine.pauseAllEffects();
        }
    };
    /** 恢复所有音效*/
    public staticresumeAllEffect() {
        //@ts-ignore
        if (cc.sys.platform === cc.sys.VIVO_GAME || cc.sys.platform === cc.sys.OPPO_GAME || typeof qq != "undefined" || typeof tt != "undefined") {
        }
        else {
            console.log("恢复所有音效");
            cc.audioEngine.resumeAllEffects();
        }
    };

};


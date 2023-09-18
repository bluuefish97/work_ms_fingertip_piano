import ASCAd from "../../SDK/ASCAd";
import { MusicInfo, Platform } from "../Common/CommonEnum";
import CommonGlobal from "../Common/CommonGlobal";
import { AllCommandDefine } from "../MainComponent/AllCommandDefine";
import CommonFacade from "../MainComponent/CommonFacade";
import DownloadManager from "./DownloadManager";
import LocalStorageManager from "./LocalStorageManager";

/** 歌单的类型,用于调用接口从而将私类的歌曲列表进行返回 */
export enum MusicType {
    AllMusic = 0,                                   // 最初的歌曲列表   
    AllDealMusic = 1,                               // 在最初的歌曲列表的基础上根据分数优先度进行了额外处理

    LockMusic = 11,                                 // 用于进行存储尚未进行解锁的歌曲
    UnPlayMusic = 12,                               // 用于进行存储已经解锁当尚未进行游玩的歌曲
    UnPrefectMusic = 13,                            // 用于进行存储游玩过但尚未获得满星的歌曲
    OtherMusic = 14,                                // 用于进行存储进行上述三部处理之后剩余下来的歌曲
    UnLockMusic = 15,                               // 用于进行存储已经解锁的歌曲

    HotAllMusic = 20,                               // 全部的热门歌曲
    HotLockMusic = 21,                              // 用于进行存储尚未进行解锁的热门歌曲
    HotUnPlayMusic = 22,                            // 用于进行存储已经解锁当尚未进行游玩的热门歌曲
    HotUnPrefectMusic = 23,                         // 用于进行存储游玩过但尚未获得满星的热门歌曲
    HotOtherMusic = 24,                             // 用于进行存储进行上述三部处理之后剩余下来的热门歌曲
    HotUnLockMusic = 25,                            // 用于进行存储已经解锁的热门歌曲

    BannerAllMusic = 30,                            // 全部的banner歌曲
    BannerLockMusic = 31,                           // 用于进行存储尚未进行解锁的banner歌曲
    BannerUnPlayMusic = 32,                         // 用于进行存储已经解锁当尚未进行游玩的banner歌曲
    BannerUnPrefectMusic = 33,                      // 用于进行存储游玩过但尚未获得满星的banner歌曲
    BannerOtherMusic = 34,                          // 用于进行存储进行上述三部处理之后剩余下来的banner歌曲
    BannerUnLockMusic = 35,                         // 用于进行存储已经解锁的banner歌曲

}

export enum MusicStatus {
    // 我的歌曲界面
    CollectMusic = 0,                               // 偏好歌曲
    UnClearMusic = 1,                               // 尚未通关歌曲
    ClearMusic = 2,                                 // 已通关歌曲
    NewMusic = 5,                                   // 新歌速递歌曲

    // 全部歌曲界面
    AllMusic = 11,                                  // 全部歌曲
    LiuxingMusic = 12,                              // 流行歌曲
    QinggeMusic = 13,                               // 情歌歌曲
    DJMusic = 14,                                   // DJ歌曲
    YaogunMusic = 15,                               // 摇滚歌曲
    ZhongguofengMusic = 16,                         // 中国风歌曲
    QingyinyueMusic = 17,                           // 轻音乐歌曲
    RAndBMusic = 18,                                // R&B歌曲
    ShuochangMusic = 19,                            // 说唱歌曲
    MingyaoMusic = 20,                              // 民谣歌曲
    JiaoxiangyueMusic = 21,                         // 交响乐歌曲

    HomeHotMusic = 31,                              // 主页面的当前热门歌曲
}

export default class MusicManager {

    private static instance: MusicManager
    public static getInstance(): MusicManager {
        if (!MusicManager.instance) MusicManager.instance = new MusicManager();
        return MusicManager.instance;
    }

    // -----------------------------------------------------------------
    // 音乐加载列表的路径

    // 当前使用的歌单路径
    private curUseMusicTable = ""

    private VivoMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist/VIVO/ms-fingertip-piano.json";
    private OppoMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist/OPPO/ms-fingertip-piano.json";
    private AndroidMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private DouyinMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist/TikTok/ms-fingertip-piano.json";
    private QQMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private IOSMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private WechatMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private HuaweiMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private XiaomiMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private BaiduMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private WebMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private KuaishouMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano.json";
    private Android_VivoMusicTable = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist/Android/VIVO/ms-fingertip-piano.json";

    private WechatMusicTable_zn = "https://tencentcnd.minigame.xplaymobile.com/MusicGames/Gamelist_test/ms_quick/ms-fingertip-piano-cn.json";

    /** 当前游戏内歌曲所对应的json表 */
    private GameMusicJson: JSON = null;
    /** 加载当前音乐json是否成功 */
    private LoadMusicJsonOK: boolean = false
    /** 加载热门音乐json是否成功 */
    private LoadHotJsonOK: boolean = false;
    /** 加载banner音乐json是否成功 */
    private LoadBannerJsonOK: boolean = false;
    /** 处理老玩家数据是否成功 */
    private dealOldPlayerOK: boolean = false;



    /** 用于存储分类的名称和值 */
    private classData: Object = {}
    /** 用于存储在本地的音乐信息 */
    private musicData: Object = {}

    /** 所有歌单列表,尚未进行处理 */
    private AllMusicTable: Array<any> = []
    /** 所有歌曲列表,根据分数进行了处理 */
    private AllDealMusicTable: Array<any> = []

    // ----------------------------------------------------------
    // 对歌曲的状态进行处理(主界面)

    /** 尚未进行解锁歌曲列表 */
    private LockMusicTable: Array<any> = [];
    /** 已经解锁但尚未进行游玩的歌曲列表 */
    private UnplayMusicTable: Array<any> = [];
    /** 已经解锁游玩过但是尚未获得三星的歌曲列表 */
    private UnprefectMusicTable: Array<any> = [];
    /** 其余的歌曲列表 */
    private OtherMusicTable: Array<any> = [];
    /** 已经解锁歌曲列表 */
    private UnLockMusicTable: Array<any> = [];
    /** 已经推荐过的歌曲 */
    private LockRecommendTable: Array<any> = [];

    /** 当前主页组件所进行存储的歌曲列表 */
    public HomeMusicTable: Array<any> = [];

    /** 新歌速递歌曲列表 */
    public newMusicTable: Array<any> = [];


    /** 热门歌曲列表 */
    private hotMusicTable: Array<any> = [];
    private hotLockMusicTable: Array<any> = [];
    private hotUnplayMusicTable: Array<any> = [];
    private hotUnprefectMusicTable: Array<any> = [];
    private hotOtherMusicTable: Array<any> = [];
    private hotUnLockMusicTable: Array<any> = [];


    /** banner歌曲列表 */
    private bannerMusicTable: Array<any> = [];
    private bannerLockMusicTable: Array<any> = [];
    private bannerUnplayMusicTable: Array<any> = [];
    private bannerUnprefectMusicTable: Array<any> = [];
    private bannerOtherMusicTable: Array<any> = [];
    private bannerUnLockMusicTable: Array<any> = [];



    /** 确认当前音乐远程组件是否加载成功 */
    public checkLoadOK() {
        return this.LoadMusicJsonOK == true && this.LoadHotJsonOK == true && this.dealOldPlayerOK == true && this.LoadBannerJsonOK == true
    }

    /** 加载音乐列表 */
    public loadMusicTable() {
        const self = this
        let curMusicTable = null

        const platform = CommonGlobal.getInstance().platform
        switch (platform) {
            case Platform.VIVO:
                curMusicTable = MusicManager.getInstance().VivoMusicTable
                break
            case Platform.OPPO:
                curMusicTable = MusicManager.getInstance().OppoMusicTable
                break
            case Platform.Android:
            case Platform.Android_NoAD:
            case Platform.Android_OPPO:
            case Platform.Android_TapTap:
            case Platform.Android_XiaoMi:
                curMusicTable = MusicManager.getInstance().Android_VivoMusicTable
                break
            case Platform.Android_VIVO:
                curMusicTable = MusicManager.getInstance().Android_VivoMusicTable
                break
            case Platform.Douyin:
                curMusicTable = MusicManager.getInstance().DouyinMusicTable
                break
            case Platform.QQ:
                curMusicTable = MusicManager.getInstance().QQMusicTable
                break
            case Platform.IOS:
                curMusicTable = MusicManager.getInstance().IOSMusicTable
                break
            case Platform.Wechat:
                console.log("--------------ASCAd.getInstance().getAreaShieldingSwtich()",ASCAd.getInstance().getAreaShieldingSwtich());
                
                if(ASCAd.getInstance().getAreaShieldingSwtich()){
                    curMusicTable = MusicManager.getInstance().WechatMusicTable
                }else{
                    curMusicTable= MusicManager.getInstance().WechatMusicTable_zn 
                }
                
                break
            case Platform.Huawei:
                curMusicTable = MusicManager.getInstance().HuaweiMusicTable
                break
            case Platform.Xiaomi:
                curMusicTable = MusicManager.getInstance().XiaomiMusicTable
                break
            case Platform.Baidu:
                curMusicTable = MusicManager.getInstance().BaiduMusicTable
                break
            case Platform.Web:
                curMusicTable = MusicManager.getInstance().WebMusicTable
                break
            case Platform.Kuaishou:
                curMusicTable = MusicManager.getInstance().KuaishouMusicTable
                break
        }

        this.curUseMusicTable = curMusicTable;
        DownloadManager.loadPoint(curMusicTable, (res) => {
            console.log("音乐单下载成功");
            self.GameMusicJson = null
            self.GameMusicJson = res

            self.dealwithTable()
        });
    }

    /** 获得当前使用的歌曲列表 */
    public getCurUseMusicTable() {
        return this.curUseMusicTable
    };

    /** 对当前的音乐列表进行预处理 */
    public dealwithTable() {
        this.AllDealMusicTable = [];
        this.AllMusicTable = [];
        this.hotMusicTable = [];
        this.bannerMusicTable = [];
        this.newMusicTable = [];

        let table = Object(this.GameMusicJson)
        // 对歌单进行处理
        for (let i = 0; i < table.length; i++) {
            let musicName = table[i].musicName;
            let bagName = table[i].ex_bag;
            let isNew = table[i].ex_New;
            // 表当前是否需要压入歌单
            let okFlag = true;
            let dealJing = musicName.indexOf("#")
            let dealXing = musicName.indexOf("*")
            let dealZDJZ = musicName.indexOf("zdjz")

            if (dealJing != - 1 || dealXing != -1 || dealZDJZ != -1) {
                okFlag = false
            }

            if (musicName == "新手关卡") {
                okFlag = false
            }

            if (okFlag) {
                this.AllMusicTable.push(table[i])
                this.AllDealMusicTable.push(table[i])

                if (bagName == "model0") {
                    this.hotMusicTable.push(table[i]);
                } else if (bagName == "model1") {
                    this.bannerMusicTable.push(table[i]);
                }
            }

            // if (isNew) {
            //     this.newMusicTable.push(table[i]);
            // }

        }

        // // 热门歌曲顺序颠倒
        // this.hotMusicTable.reverse()
        // this.bannerMusicTable.reverse()
        // this.AllMusicTable.reverse();
        this.getLocalMusicData()
    }

    /** 获得每首歌曲的本地数据资源 */
    private getLocalMusicData() {
        this.musicData = {}

        // 本地数据资源化
        for (let i = 0; i < this.AllDealMusicTable.length; i++) {
            let curData: MusicInfo = {
                MusicName: "",
                MusicId: "",
                MusicFile: "",
                MusicJson: "",
                ListenTime: 0,

                OrderNumber: 0,
                SingerName: "",
                UnlockType: "",
                UnlockCost: 0,
                StarNum: 0,
                ScoreNum: 0,

                BagStr: "",
                TipStr: "",
                NewStr: "",

                IsUnlock: false,
                IsPlayed: false,
                IsFinish: false,
                IsLike: false,
                IsRecommond: false,
            }

            this.musicData[this.AllDealMusicTable[i].musicId] = curData
        }

        // 将本地数据进行初始化
        let tempMusicData = JSON.parse(LocalStorageManager.getlocalStorage("musicData"))
        for (let i = 0; i < this.AllDealMusicTable.length; i++) {
            // 对存储在本地的资源进行处理
            if (tempMusicData && tempMusicData.hasOwnProperty(this.AllDealMusicTable[i].musicId)) {
                this.musicData[this.AllDealMusicTable[i].musicId].MusicName = tempMusicData[this.AllDealMusicTable[i].musicId].MusicName
                this.musicData[this.AllDealMusicTable[i].musicId].MusicId = tempMusicData[this.AllDealMusicTable[i].musicId].MusicId
                this.musicData[this.AllDealMusicTable[i].musicId].MusicFile = tempMusicData[this.AllDealMusicTable[i].musicId].MusicFile
                this.musicData[this.AllDealMusicTable[i].musicId].MusicJson = tempMusicData[this.AllDealMusicTable[i].musicId].MusicJson
                this.musicData[this.AllDealMusicTable[i].musicId].ListenTime = LocalStorageManager.changeToNumber(tempMusicData[this.AllDealMusicTable[i].musicId].ListenTime)

                this.musicData[this.AllDealMusicTable[i].musicId].OrderNumber = LocalStorageManager.changeToNumber(tempMusicData[this.AllDealMusicTable[i].musicId].OrderNumber)
                this.musicData[this.AllDealMusicTable[i].musicId].SingerName = tempMusicData[this.AllDealMusicTable[i].musicId].SingerName
                this.musicData[this.AllDealMusicTable[i].musicId].UnlockType = tempMusicData[this.AllDealMusicTable[i].musicId].UnlockType
                this.musicData[this.AllDealMusicTable[i].musicId].UnlockCost = LocalStorageManager.changeToNumber(tempMusicData[this.AllDealMusicTable[i].musicId].UnlockCost)
                this.musicData[this.AllDealMusicTable[i].musicId].StarNum = LocalStorageManager.changeToNumber(tempMusicData[this.AllDealMusicTable[i].musicId].StarNum)
                this.musicData[this.AllDealMusicTable[i].musicId].ScoreNum = LocalStorageManager.changeToNumber(tempMusicData[this.AllDealMusicTable[i].musicId].ScoreNum)

                this.musicData[this.AllDealMusicTable[i].musicId].IsUnlock = LocalStorageManager.changeToBoolean(tempMusicData[this.AllDealMusicTable[i].musicId].IsUnlock)
                this.musicData[this.AllDealMusicTable[i].musicId].IsPlayed = LocalStorageManager.changeToBoolean(tempMusicData[this.AllDealMusicTable[i].musicId].IsPlayed)
                this.musicData[this.AllDealMusicTable[i].musicId].IsFinish = LocalStorageManager.changeToBoolean(tempMusicData[this.AllDealMusicTable[i].musicId].IsFinish)
                this.musicData[this.AllDealMusicTable[i].musicId].IsLike = LocalStorageManager.changeToBoolean(tempMusicData[this.AllDealMusicTable[i].musicId].IsLike)
                this.musicData[this.AllDealMusicTable[i].musicId].IsRecommond = LocalStorageManager.changeToBoolean(tempMusicData[this.AllDealMusicTable[i].musicId].IsRecommond)
            }
            this.musicData[this.AllDealMusicTable[i].musicId].MusicName = this.AllDealMusicTable[i].musicName
            this.musicData[this.AllDealMusicTable[i].musicId].MusicId = this.AllDealMusicTable[i].musicId
            this.musicData[this.AllDealMusicTable[i].musicId].MusicFile = this.AllDealMusicTable[i].musicFile
            this.musicData[this.AllDealMusicTable[i].musicId].MusicJson = this.AllDealMusicTable[i].json_zjgq
            this.musicData[this.AllDealMusicTable[i].musicId].ListenTime = LocalStorageManager.changeToNumber(this.AllDealMusicTable[i].ex_listen)

            this.musicData[this.AllDealMusicTable[i].musicId].OrderNumber = this.AllDealMusicTable[i].orderNumber
            this.musicData[this.AllDealMusicTable[i].musicId].SingerName = this.AllDealMusicTable[i].singerName
            this.musicData[this.AllDealMusicTable[i].musicId].UnlockType = this.AllDealMusicTable[i].unlockType
            this.musicData[this.AllDealMusicTable[i].musicId].UnlockCost = LocalStorageManager.changeToNumber(this.AllDealMusicTable[i].unlockCost)

            this.musicData[this.AllDealMusicTable[i].musicId].BagStr = this.AllDealMusicTable[i].ex_bag;
            this.musicData[this.AllDealMusicTable[i].musicId].TipStr = this.AllDealMusicTable[i].ex_Tip;
            this.musicData[this.AllDealMusicTable[i].musicId].NewStr = this.AllDealMusicTable[i].ex_New;

            // 如果当前歌曲能够进行免费解锁且尚未进行解锁
            if (this.musicData[this.AllDealMusicTable[i].musicId].UnlockType == "coin"
                && this.musicData[this.AllDealMusicTable[i].musicId].UnlockCost == 0
                && this.musicData[this.AllDealMusicTable[i].musicId].IsUnlock == false) {
                this.musicData[this.AllDealMusicTable[i].musicId].IsUnlock = true
            }

            // this.musicData[this.AllDealMusicTable[i].musicId].IsUnlock = true
        }

        this.dealOldPlayer();
        this.dealHomeTable();
        this.dealFree();
    };

    /** 处理老玩家的数据 */
    private dealOldPlayer() {
        const curBool = LocalStorageManager.getlocalStorage("singlastday");
        const dealMusicOK = LocalStorageManager.getlocalStorageToBoolean("dealMusicOK");

        if (curBool && dealMusicOK == false) {
            for (let id in this.musicData) {
                const curMusicData = this.musicData[id];
                const curMusicId = curMusicData.MusicId;

                // 星星数
                const curStarNum = LocalStorageManager.getlocalStorageToNumber("StarNum" + curMusicId);
                // 是否游玩
                const curHasPlay = LocalStorageManager.getlocalStorageToBoolean("HasPlayed" + curMusicId);
                // 最佳分数
                const curBestScore = LocalStorageManager.getlocalStorageToNumber("BestScore" + curMusicId);
                // 是否解锁
                const curUnlock = LocalStorageManager.getlocalStorageToBoolean("isUnlock" + curMusicId);
                //  是否偏好
                const curFavour = LocalStorageManager.getlocalStorageToBoolean("isFavour" + curMusicId);

                curMusicData.StarNum = curStarNum;
                curMusicData.IsPlayed = curHasPlay;
                curMusicData.ScoreNum = curBestScore;
                curMusicData.IsUnlock = curUnlock;
                curMusicData.IsLike = curFavour;

                this.saveMusicData(curMusicData);
            }
            console.log("老玩家歌单数据处理完毕")
        }

        LocalStorageManager.setlocalStorage("dealMusicOK", true);
        this.dealOldPlayerOK = true;
    };

    /** 针对主界面的歌曲组件进行处理歌曲列表 */
    private dealHomeTable() {
        this.LockMusicTable = [];
        this.UnplayMusicTable = [];
        this.UnprefectMusicTable = [];
        this.OtherMusicTable = [];
        this.UnLockMusicTable = [];

        for (let i = 0; i < this.AllDealMusicTable.length; i++) {
            const curMusicId = this.AllDealMusicTable[i].musicId
            const curMusicData = this.getNeedMusicData(curMusicId)

            let isLock = curMusicData.IsUnlock
            let isPlayed = curMusicData.IsPlayed
            let starNum = curMusicData.StarNum

            if (isLock == false) {
                this.LockMusicTable.push(curMusicData)
            } else if (isLock == true) {
                if (isPlayed == false) {
                    this.UnplayMusicTable.push(curMusicData);
                } else if (isPlayed == true && starNum < 3) {
                    this.UnprefectMusicTable.push(curMusicData);
                } else {
                    this.OtherMusicTable.push(curMusicData);
                }

                this.UnLockMusicTable.push(curMusicData);
            }
        }

        this.LoadMusicJsonOK = true
        this.dealHotTable();
        this.dealBannerTable();
    }

    /** 针对热门歌曲进行处理歌曲列表 */
    private dealHotTable() {
        this.hotLockMusicTable = [];
        this.hotUnplayMusicTable = [];
        this.hotUnprefectMusicTable = [];
        this.hotOtherMusicTable = [];
        this.hotUnLockMusicTable = [];

        for (let i = 0; i < this.hotMusicTable.length; i++) {
            const curMusicId = this.hotMusicTable[i].musicId
            const curMusicData = this.getNeedMusicData(curMusicId)

            let isLock = curMusicData.IsUnlock
            let isPlayed = curMusicData.IsPlayed
            let starNum = curMusicData.StarNum

            if (isLock == false) {
                this.hotLockMusicTable.push(curMusicData)
            } else if (isLock == true) {
                if (isPlayed == false) {
                    this.hotUnplayMusicTable.push(curMusicData);
                } else if (isPlayed == true && starNum < 3) {
                    this.hotUnprefectMusicTable.push(curMusicData);
                } else {
                    this.hotOtherMusicTable.push(curMusicData);
                }

                this.hotUnLockMusicTable.push(curMusicData);
            }

        }

        this.LoadHotJsonOK = true
    };

    /** 针对banner歌曲进行处理歌曲列表 */
    private dealBannerTable() {
        this.bannerLockMusicTable = [];
        this.bannerUnplayMusicTable = [];
        this.bannerUnprefectMusicTable = [];
        this.bannerOtherMusicTable = [];
        this.bannerUnLockMusicTable = [];

        for (let i = 0; i < this.bannerMusicTable.length; i++) {
            const curMusicId = this.bannerMusicTable[i].musicId
            const curMusicData = this.getNeedMusicData(curMusicId)

            let isLock = curMusicData.IsUnlock
            let isPlayed = curMusicData.IsPlayed
            let starNum = curMusicData.StarNum

            if (isLock == false) {
                this.bannerLockMusicTable.push(curMusicData)
            } else if (isLock == true) {
                if (isPlayed == false) {
                    this.bannerUnplayMusicTable.push(curMusicData);
                } else if (isPlayed == true && starNum < 3) {
                    this.bannerUnprefectMusicTable.push(curMusicData);
                } else {
                    this.bannerOtherMusicTable.push(curMusicData);
                }

                this.bannerUnLockMusicTable.push(curMusicData);
            }

        }

        this.LoadBannerJsonOK = true
    };

    /** 针对部分平台进行部分歌曲进行免费的操作 */
    private dealFree() {
        // OV
        if (CommonGlobal.getInstance().platform == Platform.OPPO) {

            for (let i = 0; i < this.hotMusicTable.length; i++) {
                const curMusicId = this.hotMusicTable[i].musicId
                const curMusicData = this.getNeedMusicData(curMusicId)
                curMusicData.IsUnlock = true;
                this.saveMusicData(curMusicData);
            }
            this.dealHomeTable();
        }
    };

    /** 用于获得指定歌曲的类型 */
    public getLimitMusicList(curType: MusicType) {
        switch (curType) {
            case MusicType.AllMusic:
                return this.AllMusicTable
            case MusicType.AllDealMusic:
                return this.AllDealMusicTable
            case MusicType.LockMusic:
                return this.LockMusicTable
            case MusicType.UnPlayMusic:
                return this.UnplayMusicTable
            case MusicType.UnPrefectMusic:
                return this.UnprefectMusicTable
            case MusicType.OtherMusic:
                return this.OtherMusicTable
            case MusicType.UnLockMusic:
                return this.UnLockMusicTable

            case MusicType.HotAllMusic:
                return this.hotMusicTable
            case MusicType.HotLockMusic:
                return this.hotLockMusicTable
            case MusicType.HotUnPlayMusic:
                return this.hotUnplayMusicTable
            case MusicType.HotUnPrefectMusic:
                return this.hotUnprefectMusicTable
            case MusicType.HotOtherMusic:
                return this.hotOtherMusicTable
            case MusicType.HotUnLockMusic:
                return this.hotUnLockMusicTable

            case MusicType.BannerAllMusic:
                return this.bannerMusicTable
            case MusicType.BannerLockMusic:
                return this.bannerLockMusicTable
            case MusicType.BannerUnPlayMusic:
                return this.bannerUnplayMusicTable
            case MusicType.BannerUnPrefectMusic:
                return this.bannerUnprefectMusicTable
            case MusicType.BannerOtherMusic:
                return this.bannerOtherMusicTable
            case MusicType.BannerUnLockMusic:
                return this.bannerUnLockMusicTable

            default:
                return []
        }
    }

    /** 通过指定的状态来获得特定的歌曲列表 */
    public getStatusMusicList(curType: MusicStatus) {
        let curTable = [];
        for (let i = 0; i < this.AllDealMusicTable.length; i++) {
            const curMusicData = this.AllDealMusicTable[i];
            const curId = curMusicData.musicId;
            const curNew = curMusicData.ex_New;
            const curData = this.getNeedMusicData(curId);

            switch (curType) {
                case MusicStatus.CollectMusic:
                    if (curData.IsLike == true) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.UnClearMusic:
                    if (curData.IsFinish == false && curData.IsUnlock == true) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.ClearMusic:
                    if (curData.IsFinish == true) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.NewMusic:
                    if (curNew) {
                        curTable.push(curData);
                    }
                    break

                case MusicStatus.AllMusic:
                    curTable.push(curData);
                    break
                case MusicStatus.LiuxingMusic:
                    if (this.searchIncludeType(curMusicData, "流行")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.QinggeMusic:
                    if (this.searchIncludeType(curMusicData, "情歌")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.DJMusic:
                    if (this.searchIncludeType(curMusicData, "DJ")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.YaogunMusic:
                    if (this.searchIncludeType(curMusicData, "摇滚")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.ZhongguofengMusic:
                    if (this.searchIncludeType(curMusicData, "中国风") || this.searchIncludeType(curMusicData, "古风")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.QingyinyueMusic:
                    if (this.searchIncludeType(curMusicData, "轻音乐")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.RAndBMusic:
                    if (this.searchIncludeType(curMusicData, "R&B")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.ShuochangMusic:
                    if (this.searchIncludeType(curMusicData, "说唱")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.MingyaoMusic:
                    if (this.searchIncludeType(curMusicData, "民谣")) {
                        curTable.push(curData);
                    }
                    break
                case MusicStatus.JiaoxiangyueMusic:
                    if (this.searchIncludeType(curMusicData, "交响乐")) {
                        curTable.push(curData);
                    }
                    break

                case MusicStatus.HomeHotMusic:
                    if (curMusicData.ex_bag == "当前热门") {
                        curTable.push(curData);
                    }
                    break;
                default:
                    break
            }
        }

        return curTable
    };

    /** 从当前的歌曲数据进行遍历从而判断是否存在当前的歌曲类型 */
    public searchIncludeType(curMusicData, curType: string) {
        var arr = [];
        arr[0] = curMusicData.ex_tag1_theme.split(",");
        arr[1] = curMusicData.ex_tag2_scene.split(",");
        arr[2] = curMusicData.ex_tag3_mood.split(",");
        arr[3] = curMusicData.ex_tag4_age.split(",");
        arr[4] = curMusicData.ex_tag5_genre.split(",");
        arr[5] = curMusicData.ex_tag6_language.split(",");

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(curType) != -1) {
                return true
            }
        }

        return false
    };

    /** 获得当前所需要的歌曲数据 */
    public getNeedMusicData(musicId: string) {
        let curData = null

        for (let id in this.musicData) {
            if (id == musicId) {
                curData = this.musicData[id]
                break
            }
        }

        return curData
    }

    /** 存储指定的歌曲数据 */
    public saveMusicData(curData: MusicInfo) {
        let curId = curData.MusicId

        for (let id in this.musicData) {
            if (id == curId) {
                this.musicData[id] = curData
                break
            }
        }

        LocalStorageManager.setlocalStorage("musicData", JSON.stringify(this.musicData));
    }

    /** 根据音乐Id解锁指定的歌曲 */
    public unlockMusic(musicId: string) {
        let curData = null

        for (let id in this.musicData) {
            if (id == musicId) {
                curData = this.musicData[id]
                break
            }
        }

        curData.IsUnlock = true
        this.saveMusicData(curData);
        this.dealHomeTable();
    };

    /** 增加指定的标签的分数 */
    public addClassScore(type: string, score: number, isAdd: boolean) {
        let curScore = this.classData[type];
        if (isAdd == true) {
            curScore += score;
            console.log("类型 " + type + " 增加分数 " + score);
        } else {
            curScore -= score;
            console.log("类型 " + type + " 减少分数 " + score);
        }

        this.classData[type] = curScore;
        this.saveClassData();

    };

    /** 存储标签分数 */
    public saveClassData() {
        LocalStorageManager.setlocalStorage("classData", JSON.stringify(this.classData))
    };

    /** 自动播放歌曲 */
    public autoPlayMusic() {
        console.log("自动播放歌曲")
        console.log("HomeMusicTable: ", MusicManager.getInstance().HomeMusicTable);
        if (MusicManager.getInstance().HomeMusicTable.length > 0) {
            let ranNum = Math.floor(Math.random() * MusicManager.getInstance().HomeMusicTable.length);
            let curData = MusicManager.getInstance().HomeMusicTable[ranNum];

            // 传递事件
            CommonFacade.getInstance().sendNotification(AllCommandDefine.PlayMusicRequest, ({
                musicinfo: curData,
                needSetTime: true
            }))
        }
    };

    /** 从指定列表中移除歌曲 */
    public removeMusicInList(curType: MusicType, musicId: string) {
        let curList = null;
        switch (curType) {
            case MusicType.AllMusic:
                curList = this.AllMusicTable;
                break
            case MusicType.AllDealMusic:
                curList = this.AllDealMusicTable;
                break
            case MusicType.LockMusic:
                curList = this.LockMusicTable;
                break
            case MusicType.UnPlayMusic:
                curList = this.UnplayMusicTable;
                break
            case MusicType.UnPrefectMusic:
                curList = this.UnprefectMusicTable;
                break
            case MusicType.OtherMusic:
                curList = this.OtherMusicTable;
                break
            case MusicType.UnLockMusic:
                curList = this.UnLockMusicTable;
                break

            case MusicType.HotAllMusic:
                curList = this.hotMusicTable;
                break
            case MusicType.HotLockMusic:
                curList = this.hotLockMusicTable;
                break
            case MusicType.HotUnPlayMusic:
                curList = this.hotUnplayMusicTable;
                break
            case MusicType.HotUnPrefectMusic:
                curList = this.hotUnprefectMusicTable;
                break
            case MusicType.HotOtherMusic:
                curList = this.hotOtherMusicTable;
                break
            case MusicType.HotUnLockMusic:
                curList = this.hotUnLockMusicTable;
                break

            case MusicType.BannerAllMusic:
                curList = this.bannerMusicTable;
                break
            case MusicType.BannerLockMusic:
                curList = this.bannerLockMusicTable;
                break
            case MusicType.BannerUnPlayMusic:
                curList = this.bannerUnplayMusicTable;
                break
            case MusicType.BannerUnPrefectMusic:
                curList = this.bannerUnprefectMusicTable;
                break
            case MusicType.BannerOtherMusic:
                curList = this.bannerOtherMusicTable;
                break
            case MusicType.BannerUnLockMusic:
                curList = this.bannerUnLockMusicTable;
                break
        }

        for (let i = 0; i < curList.length; i++) {
            const curData = curList[i];
            const curId = curData.MusicId;
            if (curId == musicId) {
                curList.splice(i, 1);
            }
        }

    };

    /** 解锁全部歌曲 */
    public unlockAllMusic() {
        // 解锁全部的歌曲
        for (let id in this.musicData) {
            const curData = this.musicData[id];
            curData.IsUnlock = true;

            // 解锁歌曲刷新页面显示
            CommonFacade.getInstance().sendNotification(AllCommandDefine.UnlockMusicResponse, ({
                musicinfo: curData
            }))

        }

        LocalStorageManager.setlocalStorage("musicData", JSON.stringify(this.musicData));
    };

    /** 获得星星的总数 */
    public getStarNum() {
        let curStarNum = 0;
        for (let id in this.musicData) {
            curStarNum += this.musicData[id].StarNum;
        }

        return curStarNum
    };


    // 结算页推荐歌曲
    /** 将制定歌曲加入到已推荐歌曲的列表中 */
    public addInRecommendList(curData: MusicInfo) {
        this.LockRecommendTable.push(curData);
    };

    /** 获得推荐歌曲 */
    public getRecommendMusic(needUnLock: boolean) {
        let recommendData = null;           // 当前的推荐歌曲数据
        if (!recommendData && needUnLock == true) recommendData = this.getCurMusic(MusicType.LockMusic);                    // 从尚未解锁中挑选
        if (!recommendData) recommendData = this.getCurMusic(MusicType.UnPlayMusic);                                        // 从尚未游玩中挑选
        if (!recommendData) recommendData = this.getCurMusic(MusicType.UnPrefectMusic);                                     // 从尚未完美中挑选
        if (!recommendData) recommendData = this.getCurMusic(MusicType.OtherMusic);                                         // 随机挑选
        if (!recommendData) {
            this.resetRecommendList();
            recommendData = this.getRecommendMusic(needUnLock);
        }

        return recommendData
    };

    /** 通过类型来获得指定的歌曲 */
    private getCurMusic(curType: MusicType) {
        let curMusicData = null;
        let curList = MusicManager.getInstance().getLimitMusicList(curType);

        for (let i = 0; i < curList.length; i++) {
            let curData = curList[i];
            let haveSame = false;                   // 表是否已经被推荐过
            for (let j = 0; j < this.LockRecommendTable.length; j++) {
                let recommendData = this.LockRecommendTable[j];
                if (recommendData == curData) {
                    haveSame = true;
                    break;
                }
            }

            if (haveSame == false) {
                curMusicData = curData;
                break
            }
        }
        return curMusicData
    };

    /** 重新设置推荐歌曲列表 */
    public resetRecommendList() {
        this.LockRecommendTable = [];
    };



    // 判断是否存在新手歌曲
    public checkNewMusic() {
        let curBool = false;

        let curLen = MusicManager.getInstance().getStatusMusicList(MusicStatus.NewMusic);
        if (curLen.length > 0) {
            curBool = true;
        }

        return curBool
    };


}


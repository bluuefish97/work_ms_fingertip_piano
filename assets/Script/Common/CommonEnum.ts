/****************************************************
文件：.ts
作者：万嘉玮
邮箱: 540652763@qq.com
日期：2021.04.20
功能：用于进行存储全部的枚举数据
*****************************************************/

// -------------------------------------------------------------------------
// 通用数据

/** 平台类型 */
export enum Platform {
    VIVO = 0,
    OPPO = 1,
    Android = 2,
    Douyin = 3,
    QQ = 4,
    IOS = 5,
    Wechat = 6,
    Huawei = 7,
    Xiaomi = 8,
    Baidu = 9,
    Web = 10,
    Kuaishou = 11,

    Android_NoAD = 101,
    Android_OPPO = 102,
    Android_VIVO = 103,
    Android_XiaoMi = 104,
    Android_TapTap = 105,
};

/** 用于决定存储歌曲的信息 */
export class MusicInfo {
    MusicName: string;                      // 歌曲名称
    MusicId: string;                        // 歌曲ID
    MusicFile: string;                      // 歌曲在远程服务器的路径
    MusicJson: string;                      // 歌曲的打点
    ListenTime: number;                     // 试听点

    OrderNumber: number;                    // 用于设置获得图片的样式
    SingerName: string;                     // 歌曲的歌手名称
    UnlockType: string;                     // 解锁当前歌曲的类型
    UnlockCost: number;                     // 解锁当前歌曲所需要的钻石数(仅限钻石解锁的情况下)
    StarNum: number;                        // 歌曲所获得的星数
    ScoreNum: number;                       // 歌曲所获得的分数

    // 追加
    BagStr: string;                         // 歌曲所属曲包
    TipStr: string;                         // 当前歌曲是否属于热门歌曲
    NewStr: string;                         // 新歌速递

    IsUnlock: boolean;                      // 当前歌曲是否进行了解锁
    IsPlayed: boolean;                      // 当前歌曲是否进行过游玩
    IsFinish: boolean;                      // 当前歌曲是否通关过
    IsLike: boolean;                        // 当前歌曲是否为玩家所偏爱
    IsRecommond: boolean;                   // 当前歌曲是否曾被推荐过
}

// -------------------------------------------------------------------------
// 游戏内数据

/** 当前游戏的状态 */
export enum GameState {
    Wait = "Wait",                                      // 游戏开始前的等待
    Game = "Game",                                      // 游戏进行中
    Shield = "Shield",                                  // 游戏无敌时间(掉血后复活的时间)
    Pause = "Pause",                                    // 游戏暂停
    Dead = "Dead",                                      // 游戏死亡
    End = "End",                                        // 游戏结束
    Clear = "Clear",                                    // 游戏通关
}

/** 钢琴块的样式类型 */
export enum NormalKeyType {
    StartGame = 0,
    Normal = 1,
    Pressed = 2,
    Shield = 3,
}

/** 普通钢琴块点击的类型 */
export enum KeyCheckType {
    Prefect = "Prefect",
    Best = "Best",
    Normal = "Normal",
    Bad = "Bad"
}


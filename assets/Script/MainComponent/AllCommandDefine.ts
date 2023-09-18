export enum AllCommandDefine {
    // 通用
    LoadHomeRequest = "LoadHomeRequest",
    LoadGameRequest = "LoadGameRequest",
    OpenPageRequest = "OpenPageRequest",
    ShowHomeRequest = "ShowHomeRequest",



    // 录屏
    RecordResponse = "RecordResponse",



    // 歌曲
    RefreshMusicRequest = "RefreshMusicRequest",
    UnlockMusicRequest = "UnlockMusicRequest",
    PlayMusicRequest = "PlayMusicRequest",
    PauseMusicRequest = "PauseMusicRequest",
    FavourMusicRequest = "FavourMusicRequest",
    StartGameRequest = "StartGameRequest",

    RefreshMusicResponse = "RefreshMusicResponse",
    UnlockMusicResponse = "UnlockMusicResponse",
    PlayMusicReponse = "PlayMusicReponse",
    PauseMusicResponse = "PauseMusicResponse",
    FavourMusicResponse = "FavourMusicResponse",
    StartGameResponse = "StartGameResponse",



    // 礼物
    RefreshGiftResponse = "RefreshGiftResponse",



    // 钻石界面
    AddDiamondRequest = "AddDiamondRequest",
    AddDiamondResponse = "AddDiamondResponse",
    RefreshDiamondResponse = "RefreshDiamondResponse",
    SetDiamondActiveRequest = "SetDiamondActiveRequest",
    SetDiamondActiveResponse = "SetDiamondActiveResponse",



    // 体力界面
    AddPowerRequest = "AddPowerRequest",
    AddPowerResponse = "AddPowerResponse",
    RefreshPowerResponse = "RefreshPowerResponse",
    SetPowerActiveRequest = "SetPowerActiveRequest",
    SetPowerActiveResponse = "SetPowerActiveResponse",
    ReducePowerResponse = "ReducePowerResponse",



    // UI界面
    ReliveRequest = "ReliveRequest",
    LikeViewRequest = "LikeViewRequest",
    ShowPageRequest = "ShowPageRequest",
    ShowMusicScrollRequest = "ShowMusicScrollRequest",
    RewardBoxRequest = "RewardBoxRequest",

    ReliveResponse = "ReliveResponse",
    LikeViewResponse = "LikeViewResponse",
    ShowPageResponse = "ShowPageResponse",
    ShowMusicScrollResponse = "ShowMusicScrollResponse",



    // 游戏界面
    GameAddScoreRequest = "GameAddScoreRequest",                                // 游戏内增加分数
    GameReduceHPRequest = "GameReduceHPRequest",                                // 游戏内减少体力
    GameReliveRequest = "GameReliveRequest",                                    // 游戏复活
    GameRestartRequest = "GameRestartRequest",                                  // 重新开始游戏

    GameAddScoreResponse = "GameAddScoreResponse",
    GameReduceHPResponse = "GameReduceHPResponse",
    GameReliveResponse = "GameReliveResponse",
    GameRestartResponse = "GameRestartResponse",

    GameShowReliveResponse = "GameShowReliveResponse",                          // 展示复活界面
    GameReliveLogicResponse = "GameReliveLogicResponse",                        // 游戏复活
    GameDeadLogicResponse = "GameDeadResponse",                                 // 游戏死亡
    GamePauseLogicResponse = "GamePauseLogicResponse",                          // 游戏暂停
    GameWinLogicResponse = "GameWinLogicResponse",                              // 游戏胜利
    GameFailLogicResponse = "GameFailLogicResponse",                            // 游戏失败
    GameRestartLogicResponse = "GameRestartLogicResponse",                      // 游戏重新开始
    GameStartResponse = "GameStartResponse",                                    // 游戏开始或者游戏暂停后继续游戏
    GameHighResponse = "GameHighResponse",                                      // 游戏高潮点的切换

    GameChangeBGRequest = "GameChangeBGRequest",                                // 游戏切换背景图片请求
    GameChangeBGResponse = "GameChangeBGResponse",                              // 游戏切换背景图片成功回复

    GameShieldResponse = "GameShieldResponse",                                  /// 游戏切换护盾样式的回复
    GameResetOKResponse = "GameResetOKResponse",                                // 游戏初始化完毕
}
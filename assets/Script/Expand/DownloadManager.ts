import CommonGlobal from "../Common/CommonGlobal";
import { HomeConPath, PagePath } from "../MainComponent/PagePath";

const GameName = "MusicPiano";
/**资源下载类 */
class DownloadManager {

    /** 预制预加载 */
    public static preloadAllData(curCall: Function) {
        let needLoadNum = 0;                    // 需要进行加载的预制数
        let curLoadNum = 0;                     // 当前已经加载完毕的预制数

        for (let key in PagePath) {
            needLoadNum++
            DownloadManager.preloadResources(PagePath[key], cc.Prefab, (err, res) => {
                if (err) console.log(PagePath[key] + "预制不存在");
                else if (res) {
                    console.log(PagePath[key] + "预加载完成");

                    curLoadNum++;
                    let prefabLoadPercel = Math.floor((curLoadNum / needLoadNum) * 100);
                    curCall && curCall(prefabLoadPercel)
                }
            })
        }

        for (let key in HomeConPath) {
            needLoadNum++
            DownloadManager.preloadResources(HomeConPath[key], cc.Prefab, (err, res) => {
                if (err) console.log(HomeConPath[key] + "预制不存在");
                else if (res) {
                    console.log(HomeConPath[key] + "预加载完成");

                    curLoadNum++;
                    let prefabLoadPercel = Math.floor((curLoadNum / needLoadNum) * 100);
                    curCall && curCall(prefabLoadPercel)
                }
            })
        }

    };

    /**
     * 下载音乐
     * @param musicadress 音频地址
     * @param musicID 音频ID,名称
     * @param callBack  下载完成回调
     */
    public static loadMusic(musicadress: string, musicID: string, callBack) {
        //console.log("音乐地址",musicadress)
        //加载音乐单
        if (cc.sys.platform === cc.sys.VIVO_GAME) {
            var MusicURL = `internal://cache/path/${GameName}/Music`;
            //@ts-ignore
            var res = qg.accessFile({
                uri: `${MusicURL}/${musicID}.mp3`,
            })
            if (res == 'true') {
                console.log(`音乐存在，返回本地音乐`)
                callBack(null, `${MusicURL}/${musicID}.mp3`);
            }
            if (res == 'false') {
                console.log(`音乐不存在，下载网络音乐`)
                //@ts-ignore
                qg.download({
                    url: musicadress,
                    success: function (data) {
                        console.log(`网络音乐下载成功, 文件位置 : ${data.tempFilePath}`)
                        //@ts-ignore
                        var res2 = qg.accessFile({
                            uri: MusicURL,
                        })
                        if (res2 == 'true') {
                            console.log('音乐文件夹存在,开始复制文件')
                            //@ts-ignore
                            qg.copyFile({
                                srcUri: `${data.tempFilePath}`,
                                dstUri: `${MusicURL}/${musicID}.mp3`,
                                success: function (uri) {
                                    console.log(`文件复制成功: ${uri}`)
                                    callBack(null, `${uri}`);
                                },
                                fail: function (data, code) {
                                    console.log(`文件复制失败, code = ${code}`)
                                    // NodeManager.getInstance().showTips('资源下载失败，请稍后重新尝试');
                                }
                            })
                        }
                        if (res2 == 'false') {
                            console.log('音乐文件夹不存在，开始创建文件夹')
                            //@ts-ignore
                            qg.mkdir({
                                uri: MusicURL,
                                success: function (uri) {
                                    console.log('文件目录创建成功,开始复制文件')
                                    //移动文件
                                    //@ts-ignore
                                    qg.copyFile({
                                        srcUri: `${data.tempFilePath}`,
                                        dstUri: `${MusicURL}/${musicID}.mp3`,
                                        success: function (uri) {
                                            console.log(`文件复制成功: ${uri}`)
                                            callBack(null, `${uri}`);
                                        },
                                        fail: function (data, code) {
                                            console.log(`文件复制失败, code = ${code}`)
                                            // NodeManager.getInstance().showTips('资源下载失败，请稍后重新尝试');
                                        }
                                    })

                                },
                                fail: function (data, code) {
                                    console.log('文件目录创建失败')
                                    console.log(`handling fail, code = ${code}`)
                                }
                            })
                        }
                    },
                    fail: function (data, code) {
                        console.log(`网络音乐下载失败, code = ${code}`)
                        // NodeManager.getInstance().showTips('资源下载失败，请稍后重新尝试');
                    }
                });
            }
        }
        else if (cc.sys.platform === cc.sys.OPPO_GAME) {
            //@ts-ignore
            var FileSystemManager = qg.getFileSystemManager();
            //@ts-ignore
            var MusicURL = qg.env.USER_DATA_PATH + `/${GameName}`;
            console.log(MusicURL)
            FileSystemManager.access({
                path: `${MusicURL}_${musicID}.mp3`,
                success: function (data) {
                    console.log(`音乐存在，返回本地音乐`)
                    callBack(null, `${MusicURL}_${musicID}.mp3`);
                },
                fail: function (data) {
                    console.log(`音乐不存在,下载网络音乐`, `${MusicURL}_${musicID}.mp3`)
                    //@ts-ignore
                    MusicURL = qg.env.USER_DATA_PATH + `/${GameName}_${musicID}.mp3`;
                    //console.log(MusicURL)
                    //@ts-ignore
                    qg.downloadFile({
                        url: musicadress,
                        filePath: MusicURL,
                        success(msg) {
                            console.log(`网络音乐下载成功`, MusicURL)
                            callBack(null, MusicURL);
                        },
                        fail(msg) {
                            // 下载失败,使用临时地址
                            console.log(`网络音乐单下载失败,使用临时存储`)
                            //@ts-ignore
                            qg.downloadFile({
                                url: musicadress,
                                success(msg) {
                                    console.log(`网络音乐下载成功`)
                                    callBack(null, msg.tempFilePath);
                                },
                                fail(msg) {
                                    // 下载失败
                                    console.log(`网络音乐单下载失败, code = ${msg}`)
                                    // NodeManager.getInstance().showTips('资源下载失败，请稍后重新尝试');
                                },
                                complete() {

                                }
                            });

                        },
                        complete() {

                        }
                    });


                }
            })

        }
        else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //@ts-ignore
            var FileSystemManager = wx.getFileSystemManager();
            //@ts-ignore
            var MusicURL = wx.env.USER_DATA_PATH + `/${GameName}`;
            console.log("检查音乐是否存在");
            FileSystemManager.access({
                path: `${MusicURL}/${musicID}.mp3`,
                success: function () {
                    console.log(`音乐存在,返回本地音乐`)
                    DownloadManager.loadNetworkResources(`${MusicURL}/${musicID}.mp3`, (err, res) => { callBack(err, res) })
                },
                fail: function () {
                    console.log(`音乐不存在,下载网络音乐`)
                    //@ts-ignore
                    wx.downloadFile({
                        url: musicadress,
                        success(data) {
                            console.log('音乐下载成功', "音乐临时地址", data.tempFilePath);
                            console.log("判断目标文件夹是否存在");
                            FileSystemManager.access({
                                path: `${MusicURL}`,
                                success: function () {
                                    console.log("目标文件夹存在,开始复制音乐文件");
                                    FileSystemManager.copyFile({
                                        srcPath: data.tempFilePath,
                                        destPath: `${MusicURL}/${musicID}.mp3`,
                                        success: function (uri) {
                                            console.log("音乐文件复制成功", `${MusicURL}/${musicID}.mp3`);

                                            DownloadManager.loadNetworkResources(`${MusicURL}/${musicID}.mp3`, (err, res) => { callBack(err, res) })

                                        },
                                        fail: function (err) {
                                            console.log("音乐文件复制失败,返回临时地址", err)

                                            DownloadManager.loadNetworkResources(data.tempFilePath, (res) => { callBack(null, res) })
                                        }
                                    })
                                },
                                fail: function () {
                                    console.log("目标文件夹存不在,创建音乐文件夹");
                                    FileSystemManager.mkdir({
                                        dirPath: MusicURL,
                                        success: function () {
                                            console.log("目标文件夹创建成功,开始复制音乐文件");
                                            FileSystemManager.copyFile({
                                                srcPath: data.tempFilePath,
                                                destPath: `${MusicURL}/${musicID}.mp3`,
                                                success: function (uri) {
                                                    console.log("音乐文件复制成功", `${MusicURL}/${musicID}.mp3`);
                                                    DownloadManager.loadNetworkResources(`${MusicURL}/${musicID}.mp3`, (err, res) => { callBack(err, res) })
                                                },
                                                fail: function (err) {
                                                    console.log("音乐文件复制失败,返回临时地址", err)
                                                    callBack(null, data.tempFilePath);
                                                    DownloadManager.loadNetworkResources(data.tempFilePath, (err, res) => { callBack(err, res) })
                                                }
                                            })
                                        },
                                        fail: function (err) {
                                            console.log("目标文件夹创建失败", err);

                                        }
                                    })
                                }
                            })
                        },
                        fail(err) {

                        }
                    })
                }
            })
        }
        //@ts-ignore
        else if (typeof qq != "undefined") {
            //@ts-ignore
            var FileSystemManager = qq.getFileSystemManager();
            //@ts-ignore
            var MusicURL = qq.env.USER_DATA_PATH + `/${GameName}`;
            console.log("检查音乐是否存在");
            FileSystemManager.access({
                path: `${MusicURL}/${musicID}.mp3`,
                success: function () {
                    console.log(`音乐存在,返回本地音乐`)
                    callBack(null, `${MusicURL}/${musicID}.mp3`);
                },
                fail: function () {
                    console.log(`音乐不存在,下载网络音乐`)
                    //@ts-ignore
                    qq.downloadFile({
                        url: musicadress,
                        success(data) {
                            console.log('音乐下载成功', "音乐临时地址", data.tempFilePath);
                            console.log("判断目标文件夹是否存在");
                            FileSystemManager.access({
                                path: `${MusicURL}`,
                                success: function () {
                                    console.log("目标文件夹存在,开始复制音乐文件");
                                    FileSystemManager.copyFile({
                                        srcPath: data.tempFilePath,
                                        destPath: `${MusicURL}/${musicID}.mp3`,
                                        success: function (uri) {
                                            console.log("音乐文件复制成功", `${MusicURL}/${musicID}.mp3`);
                                            callBack(null, `${MusicURL}/${musicID}.mp3`);

                                        },
                                        fail: function (err) {
                                            console.log("音乐文件复制失败,返回临时地址", err)
                                            callBack(null, data.tempFilePath);
                                        }
                                    })
                                },
                                fail: function () {
                                    console.log("目标文件夹存不在,创建音乐文件夹");
                                    FileSystemManager.mkdir({
                                        dirPath: MusicURL,
                                        success: function () {
                                            console.log("目标文件夹创建成功,开始复制音乐文件");
                                            FileSystemManager.copyFile({
                                                srcPath: data.tempFilePath,
                                                destPath: `${MusicURL}/${musicID}.mp3`,
                                                success: function (uri) {
                                                    console.log("音乐文件复制成功", `${MusicURL}/${musicID}.mp3`);
                                                    callBack(null, `${MusicURL}/${musicID}.mp3`);
                                                },
                                                fail: function (err) {
                                                    console.log("音乐文件复制失败,返回临时地址", err)
                                                    callBack(null, data.tempFilePath);
                                                }
                                            })
                                        },
                                        fail: function (err) {
                                            console.log("目标文件夹创建失败", err);

                                        }
                                    })
                                }
                            })
                        },
                        fail(err) {

                        }
                    })
                }
            })
        }
        //@ts-ignore
        else if (typeof tt != "undefined") {
            //@ts-ignore
            var FileSystemManager = tt.getFileSystemManager();
            //@ts-ignore
            var MusicURL = tt.env.USER_DATA_PATH + `/${GameName}`;
            console.log("检查音乐是否存在");
            FileSystemManager.access({
                path: `${MusicURL}/${musicID}.mp3`,
                success: function () {
                    console.log(`音乐存在,返回本地音乐`)
                    callBack(null, `${MusicURL}/${musicID}.mp3`);
                },
                fail: function () {
                    console.log(`音乐不存在,下载网络音乐`)
                    //@ts-ignore
                    tt.downloadFile({
                        url: musicadress,
                        success(data) {
                            console.log('音乐下载成功', "音乐临时地址", data.tempFilePath);
                            console.log("判断目标文件夹是否存在");
                            FileSystemManager.access({
                                path: `${MusicURL}`,
                                success: function () {
                                    console.log("目标文件夹存在,开始复制音乐文件");
                                    FileSystemManager.copyFile({
                                        srcPath: data.tempFilePath,
                                        destPath: `${MusicURL}/${musicID}.mp3`,
                                        success: function (uri) {
                                            console.log("音乐文件复制成功", `${MusicURL}/${musicID}.mp3`);
                                            callBack(null, `${MusicURL}/${musicID}.mp3`);

                                        },
                                        fail: function (err) {
                                            console.log("音乐文件复制失败,返回临时地址", err)
                                            callBack(null, data.tempFilePath);
                                        }
                                    })
                                },
                                fail: function () {
                                    console.log("目标文件夹存不在,创建音乐文件夹");
                                    FileSystemManager.mkdir({
                                        dirPath: MusicURL,
                                        success: function () {
                                            console.log("目标文件夹创建成功,开始复制音乐文件");
                                            FileSystemManager.copyFile({
                                                srcPath: data.tempFilePath,
                                                destPath: `${MusicURL}/${musicID}.mp3`,
                                                success: function (uri) {
                                                    console.log("音乐文件复制成功", `${MusicURL}/${musicID}.mp3`);
                                                    callBack(null, `${MusicURL}/${musicID}.mp3`);
                                                },
                                                fail: function (err) {
                                                    console.log("音乐文件复制失败,返回临时地址", err)
                                                    callBack(null, data.tempFilePath);
                                                }
                                            })
                                        },
                                        fail: function (err) {
                                            console.log("目标文件夹创建失败", err);

                                        }
                                    })
                                }
                            })
                        },
                        fail(err) {
                            console.log('音乐下载失败', err);
                        }
                    })
                }
            })

        }
        else this.loadNetworkResources(musicadress, callBack)
    }

    /**
    * 下载节奏点
    * @param pointadress json地址
    * @param callBack  下载完成回调
    */
    public static loadPoint(pointadress: string, callBack) {
        //console.log("JSON地址",pointadress);
        //加载节奏点
        var self = this;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log('JSON加载成功');
                if (callBack != null) callBack(JSON.parse(response));
            }
            else if (xhr.readyState == 4 && xhr.status >= 400) console.log('JSON加载失败');
        };
        xhr.open("GET", pointadress, true);
        xhr.send();
    }


    /** 只适用于加载本地的resources里面的单个资源,比如预制体*/
    public static loadResources(url: string, type: typeof cc.Asset, callBack: (err: any, res: any) => void) {
        if (CommonGlobal.getInstance().cocosVersion >= 2.4 && CommonGlobal.getInstance().cocosVersion < 3) {
            cc.resources.load(url, function (err, res) {
                if (err) console.log(err);
                else if (res) callBack(err, res);
            });
        }
        else {
            cc.loader.loadRes(url, type, function (err, res) {
                if (err) console.log(err);
                else if (res) callBack(err, res);
            });
        }
    };

    /**批量加载本地resources里的资源 */
    public static loadResourcesDir(url: string, type: typeof cc.Asset, callBack: (err: any, res: any) => void) {
        if (CommonGlobal.getInstance().cocosVersion >= 2.4 && CommonGlobal.getInstance().cocosVersion < 3) {
            cc.resources.loadDir(url, type, function (err, assets) {
                if (err) console.log(err);
                else if (assets) callBack(err, assets);
            });
        }
        else {
            cc.loader.loadResDir(url, type, function (err, assets) {
                if (err) console.log(err);
                else if (assets) callBack(err, assets);
            });
        }
    };

    /**预加载本地的resources单个资源 */
    public static preloadResources(url: string, type: typeof cc.Asset, callBack?: (err: any, res: any) => void) {
        if (CommonGlobal.getInstance().cocosVersion >= 2.4 && CommonGlobal.getInstance().cocosVersion < 3) {
            if (callBack) {
                cc.resources.preload(url, type, (err, res) => {
                    if (err) console.log(err);
                    else if (res) callBack(err, res);
                });
            } else {
                cc.resources.preload(url, type);
            }
        }
        else console.log("当前版本不支持预加载!");
    };

    /**加载远程资源,音效 图片等 */
    public static loadNetworkResources(url: string, callBack: (err: any, res: any) => void) {
        if (CommonGlobal.getInstance().cocosVersion >= 2.4 && CommonGlobal.getInstance().cocosVersion < 3) {
            cc.assetManager.loadRemote(url, function (err, res) {
                if (err) console.log(err);
                else if (res) callBack(err, res);
            });
        }
        else {
            cc.loader.load({ url: url }, (err, res) => { callBack(err, res) });
        }
    };


    /**释放资源 */
    public static releaseAsset(res) {
        if (CommonGlobal.getInstance().cocosVersion >= 2.4 && CommonGlobal.getInstance().cocosVersion < 3) cc.assetManager.releaseAsset(res);
        else cc.loader.releaseAsset(res);
    }

    /**
     * 批量加载分包内的资源,仅限2.4之后的版本进行使用
     * @param url 分包路径
     * @param include 资源在当前分包中对应的路径
     * @param type 加载分包内何种类型的资源
     * @param callBack 
     */
    public static loadBundleAssetDir(url: string, include: string, type: typeof cc.Asset, callBack: (err: any, res: any) => void) {
        // 大于等于2.4的版本时进行调用对应的加载分包数据方法
        if (CommonGlobal.getInstance().cocosVersion >= 2.4) {
            cc.assetManager.loadBundle(url, (err, bundle) => {
                if (err) console.log(' 分包资源  ' + url + '  加载出错 ', err)
                else {
                    bundle.loadDir(include, type, function (err, res) {
                        if (err) {
                            console.log("当前资源 " + include + " 加载出错: ", err);
                        } else if (res) {
                            console.log("当前资源 " + include + " 加载成功");
                            callBack(err, res);
                        }
                    });
                }
            });
        } else {
            console.log("当前的版本低于2.4，无法使用当前的加载分包内资源的方法")
        }
    }

    /**
    * 批量加载分包内的资源,仅限2.4之后的版本进行使用
    * @param url 分包路径
    * @param include 资源在当前分包中对应的路径
    * @param type 加载分包内何种类型的资源
    * @param callBack 
    */
    public static preloadBundleAssetDir(url: string, include: string, type: typeof cc.Asset, callBack: (err: any, res: any) => void) {
        // 大于等于2.4的版本时进行调用对应的加载分包数据方法
        if (CommonGlobal.getInstance().cocosVersion >= 2.4) {
            cc.assetManager.loadBundle(url, (err, bundle) => {
                if (err) console.log(' 分包资源  ' + url + '  加载出错 ', err)
                else {
                    bundle.preloadDir(include, type, function (err, res) {
                        if (err) {
                            console.log("当前资源 " + include + " 加载出错: ", err);
                        } else if (res) {
                            console.log("当前资源 " + include + " 加载成功");
                            callBack(err, res);
                        }
                    });
                }
            });
        } else {
            console.log("当前的版本低于2.4，无法使用当前的加载分包内资源的方法")
        }
    }

    /**
     * 加载分包内指定资源,仅限2.4之后的版本进行使用
     * @param url 分包路径
     * @param include 资源在当前分包中对应的路径
     * @param type 加载分包内何种类型的资源
     * @param callBack 
     */
    public static loadBundleAsset(url: string, include: string, type: typeof cc.Asset, callBack: (err: any, res: any) => void) {

        // 大于等于2.4的版本时进行调用对应的加载分包数据方法
        if (CommonGlobal.getInstance().cocosVersion >= 2.4) {
            cc.assetManager.loadBundle(url, (err, bundle) => {
                if (err) console.log(' 分包资源  ' + url + '  加载出错 ', err)
                else {
                    bundle.load(include, type, function (err, res) {
                        if (err) {
                            console.log("当前资源 " + include + " 加载出错: ", err);
                        } else if (res) {
                            console.log("资源 " + include + " 加载成功");
                            callBack(err, res);
                        }
                    });
                }
            });
        } else {
            console.log("当前的版本低于2.4，无法使用当前的加载分包内资源的方法")
        }
    }

    /**
   * 加载分包内指定资源,仅限2.4之后的版本进行使用
   * @param url 分包路径
   * @param include 资源在当前分包中对应的路径
   * @param type 加载分包内何种类型的资源
   * @param callBack 
   */
    public static preloadBundleAsset(url: string, include: string, type: typeof cc.Asset, callBack: (err: any, res: any) => void) {
        // 大于等于2.4的版本时进行调用对应的加载分包数据方法
        if (CommonGlobal.getInstance().cocosVersion >= 2.4) {
            cc.assetManager.loadBundle(url, (err, bundle) => {
                if (err) console.log(' 分包资源  ' + url + '  加载出错 ', err)
                else {
                    bundle.preload(include, type, function (err, res) {
                        if (err) {
                            console.log("当前资源 " + include + " 加载出错: ", err);
                        } else if (res) {
                            console.log("资源 " + include + " 加载成功");
                            callBack(err, res);
                        }
                    });
                }
            });
        } else {
            console.log("当前的版本低于2.4，无法使用当前的加载分包内资源的方法")
        }
    }

};

export default DownloadManager
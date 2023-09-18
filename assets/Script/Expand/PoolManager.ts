/****************************************************
文件：PoolManager.ts
作者：woodlai
邮箱: 1870569285@qq.com
日期：2021年3月8日
功能：节点池管理
*****************************************************/



/**功能：节点池管理*/
export default class PoolManager {
    //--------------数据区----------------------
    private constructor() {
        this.poolMap = {};
    }
    private static _instance: PoolManager = null;
    static getInstance() {
        if (!PoolManager._instance) {
            PoolManager._instance = new PoolManager();
        }
        return PoolManager._instance;
    }

    private poolMap: { [key: string]: cc.NodePool };

    //------------------------------------

    /**获取预制体节点 */
    getNode(nodePre: cc.Prefab) {
        let pool = this.poolMap[nodePre.name];
        if (!pool) {
            pool = this.poolMap[nodePre.name] = new cc.NodePool();
        }

        let node: cc.Node = null;
        if (pool.size() > 0) {
            node = pool.get();
        }
        return node;
    }
    /**回收节点 */
    putNode(node: cc.Node) {
        if (!node) return;
        let pool = this.poolMap[node.name];
        if (!pool) {
            pool = this.poolMap[node.name] = new cc.NodePool();
        }
        pool.put(node);
    }

}

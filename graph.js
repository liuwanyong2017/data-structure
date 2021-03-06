//图封装：邻接表

const {Queue1} = require("./queue");
const {Dictionary} = require("./dictionary");


class Graph {
    constructor(vertexes = []) {
        this.vertexes = vertexes;
        let obj = {}, obj1 = {};
        if (vertexes.length) {
            vertexes.map(
                key => (obj[key] = []) && (obj1[key] = 1)
            );
        }
        this.edges = new Dictionary(obj);
        this.vertexState = obj1;
        this.queue = new Queue1();
    }

    hasVertex(v) {
        return this.vertexes.indexOf(v) >= 0;
    }

    addVertex(v) {
        if (!this.hasVertex(v)) return false;
        this.vertexes.push(v);
        this.edges[v] = [];
        this.vertexState[v] = 1;
        return true;
    }

    addEdge(v, v1, unidirectional) {
        if (!this.hasVertex(v) || !this.hasVertex(v1)) return false;
        const edges1 = this.edges.get(v), edges2 = this.edges.get(v1);
        if (edges1.indexOf(v1) < 0) {
            edges1.push(v1);
        }
        if (!unidirectional && edges2.indexOf(v) < 0) {
            edges2.push(v);
        }
        // console.log(edges2,edges1);
        return true;
    }

    bfs(start, callback) {
        callback && callback(start);
        this.vertexState[start] = 2;
        this.queue.enqueue(start);
        this._bfs(start, callback);
        this.initStates();
    }

    initStates() {
        Object.keys(this.vertexState).map(
            k => this.vertexState[k] = 1
        );
    }

    _bfs(start, callback) {
        //1代表未被访问，2代表访问所有的关联未完成，3代表所有的关联都访问完了
        //callback && callback(start)
        //this.vertexState[start] = 2
        // console.log(999,start);

        const edges = this.edges.get(start);

        edges.map(
            (key, ind) => {
                if (this.vertexState[key] === 1) {
                    callback && callback(key);
                    this.vertexState[key] = 2;
                    this.queue.enqueue(key);
                }
            }
        );
        this.vertexState[start] = 3;
        this.queue.dequeue(start);
        // console.log(this.queue,this.vertexState,999);
        while (this.queue.size()) {
            this._bfs(this.queue.front().data, callback);
        }
    }

    dfs(start, callback) {
        this.stack = [];
        this._dfs(start, callback);
        this.stack = null;
        this.initStates();
    }

    _dfs(start, callback) {
        const {stack} = this;
        if (this.vertexState[start] === 1) {
            // console.log("ccc");
            callback && callback(start);
            this.vertexState[start] = 2;
            stack.push(start);
        }
        const edges = this.edges.get(start);
        // console.log(edges,'ee',start);
        const next = edges.length && edges
            .find(k => this.vertexState[k] === 1);
        // console.log(stack,'s',next);

        if (next) {
            this._dfs(next, callback);
        } else {
            this.vertexState[start] = 3;
            stack.pop();
            if (stack.length) {
                this._dfs(stack[stack.length - 1], callback);
            }
        }

    }

    dfs1(start, callback) {
        if (this.vertexState[start] === 1) {
            callback && callback(start);
            this.vertexState[start] = 2;
        }
        this.edges.get(start).map(
            k => {
                if (this.vertexState[k] === 1) {
                    this.dfs1(k, callback);
                }
            }
        );
        this.initStates();
    }

    toString() {
        return this.vertexes.reduce(
            (a, b) =>
                a + (a ? "\n" : "") + `${b} -> ${this.edges.get(b).join(" ")}`
            , ""
        );
    }
}

const graph = new Graph(
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"]);

graph.addEdge("a", "b");
graph.addEdge("a", "c");
graph.addEdge("a", "d");
graph.addEdge("c", "d");
graph.addEdge("c", "g");
graph.addEdge("d", "g");
graph.addEdge("d", "h");
graph.addEdge("b", "e");
graph.addEdge("b", "f");
graph.addEdge("e", "i");
graph.bfs("a", v => console.log(v));
console.log(9);
let res = "", res1 = "";
graph.dfs("a", v => res += v);
graph.dfs1("a", v => res1 += v);


console.log(res, res1);
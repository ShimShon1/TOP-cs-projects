class KnightBoard {
  constructor() {
    this.graph = [];
  }

  init() {
    for (let c = 0; c < 8; c++) {
      this.graph.push([]);
      for (let r = 0; r < 8; r++) {
        const edges = [];
        //two cols one row vars
        edges.push([c + 2, r + 1]);
        edges.push([c + 2, r - 1]);
        edges.push([c - 2, r + 1]);
        edges.push([c - 2, r - 1]);
        //two rows one col vars
        edges.push([c + 1, r + 2]);
        edges.push([c + 1, r - 2]);
        edges.push([c - 1, r + 2]);
        edges.push([c - 1, r - 2]);
        this.graph[c][r] = edges.filter(e => {
          return e[0] < 0 || e[0] > 7 || e[1] < 0 || e[1] > 7 ? false : true;
        });
      }
    }
  }
  knightMoves(from, to) {
    let bestPath = [];
    if (
      !Array.isArray(from) ||
      !Array.isArray(to) ||
      from.length !== 2 ||
      to.length !== 2 ||
      from.some(n => n < 0 || n > 7 || typeof n !== "number") ||
      to.some(n => n < 0 || n > 7 || typeof n !== "number")
    ) {
      throw Error("from and to should be arrays with 2 numbers between 0 and 7, like: [1, 3]");
    }

    if (from[0] === to[0] && from[1] === to[1]) {
      return `Square found in ${bestPath.length} moves! shortest path was: ${JSON.stringify(bestPath)}`;
    }
    let visited = {};
    let queue = [...this.graph[from[0]][from[1]]].map(e => {
      return { path: [], edge: e };
    });
    queue.forEach(v => {
      visited[String(v.edge)] = true;
    });

    while (!bestPath.length) {
      let e = queue[0];
      //if targed found, end loop
      if (e.edge[0] === to[0] && e.edge[1] === to[1]) {
        bestPath = [...e.path, e.edge];
        //target not found, update queue
      } else {
        //shifting very inefficient, done to practice a fake queue!
        queue.shift();
        queue = queue.concat(
          this.graph[e.edge[0]][e.edge[1]]
            .filter(edge => {
              return !Boolean(visited[String(edge)]);
            })
            .map(edge => {
              return { path: [...e.path, e.edge], edge };
            })
        );
      }
    }

    return `Square found in ${bestPath.length} moves! shortest path was: ${JSON.stringify(bestPath)}`;
  }
}

const Board = new KnightBoard();
Board.init();

console.log(Board.knightMoves([4, 4], [4, 3]));

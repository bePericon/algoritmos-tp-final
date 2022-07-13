import { Edge } from "./edge.js";

/* Graph by Adjacents List */
export class GraphXML {
    constructor(graph, sortAdjacents = null, name = '', weightOp = 0) {
        this.graph = graph;
        this.n = graph.length;
        this.adjacentsList = this.#createAdjacentsList(sortAdjacents)
        this.name = name;
        this.weight = weightOp;
    }

    static newVector(n, repeatValue) {
        return Array(n).fill().map((_) => repeatValue)
    }

    get numberNodes() {
        return this.n;
    }

    get nameGraph() {
        return this.name;
    }

    get weightOp() {
        return this.weight;
    }

    #createAdjacentsList(sortAdjacents = null) {
        let adjacents = this.graph.map(({ edge }, index) => {
            let edges = edge.map(ed => {
                return new Edge(index, Number.parseInt(ed.$t),
                    Number.parseFloat(ed.cost) /* ed.cost  en que tipo esta? */
                );
            });
            if (sortAdjacents) edges = edges.sort(sortAdjacents);
            return edges;
        });
        return adjacents;
    }

    getEdge(row, column) {
        let edge = this.adjacentsList[row].find((edge) => edge.nodeTo === column)
        return edge;
    }

    /* return: list of Edges */
    adyacentByNode(node) {
        return this.adjacentsList[node];
    }

    print() {
        console.log(this.adjacentsList);
    }

}
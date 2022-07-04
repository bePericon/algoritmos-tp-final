import { floyd } from "../floyd.js";
import { Edge } from "./edge.js";

/* Graph by Adjacents List */
export class GraphXML {
    constructor(graph, sortAdjacents = null) {
        this.graph = graph;
        this.n = graph.length;
        this.adjacentsList = this.#createAdjacentsList(sortAdjacents)
    }

    static newVector(n, repeatValue) {
        return Array(n).fill().map((_) => repeatValue)
    }

    get numberNodes() {
        return this.n;
    }

    #createAdjacentsList(sortAdjacents = null) {
        let adjacents = this.graph.map(({ edge }, index) => {
            let edges = edge.map(ed => {
                return new Edge(index, Number.parseInt(ed.$t),
                    Number.parseFloat(ed.cost) /* ed.cost  en que tipo esta? */
                );
            })
            edges.push(new Edge(index, index, 0));
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
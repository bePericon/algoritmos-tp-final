import { floyd } from "../floyd.js";
import { Edge } from "./edge.js";

/* Graph by Weights Matrix */
export class GraphWM {
    constructor(matrix) {
        this.graph = matrix;
        this.completeGraph = floyd(matrix);
        this.n = matrix.length;
    }

    static newVector(n, repeatValue) {
        return Array(n).fill().map((_) => repeatValue)
    }

    get numberNodes() {
        return this.n;
    }

    /* return: list of Edges */
    adyacentByNode(node, sorting = null, useComplete = true) {
        let adjacent = (useComplete)? 
            this.completeGraph[node].map((w, n) => new Edge(n, w)) :
            this.graph[node].map((w, n) => {
                // TODO: filter infinities
                return new Edge(n, w)
            })
        if(sorting) return adjacent.sort(sorting);
        return adjacent.filter(edge => edge.getWeight !== 0);
    }

    print() {
        console.table(this.completeGraph);
    }

}
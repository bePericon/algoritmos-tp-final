import { floyd } from "../floyd.js";
import { Edge } from "./edge.js";

/* Graph by Weights Matrix */
export class GraphWM {
    constructor(matrix, sortAdjacents = null) {
        this.graph = matrix;
        this.completeGraph = floyd(matrix);
        this.n = matrix.length;
        this.adjacentsList = this.#createAdjacentsList(sortAdjacents)
    }

    static newVector(n, repeatValue) {
        return Array(n).fill().map((_) => repeatValue)
    }

    get numberNodes() {
        return this.n;
    }

    #createAdjacentsList(sortAdjacents = null){
        let adjacentsList = [];
        for(let node= 0; node < this.n; node++){
            let adjacents = this.completeGraph[node].map((w, n) => new Edge(node, n, w));
            if(sortAdjacents) adjacents = adjacents.sort(sortAdjacents);
            adjacentsList[node] = adjacents;
        }
        return adjacentsList;
    }

    getEdge(row, column){
        return new Edge(row, column, this.completeGraph[row][column]);
    }

    /* return: list of Edges */
    adyacentByNode(node) {
        return this.adjacentsList[node];
    }

    print() {
        console.table(this.completeGraph);
    }

}
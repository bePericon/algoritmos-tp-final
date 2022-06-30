export class Edge {

    constructor(nodeFrom, nodeTo, weight) {
        this.nodeFrom = nodeFrom;
        this.weight = weight;
        this.nodeTo = nodeTo
    }

    get getNodeFrom() {
        return this.nodeFrom;
    }

    get getNodeTo() {
        return this.nodeTo;
    }

    get getWeight() {
        return this.weight;
    }

    toString() {
        return `(nFrom:${this.nodeFrom}, w:${this.weight}, nTo:${this.nodeTo})`;
    }

    print() {
        console.log(this.toString());
    }

}
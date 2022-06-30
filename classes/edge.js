export class Edge {

    constructor(node, weight) {
        this.node = node;
        this.weight = weight;
    }

    get getWeight() {
        return this.weight;
    }

    toString() {
        return `(n:${this.node}, w:${this.weight})`;
    }

    print() {
        console.log(this.toString());
    }

}
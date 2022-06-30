export class Queue {

    constructor() {
        this.dataStore = [];
    }

    enqueue(element){
        this.dataStore.push(element);
    }

    dequeue() {
        return this.dataStore.shift();
    }

    empty() {
        return this.dataStore = [];
    }

    isEmpty() {
        return this.dataStore.length === 0;
    }

    print() {
        console.log(this.dataStore)
    }
}
export class Stack {
    constructor() { this.items = []; }
    push(el) { this.items.push(el); }
    pop() { return this.items.pop(); }
}

export class Queue {
    constructor() { this.items = []; }
    enqueue(el) { this.items.push(el); }
    dequeue() { return this.items.shift(); }
}
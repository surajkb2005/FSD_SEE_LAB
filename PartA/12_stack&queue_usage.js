import { Stack, Queue } from './7_stack_queue.js';

const s = new Stack();
s.push(10);
s.push(20);
console.log("Stack Pop:", s.pop());

const q = new Queue();
q.enqueue(20);
q.enqueue(40);
console.log("Queue Dequeue:", q.dequeue());
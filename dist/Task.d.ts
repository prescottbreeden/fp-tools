import { Func } from '.';
export declare class Task {
    fork: any;
    constructor(fork: any);
    static rejected(x: any): Task;
    static of(x: any): Task;
    map(fn: Func): Task;
    ap(f: any): Task;
    chain(fn: any): Task;
    join(): Task;
}
export declare const reject: (x: any) => Task;

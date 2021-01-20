export declare class Task {
    fork: any;
    constructor(fork: any);
    static rejected(x: any): Task;
    static of(x: any): Task;
    map(fn: Function): Task;
    ap(f: any): Task;
    chain(fn: any): Task;
    join(): Task;
}
//# sourceMappingURL=Task.d.ts.map
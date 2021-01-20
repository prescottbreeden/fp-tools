export declare class Maybe {
    $value: any;
    get isNothing(): boolean;
    get isJust(): boolean;
    constructor(x: any);
    static of(x: any): Maybe;
    map(fn: Function): Maybe;
    ap(f: any): any;
    chain(fn: Function): any;
    join(): any;
    sequence(of: any): any;
    traverse(of: any, fn: Function): any;
}
//# sourceMappingURL=Maybe.d.ts.map
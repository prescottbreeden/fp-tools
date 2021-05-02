import { Func } from '.';
export declare class Maybe {
    $value: any;
    get isNothing(): boolean;
    get isJust(): boolean;
    constructor(x: any);
    static of(x: any): Maybe;
    map(fn: Func): Maybe;
    ap(f: any): any;
    chain(fn: Func): any;
    join(): any;
    sequence(of: any): any;
    traverse(of: any, fn: Func): any;
}
export declare const maybe: (x: any) => Maybe;
export declare const just: (x: any) => Maybe;
export declare const nothing: Maybe;

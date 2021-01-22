import { Func } from './types';
export * from './types';
/**
 *  compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
export declare const compose: (...fns: any) => (...args: any) => any;
/**
 *  curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
 */
export declare function curry(fn: (...args: any) => any): (...args: any) => any;
/**
 * takes a function requiring 2 arguments and an array of functions. each func
 * in the array will be applied against the argument of the returned function
 * and then passed as the arguments to the first function.
 * @example converge(concat, [prop('firstName'), prop('lastName')]);
 * @param fn the function to be called last
 * @param wraps array of functions to supply as arguments to fn
 * @returns (fn, ...wraps) -> arg -> fn(...wraps(arg))
 */
export declare const converge: (fn: Func, wraps: Func[]) => (arg: any) => any;
/**
 *  identity :: x -> x
 */
export declare const identity: (x: any) => any;
/**
 *  map :: (a -> b) -> [a] -> [b]
 */
export declare const map: (...args: any) => any;
/**
 *  filter :: (a -> b) -> [a] -> b
 */
export declare const filter: (...args: any) => any;
/**
 *  map :: (a -> b) -> [a] -> b
 */
export declare const reduce: (...args: any) => any;
/**
 *   some :: fn -> xs -> boolean
 */
export declare const some: (...args: any) => any;
/**
 *   all :: fn -> xs -> boolean
 */
export declare const all: (...args: any) => any;
/**
 *   isNil :: a -> boolean
 */
export declare const isNil: (x: any) => boolean;
/**
 *  equals :: a -> a -> bool
 */
export declare const equals: (...args: any) => any;
/**
 *  either :: f -> g -> x -> f(x) | g(x)
 */
export declare const either: (...args: any) => any;
/**
 *   defaultTo :: a -> b -> a | b
 */
export declare const defaultTo: (...args: any) => any;
/**
 *   doNothing :: a -> null
 */
export declare const doNothing: (_: any) => null;
/**
 *  trace :: string -> a -> a
 */
export declare const trace: (...args: any) => any;
/**
 *  randomString :: () -> string
 */
export declare const randomString: () => string;
/**
 *  toLower :: string -> string
 */
export declare const toLower: (str: string) => string;
/**
 *  toUpper :: string -> string
 */
export declare const toUpper: (str: string) => string;
/**
 *  includes :: string -> boolean
 */
export declare const includes: (...args: any) => any;
/**
 *  split :: string -> string -> [ string ]
 */
export declare const split: (...args: any) => any;
/**
 *  split :: number -> xs | string -> [ xs | [string], xs | [string] ]
 */
export declare const splitAt: (...args: any) => any;
/**
 *  concat :: string -> string -> string
 */
export declare const concat: (...args: any) => any;
/**
 *  head :: [a] -> a
 */
export declare const head: (xs: any[] | string) => any;
/**
 *  head :: [a] -> a
 */
export declare const tail: (xs: any[] | string) => any;
/**
 *  prop :: String -> Object -> a
 */
export declare const prop: (...args: any) => any;
/**
 *  objProp :: Object -> String -> a
 */
export declare const objProp: (...args: any) => any;
export declare function safeGet<T>(entity: T): (property: keyof T) => any;
/**
 *  add :: a -> b -> (a + b): number
 */
export declare const add: (...args: any) => any;
/**
 *  subtract :: a -> b -> (a - b): number
 */
export declare const subtract: (...args: any) => any;
/**
 *  gt :: a -> b -> (b > a): boolean
 */
export declare const gt: (...args: any) => any;
/**
 *  gte :: a -> b -> (b >= a): boolean
 */
export declare const gte: (...args: any) => any;
/**
 *  lt :: a -> b -> (b < a): boolean
 */
export declare const lt: (...args: any) => any;
/**
 *  lte :: a -> b -> (b <= a): boolean
 */
export declare const lte: (...args: any) => any;
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

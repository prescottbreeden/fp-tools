import { Func } from './types';
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
 *  replaceItem :: string -> [a] -> a -> [a]
 */
export declare const replaceItem: (...args: any) => any;
/**
 *  reduce :: (a -> b) -> [a] -> b
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
 *  always :: a -> b -> a
 */
export declare const always: (...args: any) => any;
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
 *  splitAt :: number -> xs | string -> [ xs | [string], xs | [string] ]
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
 *  tail :: [a] -> a
 */
export declare const tail: (xs: any[] | string) => any;
/**
 *  set :: String -> a -> { string: a }
 */
export declare const set: (...args: any) => any;
/**
 *  prop :: String -> Object -> a
 */
export declare const prop: (...args: any) => any;
/**
 *  objProp :: Object -> String -> a
 */
export declare const objProp: (...args: any) => any;
/**
 *  add :: a -> b -> (a + b): number
 */
export declare const add: (...args: any) => any;
/**
 *  subtract :: a -> b -> (a - b): number
 */
export declare const subtract: (...args: any) => any;
/**
 *  subtractBy :: a -> b -> (b - a): number
 */
export declare const subtractBy: (...args: any) => any;
/**
 *  multiply :: a -> b -> (a - b): number
 */
export declare const multiply: (...args: any) => any;
/**
 *  divide :: a -> b -> (a - b): number
 */
export declare const divide: (...args: any) => any;
/**
 *  divideBy :: a -> b -> (a - b): number
 */
export declare const divideBy: (...args: any) => any;
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
export declare const eventTargetNameValue: (...args: any) => any;

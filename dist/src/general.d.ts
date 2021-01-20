/**
 *  compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
export declare const compose: (...fns: any) => (...args: any) => any;
/**
 *  curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
 */
export declare function curry(fn: Function): (...args: any) => any;
/**
 * takes a function requiring 2 arguments and an array of functions. each func
 * in the array will be applied against the argument of the returned function
 * and then passed as the arguments to the first function.
 * @example converge(concat, [prop('firstName'), prop('lastName')]);
 * @param fn the function to be called last
 * @param wraps array of functions to supply as arguments to fn
 * @returns (...args) => fn(...args)
 */
export declare const converge: (fn: Function, wraps: Function[]) => (arg: any) => any;
export declare const identity: (x: any) => any;
export declare const maybe: (x: any) => any;
export declare const just: (x: any) => any;
export declare const nothing: any;
export declare const reject: (x: any) => any;
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
 *  trace :: string -> a -> a
 */
export declare const trace: (...args: any) => any;
/**
 *   some :: fn -> xs -> boolean
 */
export declare const some: (...args: any) => any;
/**
 *   all :: fn -> xs -> boolean
 */
export declare const all: (...args: any) => any;
export declare const includes: (...args: any) => any;
export declare const split: (...args: any) => any;
export declare const splitAt: (...args: any) => any;
export declare const head: (xs: any[] | string) => any;
export declare const tail: (xs: any[] | string) => any;
export declare const doNothing: (_: any) => null;
export declare const focus: (element: HTMLElement) => void;
/**
 *  prop :: String -> Object -> a
 */
export declare const prop: (...args: any) => any;
/**
 *  objProp :: Object -> String -> a
 */
export declare const objProp: (...args: any) => any;
export declare function safeGet<T>(entity: T): (property: keyof T) => any;
//# sourceMappingURL=general.d.ts.map
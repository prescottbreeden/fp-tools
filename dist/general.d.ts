import { Maybe } from "./Maybe";
import { Task } from "./Task";
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
export declare const maybe: (x: any) => Maybe;
export declare const just: (x: any) => Maybe;
export declare const nothing: Maybe;
export declare const reject: (x: any) => Task;
/**
 *  equals :: a -> a -> bool
 */
export declare const equals: (...args: any) => any;
export declare const either: (...args: any) => any;
export declare const isNil: any;
//# sourceMappingURL=general.d.ts.map
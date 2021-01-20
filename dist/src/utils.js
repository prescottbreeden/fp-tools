"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converge = void 0;
/**
 * takes a function requiring 2 arguments and an array of functions. each func
 * in the array will be applied against the argument of the returned function
 * and then passed as the arguments to the first function.
 * @example converge(concat, [prop('firstName'), prop('lastName')]);
 * @param fn the function to be called last
 * @param wraps array of functions to supply as arguments to fn
 * @returns (...args) => fn(...args)
 */
var converge = function (fn, wraps) { return function (arg) {
    return fn.apply(void 0, wraps.map(function (wrap) { return wrap(arg); }));
}; };
exports.converge = converge;

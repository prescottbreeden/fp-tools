"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNil = exports.either = exports.equals = exports.reject = exports.nothing = exports.just = exports.maybe = exports.identity = exports.converge = exports.curry = exports.compose = void 0;
var Maybe_1 = require("./Maybe");
var Task_1 = require("./Task");
/**
 *  compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fns.reduceRight(function (res, fn) { return [fn.call.apply(fn, __spreadArrays([null], res))]; }, args)[0];
    };
};
exports.compose = compose;
/**
 *  curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
 */
function curry(fn) {
    var arity = fn.length;
    return function $curry() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < arity) {
            return $curry.bind.apply($curry, __spreadArrays([null], args));
        }
        return fn.call.apply(fn, __spreadArrays([null], args));
    };
}
exports.curry = curry;
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
var identity = function (x) { return x; };
exports.identity = identity;
// -- Functor Helpers -- 
var maybe = function (x) { return Maybe_1.Maybe.of(x); };
exports.maybe = maybe;
var just = function (x) { return exports.maybe(x); };
exports.just = just;
exports.nothing = exports.maybe(null);
var reject = function (x) { return Task_1.Task.rejected(x); };
exports.reject = reject;
// -- logic --
/**
 *  equals :: a -> a -> bool
 */
exports.equals = curry(function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
});
exports.either = curry(function (pred1, pred2, val) {
    return (val === null || val === undefined) ? pred1(val) : pred2(val);
});
exports.isNil = exports.either(exports.equals(null), exports.equals(undefined));

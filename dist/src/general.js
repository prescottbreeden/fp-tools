"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeGet = exports.objProp = exports.prop = exports.focus = exports.doNothing = exports.tail = exports.head = exports.splitAt = exports.split = exports.includes = exports.all = exports.some = exports.trace = exports.defaultTo = exports.either = exports.equals = exports.isNil = exports.reject = exports.nothing = exports.just = exports.maybe = exports.identity = exports.converge = exports.curry = exports.compose = void 0;
var Maybe_1 = require("./Maybe");
var Task_1 = require("./Task");
// ============================================================
//                  -- Functor Helpers -- 
// ============================================================
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
// ============================================================
//                  -- Functor Helpers -- 
// ============================================================
var maybe = function (x) { return Maybe_1.Maybe.of(x); };
exports.maybe = maybe;
var just = function (x) { return exports.maybe(x); };
exports.just = just;
exports.nothing = exports.maybe(null);
var reject = function (x) { return Task_1.Task.rejected(x); };
exports.reject = reject;
// ============================================================
//                      -- logic -- 
// ============================================================
/**
 *   isNil :: a -> boolean
 */
var isNil = function (x) { return x === null || x === undefined; };
exports.isNil = isNil;
/**
 *  equals :: a -> a -> bool
 */
exports.equals = curry(function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
});
/**
 *  either :: f -> g -> x -> f(x) | g(x)
 */
exports.either = curry(function (pred1, pred2, val) {
    return exports.isNil(val) ? pred1(val) : pred2(val);
});
/**
 *   defaultTo :: a -> b -> a | b
 */
exports.defaultTo = curry(function (def, val) { return (val ? val : def); });
// ============================================================
//                      -- debug -- 
// ============================================================
/**
 *  trace :: string -> a -> a
 */
exports.trace = curry(function (msg, a) {
    console.log(msg, a);
    return a;
});
// ============================================================
//                      -- debug -- 
// ============================================================
/**
 *   some :: fn -> xs -> boolean
 */
exports.some = curry(function (pred, list) {
    return list.reduce(function (prev, curr) {
        return prev ? prev : pred(curr);
    }, false);
});
/**
 *   all :: fn -> xs -> boolean
 */
exports.all = curry(function (pred, list) {
    return list.reduce(function (prev, curr) {
        return prev ? pred(curr) : prev;
    }, false);
});
exports.includes = curry(function (a, b) {
    return b.includes(a);
});
exports.split = curry(function (sep, str) { return str.split(sep); });
exports.splitAt = curry(function (index, xs) {
    var p1 = xs.slice(0, index);
    var p2 = xs.slice(index);
    return [p1, p2];
});
var head = function (xs) { return (xs.length ? xs[0] : xs); };
exports.head = head;
var tail = function (xs) {
    return xs.length ? xs[xs.length - 1] : xs;
};
exports.tail = tail;
var doNothing = function (_) { return null; };
exports.doNothing = doNothing;
var focus = function (element) { return element.focus(); };
exports.focus = focus;
/**
 *  prop :: String -> Object -> a
 */
exports.prop = curry(function (p, obj) { return exports.isNil(obj) ? null : obj[p]; });
/**
 *  objProp :: Object -> String -> a
 */
exports.objProp = curry(function (obj, property) {
    return exports.prop(property, obj);
});
/*
 *  safeGet :: obj -> string -> a | undefined
 */
function safeGet(entity) {
    return function (property) {
        return exports.prop(property, entity);
    };
}
exports.safeGet = safeGet;

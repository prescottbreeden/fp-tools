"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTargetNameValue = exports.lte = exports.lt = exports.gte = exports.gt = exports.divideBy = exports.divide = exports.multiply = exports.subtractBy = exports.subtract = exports.add = exports.objProp = exports.prop = exports.set = exports.tail = exports.head = exports.concat = exports.splitAt = exports.split = exports.includes = exports.toUpper = exports.toLower = exports.randomString = exports.trace = exports.doNothing = exports.defaultTo = exports.always = exports.either = exports.equals = exports.isNil = exports.all = exports.some = exports.reduce = exports.replaceItem = exports.filter = exports.map = exports.identity = exports.converge = exports.curry = exports.compose = void 0;
// ============================================================
//                        -- Core --
// ============================================================
/**
 *  compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
exports.compose = compose;
/**
 *  curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
 */
function curry(fn) {
    const arity = fn.length;
    return function $curry(...args) {
        if (args.length < arity) {
            return $curry.bind(null, ...args);
        }
        return fn.call(null, ...args);
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
 * @returns (fn, ...wraps) -> arg -> fn(...wraps(arg))
 */
const converge = (fn, wraps) => (arg) => fn(...wraps.map((wrap) => wrap(arg)));
exports.converge = converge;
/**
 *  identity :: x -> x
 */
const identity = (x) => x;
exports.identity = identity;
// ============================================================
//                      -- Monoids --
// ============================================================
/**
 *  map :: (a -> b) -> [a] -> [b]
 */
exports.map = curry((fn, xs) => {
    return xs === null || xs === undefined || xs.map === undefined
        ? xs
        : xs.map(fn);
});
/**
 *  filter :: (a -> b) -> [a] -> b
 */
exports.filter = curry((fn, xs) => {
    return xs === null || xs === undefined || xs.filter === undefined
        ? xs
        : xs.filter(fn);
});
/**
 *  replaceItem :: string -> [a] -> a -> [a]
 */
exports.replaceItem = curry((property, list, b) => {
    return list.map((a) => (a[property] === b[property] ? b : a));
});
// ============================================================
//                      -- Reduce --
// ============================================================
/**
 *  reduce :: (a -> b) -> [a] -> b
 */
exports.reduce = curry((fn, agg, xs) => {
    return xs === null || xs === undefined || xs.reduce === undefined
        ? xs
        : xs.reduce(fn, agg);
});
/**
 *   some :: fn -> xs -> boolean
 */
exports.some = curry((pred, list) => {
    return list === null || list === undefined || list.reduce === undefined
        ? false
        : list.reduce((prev, curr) => {
            return prev ? prev : pred(curr);
        }, false);
});
/**
 *   all :: fn -> xs -> boolean
 */
exports.all = curry((pred, list) => {
    return list === null || list === undefined || list.reduce === undefined
        ? false
        : list.reduce((prev, curr) => {
            return prev ? pred(curr) : prev;
        }, false);
});
// ============================================================
//                      -- logic --
// ============================================================
/**
 *   isNil :: a -> boolean
 */
const isNil = (x) => x === null || x === undefined;
exports.isNil = isNil;
/**
 *  equals :: a -> a -> bool
 */
exports.equals = curry((a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
});
/**
 *  either :: f -> g -> x -> f(x) | g(x)
 */
exports.either = curry((pred1, pred2, val) => {
    return exports.isNil(val) ? pred2(val) : pred1(val);
});
/**
 *  always :: a -> b -> a
 */
exports.always = curry((a, _) => a);
/**
 *   defaultTo :: a -> b -> a | b
 */
exports.defaultTo = curry((def, val) => (val ? val : def));
/**
 *   doNothing :: a -> null
 */
const doNothing = (_) => null;
exports.doNothing = doNothing;
// ============================================================
//                      -- debug --
// ============================================================
/**
 *  trace :: string -> a -> a
 */
exports.trace = curry((msg, a) => {
    console.log(msg, a);
    return a;
});
// ============================================================
//          -- strings / numbers / lists / objects --
// ============================================================
/**
 *  randomString :: () -> string
 */
const randomString = () => {
    return Math.random().toString(36).substring(7);
};
exports.randomString = randomString;
/**
 *  toLower :: string -> string
 */
const toLower = (str) => str.toLowerCase();
exports.toLower = toLower;
/**
 *  toUpper :: string -> string
 */
const toUpper = (str) => str.toUpperCase();
exports.toUpper = toUpper;
/**
 *  includes :: string -> boolean
 */
exports.includes = curry((a, b) => {
    if (typeof b === 'string') {
        return b.includes(a);
    }
    return false;
});
/**
 *  split :: string -> string -> [ string ]
 */
exports.split = curry((sep, str) => str.split(sep));
/**
 *  splitAt :: number -> xs | string -> [ xs | [string], xs | [string] ]
 */
exports.splitAt = curry((index, xs) => {
    const p1 = xs.slice(0, index);
    const p2 = xs.slice(index);
    return [p1, p2];
});
/**
 *  concat :: string -> string -> string
 */
exports.concat = curry((a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.concat(b);
    }
    return '';
});
/**
 *  head :: [a] -> a
 */
const head = (xs) => {
    if (typeof xs === 'string' || Array.isArray(xs)) {
        if (xs.length === 0) {
            return null;
        }
        else if (xs.length > 0) {
            return xs[0];
        }
        return null;
    }
};
exports.head = head;
/**
 *  tail :: [a] -> a
 */
const tail = (xs) => {
    if (typeof xs === 'string' || Array.isArray(xs)) {
        if (xs.length === 0) {
            return null;
        }
        else if (xs.length > 0) {
            return xs[xs.length - 1];
        }
        return null;
    }
};
exports.tail = tail;
/**
 *  set :: String -> a -> { string: a }
 */
exports.set = curry((name, value) => ({ [name]: value }));
/**
 *  prop :: String -> Object -> a
 */
exports.prop = curry((p, obj) => exports.isNil(obj) ? null : obj[p]);
/**
 *  objProp :: Object -> String -> a
 */
exports.objProp = curry((obj, property) => {
    return exports.prop(property, obj);
});
// ============================================================
//                      -- math --
// ============================================================
/**
 *  add :: a -> b -> (a + b): number
 */
exports.add = curry((a, b) => a + b);
/**
 *  subtract :: a -> b -> (a - b): number
 */
exports.subtract = curry((a, b) => a - b);
/**
 *  subtractBy :: a -> b -> (b - a): number
 */
exports.subtractBy = curry((a, b) => b - a);
/**
 *  multiply :: a -> b -> (a - b): number
 */
exports.multiply = curry((a, b) => a * b);
/**
 *  divide :: a -> b -> (a - b): number
 */
exports.divide = curry((a, b) => a / b);
/**
 *  divideBy :: a -> b -> (a - b): number
 */
exports.divideBy = curry((a, b) => b / a);
/**
 *  gt :: a -> b -> (b > a): boolean
 */
exports.gt = curry((a, b) => b > a);
/**
 *  gte :: a -> b -> (b >= a): boolean
 */
exports.gte = curry((a, b) => b >= a);
/**
 *  lt :: a -> b -> (b < a): boolean
 */
exports.lt = curry((a, b) => b < a);
/**
 *  lte :: a -> b -> (b <= a): boolean
 */
exports.lte = curry((a, b) => b <= a);
// ============================================================
//                      -- misc --
// ============================================================
exports.eventTargetNameValue = exports.compose(exports.converge(exports.set, [exports.prop('name'), exports.prop('value')]), exports.prop('target'));
//# sourceMappingURL=utils.js.map
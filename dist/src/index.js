"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reject = exports.nothing = exports.just = exports.maybe = exports.Task = exports.Maybe = exports.lte = exports.lt = exports.gte = exports.gt = exports.subtract = exports.add = exports.safeGet = exports.objProp = exports.prop = exports.tail = exports.head = exports.concat = exports.splitAt = exports.split = exports.includes = exports.toUpper = exports.toLower = exports.randomString = exports.trace = exports.doNothing = exports.defaultTo = exports.either = exports.equals = exports.isNil = exports.all = exports.some = exports.reduce = exports.filter = exports.map = exports.identity = exports.converge = exports.curry = exports.compose = void 0;
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
 * @returns (fn, ...wraps) -> arg -> fn(...wraps(arg))
 */
var converge = function (fn, wraps) { return function (arg) {
    return fn.apply(void 0, wraps.map(function (wrap) { return wrap(arg); }));
}; };
exports.converge = converge;
// ============================================================
//                      -- Monoids -- 
// ============================================================
/**
 *  identity :: x -> x
 */
var identity = function (x) { return x; };
exports.identity = identity;
/**
 *  map :: (a -> b) -> [a] -> [b]
 */
exports.map = curry(function (fn, xs) {
    return (xs === null || xs === undefined || xs['map'] === undefined)
        ? xs
        : xs.map(fn);
});
/**
 *  filter :: (a -> b) -> [a] -> b
 */
exports.filter = curry(function (fn, xs) {
    if (xs === null || xs === undefined || xs['filter'] === undefined) {
        return xs;
    }
    if (Array.isArray(xs) || xs['filter'] !== undefined) {
        return xs.filter(fn);
    }
    return xs;
});
// ============================================================
//                      -- Not? Monoids -- 
// ============================================================
/**
 *  map :: (a -> b) -> [a] -> b
 */
exports.reduce = curry(function (fn, xs) {
    if (xs === null || xs === undefined || xs['reduce'] === undefined) {
        return xs;
    }
    if (Array.isArray(xs) || xs['reduce'] !== undefined) {
        return xs.reduce(fn);
    }
    return xs;
});
// ============================================================
//                      -- Reduce -- 
// ============================================================
/**
 *   some :: fn -> xs -> boolean
 */
exports.some = curry(function (pred, list) {
    if (list === null || list === undefined || list['reduce'] === undefined) {
        return false;
    }
    if (Array.isArray(list) || list['reduce'] !== undefined) {
        return list.reduce(function (prev, curr) {
            return prev ? prev : pred(curr);
        }, false);
    }
    return false;
});
/**
 *   all :: fn -> xs -> boolean
 */
exports.all = curry(function (pred, list) {
    if (list === null || list === undefined || list['reduce'] === undefined) {
        return false;
    }
    if (Array.isArray(list) || list['reduce'] !== undefined) {
        return list.reduce(function (prev, curr) {
            return prev ? pred(curr) : prev;
        }, false);
    }
    return false;
});
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
    return exports.isNil(val) ? pred2(val) : pred1(val);
});
/**
 *   defaultTo :: a -> b -> a | b
 */
exports.defaultTo = curry(function (def, val) { return (val ? val : def); });
/**
 *   doNothing :: a -> null
 */
var doNothing = function (_) { return null; };
exports.doNothing = doNothing;
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
//          -- strings / numbers / lists / objects -- 
// ============================================================
/**
 *  randomString :: () -> string
 */
var randomString = function () {
    return Math.random().toString(36).substring(7);
};
exports.randomString = randomString;
/**
 *  toLower :: string -> string
 */
var toLower = function (str) { return str.toLowerCase(); };
exports.toLower = toLower;
/**
 *  toUpper :: string -> string
 */
var toUpper = function (str) { return str.toUpperCase(); };
exports.toUpper = toUpper;
/**
 *  includes :: string -> boolean
 */
exports.includes = curry(function (a, b) {
    if (typeof b === 'string') {
        return b.includes(a);
    }
    return false;
});
exports.split = curry(function (sep, str) { return str.split(sep); });
exports.splitAt = curry(function (index, xs) {
    var p1 = xs.slice(0, index);
    var p2 = xs.slice(index);
    return [p1, p2];
});
/**
 *  concat :: string -> string -> string
 */
exports.concat = curry(function (a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.concat(b);
    }
    return '';
});
/**
 *  head :: [a] -> a
 */
var head = function (xs) {
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
 *  head :: [a] -> a
 */
var tail = function (xs) {
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
// ============================================================
//                      -- math -- 
// ============================================================
/**
 *  add :: a -> b -> (a + b): number
 */
exports.add = curry(function (a, b) { return a + b; });
/**
 *  subtract :: a -> b -> (a - b): number
 */
exports.subtract = curry(function (a, b) { return a - b; });
/**
 *  gt :: a -> b -> (b > a): boolean
 */
exports.gt = curry(function (a, b) { return b > a; });
/**
 *  gte :: a -> b -> (b >= a): boolean
 */
exports.gte = curry(function (a, b) { return b >= a; });
/**
 *  lt :: a -> b -> (b < a): boolean
 */
exports.lt = curry(function (a, b) { return b < a; });
/**
 *  lte :: a -> b -> (b <= a): boolean
 */
exports.lte = curry(function (a, b) { return b <= a; });
// ============================================================
//                      -- Maybe -- 
// ============================================================
var Maybe = /** @class */ (function () {
    function Maybe(x) {
        this.$value = x;
    }
    Object.defineProperty(Maybe.prototype, "isNothing", {
        get: function () {
            return this.$value === null || this.$value === undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Maybe.prototype, "isJust", {
        get: function () {
            return !this.isNothing;
        },
        enumerable: false,
        configurable: true
    });
    // ----- Pointed Maybe
    Maybe.of = function (x) {
        return new Maybe(x);
    };
    // ----- Functor Maybe
    Maybe.prototype.map = function (fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    };
    // ----- Applicative Maybe
    Maybe.prototype.ap = function (f) {
        return this.isNothing ? this : f.map(this.$value);
    };
    // ----- Monad Maybe
    Maybe.prototype.chain = function (fn) {
        return this.map(fn).join();
    };
    Maybe.prototype.join = function () {
        return this.isNothing ? this : this.$value;
    };
    // ----- Traversable Maybe
    Maybe.prototype.sequence = function (of) {
        return this.traverse(of, exports.identity);
    };
    Maybe.prototype.traverse = function (of, fn) {
        return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
    };
    return Maybe;
}());
exports.Maybe = Maybe;
// ============================================================
//                      -- Task -- 
// ============================================================
var Task = /** @class */ (function () {
    function Task(fork) {
        this.fork = fork;
    }
    Task.rejected = function (x) {
        return new Task(function (reject, _) { return reject(x); });
    };
    // ----- Pointed (Task a)
    Task.of = function (x) {
        return new Task(function (_, resolve) { return resolve(x); });
    };
    // ----- Functor (Task a)
    Task.prototype.map = function (fn) {
        var _this = this;
        return new Task(function (reject, resolve) {
            return _this.fork(reject, exports.compose(resolve, fn));
        });
    };
    // ----- Applicative (Task a)
    Task.prototype.ap = function (f) {
        return this.chain(function (fn) { return f.map(fn); });
    };
    // ----- Monad (Task a)
    Task.prototype.chain = function (fn) {
        var _this = this;
        return new Task(function (reject, resolve) {
            return _this.fork(reject, function (x) { return fn(x).fork(reject, resolve); });
        });
    };
    Task.prototype.join = function () {
        return this.chain(exports.identity);
    };
    return Task;
}());
exports.Task = Task;
// ============================================================
//                  -- Functor Constructors -- 
// ============================================================
// Maybes
var maybe = function (x) { return Maybe.of(x); };
exports.maybe = maybe;
var just = function (x) { return exports.maybe(x); };
exports.just = just;
exports.nothing = exports.maybe(null);
// Tasks
var reject = function (x) { return Task.rejected(x); };
exports.reject = reject;

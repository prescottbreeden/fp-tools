"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = void 0;
var general_1 = require("./general");
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
        return this.traverse(of, general_1.identity);
    };
    Maybe.prototype.traverse = function (of, fn) {
        return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
    };
    return Maybe;
}());
exports.Maybe = Maybe;

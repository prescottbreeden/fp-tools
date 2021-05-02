"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nothing = exports.just = exports.maybe = exports.Maybe = void 0;
const _1 = require(".");
// ============================================================
//                      -- Maybe --
// ============================================================
class Maybe {
    constructor(x) {
        this.$value = x;
    }
    get isNothing() {
        return this.$value === null || this.$value === undefined;
    }
    get isJust() {
        return !this.isNothing;
    }
    // ----- Pointed Maybe
    static of(x) {
        return new Maybe(x);
    }
    // ----- Functor Maybe
    map(fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    }
    // ----- Applicative Maybe
    ap(f) {
        return this.isNothing ? this : f.map(this.$value);
    }
    // ----- Monad Maybe
    chain(fn) {
        return this.map(fn).join();
    }
    join() {
        return this.isNothing ? this : this.$value;
    }
    // ----- Traversable Maybe
    sequence(of) {
        return this.traverse(of, _1.identity);
    }
    traverse(of, fn) {
        return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
    }
}
exports.Maybe = Maybe;
const maybe = (x) => Maybe.of(x);
exports.maybe = maybe;
const just = (x) => exports.maybe(x);
exports.just = just;
exports.nothing = exports.maybe(null);
//# sourceMappingURL=Maybe.js.map
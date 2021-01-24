"use strict";
// Tasks
// ============================================================
//                      -- Task --
Object.defineProperty(exports, "__esModule", { value: true });
exports.reject = exports.Task = void 0;
const _1 = require(".");
// ============================================================
class Task {
    constructor(fork) {
        this.fork = fork;
    }
    static rejected(x) {
        return new Task((rej, _) => rej(x));
    }
    // ----- Pointed (Task a)
    static of(x) {
        return new Task((_, resolve) => resolve(x));
    }
    // ----- Functor (Task a)
    map(fn) {
        return new Task((rej, resolve) => this.fork(rej, _1.compose(resolve, fn)));
    }
    // ----- Applicative (Task a)
    ap(f) {
        return this.chain((fn) => f.map(fn));
    }
    // ----- Monad (Task a)
    chain(fn) {
        return new Task((rej, resolve) => this.fork(exports.reject, (x) => fn(x).fork(rej, resolve)));
    }
    join() {
        return this.chain(_1.identity);
    }
}
exports.Task = Task;
const reject = (x) => Task.rejected(x);
exports.reject = reject;
//# sourceMappingURL=Task.js.map
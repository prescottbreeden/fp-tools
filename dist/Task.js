"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const _1 = require("./");
// ============================================================
//                      -- Task --
// ============================================================
class Task {
    constructor(fork) {
        this.fork = fork;
    }
    static rejected(x) {
        return new Task((reject, _) => reject(x));
    }
    // ----- Pointed (Task a)
    static of(x) {
        return new Task((_, resolve) => resolve(x));
    }
    // ----- Functor (Task a)
    map(fn) {
        return new Task((reject, resolve) => this.fork(reject, _1.compose(resolve, fn)));
    }
    // ----- Applicative (Task a)
    ap(f) {
        return this.chain((fn) => f.map(fn));
    }
    // ----- Monad (Task a)
    chain(fn) {
        return new Task((reject, resolve) => this.fork(reject, (x) => fn(x).fork(reject, resolve)));
    }
    join() {
        return this.chain(_1.identity);
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map
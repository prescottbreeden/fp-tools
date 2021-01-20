"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const src_1 = require("src");
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
        return new Task((reject, resolve) => this.fork(reject, src_1.compose(resolve, fn)));
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
        return this.chain(src_1.identity);
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map
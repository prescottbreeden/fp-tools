import { compose, Func, identity } from '.';
// ============================================================
//                      -- Task --
// ============================================================
export class Task {
  fork: any;
  constructor(fork: any) {
    this.fork = fork;
  }

  static rejected(x: any) {
    return new Task((rej: Func, _: any) => rej(x));
  }

  // ----- Pointed (Task a)
  static of(x: any) {
    return new Task((_: any, resolve: Func) => resolve(x));
  }

  // ----- Functor (Task a)
  map(fn: Func) {
    return new Task((rej: Func, resolve: Func) =>
      this.fork(rej, compose(resolve, fn)),
    );
  }

  // ----- Applicative (Task a)
  ap(f: any) {
    return this.chain((fn: any) => f.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn: any) {
    return new Task((rej: Func, resolve: Func) =>
      this.fork(reject, (x: any) => fn(x).fork(rej, resolve)),
    );
  }

  join() {
    return this.chain(identity);
  }
}
export const reject = (x: any) => Task.rejected(x);

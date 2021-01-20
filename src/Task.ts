import { compose, identity } from 'src';
import { Func } from './types';

// ============================================================
//                      -- Task --
// ============================================================
export class Task {
  fork: any;
  constructor(fork: any) {
    this.fork = fork;
  }
  static rejected(x: any) {
    return new Task((reject: Func, _: any) => reject(x));
  }
  // ----- Pointed (Task a)
  static of(x: any) {
    return new Task((_: any, resolve: Func) => resolve(x));
  }
  // ----- Functor (Task a)
  map(fn: Func) {
    return new Task((reject: Func, resolve: Func) =>
      this.fork(reject, compose(resolve, fn)),
    );
  }
  // ----- Applicative (Task a)
  ap(f: any) {
    return this.chain((fn: any) => f.map(fn));
  }
  // ----- Monad (Task a)
  chain(fn: any) {
    return new Task((reject: Func, resolve: Func) =>
      this.fork(reject, (x: any) => fn(x).fork(reject, resolve)),
    );
  }
  join() {
    return this.chain(identity);
  }
}

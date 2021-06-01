import util from 'util';
import { compose, identity } from '.';
// ============================================================
//                      -- Task --
// ============================================================
export class Task {
  fork: any;
  constructor(fork: any) {
    this.fork = fork;
  }

  [util.inspect.custom]() {
    return 'Task(?)';
  }

  static rejected(x: any) {
    return new Task((rej: any, _: any) => rej(x));
  }

  // ----- Pointed (Task a)
  static of(x: any) {
    return new Task((_: any, resolve: any) => resolve(x));
  }

  // ----- anytor (Task a)
  map(fn: any) {
    return new Task((rej: any, resolve: any) =>
      this.fork(rej, compose(resolve, fn)),
    );
  }

  // ----- Applicative (Task a)
  ap(f: any) {
    return this.chain((fn: any) => f.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn: any) {
    return new Task((rej: any, resolve: any) =>
      this.fork(rej, (x: any) => fn(x).fork(rej, resolve)),
    );
  }

  join() {
    return this.chain(identity);
  }
}

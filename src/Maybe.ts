import { identity } from './';
import { Func } from './types';

// ============================================================
//                      -- Maybe --
// ============================================================
export class Maybe {
  $value: any;

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  get isJust() {
    return !this.isNothing;
  }

  constructor(x: any) {
    this.$value = x;
  }

  // ----- Pointed Maybe
  static of(x: any) {
    return new Maybe(x);
  }

  // ----- Functor Maybe
  map(fn: Func) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  // ----- Applicative Maybe
  ap(f: any) {
    return this.isNothing ? this : f.map(this.$value);
  }

  // ----- Monad Maybe
  chain(fn: Func) {
    return this.map(fn).join();
  }

  join() {
    return this.isNothing ? this : this.$value;
  }

  // ----- Traversable Maybe
  sequence(of: any) {
    return this.traverse(of, identity);
  }

  traverse(of: any, fn: Func) {
    return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
  }
}

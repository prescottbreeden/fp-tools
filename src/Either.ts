import util from 'util';
import { identity, inspect } from './index';

/* tslint:disable:max-classes-per-file */
export class Either {
  $value: any;
  constructor(x: any) {
    this.$value = x;
  }
  // ----- Pointed (Either a)
  static of(x: any) {
    return new Right(x);
  }
}

// @ts-ignore
export class Left extends Either {
  get isLeft() {
    return true;
  }
  get isRight() {
    return false;
  }
  static of(x: any) {
    throw new Error(
      '`of` called on class Left (value) instead of Either (type)',
    );
  }
  [util.inspect.custom]() {
    return `Left(${inspect(this.$value)})`;
  }
  // ----- Functor (Either a)
  map() {
    return this;
  }
  // ----- Applicative (Either a)
  ap() {
    return this;
  }
  // ----- Monad (Either a)
  chain() {
    return this;
  }
  join() {
    return this;
  }
  // ----- Traversable (Either a)
  sequence(of: any) {
    return of(this);
  }
  traverse(of: any, fn: any) {
    return of(this);
  }
}

// @ts-ignore
export class Right extends Either {
  get isLeft() {
    return false;
  }
  get isRight() {
    return true;
  }
  static of(x: any) {
    throw new Error(
      '`of` called on class Right (value) instead of Either (type)',
    );
  }
  [util.inspect.custom]() {
    return `Right(${inspect(this.$value)})`;
  }
  // ----- Functor (Either a)
  map(fn: any) {
    return Either.of(fn(this.$value));
  }
  // ----- Applicative (Either a)
  ap(f: any) {
    return f.map(this.$value);
  }
  // ----- Monad (Either a)
  chain(fn: any) {
    return fn(this.$value);
  }
  join() {
    return this.$value;
  }
  // ----- Traversable (Either a)
  sequence(of: any) {
    return this.traverse(of, identity);
  }
  traverse(of: any, fn: any) {
    fn(this.$value).map(Either.of);
  }
}

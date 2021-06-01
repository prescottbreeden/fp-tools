# fp-tools

Functions, Algebraic Structures, and Pointfree Utilities from Professor Frisby's Mostly Adequate Guide to FP.

Some functions may be missing or renamed.
Only Algebraic structures currently are Either (Left, Right), IO, Maybe, and Task.
Some functions have been added like gt/gte/lt/lte because the ramda implementation hurts me.

## Appendix A: Essential Functions Support

In this appendix, you'll find some basic JavaScript implementations of various functions
described in the book. Keep in mind that these implementations may not be the fastest or
the most efficient implementation out there; they solely serve an educational purpose.

In order to find functions that are more production-ready, have a peek at ramda, lodash, or
folktale.

Note that some functions also refer to algebraic structures defined in the Appendix B

### always

```ts
// always :: a -> b -> a
const always = curry((a, b) => a);
```

### compose

```ts
// compose :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const compose = (...fns: any) => (...args: any) =>
  fns.reduceRight((res: any, fn: any) => [fn.call(null, ...res)], args)[0];
```

### curry

```ts
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn: (...args: any) => any) {
  const arity = fn.length;

  return function $curry(...args: any): any {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}
```

### either

```ts
// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }
  return g(e.$value);
});
```

### identity

```ts
// identity :: x -> x
const identity = (x) => x;
```

### inspect

```ts
export const inspect = (x: any) => {
  if (x && typeof x.inspect === 'function') {
    return x.inspect();
  }
  function inspectFn(f: any) {
    return f.name ? f.name : f.toString();
  }
  function inspectTerm(t: any): any {
    switch (typeof t) {
      case 'string':
        return `'${t}'`;
      case 'object': {
        const ts = Object.keys(t).map((k) => [k, inspect(t[k])]);
        return `{${ts.map((kv) => kv.join(': ')).join(', ')}}`;
      }
      default:
        return String(t);
    }
  }
  function inspectArgs(args: any): any {
    return Array.isArray(args)
      ? `[${args.map(inspect).join(', ')}]`
      : inspectTerm(args);
  }
  return typeof x === 'function' ? inspectFn(x) : inspectArgs(x);
};
```

### left

```ts
// left :: a -> Either a b
const left = (a) => new Left(a);
```

### liftA2

```ts
// liftA2 :: (Applicative f) => (a1 -> a2 -> b) -> f a1 -> f a2 -> f b
const liftA2 = curry((fn, a1, a2) => a1.map(fn).ap(a2));
```

### liftA3

```ts
// liftA3 :: (Applicative f) => (a1 -> a2 -> a3 -> b) -> f a1 -> f a2 -> f a3 -> f b
const liftA3 = curry((fn, a1, a2, a3) => a1.map(fn).ap(a2).ap(a3));
```

### maybe

```ts
// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v;
  }
  return f(m.$value);
});
```

### nothing

```ts
// nothing :: Maybe a
const nothing = Maybe.of(null);
```

### reject

```ts
// reject :: a -> Task a b
const reject = (a) => Task.rejected(a);
```

---

## Appendix B: Algebraic Structures Support

In this appendix, you'll find some basic JavaScript implementations of various algebraic
structures described in the book. Keep in mind that these implementations may not be the
fastest or the most efficient implementation out there; they solely serve an educational
purpose.

In order to find structures that are more production-ready, have a peek at folktale or fantasy-
land.

Note that some methods also refer to functions defined in the Appendix A

### Compose

```ts
const createCompose = curry(
  (F, G) =>
    class Compose {
      constructor(x) {
        this.$value = x;
      }
      [util.inspect.custom]() {
        return `Compose(${inspect(this.$value)})`;
      }
      // ----- Pointed (Compose F G)
      static of(x) {
        return new Compose(F(G(x)));
      }
      // ----- Functor (Compose F G)
      map(fn) {
        return new Compose(this.$value.map((x) => x.map(fn)));
      }
      // ----- Applicative (Compose F G)
      ap(f) {
        return f.map(this.$value);
      }
    },
);
```

### Either

```ts
class Either {
  constructor(x) {
    this.$value = x;
  }
  // ----- Pointed (Either a)
  static of(x) {
    return new Right(x);
  }
}
```

### Left

```ts
class Left extends Either {
  get isLeft() {
    return true;
  }
  get isRight() {
    return false;
  }
  static of(x) {
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
  sequence(of) {
    return of(this);
  }
  traverse(of, fn) {
    return of(this);
  }
}
```

### Right

```ts
class Right extends Either {
  get isLeft() {
    return false;
  }
  get isRight() {
    return true;
  }
  static of(x) {
    throw new Error(
      '`of` called on class Right (value) instead of Either (type)',
    );
  }
  [util.inspect.custom]() {
    return `Right(${inspect(this.$value)})`;
  }
  // ----- Functor (Either a)
  map(fn) {
    return Either.of(fn(this.$value));
  }
  // ----- Applicative (Either a)
  ap(f) {
    return f.map(this.$value);
  }
  // ----- Monad (Either a)
  chain(fn) {
    return fn(this.$value);
  }
  join() {
    return this.$value;
  }
  // ----- Traversable (Either a)
  sequence(of) {
    return this.traverse(of, identity);
  }
  traverse(of, fn) {
    fn(this.$value).map(Either.of);
  }
}
```

### Identity

```ts
class Identity {
  constructor(x) {
    this.$value = x;
  }
  [util.inspect.custom]() {
    return `Identity(${inspect(this.$value)})`;
  }
  // ----- Pointed Identity
  static of(x) {
    return new Identity(x);
  }
  // ----- Functor Identity
  map(fn) {
    return Identity.of(fn(this.$value));
  }
  // ----- Applicative Identity
  ap(f) {
    return f.map(this.$value);
  }
  // ----- Monad Identity
  chain(fn) {
    return this.map(fn).join();
  }
  join() {
    return this.$value;
  }
  // ----- Traversable Identity
  sequence(of) {
    return this.traverse(of, identity);
  }
  traverse(of, fn) {
    return fn(this.$value).map(Identity.of);
  }
}
```

### IO

```ts
class IO {
  constructor(fn) {
    this.unsafePerformIO = fn;
  }
  [util.inspect.custom]() {
    return 'IO(?)';
  }
  // ----- Pointed IO
  static of(x) {
    return new IO(() => x);
  }
  // ----- Functor IO
  map(fn) {
    return new IO(compose(fn, this.unsafePerformIO));
  }
  // ----- Applicative IO
  ap(f) {
    return this.chain((fn) => f.map(fn));
  }
  // ----- Monad IO
  chain(fn) {
    return this.map(fn).join();
  }
  join() {
    return new IO(() => this.unsafePerformIO().unsafePerformIO());
  }
}
```

### List

```ts
class List {
  constructor(xs) {
    this.$value = xs;
  }
  [util.inspect.custom]() {
    return `List(${inspect(this.$value)})`;
  }
  concat(x) {
    return new List(this.$value.concat(x));
  }
  // ----- Pointed List
  static of(x) {
    return new List([x]);
  }
  // ----- Functor List
  map(fn) {
    return new List(this.$value.map(fn));
  }
  // ----- Traversable List
  sequence(of) {
    return this.traverse(of, identity);
  }
  traverse(of, fn) {
    return this.$value.reduce(
      (f, a) =>
        fn(a)
          .map((b) => (bs) => bs.concat(b))
          .ap(f),
      of(new List([])),
    );
  }
}
```

### Map

```ts
class Map {
  constructor(x) {
    this.$value = x;
  }
  [util.inspect.custom]() {
    return `Map(${inspect(this.$value)})`;
  }
  insert(k, v) {
    const singleton = {};
    singleton[k] = v;
    return Map.of(Object.assign({}, this.$value, singleton));
  }
  reduceWithKeys(fn, zero) {
    return Object.keys(this.$value).reduce(
      (acc, k) => fn(acc, this.$value[k], k),
      zero,
    );
  }
  // ----- Functor (Map a)
  map(fn) {
    return this.reduceWithKeys((m, v, k) => m.insert(k, fn(v)), new Map({}));
  }
  // ----- Traversable (Map a)
  sequence(of) {
    return this.traverse(of, identity);
  }
  traverse(of, fn) {
    return this.reduceWithKeys(
      (f, a, k) =>
        fn(a)
          .map((b) => (m) => m.insert(k, b))
          .ap(f),
      of(new Map({})),
    );
  }
}
```

### Maybe

Note that Maybe two child classes could also be defined in a similar fashion as we did for Just and Nothing Either with. This is simply a different flavor.

```ts
class Maybe {
  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }
  get isJust() {
    return !this.isNothing;
  }
  constructor(x) {
    this.$value = x;
  }
  [util.inspect.custom]() {
    return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
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
    return this.traverse(of, identity);
  }
  traverse(of, fn) {
    return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
  }
}
```

### Task

```ts
class Task {
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
```

---

## Appendix C: Pointfree Utilities

In this appendix, you'll find pointfree versions of rather classic JavaScript functions described in the book. All of the following functions are seemingly available in exercises, as part of the global context. Keep in mind that these implementations may not be the fastest or the most efficient implementation out there; they solely serve an educational purpose. In order to find functions that are more production-ready, have a peek at ramda, lodash, or folktale.

Note that functions refer to the curry & compose functions defined in Appendix A.

### add

```ts
// add :: Number -> Number -> Number
const add = curry((a, b) => a + b);
```

### append

```ts
// append :: String -> String -> String
const append = flip(concat);
```

### chain

```ts
// chain :: Monad m => (a -> m b) -> m a -> m b
const chain = curry((fn, m) => m.chain(fn));
```

### concat

```ts
// concat :: String -> String -> String
const concat = curry((a, b) => a.concat(b));
```

### eq

```ts
// eq :: Eq a => a -> a -> Boolean
const eq = curry((a, b) => a === b);
```

### filter

```ts
// filter :: (a -> Boolean) -> [a] -> [a]
const filter = curry((fn, xs) => xs.filter(fn));
```

### flip

```ts
// flip :: (a -> b -> c) -> b -> a -> c
const flip = curry((fn, a, b) => fn(b, a));
```

### forEach

```ts
// forEach :: (a -> ()) -> [a] -> ()
const forEach = curry((fn, xs) => xs.forEach(fn));
```

### head

```ts
// head :: [a] -> a
const head = (xs) => xs[0];
```

### intercalate

```ts
// intercalate :: String -> [String] -> String
const intercalate = curry((str, xs) => xs.join(str));
```

### join

```ts
// join :: Monad m => m (m a) -> m a
const join = (m) => m.join();
```

### last

```ts
// last :: [a] -> a
const last = (xs) => xs[xs.length - 1];
```

### map

```ts
// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => f.map(fn));
```

### match

```ts
// match :: RegExp -> String -> Boolean
const match = curry((re, str) => re.test(str));
```

### prop

```ts
// prop :: String -> Object -> a
const prop = curry((p, obj) => obj[p]);
```

### reduce

```ts
// reduce :: (b -> a -> b) -> b -> [a] -> b
const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero));
```

### replace

```ts
// replace :: RegExp -> String -> String -> String
const replace = curry((re, rpl, str) => str.replace(re, rpl));
```

### reverse

```ts
// reverse :: [a] -> [a]
const reverse = (x: any) =>
  Array.isArray(x) ? x.reverse() : x.split('').reverse().join('');
```

### safeHead

```ts
// safeHead :: [a] -> Maybe a
const safeHead = compose(Maybe.of, head);
```

### safeLast

```ts
// safeLast :: [a] -> Maybe a
const safeLast = compose(Maybe.of, last);
```

### safeProp

```ts
// safeProp :: String -> Object -> Maybe a
const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));
```

### sequence

```ts
// sequence :: (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
const sequence = curry((of, f) => f.sequence(of));
```

### sortBy

```ts
// sortBy :: Ord b => (a -> b) -> [a] -> [a]
const sortBy = curry((fn, xs) =>
  xs.sort((a, b) => {
    if (fn(a) === fn(b)) {
      return 0;
    }
    return fn(a) > fn(b) ? 1 : -1;
  }),
);
```

### split

```ts
// split :: String -> String -> [String]
const split = curry((sep, str) => str.split(sep));
```

### take

```ts
// take :: Number -> [a] -> [a]
const take = curry((n, xs) => xs.slice(0, n));
```

### toLowerCase

```ts
// toLowerCase :: String -> String
const toLowerCase = (s) => s.toLowerCase();
```

### toString

```ts
// toString :: a -> String
const toString = String;
```

### toUpperCase

```ts
// toUpperCase :: String -> String
const toUpperCase = (s) => s.toUpperCase();
```

### traverse

```ts
// traverse :: (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
const traverse = curry((of, fn, f) => f.traverse(of, fn));
```

### unsafePerformIO

```ts
// unsafePerformIO :: IO a -> a
const unsafePerformIO = (io) => io.unsafePerformIO();
```

import { Filterable, Func, Mappable, Reducable, ReduceFunction } from './types';

export * from './types';

/**
 *  compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
export const compose = (...fns: any) => (...args: any) =>
  fns.reduceRight((res: any, fn: any) => [fn.call(null, ...res)], args)[0];

/**
 *  pipe :: ((a -> b), (b -> c),  ..., (y -> z)) -> z -> a
 */
export const pipe = (...fns: any) => (...args: any) =>
  fns.reduce((res: any, fn: any) => [fn.call(null, ...res)], args)[0];

/**
 *  curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
 */
export function curry(fn: (...args: any) => any) {
  const arity = fn.length;

  return function $curry(...args: any): any {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

/**
 * takes a function requiring 2 arguments and an array of functions. each func
 * in the array will be applied against the argument of the returned function
 * and then passed as the arguments to the first function.
 * @example converge(concat, [prop('firstName'), prop('lastName')]);
 * @param fn the function to be called last
 * @param wraps array of functions to supply as arguments to fn
 * @returns (fn, ...wraps) -> arg -> fn(...wraps(arg))
 */
export const converge = (fn: Func, wraps: Func[]) => (arg: any) =>
  fn(...wraps.map((wrap: Func) => wrap(arg)));

// ============================================================
//                      -- Monoids --
// ============================================================

/**
 *  identity :: x -> x
 */
export const identity = (x: any) => x;
/**
 *  map :: (a -> b) -> [a] -> [b]
 */
export const map = curry((fn: any, xs: Mappable) => {
  return xs === null || xs === undefined || xs.map === undefined
    ? xs
    : xs.map(fn);
});

/**
 *  filter :: (a -> a) -> [a] -> [a]
 */
export const filter = curry((fn: (x: any) => boolean, xs: Filterable) => {
  return xs === null || xs === undefined || xs.filter === undefined
    ? xs
    : xs.filter(fn);
});

// ============================================================
//                      -- Not? Monoids --
// ============================================================
/**
 *  reduce :: (a -> b) -> [a] -> b
 */
export const reduce = curry((fn: ReduceFunction, xs: Reducable) =>
  xs.reduce(fn),
);

// ============================================================
//                      -- Reduce --
// ============================================================
/**
 *   some :: fn -> xs -> boolean
 */
export const some = curry((pred: (x: any) => boolean, list: any[]) => {
  return list === null || list === undefined || list.reduce === undefined
    ? false
    : list.reduce((prev: any, curr: any) => {
        return prev ? prev : pred(curr);
      }, false);
});

/**
 *   all :: fn -> xs -> boolean
 */
export const all = curry((pred: (x: any) => boolean, list: any[]) => {
  return list === null || list === undefined || list.reduce === undefined
    ? false
    : list.reduce((prev: any, curr: any) => {
        return prev ? pred(curr) : prev;
      }, false);
});

// ============================================================
//                      -- logic --
// ============================================================
/**
 *   isNil :: a -> boolean
 */
export const isNil = (x: any) => x === null || x === undefined;

/**
 *  equals :: a -> a -> bool
 */
export const equals = curry((a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
});

/**
 *  either :: f -> g -> x -> f(x) | g(x)
 */
export const either = curry((pred1: Func, pred2: Func, val: any) => {
  return isNil(val) ? pred2(val) : pred1(val);
});

/**
 *   defaultTo :: a -> b -> a | b
 */
export const defaultTo = curry((def: any, val: any) => (val ? val : def));

/**
 *   doNothing :: a -> null
 */
export const doNothing = (_: any) => null;

// ============================================================
//                      -- debug --
// ============================================================
/**
 *  trace :: string -> a -> a
 */
export const trace = curry((msg: string, a: any) => {
  console.log(msg, a);
  return a;
});

// ============================================================
//          -- strings / numbers / lists / objects --
// ============================================================

/**
 *  randomString :: () -> string
 */
export const randomString = () => {
  return Math.random().toString(36).substring(7);
};

/**
 *  toLower :: string -> string
 */
export const toLower = (str: string) => str.toLowerCase();

/**
 *  toUpper :: string -> string
 */
export const toUpper = (str: string) => str.toUpperCase();

/**
 *  includes :: string -> boolean
 */
export const includes = curry((a: string, b: string) => {
  if (typeof b === 'string') {
    return b.includes(a);
  }
  return false;
});

/**
 *  split :: string -> string -> [ string ]
 */
export const split = curry((sep: string, str: string) => str.split(sep));

/**
 *  split :: number -> xs | string -> [ xs | [string], xs | [string] ]
 */
export const splitAt = curry((index: number, xs: any[] | string) => {
  const p1 = xs.slice(0, index);
  const p2 = xs.slice(index);
  return [p1, p2];
});

/**
 *  concat :: string -> string -> string
 */
export const concat = curry((a: string, b: string) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.concat(b);
  }
  return '';
});

/**
 *  head :: [a] -> a
 */
export const head = (xs: any[] | string) => {
  if (typeof xs === 'string' || Array.isArray(xs)) {
    if (xs.length === 0) {
      return null;
    } else if (xs.length > 0) {
      return xs[0];
    }
    return null;
  }
};

/**
 *  head :: [a] -> a
 */
export const tail = (xs: any[] | string) => {
  if (typeof xs === 'string' || Array.isArray(xs)) {
    if (xs.length === 0) {
      return null;
    } else if (xs.length > 0) {
      return xs[xs.length - 1];
    }
    return null;
  }
};

/**
 *  prop :: String -> Object -> a
 */
export const prop = curry((p: string, obj: any) =>
  isNil(obj) ? null : obj[p],
);

/**
 *  objProp :: Object -> String -> a
 */
export const objProp = curry((obj: any, property: string) => {
  return prop(property, obj);
});

/*
 *  safeGet :: obj -> string -> a | undefined
 */
export function safeGet<T>(entity: T) {
  return (property: keyof T) => {
    return prop(property as string, entity);
  };
}

// ============================================================
//                      -- math --
// ============================================================
/**
 *  add :: a -> b -> a + b
 */
export const add = curry((a: number, b: number) => a + b);
/**
 *  subtract :: a -> b -> a - b
 */
export const subtract = curry((a: number, b: number) => a - b);

/**
 *  multiply :: a -> b -> a * b
 */
export const multiply = curry((a: number, b: number) => a * b);
/**
 *  divide :: a -> b -> maybe(a / b)
 */
export const divide = curry((a: number, b: number) =>
  b > 0 ? maybe(a / b) : maybe(undefined),
);
/**
 *  divideBy :: a -> b -> maybe(b / a)
 */
export const divideBy = curry((a: number, b: number) =>
  a > 0 ? maybe(b / a) : maybe(undefined),
);
/**
 *  gt :: a -> b -> b > a
 */
export const gt = curry((a: number, b: number) => b > a);

/**
 *  gte :: a -> b -> b >= a
 */
export const gte = curry((a: number, b: number) => b >= a);

/**
 *  lt :: a -> b -> b < a
 */
export const lt = curry((a: number, b: number) => b < a);
/**
 *  lte :: a -> b -> b <= a
 */
export const lte = curry((a: number, b: number) => b <= a);

// ============================================================
//                  -- Functor Constructors --
// ============================================================
// Maybes
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
export const maybe = (x: any) => Maybe.of(x);
export const just = (x: any) => maybe(x);
export const nothing = maybe(null);

// Tasks
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

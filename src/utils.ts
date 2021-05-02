import { Filterable, Func, Mappable, Reducable, ReduceFunction } from './types';

// ============================================================
//                        -- Core --
// ============================================================
/**
 *  compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 */
export const compose = (...fns: any) => (...args: any) =>
  fns.reduceRight((res: any, fn: any) => [fn.call(null, ...res)], args)[0];

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

/**
 *  identity :: x -> x
 */
export const identity = (x: any) => x;

// ============================================================
//                      -- Monoids --
// ============================================================
/**
 *  map :: (a -> b) -> [a] -> [b]
 */
export const map = curry((fn: any, xs: Mappable) => {
  return xs === null || xs === undefined || xs.map === undefined
    ? xs
    : xs.map(fn);
});

/**
 *  filter :: (a -> b) -> [a] -> b
 */
export const filter = curry((fn: (x: any) => boolean, xs: Filterable) => {
  return xs === null || xs === undefined || xs.filter === undefined
    ? xs
    : xs.filter(fn);
});

/**
 *  replaceItem :: string -> [a] -> a -> [a]
 */
export const replaceItem = curry((property: string, list: any[], b: any) => {
  return list.map((a: any) => (a[property] === b[property] ? b : a));
});

// ============================================================
//                      -- Reduce --
// ============================================================
/**
 *  reduce :: (a -> b) -> [a] -> b
 */
export const reduce = curry((fn: ReduceFunction, agg: any, xs: Reducable) => {
  return xs === null || xs === undefined || xs.reduce === undefined
    ? xs
    : xs.reduce(fn, agg);
});

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
 *  always :: a -> b -> a
 */
export const always = curry((a: any, _: any) => a);

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
 *  splitAt :: number -> xs | string -> [ xs | [string], xs | [string] ]
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
 *  tail :: [a] -> a
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
 *  set :: String -> a -> { string: a }
 */
export const set = curry((name: string, value: any) => ({ [name]: value }));
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

// ============================================================
//                      -- math --
// ============================================================
/**
 *  add :: a -> b -> (a + b): number
 */
export const add = curry((a: number, b: number) => a + b);
/**
 *  subtract :: a -> b -> (a - b): number
 */
export const subtract = curry((a: number, b: number) => a - b);
/**
 *  subtractBy :: a -> b -> (b - a): number
 */
export const subtractBy = curry((a: number, b: number) => b - a);
/**
 *  multiply :: a -> b -> (a - b): number
 */
export const multiply = curry((a: number, b: number) => a * b);
/**
 *  divide :: a -> b -> (a - b): number
 */
export const divide = curry((a: number, b: number) => a / b);
/**
 *  divideBy :: a -> b -> (a - b): number
 */
export const divideBy = curry((a: number, b: number) => b / a);

/**
 *  gt :: a -> b -> (b > a): boolean
 */
export const gt = curry((a: number, b: number) => b > a);

/**
 *  gte :: a -> b -> (b >= a): boolean
 */
export const gte = curry((a: number, b: number) => b >= a);

/**
 *  lt :: a -> b -> (b < a): boolean
 */
export const lt = curry((a: number, b: number) => b < a);
/**
 *  lte :: a -> b -> (b <= a): boolean
 */
export const lte = curry((a: number, b: number) => b <= a);

// ============================================================
//                      -- misc --
// ============================================================

export const eventTargetNameValue = compose(
  converge(set, [prop('name'), prop('value')]),
  prop('target'),
);

import { Maybe } from './Maybe';
import { IO } from './IO';
import { Task } from './Task';
export * from './Maybe';
export * from './Task';
export * from './IO';
export * from './Either';

export const compose = (...fns: any) => (...args: any) =>
  fns.reduceRight((res: any, fn: any) => [fn.call(null, ...res)], args)[0];
export const pipe = (...fns: any) => (...args: any) =>
  fns.reduce((res: any, fn: any) => [fn.call(null, ...res)], args)[0];
export function curry(fn: (...args: any) => any) {
  const arity = fn.length;

  return function $curry(...args: any): any {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}
export const converge = (fn: any, wraps: any[]) => (arg: any) =>
  fn(...wraps.map((wrap: any) => wrap(arg)));

export const always = curry((a, b) => a);
export const concat = curry((a, b) => a.concat(b));
export const flip = curry((fn, a, b) => fn(b, a));
export const append = flip(concat);
export const add = curry((a, b) => a + b);
export const all = curry((pred, list) =>
  list.reduce((prev: any, curr: any) => (prev ? pred(curr) : prev), false),
);
export const chain = curry((fn, m) => m.chain(fn));
export const defaultTo = curry((def, val) => (val ? val : def));
export const divide = curry((a, b) =>
  b > 0 ? Maybe.of(a / b) : Maybe.of(null),
);
export const divideBy = curry((a, b) =>
  a > 0 ? Maybe.of(b / a) : Maybe.of(null),
);
export const doNothing = (_: any) => null;
export const either = curry((pred1, pred2, val) =>
  isNil(val) ? pred2(val) : pred1(val),
);
export const eq = curry((a, b) => a === b);
export const deepEq = curry((a, b) => JSON.stringify(a) === JSON.stringify(b));
export const filter = curry((fn, xs) => xs.filter(fn));
export const forEach = curry((fn, xs) => xs.forEach(fn));
export const gt = curry((a, b) => b > a);
export const gte = curry((a, b) => b >= a);
export const head = (xs: any[] | string) => xs[0];
export const identity = (x: any) => x;
export const includes = curry((a, b) => b.includes(a));
export const intercalate = curry((str, xs) => xs.join(str));
export const isNil = (x: any) => x === null || x === undefined;
export const isNothing = (m: Maybe) => m.isNothing;
export const isSome = (m: Maybe) => m.isJust;
export const join = (m: any) => m.join();
export const lt = curry((a, b) => b < a);
export const lte = curry((a, b) => b <= a);
export const map = curry((fn, xs) => xs.map(fn));
export const match = curry((re, str) => re.test(str));
export const multiply = curry((a, b) => a * b);
export const nothing = Maybe.of(null);
export const objProp = curry((obj, property) => prop(property, obj));
export const prop = curry((p, obj) => (isNil(obj) ? null : obj[p]));
export const randomString = () => Math.random().toString(36).substring(7);
export const reduce = curry((fn, xs) => xs.reduce(fn));
export const reverse = (x: any) =>
  Array.isArray(x) ? x.reverse() : x.split('').reverse().join('');
export const some = curry((pred, list) =>
  list.reduce((prev: any, curr: any) => (prev ? prev : pred(curr)), false),
);
export const split = curry((sep, str) => str.split(sep));
export const splitAt = curry((index, xs) => {
  const p1 = xs.slice(0, index);
  const p2 = xs.slice(index);
  return [p1, p2];
});
export const subtract = curry((a, b) => a - b);
export const tail = (xs: any[] | string) => xs[xs.length - 1];
export const take = curry((n, xs) => xs.slice(0, n));
export const toLower = (str: string) => str.toLowerCase();
export const toUpper = (str: string) => str.toUpperCase();
export const trace = curry((msg, a) => {
  console.log(msg, a);
  return a;
});
export const traverse = curry((of, fn, f) => f.traverse(of, fn));
export const unsafePerformIO = (io: IO) => io.unsafePerformIO();

export const safeHead = compose(Maybe.of, head);
export const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));
export const safeTail = compose(Maybe.of, tail);
export const sequence = curry((of, f) => f.sequence(of));
export const sortBy = curry((fn, xs) =>
  xs.sort((a: any, b: any) => {
    if (fn(a) === fn(b)) {
      return 0;
    }
    return fn(a) > fn(b) ? 1 : -1;
  }),
);
export const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v;
  }
  return f(m.$value);
});
export const reject = (a: any) => Task.rejected(a);

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

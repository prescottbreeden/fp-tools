import {
  add,
  compose,
  concat,
  converge,
  curry,
  defaultTo,
  divide,
  divideBy,
  either,
  equals,
  filter,
  identity,
  isNil,
  map,
  multiply,
  pipe,
  prop,
} from '../';

describe('curry', () => {
  it('allows arguments to be partially applied', () => {
    const greet = (g1: string, g2: string) => {
      return `${g1}-${g2}`;
    };
    const curriedGreet = curry(greet);
    expect(typeof curriedGreet).toBe('function');
    const sayHello = curriedGreet('Hello');
    expect(typeof sayHello).toBe('function');
    const result = sayHello('Bob');
    expect(result).toBe('Hello-Bob');
  });
});

describe('compose', () => {
  it('converts multiple functions to a single function', () => {
    const mult2 = multiply(2);
    const add30 = add(30);
    const mathy = compose(add30, mult2);
    expect(mathy(10)).toBe(50);
  });
});

describe('pipe', () => {
  it('converts multiple functions to a single function', () => {
    const mult2 = multiply(2);
    const add30 = add(30);
    const mathy = pipe(add30, mult2);
    expect(mathy(10)).toBe(80);
  });
});

describe('converge', () => {
  it('applies the output of funcs as input to another', () => {
    const person = {
      firstName: 'Bob',
      lastName: 'Ross',
    };
    const fullName = converge(concat, [prop('firstName'), prop('lastName')]);
    expect(fullName(person)).toBe('BobRoss');
  });
});

describe('identity', () => {
  it('returns its argument', () => {
    expect(identity(42)).toBe(42);
  });
});

describe('map', () => {
  it('maps a function over a list and makes new list', () => {
    const add2 = add(2);
    const nums = [1, 2, 3, 4, 5];
    expect(map(add2, nums)).toStrictEqual([3, 4, 5, 6, 7]);
  });
  it('returns xs if xs is not mappable', () => {
    const add2 = add(2);
    const nums = null;
    expect(map(add2, nums)).toBe(null);
  });
});

describe('filter', () => {
  it('filters list based on predicate', () => {
    const nums = [1, 2, 3, 4, 5];
    expect(filter(equals(2), nums)).toStrictEqual([2]);
  });
  it('returns xs if xs is not filterable', () => {
    const nums = null;
    expect(filter(equals(2), nums)).toStrictEqual(null);
  });
});

describe('isNil', () => {
  it('returns true if arg is null.', () => {
    expect(isNil(null)).toBe(true);
  });
  it('returns true if arg is undefined.', () => {
    expect(isNil(undefined)).toBe(true);
  });
});

describe('equals', () => {
  it('returns true if both args are the same.', () => {
    expect(equals(2, 2)).toBe(true);
    expect(equals('dog', 'cat')).toBe(false);
  });
});

describe('either', () => {
  it('returns first function if arg is not null or undefined.', () => {
    const dog = 'jake';
    expect(either(identity, () => 'no name', dog)).toBe('jake');
    const person = {
      firstName: 'Bob',
      lastName: 'Ross',
    };
    const firstOrNull = either(prop('firstName'), () => 'bobby');
    expect(firstOrNull(person)).toBe('Bob');
  });

  it('returns second function if arg is not null or undefined.', () => {
    const dog = null;
    expect(either(identity, () => 'no name', dog)).toBe('no name');
    const person = undefined;
    const firstOrNull = either(prop('firstName'), (_: any) => null);
    expect(firstOrNull(person)).toBe(null);
  });
});

describe('defaultTo', () => {
  it('returns default if null or undefined', () => {
    expect(defaultTo(2, 4)).toBe(4);
    expect(defaultTo('dog', null)).toBe('dog');
  });
});

describe('divide', () => {
  it('returns a maybe value containing a number', () => {
    expect(divide(4, 2).join()).toBe(2);
  });
  it('returns a maybe value containing nothing', () => {
    expect(divide(4, 0).isNothing).toBe(true);
  });
});

describe('divideBy', () => {
  it('returns a maybe value containing a number', () => {
    expect(divideBy(4, 2).join()).toBe(0.5);
  });
  it('returns a maybe value containing nothing', () => {
    expect(divideBy(0, 4).isNothing).toBe(true);
  });
});

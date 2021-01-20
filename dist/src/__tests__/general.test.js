"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
describe('general', function () {
    describe('curry', function () {
        it('allows arguments to be partially applied', function () {
            var greet = function (g1, g2) {
                return g1 + "-" + g2;
            };
            var curriedGreet = __1.curry(greet);
            expect(typeof curriedGreet).toBe('function');
            var sayHello = curriedGreet('Hello');
            expect(typeof sayHello).toBe('function');
            var result = sayHello('Bob');
            expect(result).toBe('Hello-Bob');
        });
    });
    describe('compose', function () {
        it('converts multiple functions to a single function', function () {
            var add2 = __1.add(2);
            var add30 = __1.add(30);
            var add32 = __1.compose(add2, add30);
            expect(add32(10)).toBe(42);
        });
    });
    describe('identity', function () {
        it('returns its argument', function () {
            expect(__1.identity(42)).toBe(42);
        });
    });
    describe('converge', function () {
        it('applies the output of funcs as input to another', function () {
            var person = {
                firstName: 'Bob',
                lastName: 'Ross'
            };
            var fullName = __1.converge(__1.concat, [
                __1.prop('firstName'),
                __1.prop('lastName'),
            ]);
            expect(fullName(person)).toBe('BobRoss');
        });
    });
    describe('map', function () {
        it('maps a function over a list and makes new list', function () {
            var add2 = __1.add(2);
            var nums = [1, 2, 3, 4, 5];
            expect(__1.map(add2, nums)).toStrictEqual([3, 4, 5, 6, 7]);
        });
        it('returns xs if xs is not mappable', function () {
            var add2 = __1.add(2);
            var nums = null;
            expect(__1.map(add2, nums)).toBe(null);
        });
    });
    describe('isNil', function () {
        it('returns true if arg is null.', function () {
            expect(__1.isNil(null)).toBe(true);
        });
        it('returns true if arg is undefined.', function () {
            expect(__1.isNil(undefined)).toBe(true);
        });
    });
    describe('equals', function () {
        it('returns true if both args are the same.', function () {
            expect(__1.equals(2, 2)).toBe(true);
            expect(__1.equals('dog', 'cat')).toBe(false);
        });
    });
    describe('either', function () {
        it('returns first function if arg is not null or undefined.', function () {
            var dog = "jake";
            expect(__1.either(__1.identity, function () { return 'no name'; }, dog)).toBe('jake');
            var person = {
                firstName: 'Bob',
                lastName: 'Ross'
            };
            var firstOrNull = __1.either(__1.prop('firstName'), function () { return 'bobby'; });
            expect(firstOrNull(person)).toBe('Bob');
        });
        it('returns second function if arg is not null or undefined.', function () {
            var dog = null;
            expect(__1.either(__1.identity, function () { return 'no name'; }, dog)).toBe('no name');
            var person = undefined;
            var firstOrNull = __1.either(__1.prop('firstName'), function (_) { return null; });
            expect(firstOrNull(person)).toBe(null);
        });
    });
    describe('defaultTo', function () {
        it('returns default if null or undefined', function () {
            expect(__1.defaultTo(2, 4)).toBe(4);
            expect(__1.defaultTo('dog', null)).toBe('dog');
        });
    });
});

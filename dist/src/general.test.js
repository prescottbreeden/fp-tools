"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('general', function () {
    describe('curry', function () {
        it('allows arguments to be partially applied', function () {
            var greet = function (g1, g2) {
                return g1 + "-" + g2;
            };
            var curriedGreet = _1.curry(greet);
            expect(typeof curriedGreet).toBe('function');
            var sayHello = curriedGreet('Hello');
            expect(typeof sayHello).toBe('function');
            var result = sayHello('Bob');
            expect(result).toBe('Hello-Bob');
        });
    });
    describe('compose', function () {
        it('converts multiple functions to a single function', function () {
            var add2 = _1.add(2);
            var add30 = _1.add(30);
            var add32 = _1.compose(add2, add30);
            expect(add32(10)).toBe(42);
        });
    });
    describe('identity', function () {
        it('returns its argument', function () {
            expect(_1.identity(42)).toBe(42);
        });
    });
    describe('isNil', function () {
        it('returns true if arg is null.', function () {
            expect(_1.isNil(null)).toBe(true);
        });
        it('returns true if arg is undefined.', function () {
            expect(_1.isNil(undefined)).toBe(true);
        });
    });
});

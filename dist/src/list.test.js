"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('list', function () {
    describe('prop', function () {
        it('returns value indexed by argument from object', function () {
            var add2 = _1.add(2);
            var nums = [1, 2, 3, 4, 5];
            expect(_1.map(add2, nums)).toStrictEqual([3, 4, 5, 6, 7]);
        });
        it('returns empty array if xs is not mappable', function () {
            var add2 = _1.add(2);
            var nums = null;
            expect(_1.map(add2, nums)).toStrictEqual([]);
        });
    });
});

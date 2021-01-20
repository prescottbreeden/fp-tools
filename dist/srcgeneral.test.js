"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
describe('general', function () {
    describe('identity', function () {
        it('returns its argument', function () {
            expect(utils_1.identity(42)).toBe(42);
        });
    });
});

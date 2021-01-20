"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
describe('object', function () {
    describe('prop', function () {
        it('returns value indexed by argument from object', function () {
            var pope = { hobby: "poops in woods" };
            expect(__1.prop('hobby', pope)).toBe("poops in woods");
        });
    });
    describe('objProp', function () {
        it('returns value indexed by argument from object', function () {
            var pope = { hobby: "poops in woods" };
            expect(__1.objProp(pope, 'hobby')).toBe("poops in woods");
        });
    });
});

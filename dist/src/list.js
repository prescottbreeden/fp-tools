"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
var general_1 = require("./general");
var object_1 = require("./object");
/**
 *  map :: (a -> b) -> [a] -> [b]
 */
exports.map = general_1.curry(function (fn, xs) {
    return object_1.prop('map', xs) ? xs.map(fn) : [];
});

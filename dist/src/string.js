"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLower = exports.randomString = void 0;
/**
 *  randomString :: () -> string
 */
var randomString = function () {
    return Math.random().toString(36).substring(7);
};
exports.randomString = randomString;
/**
 *  toLower :: string -> string
 */
var toLower = function (str) { return str.toLowerCase(); };
exports.toLower = toLower;

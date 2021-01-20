"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var general_1 = require("./general");
var Task = /** @class */ (function () {
    function Task(fork) {
        this.fork = fork;
    }
    Task.rejected = function (x) {
        return new Task(function (reject, _) { return reject(x); });
    };
    // ----- Pointed (Task a)
    Task.of = function (x) {
        return new Task(function (_, resolve) { return resolve(x); });
    };
    // ----- Functor (Task a)
    Task.prototype.map = function (fn) {
        var _this = this;
        return new Task(function (reject, resolve) {
            return _this.fork(reject, general_1.compose(resolve, fn));
        });
    };
    // ----- Applicative (Task a)
    Task.prototype.ap = function (f) {
        return this.chain(function (fn) { return f.map(fn); });
    };
    // ----- Monad (Task a)
    Task.prototype.chain = function (fn) {
        var _this = this;
        return new Task(function (reject, resolve) {
            return _this.fork(reject, function (x) { return fn(x).fork(reject, resolve); });
        });
    };
    Task.prototype.join = function () {
        return this.chain(general_1.identity);
    };
    return Task;
}());
exports.Task = Task;

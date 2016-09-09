'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = undefined;

var _Deferred = require('./Deferred');

function promisify(func) {
  return function () {
    var deffered = new _Deferred.Deferred();
    var args = Array.prototype.slice.call(arguments, 0);
    args.push(deffered.callback());
    func.apply(null, args);
    return deffered.promise;
  };
}

exports.promisify = promisify;
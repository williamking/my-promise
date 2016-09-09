'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.promisify = undefined;

var _Deferred = require('./Deferred');

var _Promise = require('./Promise');

function promisify(func) {
  return function () {
    var deffered = new _Deferred.Deferred();
    var args = Array.prototype.slice.call(arguments, 0);
    args.push(deffered.callback());
    func.apply(null, args);
    return deffered.promise;
  };
}

function all(promises) {
  if (!promises instanceof Array) throw new Error('Argument must be array');
  var length = promises.length;
  var datas = [];
  var deferred = new _Deferred.Deferred();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = promises[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var promise = _step.value;

      if (!promise instanceof _Promise.Promise) return new Error('Argument must be array of promises');
      promise.then(function (data) {
        datas.push(data);
        if (--length == 0) {
          deferred.resolve(datas);
        }
      }).catch(function (err) {
        deferred.reject(err);
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return deferred.promise;
}

exports.promisify = promisify;
exports.all = all;
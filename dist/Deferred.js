'use strict';

Object.defineProperty(exports, "__esModule", {
       value: true
});
exports.Deferred = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Promise = require('./Promise');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deferred = function () {
       function Deferred() {
              _classCallCheck(this, Deferred);

              this.promise = new _Promise.Promise();
       }

       // 进入成功态时调用promise成功态的回调函数


       _createClass(Deferred, [{
              key: 'resolve',
              value: function resolve(obj) {
                     var promise = this.promise;
                     var handler = null;
                     while (handler = promise.queue.shift()) {
                            if (typeof handler.onFulfilled == 'function') {
                                   var ret = handler.onFulfilled(obj);
                                   if (ret instanceof _Promise.Promise) {
                                          ret.queue = ret.queue.concat(promise.queue);
                                          this.promise = ret;
                                          return;
                                   }
                            } else {
                                   return;
                            }
                     }
              }

              // 进入失败态时调用promise失败态的回调函数

       }, {
              key: 'reject',
              value: function reject(err) {
                     var promise = this.promise;
                     var handler = null;
                     while (handler = promise.queue.shift()) {
                            if (typeof handler.onRejected == 'function') {
                                   var ret = handler.onRejected(err);
                                   if (ret instanceof _Promise.Promise) {
                                          ret.queue = ret.queue.concat(promise.queue);
                                          this.promise = ret;
                                          return;
                                   }
                            } else {
                                   return;
                            }
                     }
              }

              // 生成promise化的回调函数，内含状态的判断逻辑

       }, {
              key: 'callback',
              value: function callback() {
                     var _this = this;

                     return function (err, data) {
                            if (err) {
                                   _this.reject(err);
                            } else {
                                   _this.resolve(data);
                            }
                     };
              }
       }]);

       return Deferred;
}();

exports.Deferred = Deferred;
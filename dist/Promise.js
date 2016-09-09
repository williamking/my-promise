'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Promise = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventProxy = require('./EventProxy');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = function () {
	function Promise() {
		_classCallCheck(this, Promise);

		this.queue = [];
	}

	/*
  * 设置promise成功态、失败态的回调函数，后两个回调可省略
  */


	_createClass(Promise, [{
		key: 'then',
		value: function then(fulfilledHandler, errorHandler) {
			var handler = {
				onFulfilled: null,
				onRejected: null
			};

			if (typeof fulfilledHandler == 'function') handler.onFulfilled = fulfilledHandler;

			if (typeof errorHandler == 'function') handler.onRejected = errorHandler;

			this.queue.push(handler);

			return this;
		}

		/*
   * 设置promise失败态的回调函数，必须在调用then后才能调用
   */

	}, {
		key: 'catch',
		value: function _catch(errorHandler) {
			if (this.queue.length == 0) throw new Error('You must call this method after calling "then"');
			var handler = this.queue[this.queue.length - 1];
			handler.onRejected = errorHandler;
			return this;
		}
	}]);

	return Promise;
}();

exports.Promise = Promise;
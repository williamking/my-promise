'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventProxy = function () {
	function EventProxy() {
		_classCallCheck(this, EventProxy);

		events: {}
	}

	_createClass(EventProxy, [{
		key: 'on',
		value: function on(name, callback) {
			if (events[name] && events[name] instanceof Array && typeof callback == 'function') {
				events[name].push({
					callback: callback,
					once: false,
					called: false
				});
			}
		}
	}, {
		key: 'once',
		value: function once(name, callback) {
			if (events[name] && events[name] instanceof Array && typeof callback == 'function') {
				events[name].push({
					callback: callback,
					once: true,
					called: false
				});
			}
		}
	}, {
		key: 'emit',
		value: function emit(name, data) {
			if (events[name]) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = events[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var handler = _step.value;

						if (handler.once && !handler.called || !handler.once) {
							handler.called = true;
							handler.callback(data);
						}
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
			}
		}
	}]);

	return EventProxy;
}();

exports.EventProxy = EventProxy;
'use strict';

class EventProxy {
	constructor() {
		events: {}
	}

	on(name, callback) {
		if (events[name] && events[name] instanceof Array && typeof callback == 'function') {
            events[name].push({
            	callback,
            	once: false,
            	called: false
            });
		}
	}

	once(name, callback) {
		if (events[name] && events[name] instanceof Array && typeof callback == 'function') {
            events[name].push({
            	callback,
            	once: true,
            	called: false
            });
		}
	}

	emit(name, data) {
		if (events[name]) {
			for (let handler of events[name]) {
				if ((handler.once && !handler.called) || !handler.once) {
					handler.called = true;
					handler.callback(data);
				}
			}
		}
	}
}

export { EventProxy };
'use strict';

import { EventProxy } from './EventProxy';

class Promise {
	constructor() {
		this.queue = [];
	}
    
    /*
     * 设置promise成功态、失败态的回调函数，后两个回调可省略
     */
	then(fulfilledHandler, errorHandler) {
		let handler = {
			onFulfilled: null,
			onRejected: null
		}

		if (typeof fulfilledHandler == 'function')
		    handler.onFulfilled = fulfilledHandler;

		if (typeof errorHandler == 'function')
		    handler.onRejected = errorHandler;

		this.queue.push(handler);

		return this;
	}

    /*
     * 设置promise失败态的回调函数，必须在调用then后才能调用
     */
	catch(errorHandler) {
		if (this.queue.length == 0)
			throw new Error('You must call this method after calling "then"');
		let handler = this.queue[this.queue.length - 1];
		handler.onRejected = errorHandler;
		return this;
	}
}

export { Promise };
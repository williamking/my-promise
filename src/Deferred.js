'use strict';

import { Promise } from './Promise';

class Deferred {
	constructor() {
        this.promise = new Promise();
	}

    // 进入成功态时调用promise成功态的回调函数
	resolve(obj) {
        let promise = this.promise;
        let handler = null;
        while (handler = promise.queue.shift()) {
        	if (typeof handler.onFulfilled == 'function') {
        		let ret = handler.onFulfilled(obj);
        		if (ret instanceof Promise) {
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
	reject(err) {
        let promise = this.promise;
        let handler = null;
        while (handler = promise.queue.shift()) {
        	if (typeof handler.onRejected == 'function') {
        		let ret = handler.onRejected(err);
        		if (ret instanceof Promise) {
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
	callback() {
      return (err, data) => {
        if (err) {
        	this.reject(err);
        } else {
        	this.resolve(data);
        }
      };
	}

}

export { Deferred };
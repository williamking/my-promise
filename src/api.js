'use strict';

import { Deferred } from './Deferred';
import { Promise } from './Promise';

function promisify(func) {
  return function() {
  	let deffered = new Deferred();
  	let args = Array.prototype.slice.call(arguments, 0);
  	args.push(deffered.callback());
    func.apply(null, args);
    return deffered.promise;
  }
}

function all(promises) {
	if (!promises instanceof Array)
		throw new Error('Argument must be array');
    let length = promises.length;
    let datas = [];
    let deferred = new Deferred();
    for (let promise of promises) {
    	if (!promise instanceof Promise)
    		return new Error('Argument must be array of promises');
    	promise.then(data => {
            datas.push(data);
            if (--length == 0) {
            	deferred.resolve(datas);
            }
    	})
    	.catch(err => {
            deferred.reject(err);
    	});
    }
    return deferred.promise;
}

export { promisify, all };

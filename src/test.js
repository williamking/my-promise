import { promisify, all } from './api';
import { readFile } from 'fs';

let mSetTimeout = promisify(function (delay, success, callback) {
	setTimeout(() => {
		if (success)
		    callback(null, 'Delay for ' + delay);
		else
			callback('Delay failed');
	}, delay);
});

mSetTimeout(1000, true).then((data) => {
	console.log('test 1');
    console.log(data);
})
.catch(err => {
    console.log(err);
});

// test1
// Delay for 1000

let allSetTimeout = all([
    mSetTimeout(1000, true),
    mSetTimeout(2000, true)
]);

allSetTimeout.then((data) => {
	console.log('test 2');
    console.log(data);
})
.catch(err => {
    console.log(err);
});

// test 2
// [ 'Delay for 1000', 'Delay for 2000' ]

let allSetTimeout2 = all([
    mSetTimeout(1000, false),
    mSetTimeout(2000, true)
]);

allSetTimeout2.then(() => {
	console.log('test 3');
})
.then((data) => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});

// test 3
// Delay failed

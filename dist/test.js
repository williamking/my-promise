'use strict';

var _api = require('./api');

var _fs = require('fs');

var mSetTimeout = (0, _api.promisify)(function (delay, success, callback) {
    setTimeout(function () {
        if (success) callback(null, 'Delay for ' + delay);else callback('Delay failed');
    }, delay);
});

mSetTimeout(1000, true).then(function (data) {
    console.log('test 1');
    console.log(data);
}).catch(function (err) {
    console.log(err);
});

// test1
// Delay for 1000

var allSetTimeout = (0, _api.all)([mSetTimeout(1000, true), mSetTimeout(2000, true)]);

allSetTimeout.then(function (data) {
    console.log('test 2');
    console.log(data);
}).catch(function (err) {
    console.log(err);
});

// test 2
// [ 'Delay for 1000', 'Delay for 2000' ]

var allSetTimeout2 = (0, _api.all)([mSetTimeout(1000, false), mSetTimeout(2000, true)]);

allSetTimeout2.then(function () {
    console.log('test 3');
}).then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log(err);
});

// test 3
// Delay failed
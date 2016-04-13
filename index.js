#!/usr/bin/env node --harmony-proxies
'use strict';

let config = require('./lib/config');

config.object1.object2.value = 'Hello World!';
//config.object1.object2.value.push('ola');
config.object1.object2.array.push('Hello World!');
config.object1.object2.array.push('Hello World 2!');
config.object1.object2.array.reverse();

console.log(JSON.stringify(config, null, 2));

//console.log(config.object1.object2.array);

//console.log(config.object1.object2.array[0]); // 'Hello World 2!'

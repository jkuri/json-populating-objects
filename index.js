#!/usr/bin/node --harmony-proxies
'use strict';

let Config = require('./lib/config');

let file = new Config('schemas/example.json');

file.config.obj = true;
file.config.object1.object2.value = 'Hello World!';
file.config.object1.object2.array.push('Hello World 1!');
file.config.object1.object2.array.push('Hello World 2!');
file.config.object1.object2.array.pop();
file.config.object1.object2.array.push('Hello world 3!');
file.config.object1.object2.array.reverse();

file.save();

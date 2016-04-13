#!/usr/bin/env node --harmony-proxies
'use strict';

let config = require('./lib/config');

config.object1.object2.value = 'Hello World!';
config.object1.object2.array.push('Hello World 1!');
config.object1.object2.array.push('Hello World 2!');
config.object1.object2.array.pop();
config.object1.object2.array.push('Hello world 3!');
config.object1.object2.array.reverse();

console.log(JSON.stringify(config, null, 2));

// {
//   "object1": {
//     "type": "object",
//     "object2": {
//       "type": "object",
//       "value": {
//         "type": "string",
//         "value": "Hello World!"
//       },
//       "array": {
//         "type": "array",
//         "enum": [
//           "Hello world 3!",
//           "Hello World 1!"
//         ]
//       }
//     }
//   }
// }

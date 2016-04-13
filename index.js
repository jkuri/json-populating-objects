#!/usr/bin/env node --harmony-proxies
'use strict';

let config = require('./lib/config');

config.object1.object2.value = 'Hello World!';
config.object1.object2.array.push('Hello World!');
config.object1.object2.array.push('Hello World 2!');

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
//           "Hello World!",
//           "Hello World 2!"
//         ]
//       }
//     }
//   }
// }

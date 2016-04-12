'use strict';

const fs            = require('fs');
const path          = require('path');
const Proxy         = require('harmony-proxy');
const Reflect       = require('harmony-reflect');
const ArrayMethods  = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

var handler = {
  get: function(target, key, receiver) {
    if (!(key in target)) {
      target[key] = new Proxy({}, handler);
    }

    const rtarget = ArrayMethods.indexOf(key) !== -1 ? [] : target;
    return Reflect.get(rtarget, key, receiver);
  }
};

module.exports = new Proxy({}, handler);

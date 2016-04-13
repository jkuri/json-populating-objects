'use strict';

const Proxy         = require('harmony-proxy');
const Reflect       = require('harmony-reflect');
const ArrayMethods  = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

var handler = {
  get: function(target, key, receiver) {
    if (key === 'toJSON') {
      return () => target;
    }

    if (key === 'length') {
      return;
    }

    if (key === 'inspect') {
      return target;
    }

    if (target.type === 'array') {
      [][key].call(target.enum);
    }

    if (ArrayMethods.indexOf(key) === -1) {
      if (!(key in target)) {
        target[key] = new Proxy({ type: 'object' }, handler);
      }
      return Reflect.get(target, key, receiver);
    }
    else {
      return Reflect.get([], key, receiver);
    }
  },
  set: function(target, key, value) {
    if (key === 'length') {
      return;
    }

    if (!isNaN(key) && parseInt(key, 10) === 0) {
      if (!target.enum) {
        target.type = 'array';
        target.enum = [];
      }

      if (value) {
        target.enum.push(value);
      }
    } 
    else {
      target[key] = { type: typeof value, value: value };
    }
  }
};

module.exports = new Proxy({}, handler);

'use strict';

const fs            = require('fs');
const Proxy         = require('harmony-proxy');
const Reflect       = require('harmony-reflect');
const ArrayMethods  = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

class Config {
  constructor(path) {
    try {
      fs.accessSync(path);
      this.path = path;
      this.config = new Proxy({}, handler);
    } catch (e) {
      throw `${path} not found.`;
    }
  }

  save() {
    try {
      let config = Object.assign({}, JSON.parse(fs.readFileSync(this.path, 'utf8')), this.config.toJSON());
      fs.writeFileSync(this.path, JSON.stringify(config, null, 2), 'utf8');
    } catch (e) {
      throw 'Error while saving config.';
    }
  }
}

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
    } else {
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
    } else {
      if (target[key] && target[key].type) {
        let type = target[key].type;
        let assigningType;

        if (!value && value === null) {
          assigningType = 'null';
        } else if (value && Array.isArray(value) && typeof value !== 'string') {
          assigningType = 'array';
        } else {
          assigningType = typeof value;
        }

        if (type !== assigningType) {
          throw `Cannot assign value of type '${assigningType}' to an property with type '${type}'.`;
        }
      }

      if (!value && value === null) {
        target[key] = { type: 'null', value: value };
      } else if (value && Array.isArray(value) && typeof value !== 'string') {
        target[key] = { type: 'array', enum: value };
      } else {
        if (typeof value === 'object' && Object.getOwnPropertyNames(value).length === 0) {
          target[key] = { type: typeof value };
        } else {
          target[key] = { type: typeof value, value: value };
        }
      }
    }
  }
};

module.exports = Config;

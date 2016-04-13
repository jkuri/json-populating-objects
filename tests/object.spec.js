'use strict';

const Config  = require('../lib/config');
const fs      = require('fs');
const path    = require('path');
const expect  = require('chai').expect;
const schema  = path.resolve(process.cwd(), 'schemas', 'test.json');

function getContents() {
  return JSON.parse(fs.readFileSync(schema, 'utf8'));
}

describe('Object Tests', () => {
  before(() => {
    process.chdir(process.cwd());
  });

  beforeEach(() => {
    fs.writeFileSync(schema, JSON.stringify({}), 'utf8');
  });

  afterEach(() => {
    try {
      fs.accessSync(schema);
      fs.unlinkSync(schema);
    } catch (e) { /* */ }
  });

  it('Does save an empty object with type object without additional properties other than type', () => {
    let file = new Config(schema);
    file.config.var = {};

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.exist;
    expect(json.var.type).to.be.equal('object');
    expect(Object.keys(json.var)).to.have.lengthOf(1);
  });

  it('Does initializes an object with properties', () => {
    let file = new Config(schema);
    file.config.var = { foo: 'bar', bar: 'foo' };

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('object');
    expect(json.var.value.foo).to.equal('bar');
    expect(json.var.value.bar).to.equal('foo');
    expect(Object.keys(json.var.value)).to.have.lengthOf(2);
  });

  it('Does add an value to existing object', () => {
    let file = new Config(schema);
    file.config.var = { foo: 'bar', bar: 'foo' };

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('object');
    expect(json.var.value.foo).to.equal('bar');
    expect(json.var.value.bar).to.equal('foo');
    expect(Object.keys(json.var.value)).to.have.lengthOf(2);

    file.config.var.value.test = 'bla';
    file.save();

    json = getContents();
    expect(json.var.value.test).to.be.equal('bla');
    expect(Object.keys(json.var.value)).to.have.lengthOf(3);
  });

  it('Does rewrite an existing property value with new one', () => {
    let file = new Config(schema);
    file.config.var = { foo: 'bar', bar: 'foo' };

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('object');
    expect(json.var.value.foo).to.equal('bar');
    expect(json.var.value.bar).to.equal('foo');
    expect(Object.keys(json.var.value)).to.have.lengthOf(2);

    file.config.var.value.foo = 'test123';
    file.save();

    json = getContents();
    expect(json.var.value.foo).to.be.equal('test123');
    expect(Object.keys(json.var.value)).to.have.lengthOf(2);
  });

  it('Does delete an existing property', () => {
    let file = new Config(schema);
    file.config.var = { foo: 'bar', bar: 'foo' };

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('object');
    expect(json.var.value.foo).to.equal('bar');
    expect(json.var.value.bar).to.equal('foo');
    expect(Object.keys(json.var.value)).to.have.lengthOf(2);

    delete file.config.var.value.foo;
    file.save();

    json = getContents();
    expect(Object.keys(json.var.value)).to.have.lengthOf(1);
  });

  it('Does throw if try to assign different type to type object', () => {
    let file = new Config(schema);
    file.config.var = { foo: 'bar', bar: 'foo' };

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('object');
    expect(json.var.value.foo).to.equal('bar');
    expect(json.var.value.bar).to.equal('foo');
    expect(Object.keys(json.var.value)).to.have.lengthOf(2);

    function test() {
      file.config.var = 100;
    }

    expect(test).to.throw('Cannot assign value of type \'number\' to an property with type \'object\'');
  });

});
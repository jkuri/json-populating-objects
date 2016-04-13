'use strict';

const Config  = require('../lib/config');
const fs      = require('fs');
const path    = require('path');
const expect  = require('chai').expect;
const schema  = path.resolve(process.cwd(), 'schemas', 'test.json');

function getContents() {
  return JSON.parse(fs.readFileSync(schema, 'utf8'));
}

describe('Number Tests', () => {
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

  it('Does save a number with type number', () => {
    let file = new Config(schema);
    file.config.var = 100;

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('number');
    expect(json.var.value).to.equal(100);
  });

  it('Does update a value as type number', () => {
    let file = new Config(schema);
    file.config.var = 100;

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('number');
    expect(json.var.value).to.equal(100);

    file.config.var = 200;

    file.save();

    json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('number');
    expect(json.var.value).to.equal(200);
  });

  it('Does throw if try to assign different type to a type number', () => {
    let file = new Config(schema);
    file.config.var = 100;

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('number');
    expect(json.var.value).to.equal(100);

    function test() {
      file.config.var = [];
    }

    expect(test).to.throw('Cannot assign value of type \'array\' to an property with type \'number\'');
  });

});
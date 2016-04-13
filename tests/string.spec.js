'use strict';

const Config  = require('../lib/config');
const fs      = require('fs');
const path    = require('path');
const expect  = require('chai').expect;
const schema  = path.resolve(process.cwd(), 'schemas', 'test.json');

function getContents() {
  return JSON.parse(fs.readFileSync(schema, 'utf8'));
}

describe('String Tests', () => {
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

  it('Does save a string with special characters', () => {
    let file = new Config(schema);
    file.config.var = 'testABC123[]\'()ŠĐČĆŽšđčćž,.-<>!"#$%&';

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('string');
    expect(json.var.value).to.include('\'');
    expect(json.var.value).to.include('[]');
    expect(json.var.value).to.equal('testABC123[]\'()ŠĐČĆŽšđčćž,.-<>!"#$%&');
  });

  it('Does save a string with exact length', () => {
    let file = new Config(schema);
    file.config.var = 'abcdefghij';

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('string');
    expect(json.var.value).to.have.lengthOf(10);
  });

  it('Does rewrite a string with new value, stays type of string and have a new value', () => {
    let file = new Config(schema);
    file.config.var = 'test';
    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('string');

    file.config.var = 'bla';
    file.save();
    json = getContents();

    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('string');
    expect(json.var.value).to.equal('bla');    
  });

  it('Does throw if want to assign different type to a type of string', () => {
    let file = new Config(schema);
    file.config.var = 'test';
    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('string');
    expect(json.var.value).to.equal('test');

    function test() {
      file.config.var = [];
    }

    expect(test).to.throw('Cannot assign value of type \'array\' to an property with type \'string\'')
  });

});
'use strict';

const Config  = require('../lib/config');
const fs      = require('fs');
const path    = require('path');
const expect  = require('chai').expect;
const schema  = path.resolve(process.cwd(), 'schemas', 'test.json');

function getContents() {
  return JSON.parse(fs.readFileSync(schema, 'utf8'));
}

describe('Array Tests', () => {
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

  it('Does initialize an empty array via `file.config.var = []`', () => {
    let file = new Config(schema);
    file.config.var = [];

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.array;
    expect(json.var.enum).to.have.lengthOf(0);
  });

  it('Does initialize a new array with property via `file.config.var = [\'test\']`', () => {
    let file = new Config(schema);
    file.config.var = ['test'];

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.array;
    expect(json.var.enum).to.have.lengthOf(1);
    expect(json.var.enum).to.deep.includes('test');
  });

  it('Does initialize a new array with multiple properties via `file.config.var = [\'test1\', \'test2\', \'test3\']`', () => {
    let file = new Config(schema);
    file.config.var = ['test1', 'test2', 'test3'];

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.array;
    expect(json.var.enum).to.have.lengthOf(3);
    expect(json.var.enum).to.deep.includes('test1');
    expect(json.var.enum).to.deep.includes('test2');
    expect(json.var.enum).to.deep.includes('test3');
  });

  it('`push(\'test\')` works on initialized empty array', () => {
    let file = new Config(schema);
    file.config.var = [];
    file.config.var.enum.push('test');

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.array;
    expect(json.var.enum).to.have.lengthOf(1);
    expect(json.var.enum).to.deep.includes('test');
  });

  it('`push(\'test\')` works on an array with properties', () => {
    let file = new Config(schema);
    file.config.var = ['bla1', 'bla2', 'bla3'];
    file.config.var.enum.push('test');

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.array;
    expect(json.var.enum).to.have.lengthOf(4);
    expect(json.var.enum).to.deep.includes('bla1');
    expect(json.var.enum).to.deep.includes('bla2');
    expect(json.var.enum).to.deep.includes('bla3');
    expect(json.var.enum).to.deep.includes('test');
  });

  it('`push(\'test\')` creates a new array and add a value `test` to it', () => {
    let file = new Config(schema);
    file.config.var.push('test');

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.array;
    expect(json.var.enum).to.have.lengthOf(1);
    expect(json.var.enum).to.deep.includes('test');
  });

  it('Throws an error if want to assign type of string to type of array', () => {
    let file = new Config(schema);
    file.config.var = [];

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.array;
    expect(json.var.enum).to.have.lengthOf(0);

    function test() {
      file.config.var = 'test';
    }

    expect(test).to.throw('Cannot assign value of type \'string\' to an property with type \'array\'');
  }); 

});
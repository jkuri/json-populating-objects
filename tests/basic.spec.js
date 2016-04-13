'use strict';

const Config  = require('../lib/config');
const fs      = require('fs');
const path    = require('path');
const expect  = require('chai').expect;
const schema  = path.resolve(process.cwd(), 'schemas', 'test.json');

function getContents() {
  return JSON.parse(fs.readFileSync(schema, 'utf8'));
}

describe('Basic Tests', () => {
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

  it('Throws an error if .json file not exists', () => {
    fs.unlinkSync(schema);

    let fn = () => {
      return new Config(schema);
    }

    expect(fn).to.throw('schemas/test.json not found.');
  });

  it('Does not throw an error if .json file exists', () => {
    let fn = () => {
      return new Config(schema);
    }

    expect(fn).to.not.throw();
  });

  it('Does save a string into config with type string', () => {
    let file = new Config(schema);
    file.config.var = 'test';

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('string');
    expect(json.var.value).to.be.equal('test');
  });

  it('Does save a boolean into config with type boolean', () => {
    let file = new Config(schema);
    file.config.var = true;

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('boolean');
    expect(json.var.value).to.be.equal(true);
  });

  it('Does save a number into config with type number', () => {
    let file = new Config(schema);
    file.config.var = 10;

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('number');
    expect(json.var.value).to.be.equal(10);
  });

  it('Does save an array into config with type array', () => {
    let file = new Config(schema);
    file.config.var = ['test'];

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('array');
    expect(json.var.enum).to.be.include('test');
    expect(json.var.enum).to.deep.equal(['test']);
  });

  it('Does save a object into config with type object', () => {
    let file = new Config(schema);
    file.config.var = { foo: 'bar' };

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('object');
    expect(json.var.value).to.deep.equal({ foo: 'bar' });
  });

  it('Does save a null into config with type null', () => {
    let file = new Config(schema);
    file.config.var = null;

    file.save();

    let json = getContents();
    expect(json.var).to.be.exist;
    expect(json.var.type).to.be.equal('null');
    expect(json.var.value).to.be.equal(null);
  });

});

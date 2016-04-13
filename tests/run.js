#!/usr/bin/env node --harmony-proxies
'use strict';

const Mocha = require('mocha');
const mocha = new Mocha({ timeout: 5000, reporter: 'spec' });

mocha.addFile('./tests/basic.spec');
mocha.addFile('./tests/string.spec');
mocha.addFile('./tests/array.spec');
mocha.addFile('./tests/number.spec');
mocha.addFile('./tests/object.spec');

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);
  });
});
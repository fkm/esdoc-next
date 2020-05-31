#!/usr/bin/env node
const sh = require('./sh');

const NODE_MAJOR_VERSION = process.version.match(/^v(\d+)/)[1];

if (parseInt(NODE_MAJOR_VERSION, 10) >= 8) {
  sh.exec('./script/eslint.js');
}

sh.rm('./test/integration-test/out');
const mochaOptions = [
  '--timeout 0',
  '--require @babel/register',
  '--require ./test/init.js',
  '$(find test/ -regex \'.*.test.js$\')',
  '-R spec'
];
const mochaOption = mochaOptions.join(' ');

if (process.argv.includes('--coverage')) {
  sh.exec(`NODE_ENV=coverage ./node_modules/.bin/nyc ./node_modules/mocha/bin/_mocha ${mochaOption}`);
} else {
  sh.exec(`./node_modules/.bin/mocha ${mochaOption}`);
}

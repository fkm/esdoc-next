#!/usr/bin/env node
const sh = require('./sh');

const NODE_MAJOR_VERSION = process.version.match(/^v(\d+)/)[1];

if (NODE_MAJOR_VERSION >= 8) {
  sh.exec('./script/eslint.js');
}
sh.exec('./script/test.js --coverage');
sh.exec('./node_modules/.bin/codecov');

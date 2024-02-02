const fs = require('fs');
const util = require('util');
const fileLog = fs.createWriteStream(__dirname + '/server.log', { flags: 'w' });
const errorLog = fs.createWriteStream(__dirname + '/error.log', { flags: 'w' });
const logOutput = process.stdout;

// eslint-disable-next-line no-console
console.error = (e) => {
  errorLog.write(util.format(e) + '\n');
  logOutput.write(util.format(e) + '\n');
};

// eslint-disable-next-line no-console
console.log = (e) => {
  fileLog.write(util.format(e) + '\n');
  logOutput.write(util.format(e) + '\n');
};

module.exports = { console };

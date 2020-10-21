const fs = require('fs');
var prompt = require('prompt-sync')();

const csv = fs.readFileSync(path.join(__dirname, 'test.gif'));
const name = prompt("what's the name of this agency?")
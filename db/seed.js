const fs = require("fs");
const path = require('path');
const prompt = require("prompt-sync")();
const neatCsv = require('neat-csv');
const Stop = require('../models/stop')

async function readFile() {
  const csv = fs.readFileSync(path.join(__dirname, "stops.csv"));
  const name = prompt("what's the name of this agency? ");
  const stops = await neatCsv(csv, {
    mapHeaders: ({ header, index }) => header.trim(), //i would love if agencies did not include unnecessary whitespace in their data
  });
  
  stops.forEach(s=>{
      s.agency = name
  })

  await Stop.insertMany(stops)
  console.log(`inserted ${name}`);

}

readFile()
require('dotenv').config()
const Twitter = require("twitter-lite")

const client = new Twitter({
    consumer_key: process.env.TWT_KEY,
    consumer_secret: process.env.TWT_SECRET,
    access_token_key: process.env.TWT_ACCESS,
    access_token_secret: process.env.TWT_ACCESS_SECRET,
  });


module.exports = {client}
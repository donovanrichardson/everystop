const mongoose = require('mongoose')
const mongoConfigObject = { useNewUrlParser: true, useUnifiedTopology: true }; //Config option to eliminate deprecation warnings
mongoose.connect('mongodb://localhost:27017/stops', mongoConfigObject, () => {
    console.log("CONNECTED TO MONGO");
  })

const db = mongoose.connection

db.on("error", (err) => console.error(err));
db.on("connected", () => console.log("mongo connected!"));
db.on("disconnected", () => console.log("mongo disconnected"));

const {Schema, model} = mongoose;

module.exports = {db, Schema, model}
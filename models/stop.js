const {Schema, model} = require('../db')

const stopSchema = new Schema({
    agency:String,
    stop_id: String,
    stop_lat:Number,
    stop_lon:Number,
    location_type:String //it might be better to do this as number, especially since 0 is default. but i dont remember if 0 default holds true in GTFS
},
{timestamps:true})

module.exports = model('Stop', stopSchema)
const {client, googleKey, upload} = require('./config')
const Stop = require('./models/stop')
const axios = require('axios').default

async function getUploadData(img){
    try{
        const uploadData = await upload.post('media/upload', {
            media_data: img,
        });
        return uploadData.media_id_string;
    }catch(e){
        console.log(e);
    }

}

async function tweet(text,img){
    try{
        const tweet = await client.post("statuses/update", {
            status: text,
            media_ids:[img]
          });
    }catch(e){
        console.log(e);
    } 
}

async function processStop(){
    try{
        const stop = await Stop.findOne({traversed:{$ne:true}, location_type:{$in:[0,'']}})
        console.log(stop);
        stop.traversed = true
        const meta = await axios.get(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${stop.stop_lat},${stop.stop_lon}&key=${googleKey}`)
        if(meta.data.status === 'OK'){
            const photo = await axios.get(`https://maps.googleapis.com/maps/api/streetview?pano=${meta.data.pano_id}&size=640x640&key=${googleKey}`,  {responseType:"arraybuffer"})
            const photoBin = Buffer.from(photo.data,'binary').toString('base64');
            console.log(stop.stop_name);
            const imgId = await getUploadData(photoBin)
            console.log(imgId);
            await tweet(stop.stop_name,imgId)
            
        }else{ 
            stop.update({$set:{unavailable:true}})
        }
    stop.save()
    }catch(e){
        console.log(e)
    }
}

async function start(){
    console.log('execution begun');
    await processStop()
    const second = 1000
    const minute = 60 * second
    const hour = minute * 60
    setInterval(processStop, 3 * hour)
}

start()
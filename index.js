const {client} = require('./config')

async function tweet(){
    try{
        stamp = Date.now()
        const tweet = await client.post("statuses/update", {
            status: stamp
          });
        console.log(stamp);
    }catch(e){
        console.log(e);
    }
    
}

function start(){
    console.log('execution begun');
    setInterval(tweet, 300000)
}

start()
const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/7d3bb66ba0543d5c78996f825152dfe9/'+ latitude + ',' + longitude
    request({url, json: true},(error, {body})=>{
        if(error){
             callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            const currently = body.currently
            callback(undefined,body.daily.data[0].summary+' It is currently '+ currently.temperature+' degrees out. This high today is '+ body.daily.data[0].temperatureHigh
             +' with a low of '+body.daily.data[0].temperatureLow + '. There is a '+ currently.precipProbability+'% chance of rain.')
        }
    })

}
module.exports = forecast
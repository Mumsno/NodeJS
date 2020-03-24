const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const darkSkyURL = "https://api.darksky.net/forecast/7634a65f19d4fc4fe9cb1d194e91ccfa/" + latitude + "," + longitude + "?units=si&";
    request.get({ url: darkSkyURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable To Connect to location services', undefined);
            return;
        } 
        
        if (body.error) {
            callback('Unable to find location', undefined)
            return;
        }
        
        const { daily, currently } = body
        callback(undefined, daily.data[0].summary + " It is currently " + currently.temperature + " degress, There's " + currently.precipProbability + "% chance of rain")
    });
}

module.exports = forecast
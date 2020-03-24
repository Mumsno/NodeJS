const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibXVtc25vIiwiYSI6ImNrODR5dDB3ZjAwb28zbXNqeWdmbW13ejIifQ.5vjf9Kkmx_5lBMc0y84emw&limit=1"
    request.get({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable To Connect to location services', undefined);
            return;
        } 
        
        const { features } = body
        if (features.length === 0) {
            callback('Unable to find location', undefined)
        }
        
        
        const center = features[0].center;
        const latitude = center[1];
        const longitude = center[0];
        callback(undefined, {latitude: latitude, longitude: longitude, location: body.features[0].place_name});
    });
    
}

module.exports = geocode
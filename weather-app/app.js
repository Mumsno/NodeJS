const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const address = process.argv[2]

if (!address) {
    console.log("No Address");
    return;
}

geocode(address, (error, { latitude, longitude, location}) => {
    if (error) {
        console.log(error);
        return;
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            console.log(error);
            return;            
        }

        console.log("Location: " + location);
        console.log(forecastData);
        
        
        
    })
})





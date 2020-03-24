const https = require('https')
const url = "https://api.darksky.net/forecast/7634a65f19d4fc4fe9cb1d194e91ccfa/31,-31?units=si&";

const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
        
    });
});

request.on('error', (error) => {
    console.log('An Error', error);
});

request.end();
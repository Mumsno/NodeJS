setTimeout(() => {
    console.log('Two Seconds are up');
}, 2000);

const names = ['Andrew','Jen', 'Jess']
const shortNames = names.filter((name) => name.length <= 4)

const geocode = (address, callback) => {
    const data = {
        latitude: 32,
        longitude: 0
    }

    callback(data)
}

const data = geocode('Gan Yavne', (data) => {
    console.log(data);
    
})


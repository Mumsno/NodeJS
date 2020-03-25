const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('error', undefined)
        callback(undefined, [1, 4, 7])
    }, 3000);
}

doWorkCallback((error, result) => {
    if (error) return console.log(error);
    
    console.log(result);
})
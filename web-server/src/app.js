const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AmiTal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amital'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help me!',
        title: 'Help',
        name: 'AmiTal'
    })
})

app.get('/weather', (req, res) => {
    const { query } = req

    if (query.location === undefined) {
        return res.send({
            error: "No location provided"
        });
    }


    geocode(query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error })
            return;
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
                return;
            }

            res.send({
                forecast: forecastData,
                location: location
            });



        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Amital',
        message: "Article Not Found"
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render("404", {
        title: 'Error',
        name: 'Amital',
        message: "Page not Found"
    })
})

app.listen(3000, () => {
    console.log('Server Started!');
})
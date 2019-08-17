const path = require('path');
const express = require('express')
const hbs = require('hbs')

const app = express()
// stores express application as a variable called: app
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// sets the path for the public directory - serving client-side content
const viewsPath = path.join(__dirname, '../templates/views')
// sets the path we'd like express to use to serve up our handlebars views
const partialsPath = path.join(__dirname, '../templates/partials')
// defines the path to our partials files

// setup handlebars engine and views location
app.set('views', viewsPath)
// serves up content from the path referenced by `viewsPath`
app.set('view engine', 'hbs')
// configures the express view engine to handle .hbs files
hbs.registerPartials(partialsPath)
// configures the partials path for handlebars

// setup static directory server
app.use(express.static(publicDirectoryPath))
// provides server with absolute path to location for public content

app.get('', (req, res) => {
  res.render('index', {
    // res.render() is provided the filename we want handlebars to render.
    title: "Weather App",
    name: "Andrew"
  })
})


app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Andrew"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    name: "Andrew",
    message: "Need some help? Well, you've come to the right place."
  })
})

app.get('/help/*', (req, res) => {
  res.render('help', {
    title: "Help",
    name: "Andrew",
    message: "Need some help? Well, let's get you there.."
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) { // only runs if no query term is provided
    return res.send({
      error: 'You must provide a address'
    })
  }

  const address = req.query.address
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error })
      // returning to ensure application quits if error here.
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
        // returning to ensure application quits if error here.
      }
      res.send({
        forecast,
        location,
        address
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('help', {
    title: "Help",
    name: "Andrew",
    message: "Cannot find the page you're looking for."
  })
})



// // used to handle routes.
// app.get('', (req, res) => {
//   // pass in the route and handle the request and response
//   res.send('')
//   // res.send allows server to send information back to the user.
// })

// app.get('/help', (req, res) => {
//   res.send([{
//     // this raw object get's automatically parsed to JSON in the browser
//     name: 'Andrew',
//     age: 27
//   }, {
//     name: 'Sarah',
//     age: 23
//   }])
// })

// app.get('/about', (req, res) => {
//   res.send('')
// })

app.get('/weather', (req, res) => {
  res.send({
    forecast: "It's a beautiful day!",
    location: 'HereAndNow'
  })
})

// start server and provide it a port to listen to:
app.listen(3000, () => {
  console.log('server is up on port 3000')
})

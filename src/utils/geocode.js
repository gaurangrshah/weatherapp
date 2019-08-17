const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiZ3NoYWgyMDIwIiwiYSI6ImNqeXpnNGNwaTAxY3IzbG1xeTVnMnhtNmQifQ.Y-Tv6N6m7Itr3KmKa1DAVQ&limit=1"'

  request({ url, json: true }, (error, { body }) => {

    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, please try another search', undefined)

    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode

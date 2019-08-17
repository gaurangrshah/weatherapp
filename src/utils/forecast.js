const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0236d6f20ab516d5b624c14c31242425/' + latitude + ',' + longitude

    request({ url, json: true }, (error, response) => {

        const { error: responseError, currently, daily } = response.body

        const { temperature, precipProbability } = currently

        if (error) {
            callback('Unable to find forecast', undefined)
        } else if (responseError) {
            callback('cannot locate forecast', undefined)
        } else {
            // passing in undefined as the first argument because we are setting the data argument this time and not the error for callback()
            callback(undefined, daily.data[0] + 'It is currently ' + temperature + ' degrees out. ' + 'There is a ' + precipProbability + '% chance of rain...')
        }
    })

}



module.exports = forecast

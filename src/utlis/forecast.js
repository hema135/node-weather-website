const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=eb5f37db3ca00cb76d10b04bc565a78a&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect weather service', undefined)
        }
        else if (body.error){
            callback('Unable to fetch location.Try another search', undefined)
        }
        else {
            callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degress out.it feels like  ${body.current.feelslike}  degress out`)
        }
    })

}

module.exports = forecast;
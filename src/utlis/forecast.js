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
            console.log(body)
            callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degress out.it feels like  ${body.current.feelslike}  degress out high. Cloudcover in the sky is ${body.current.cloudcover}. Pressure in temperature is ${body.current.pressure}. Wind direction towards ${body.current.wind_dir}`)
        }
    })

}

module.exports = forecast;
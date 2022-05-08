const axios = require('axios').default;

async function getData(context, city) {
    const request = await axios({
        url: "http://api.openweathermap.org/geo/1.0/direct",
        params : {
            q: city,
            limit: 1,
            appid: "bca9817a7a8b7f90baec13868acec94e",
        }
    });

    const coordinates = {
        lon: request.data[0].lon,
        lat: request.data[0].lat,
    }

    context.setState({ 
        city: {
            name: request.data[0].name,
            country: request.data[0].country,
        } });
    
    getWeather(context, coordinates);
}


async function getWeather(context, cityInfo) {
    const request = await axios({
        url: "https://api.openweathermap.org/data/2.5/weather",
        params : {
            lat: cityInfo.lat,
            lon: cityInfo.lon,
            appid: "bca9817a7a8b7f90baec13868acec94e",
        }
    });

    const response = request.data;

    context.setState({ 
        weather: {
            temp: celcius(response.main.temp),
            temp_max: celcius(response.main.temp_max),
            temp_min: celcius(response.main.temp_min),
            wind_direction: windDirection(response.wind.deg),
            wind_speed: Math.trunc(response.wind.speed),
        },
        info: request.data,
    });
}       

function celcius(kelvin) {
    return Math.trunc(kelvin - 273.15);
}

function windDirection(degrees) {
    switch(true) {
        case ( ( degrees >= 0 && degrees <= 30 ) || (degrees >= 330 && degrees <= 360) ) :
            return 'north';
        case ( degrees > 30 && degrees < 60 ) :
            return 'northeast';
        case ( degrees >= 60 && degrees <= 120) :
            return 'east';
        case ( degrees > 120 && degrees < 150) :
            return 'southeast';
        case ( degrees >= 150 && degrees <= 210) :
            return 'south';
        case ( degrees > 210 && degrees < 240) :
            return 'southwest';
        case ( degrees >= 240 && degrees <= 300) :
            return 'west';
        case ( degrees > 300 && degrees < 330 ) :
            return 'northwest';
        default: 
            return 'No data';
    }
}

export default getData;
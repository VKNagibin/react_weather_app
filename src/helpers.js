const axios = require('axios').default;

async function getData(context, city) {
    if (city) {
        const request = await axios({
            url: "http://api.openweathermap.org/geo/1.0/direct",
            params : {
                q: city,
                limit: 1,
                appid: "bca9817a7a8b7f90baec13868acec94e",
            }
        }).catch( error => error);
    
        if (String(request.data) === '') {
            return (
                context.setState({ isFound: false, city: null, weather: null})
                );
        }
        
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
            weather_pattern: response.weather[0].main,
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

function dateParser(date) {
    let currentDate;
    let time;
    let dateString = date.toString();

    dateString = dateString.split(" ");
    currentDate = dateString.splice(0, 4);
    currentDate = currentDate.join(" ");
    time = dateString.splice(0, 1);
    time = time.join().substring(0, 5);

    return {currentDate, time}
}

function validCity(city) {
    let newString = city;
    newString = newString.replace(/[^A-ZА-Я\s-]/gi, '');
    newString = newString.replace(/\s{2,}/gi, ' ');
    newString = newString.replace(/-{2,}/gi, '-');
    newString.trim();
    return newString;
}

function weatherImagesFunc(arr, weather) {
    let result = arr.find(item => {    
        return item.name === weather.toLowerCase();
    });

    if (result.name && result.name === 'clear') {
        return result.content[isNight()];
    }

    return result.content;
}

function isNight() {
    const hour = new Date().getHours();
    if ( (hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 4)) {
        return 1;
    }
        return 0;
}

function getRandom(rightConstraint = 1, leftConstraint = 0,  isInteger = true) {
    const random = Math.random() * rightConstraint + leftConstraint;
    if ( isInteger ) {
        return Math.trunc(random);
    }

    return random;
}

export {getData, dateParser, weatherImagesFunc, validCity, isNight, getRandom};
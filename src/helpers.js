const axios = require('axios').default;

/*getData is a function which sends the request with city name string and gets lat and lon values*/ 
async function getData(context, city) {
    if (city) {
        let response = await axios({
            url: "http://api.openweathermap.org/geo/1.0/direct",
            params : {
                q: city,
                limit: 1,
                appid: "bca9817a7a8b7f90baec13868acec94e",
            }
        }).catch( error => error);
    
        response = response.data;

        if (String(response) === '') {
            return (
                context.setState({ isFound: false, city: null, weather: null})
                );
        }
        
        const coordinates = {
            lon: response[0].lon,
            lat: response[0].lat,
        }
    
        context.setState({ 
            city: {
                name: response[0].name,
                country: response[0].country,
            } });
        
        getWeather(context, coordinates);
    }
}
/*getData END*/ 




/*getWeather gets lat and lon values and returns weather parameters in component state*/ 
async function getWeather(context, cityInfo) {
    let response = await axios({
        url: "https://api.openweathermap.org/data/2.5/weather",
        params : {
            units: 'metric',
            lat: cityInfo.lat,
            lon: cityInfo.lon,
            appid: "bca9817a7a8b7f90baec13868acec94e",
        }
    });

    response  = response.data;

    context.setState({ 
        weather: {
            temp: response.main.temp,
            temp_max: response.main.temp_max,
            temp_min: response.main.temp_min,
            wind_direction: windDirection(response.wind.deg),
            wind_speed: Math.trunc(response.wind.speed),
            weather_pattern: response.weather[0].main,
        },
        info: response,
    });

    getBackground(context, response.name);
}       
/*getWeather END*/ 


/*getBackground takes valid city name from getWeather function and sets app background */ 
async function getBackground(context, city) {
    let response = await axios({
        url: "https://api.unsplash.com/search/photos/",
        params: {
            query: `${city}`,
            per_page: 30,
            order_by: 'relevant',
            content_filter: 'high',
            client_id: "rD95J_hp9inTtquBQorZ3pBUTlDbXGkgXv5hdxJuN90",
        },
    });

    if (response.data.results.length === 0) {
        return
    }

    let background = response.data.results;
    background = background[getRandom(background.length - 1)].urls.regular;
    context.setState({ background: setBackground(background)});
}
/*getBackground END*/ 




/*Set wind direction */ 
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
/*windDirection END*/ 




/*Returns suitable date and time values*/ 
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
/*dateParser END*/ 




/*Forbids entering useless simbols END*/ 
function validCity(city) {
    let newString = city;
    newString = newString.replace(/[^A-ZА-Я\s-]/gi, '');
    newString = newString.replace(/\s{2,}/gi, ' ');
    newString = newString.replace(/-{2,}/gi, '-');
    newString.trim();
    return newString;
}
/*validCity END*/ 




/*Сhooses image for weather character */ 
function weatherImagesFunc(arr, weather, default_) {
    let result = arr.find(item => {    
        return item.name === weather.toLowerCase();
    });

    if( result === undefined) {
        return default_.content;
    }

    if( result.name === 'clear' ) {
        return result.content[isNight()];
    }

    return result.content;
}
/*weatherImagesFunc END*/ 




/* is it Day or Night now? */ 
function isNight() {
    const hour = new Date().getHours();
    if ( (hour >= 21 && hour <= 23) || (hour >= 0 && hour <= 4)) {
        return 1;
    }
        return 0;
}
/*isNight END*/ 




/*Сustomizable random function */ 
function getRandom(rightConstraint = 1, leftConstraint = 0,  isInteger = true) {
    const random = Math.random() * rightConstraint + leftConstraint;
    if ( isInteger ) {
        return Math.trunc(random);
    }

    return random;
}
/*getRandom END*/ 




/*Returns styles for background*/ 
function setBackground(image) {
    return ({
      'backgroundImage' : `url('${image}')`,
      "backgroundPosition" : "center",
      "backgroundSize" : "cover",
    })   
  }
/*setBackground END*/ 



export {getData, dateParser, weatherImagesFunc, validCity, isNight, getRandom, setBackground};
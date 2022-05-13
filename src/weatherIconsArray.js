import clouds from './assets/images/weather_icons/clouds.svg';
import clear from './assets/images/weather_icons/clear.svg';
import rain from './assets/images/weather_icons/rain.svg';
import snow from './assets/images/weather_icons/snow.svg';
import night from './assets/images/weather_icons/night.svg';
import haze from './assets/images/weather_icons/haze.svg';

let weatherIconsArray = [
    {name : `clouds`, content: clouds},
    {name : `clear`, content: [clear, night]},
    {name : `rain`, content: rain},
    {name : `snow`, content: snow},
    {name: `haze`, content: haze }
];

export default weatherIconsArray;
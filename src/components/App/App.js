import React from 'react';
import "./App.scss";
import {getData, dateParser, weatherImagesFunc, validCity, setBackground} from "../../helpers";
import CityName from '../CityName/CityName';
import DateArea from '../DateArea/DateArea';
import Temperature from '../Temperature/Temperature';
import Wind from '../Wind/Wind';
import WeatherPattern from '../WeatherPattern/WeatherPattern';
import SearchPanel from '../SearchPanel/SearchPanel';
import celsius from '../../assets/images/celcius.svg';
import weatherIconsArray from '../../weatherIconsArray.js';
import defaultBackground from '../../assets/images/defaultBg.jpg';

let timerID = null;

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            input: "" , 
            date: new Date(), 
            isFound: true, 
            background: setBackground(defaultBackground),
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleInput(e) {
        this.setState({ input: validCity(e.target.value) });
    }

    handleSend(e) {
        if ( (e.keyCode === 13 || e.target.type === "submit") && this.state.input ) {
            getData(this, this.state.input);
            this.setState({ input: '', date: new Date() });

            if (timerID) {
                clearInterval(timerID);
            }
           
            timerID = setInterval(() => {
                getData(this, this.state.input);
                this.setState({ date: new Date() });
            }
            , 30000);
        }

        
        
    } 

    render() {
        return (
            <div className="app-wrapper" onKeyDown={ this.handleSend } style={ this.state.background}>

                <SearchPanel value={ this.state.input } 
                             inputHandler={ this.handleInput } 
                             click={ this.handleSend }
                             className={'bg'}
                             />
                             
                { this.state.city ? 
                        <CityName content={ `${this.state.city.name}, ${this.state.city.country }`} className={'medium-font bg'} />
                        :
                        this.state.isFound ? null
                        :
                        <CityName content={ `Sorry, your city not found :(` } className={'medium-font bg'} />
                    
                }


                <section className="main-section bg">

                    { this.state.weather ?     

                    <> 

                    <div className="main-section__flex-item main-section__top-item">
                        <DateArea date={ dateParser(this.state.date).currentDate } 
                                  time={ dateParser(this.state.date).time } />


                        <Temperature  containerClassName={ 'actual-temperature extra-large-font' }
                                      contentClassName={ 'actual-temperature__content' }
                                      imageClassName={ 'celcius-img current-temp-img' }
                                      image={ celsius }
                                      content={ this.state.weather.temp } 
                                      alt={"C*"} />
                                      

                        <WeatherPattern className={['weather-pattern medium-font']} 
                                        pattern={ this.state.weather.weather_pattern }
                                        src={ weatherImagesFunc(weatherIconsArray, this.state.weather.weather_pattern, weatherIconsArray[0])} 
                                        alt={ this.state.weather.weather_pattern } />
                               
                    </div>
                   
                    <div className="main-section__flex-item main-section__bottom-item">
                        <div className="minmax-block">
                            <Temperature    containerClassName={ 'min-temperature small-font' }
                                            contentClassName={ 'min-temperature__content' }
                                            imageClassName={ 'celcius-img min-temp-img' }
                                            image={ celsius }
                                            content={ `Min ${ this.state.weather.temp_min }` } 
                                            alt={"C*"} />

                            <Temperature    containerClassName={ 'small-font' }
                                            imageClassName={ 'celcius-img max-temp-img' }
                                            image={ celsius }
                                            content={ `Max ${ this.state.weather.temp_max }` } 
                                            alt={"C*"} /> 
                        </div>

                       <Wind direction={ this.state.weather.wind_direction }
                             speed={ this.state.weather.wind_speed } />
                        
                    </div>

                    </> : <h2 className='no-city medium-font'>Choose your city</h2> }
                </section>
            </div>
        );
    }
}

export default App;

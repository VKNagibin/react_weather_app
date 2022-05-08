import React from 'react';
import "./App.scss";
import getData from "../helpers";
import SearchPanel from './SearchPanel';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: "" };

        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleInput(e) {
        this.setState({ input: e.target.value });
    }

    handleClick() {
        getData(this, this.state.input);
        this.setState({ input: '' });
    } 

    render() {
        return (
            <div className="app-wrapper">
                <SearchPanel value={this.state.input} inputHandler={this.handleInput} click={this.handleClick}/>
                <section className="selected-city">
                    {this.state.city ? `${this.state.city.name}, ${this.state.city.country}` : null}
                </section>

                {/*App main section*/}

                <section className="main-section">

                    <div className="date-area">
                        <h3 className="date-string">
                            Thu Oct 20, 2022
                        </h3>
                        <h3 className="time-string">
                            13:00
                        </h3>
                    </div>

                    <div className="weather-indicators">
                        <h3 className="actual-temperature">19C</h3>
                        <div className="minmax">
                            <h4 className="min-temperature">8C</h4>
                            <h4 className="max-temperature">25C</h4>
                        </div>
                        <div className="wind">
                            <h4 className="wind-direction">west</h4>
                            <h4 className="wind-speed">1 km/h</h4>
                        </div>
                    </div>

                    <div className="weather-pattern">
                        <img  className="weather-pattern__image" src="" alt="" />
                        <h4>Cloudy</h4>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;

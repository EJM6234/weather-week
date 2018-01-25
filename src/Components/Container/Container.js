import React, {Component} from 'react';
import FiveDayForecast from './FiveDayForecast/FiveDayForecast';
import CurrentWeather from './CurrentWeather/CurrentWeather';

class Container extends Component {
  render() {
    return (
      <div id="container">
        <h1 className="text-center">WeatherWeek</h1>
        <CurrentWeather currentWeather={this.props.currentWeather} />
        <FiveDayForecast weeklyWeatherByDay={this.props.weeklyWeatherByDay} />
      </div>
    )
  }
}

export default Container;

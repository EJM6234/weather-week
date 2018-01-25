import React, {Component} from 'react';
import Day from './Day/Day';

class FiveDayForecast extends Component {
  render() {
    console.log("this.props in Week.js render", this.props.weeklyWeatherByDay.Friday)
    return (
      <div>
        {
          this.props.weeklyWeatherByDay.map(day => <Day day={day} />)
        }
      </div>
    )
  }
}

export default FiveDayForecast;

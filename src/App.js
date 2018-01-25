import React, { Component } from 'react';
import Container from './Components/Container/Container';
import axios from 'axios';
import config from './config';

class App extends Component {
  state = {
    currentWeather: [],
    weeklyWeatherByDay: []
  }

  componentDidMount() {
    //Get user's location then call OpenWeather API for current weather and weekly forecast
    axios.get('http://ip-api.com/json')
      .then((res) => {
        this.getCurrentWeather(res.data.zip);
        this.getWeeklyWeatherByDay(res.data.city);
      })
  }

  getCurrentWeather(zipCode) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&APPID=${config.openWeather}`)
      .then((res) => {
        this.setState({ currentWeather: res.data })
      })
      .catch(err => console.error(err));
  }

  getWeeklyWeatherByDay(city) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},us&APPID=${config.openWeather}`)
      .then((res) => {
        //Adds day of the week to each three-hour weather obj in response array
        let addDayOfWeek = res.data.list.map((threeHr) => {
          let day = new Date(threeHr.dt_txt).getDay();
          day === 0 ? day = "Sunday" : day === 1 ? day = "Monday" : day === 2 ? day = "Tuesday" : day === 3 ? day = "Wednesday" : day === 4 ? day = "Thursday" : day === 5 ? day = "Friday" : day === 6 ? day = "Saturday" : day = "Unknown"
          threeHr.dayOfWeek = day;
          return threeHr;
        })
        //Creates new arrays grouped by day of the week
        let weeklyWeatherByDay = addDayOfWeek.reduce((acc, cur) => {
          acc[cur.dayOfWeek] = acc[cur.dayOfWeek] || [];
          acc[cur.dayOfWeek].push(cur);
          return acc;
        }, []);
        this.setState({ weeklyWeatherByDay: weeklyWeatherByDay });
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log("App.js has rendered");
    return (
      <div className="App">
        <Container
          weeklyWeatherByDay={this.state.weeklyWeatherByDay || undefined}
          currentWeather={this.state.currentWeather || undefined}
        />
      </div>
    )
  }
}

export default App;

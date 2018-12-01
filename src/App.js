import React, { Component } from 'react';
import Info from "../src/components/info"
import Form from "./components/form"
import Weather from "./components/weather"
import './App.css';


const key = "50ee40694a4750bff8b14230fec6b8b5";
class App extends Component {
  state = {
    temp: undefined,
    pressure: undefined,
    sunset: undefined,
    city: undefined,
    countryCode: undefined,
    error: undefined,
  }
  getWeather = async (e) => {
    const city = e.target.elements.city.value;
    e.preventDefault();
    if(city){
      const apiUrl = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
      const data = await apiUrl.json();
        
      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      let sunsetDate = date.getHours()+":"+ date.getMinutes()+ ":"+ date.getSeconds();
      
      this.setState({
        temp: data.main.temp,
        pressure: data.main.pressure,
        sunset: sunsetDate,
        city: data.name,
        countryCode: data.sys.country,
        error: undefined,
      });
    }
    else{
      this.setState({
        temp: undefined,
        pressure: undefined,
        sunset: undefined,
        city: undefined,
        countryCode: undefined,
        error: "Enter the city!!",
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Info/>
        <Form onClick = {this.getWeather}/>
        <Weather
          temp = {this.state.temp}
          city = {this.state.city}
          country = {this.state.countryCode}
          sunset = {this.state.sunset}
          pressure = {this.state.pressure}
          error = {this.state.error}
        />
      </div>
    );
  }
}

export default App;

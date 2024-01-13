import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import search from '../asset/searchicon.svg';
import cross from '../asset/crossicon.svg';
import '../Components/Card.css';

export default function Card(props) {
  const { cardId, rmvCard } = props;
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const handelRmvClick = () => {
    rmvCard(cardId);
  }

  const callAPI = async () => {
    const city = inputRef.current.value;
    const apiKey = "f514f67a8a492f7cfd5f741959c17916";

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather: ", error);
    }
  };


  const getFormattedTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    return formattedTime;
  };
  return (
    <div>
      <div className='Card' >
        <div className='placeholder'>
          <input placeholder='Enter the city name' ref={inputRef} autoComplete='given-name' />
          <button id='searchbutton' onClick={callAPI}><img src={search} alt='searchicon' /></button>
          <button onClick={handelRmvClick}><img src={cross} alt='closeicon' /></button>
        </div>
        {weatherData ? (
          <div className='data'>
            <h1>Weather in {weatherData.name}</h1>
            <h1>{weatherData.main.temp}&deg;C</h1>
            <div className='logo'>
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} />
              <p>{weatherData.weather[0].description}</p>
            </div>
            <div className='info'>
              <p>sunrise: {getFormattedTime(weatherData.sys.sunrise)}</p>
              <p>sunset: {getFormattedTime(weatherData.sys.sunset)}</p>
            </div>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind speed: {weatherData.wind.speed}km/h</p>
          </div>
        ) : (
          <p>Enter the location and press the search button. . . .☁️</p>
        )}
      </div>
    </div>
  );
}

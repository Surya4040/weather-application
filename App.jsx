import React, { useState } from 'react';
import './App.css';
import humidityIcon from "./assets/4148460.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.jpg";
import searchIcon from "./assets/954591.png";

const WeatherDetails = ({ icon, temp, location, country, lat, log, humidityValue, windValue }) => {
  return (
    <div className='weather-details'>
      <div className='image'>
        <img src={icon} alt="no image" />
      </div>
      <div className='temp'>{temp}°C</div>
      <div className='location'>{location}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt="" className='icon' />
          <div className='data'>
            <div className='humidity-percent'>
              {humidityValue}%
            </div>
            <div className='text'>HUMIDITY</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt="" className='icon' />
          <div className='data'>
            <div className='humidity-percent'>
              {windValue} km/h
            </div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
      <p className='copywrite'>
        Designed by <span>SURYA</span>
      </p>
    </div>
  );
}

function App() {
  const [text, setText] = useState("");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const apiKey = "24e7f6783cfd0ac4a51bcef1cd6dfeda";

  const search = async () => {
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setIcon(snowIcon);
      setTemp(data.main.temp);
      setLocation(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setCityNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className={`container ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className='input-container'>
        <input
          type="text"
          onChange={handleCity}
          className='cityinput'
          value={text}
          placeholder='search city'
          onKeyDown={handleKeyDown}
        />
        <div className='normal'>
          <img
            src={searchIcon}
            alt=""
            onClick={search}
          />
        </div>
      </div>
      <WeatherDetails
        icon={icon}
        temp={temp}
        location={location}
        country={country}
        lat={lat}
        log={log}
        humidityValue={humidity}
        windValue={wind}
      />
    </div>
  );
}

export default App;

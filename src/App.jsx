import { useState } from "react";
import "./App.css";
import axios from "axios";

const key = "Your API Key";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [err, setErr] = useState(false);
  const getWeather = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    if (res.data.cod === "404") {
      setErr(true);
      setWeather(null);
      return;
    }
    setWeather(res.data);
    setErr(false);
  };
  return (
    <>
      <div className={weather ? "container weather" : "container"}>
        {!weather && (
          <div className="search-box">
            <i className="fa-solid fa-location-dot"></i>
            <input
              type="text"
              placeholder="Enter your location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className="fa-solid fa-magnifying-glass"
              onClick={getWeather}
            ></button>
          </div>
        )}
        {!weather && err && (
          <div className="not-found fadeIn">
            <img src="images/404.png" />
            <p>Oops! Invalid location :/</p>
          </div>
        )}
        {weather && (
          <>
            <div className="weather-box fadeIn">
              <img
                src={
                  weather.weather[0].main === "Clear"
                    ? "/images/clear.png"
                    : weather.weather[0].main === "Rain"
                    ? "/images/rain.png"
                    : weather.weather[0].main === "Haze"
                    ? "/images/haze.png"
                    : weather.weather[0].main === "Clouds"
                    ? "/images/cloud.png"
                    : weather.weather[0].main === "Snow"
                    ? "/images/snow.png"
                    : "/images/mist.png"
                }
              />
              <p className="temperature">
                {weather.main.temp}
                <span>°C</span>
              </p>
              <p className="description">{weather.weather[0].description}</p>
            </div>

            <div className="weather-details fadeIn">
              <div className="humidity">
                <i className="fa-solid fa-water"></i>
                <div className="text">
                  <span>{weather.main.humidity}</span>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind">
                <i className="fa-solid fa-wind"></i>
                <div className="text">
                  <span>{weather.wind.speed + "Km/h"}</span>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

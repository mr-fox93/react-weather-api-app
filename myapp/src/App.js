import React, { useState, useEffect } from "react";
import "./App.css";

const KEY = "0ee0370fa3e7cf6b96a74c88d350ddb7";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) {
      return;
    }

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${KEY}`;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") {
          setError(data.message);
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError("");
        }
      });
  }, [city]);

  const emoji = {
    Clouds: "☁️",
    Clear: "☀️",
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      {error ? (
        <div>{error}</div>
      ) : weatherData ? (
        <div>
          <p>
            Weather:{" "}
            {weatherData.weather[0].main === "Clouds"
              ? emoji["Clouds"]
              : emoji["Clear"]}
          </p>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C 🌡️ </p>
          <p> Sensed Temperature: {weatherData.main.feels_like}°C 🌡️ </p>
          <p>Wind Speed: {weatherData.wind.speed}m/s 🌬️</p>
          <p>Pressure: {weatherData.main.pressure}hPa </p>
        </div>
      ) : (
        <div>No weather data available</div>
      )}
    </div>
  );
};

export default App;

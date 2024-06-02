import React, { useState, useEffect } from 'react';
import './styles.css';

const WeatherApp = () => {
    const [cityName, setCityName] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const apiKey = "922798f9a0ef4c40ac1203645240206";

    const handleSearch = () => {
        if (cityName.trim() === '') return;

        setLoading(true);
    };

    useEffect(() => {
        if (!loading) return;

        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                return response.json();
            })
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [loading, cityName, apiKey]);

    return (
        <div className="container">
            <input 
                type="text" 
                value={cityName} 
                onChange={(e) => setCityName(e.target.value)} 
                placeholder="Enter city name" 
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p id="loadingMsg">Loading data...</p>}
            <div className="weather-cards">
                {weatherData && (
                    <div className="weather-card">
                        <h3>Temperature</h3>
                        <p>{weatherData.current.temp_c}°C</p>
                    </div>
                )}
                {weatherData && (
                    <div className="weather-card">
                        <h3>Humidity</h3>
                        <p>{weatherData.current.humidity}%</p>
                    </div>
                )}
                {weatherData && (
                    <div className="weather-card">
                        <h3>Condition</h3>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                )}
                {weatherData && (
                    <div className="weather-card">
                        <h3>Wind Speed</h3>
                        <p>{weatherData.current.wind_kph} km/h</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;

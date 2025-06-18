import { useState } from "react";

export default function SearchWeather() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearchButton = () => {
    setSearching(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setResult(data));
  };

  const search = () => {
    if (!result) return null;

    if (result.cod === "400")
      return (
        <p className="result">Type a city name to see its current weather</p>
      );

    if (result.cod === "404") return <p className="result">City not found</p>;

    return (
      <div className="result">
        <h3>Weather in {result.name}</h3>
        <p>Temp: {result.main.temp} °C</p>
        <p>Description: {result.weather[0].description}</p>
        <p>Wind: {result.wind.speed} m/s</p>
      </div>
    );
  };

  return (
    <div>
      <div className={`input-wrapper ${searching ? "top" : ""}`}>
        <input
          className="input"
          type="text"
          placeholder="Type a city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchButton}>
          Search
        </button>
      </div>
      {search()}
    </div>
  );
}

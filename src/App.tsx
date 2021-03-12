import React, { useEffect, useState } from "react";
import locationFinder from "./services/locationFinder";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { changeLocation, throwError } from "./actions/";
import { useDispatch } from "react-redux";
import styles from "./App.module.css";

// importing components
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherChart from "./components/WeatherChart/WeatherChart";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import CurrentTemp from "./components/CurrentTemp/CurrentTemp";
import PressureAndHumidity from "./components/PressureAndHumidity/PressureAndHumidity";
import Sundial from "./components/Sundial/Sundial";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loading from "./components/Loading/Loading";

const App = () => {
  const dispatch = useDispatch();
  const pos = useSelector((state: any) => state.locationRed);
  const err = useSelector((state: any) => state.errorRed);
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    locationFinder
      .then((data) => {
        dispatch(changeLocation({ lon: data.lon, lat: data.lat }));
      })
      .catch((err) => {
        setWeatherData(undefined);
        dispatch(throwError(err));
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.lat}&lon=${pos.lon}&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .catch((err) => {
        setWeatherData(undefined);
        dispatch(throwError(err));
      })
      .then((res) => {
        setWeatherData(res);
      });
  }, [pos]);

  return (
    <Container>
      <SearchBar />
      {err ? (
        <ErrorMessage />
      ) : weatherData ? (
        <React.Fragment>
          <DailyForecast weatherData={weatherData} />
          <div className={styles.wrapper}>
            <CurrentTemp weatherData={weatherData} />
            <WeatherChart weatherData={weatherData} />
            <PressureAndHumidity weatherData={weatherData} />
            <Sundial weatherData={weatherData} />
          </div>
        </React.Fragment>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default App;

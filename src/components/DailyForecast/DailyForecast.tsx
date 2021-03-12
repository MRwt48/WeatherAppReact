import React from "react";
import styles from "./DailyForecast.module.css";

const DailyForecast = ({ weatherData }: { weatherData: any }) => {
  let arr = weatherData.daily.map((day: any) => {
    let date = new Date(day.dt * 1000);
    if (date.getDate() === 11) return null;
    return (
      <div key={day.dt} className={styles.dailyForecastBlock}>
        <div className={styles.dailyForecastDate}>
          {`${date.toDateString()}`}
        </div>
        <div className={styles.dailyForecastTemp}>
          {`${(day.temp.max - 273.15).toFixed(0)}\u00B0`}C
        </div>
        <div className={styles.dailyForecastDay}>{day.weather[0].main}</div>
      </div>
    );
  });

  return <div className={styles.dailyForecastWrapper}>{arr}</div>;
};

export default DailyForecast;

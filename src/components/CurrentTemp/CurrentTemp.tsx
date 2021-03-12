import React from "react";

import styles from "./CurrentTemp.module.css";

const CurrentTemp = ({ weatherData }: { weatherData: any }) => {
  return (
    <div className={styles.currentTempWrapper}>
      <div className={styles.currentTempTemp}>{`${(
        weatherData.current.temp - 273.15
      ).toFixed(0)}\u00B0C`}</div>
      <div className={styles.currentTempIcon}>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
          alt={weatherData.current.weather[0].main}
        />
      </div>
    </div>
  );
};

export default CurrentTemp;

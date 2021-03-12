import React from "react";
import styles from "./PressureAndHumidity.module.css";

const PressureAndHumidity = ({ weatherData }: { weatherData: any }) => {
  return (
    <div className={styles.pAndHWrapper}>
      <div className={styles.pItem}>
        <p>Pressure</p>
        <span>{`${weatherData.current.pressure} hpa`}</span>
      </div>
      <div className={styles.hItem}>
        <p>Humidity</p>
        <span>{`${weatherData.current.humidity} %`}</span>
      </div>
    </div>
  );
};

export default PressureAndHumidity;

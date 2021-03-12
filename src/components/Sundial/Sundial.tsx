import React from "react";
import styles from "./Sundial.module.css";

const Sundial = ({ weatherData }: { weatherData: any }) => {
  let sunriseDate = new Date(weatherData.current.sunrise * 1000);
  let sunsetDate = new Date(weatherData.current.sunset * 1000);
  let sunriseHours = sunriseDate.getHours();
  let sunsetHours = sunsetDate.getHours();
  let current = new Date().getHours();
  let left = 345 * ((current - sunriseHours) / (sunsetHours - sunriseHours));
  let offset = ((current - sunriseHours) / (sunsetHours - sunriseHours)) * 100;

  let sunriseTime;

  if (sunriseHours === 0)
    sunriseTime = `12:${
      sunriseDate.getMinutes() > 9
        ? sunriseDate.getMinutes()
        : "0" + sunriseDate.getMinutes()
    } am`;
  else if (sunriseHours === 12)
    sunriseTime = `12:${
      sunriseDate.getMinutes() > 9
        ? sunriseDate.getMinutes()
        : "0" + sunriseDate.getMinutes()
    } pm`;
  else if (sunriseHours > 12)
    sunriseTime = `${sunriseHours - 12}:${
      sunriseDate.getMinutes() > 9
        ? sunriseDate.getMinutes()
        : "0" + sunriseDate.getMinutes()
    } pm`;
  else
    sunriseTime = `${sunriseHours}:${
      sunriseDate.getMinutes() > 9
        ? sunriseDate.getMinutes()
        : "0" + sunriseDate.getMinutes()
    } am`;

  let sunsetTime;

  if (sunsetHours === 0)
    sunsetTime = `12:${
      sunsetDate.getMinutes() > 9
        ? sunsetDate.getMinutes()
        : "0" + sunsetDate.getMinutes()
    } am`;
  else if (sunsetHours === 12)
    sunsetTime = `12:${
      sunsetDate.getMinutes() > 9
        ? sunsetDate.getMinutes()
        : "0" + sunsetDate.getMinutes()
    } pm`;
  else if (sunsetHours > 12)
    sunsetTime = `${sunsetHours - 12}:${
      sunsetDate.getMinutes() > 9
        ? sunsetDate.getMinutes()
        : "0" + sunsetDate.getMinutes()
    } pm`;
  else
    sunsetTime = `${sunsetHours}:${
      sunsetDate.getMinutes() > 9
        ? sunsetDate.getMinutes()
        : "0" + sunsetDate.getMinutes()
    } am`;

  let colorPass;
  let colorBeforeAfter;
  let colorSunPos;
  let colorOutLine;
  if (current < sunriseHours || current > sunsetHours) {
    colorOutLine = {
      background: "gray",
    };
    colorSunPos = {
      backgroundImage:
        "linear-gradient(180deg,rgb(255, 255, 255),rgb(117, 117, 117))",
    };
    colorBeforeAfter = {
      backgroundImage:
        "linear-gradient(0deg,rgb(255, 222, 180),rgb(255, 246, 208))",
    };
    colorPass = {
      backgroundImage:
        "linear-gradient(180deg,rgb(58, 58, 58),rgb(117, 117, 117))",
      borderRight: "1px solid gray",
    };
    if (current >= 0 && current < sunsetHours) current += 24;
    left =
      345 * (Math.abs(sunsetHours - current) / (sunsetHours - sunriseHours));
    offset =
      (Math.abs(sunsetHours - current) / (sunsetHours - sunriseHours)) * 100;
  }

  return (
    <div className={styles.justForFlex}>
      <div className={styles.sundialWrapper}>
        <div
          className={styles.sunTimes}
          style={{
            flexDirection:
              current < sunriseHours || current > sunsetHours
                ? "row-reverse"
                : "row",
          }}
        >
          <div className={styles.sunrise}>
            <p>Sunrise</p>
            <span>{sunriseTime}</span>
          </div>
          <div className={styles.sunset}>
            <p>Sunset</p>
            <span>{sunsetTime}</span>
          </div>
        </div>
        <div className={styles.mainWrapper}>
          <div className={styles.beforeWrapper}>
            <div className={styles.before} style={colorBeforeAfter}></div>
          </div>
          <div className={styles.sundial}>
            <div
              className={styles.sunPos}
              style={{ offsetDistance: `${offset}%`, ...colorSunPos }}
            ></div>
            <div className={styles.justForBorder} style={colorOutLine}>
              <div className={styles.dial}>
                <div
                  className={styles.passed}
                  style={{ left: `${-522 + left}px`, ...colorPass }}
                ></div>
              </div>
            </div>
          </div>
          <div className={styles.afterWrapper}>
            <div className={styles.after} style={colorBeforeAfter}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sundial;

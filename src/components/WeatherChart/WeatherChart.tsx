import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./WeatherChart.module.css";

const WeatherChart = ({ weatherData }: { weatherData: any }) => {
  let hourly = [];
  for (let i = 0; i < 24; i++) {
    hourly.push(weatherData.hourly[i]);
  }
  let labels = hourly.map((tempData) => {
    let hours = new Date(tempData.dt * 1000).getHours();
    let res;
    if (hours === 0) res = "12 am";
    else if (hours === 12) res = "12 pm";
    else if (hours > 12) res = `${hours - 12} pm`;
    else res = `${hours} am`;
    return [`${(tempData.temp - 273.15).toFixed(2)}\u00B0`, res];
  });
  let data = hourly.map((tempData) => (tempData.temp - 273.15).toFixed(2));

  return (
    <div className={styles.weatherChartWrapper}>
      <div className={styles.weatherChartAreaWrapper}>
        <Line
          height={200}
          width={1500}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Temp",
                data: data,
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: "rgb(1, 162, 255)",
                pointRadius: 7,
                pointHoverRadius: 7,
                pointBackgroundColor: "rgb(255,255,255)",
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: false,
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    maxRotation: 0,
                    min: -1,
                    max: 8,
                    stepSize: 10,
                    fixedStepSize: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default WeatherChart;

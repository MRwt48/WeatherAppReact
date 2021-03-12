import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import locationIcon from "../../assets/images/locationIcon.svg";
import { changeLocation, throwError } from "../../actions";
import { useDispatch } from "react-redux";
import locationFinder from "../../services/locationFinder";

const cityList = require("../../assets/data/city.list.json");

const SearchBar = () => {
  const dispatch = useDispatch();
  const [timer, setTimer]: [timer: any, setTimer: any] = useState(null);
  const [value, setValue] = useState("");
  const [temps, setTemps]: [
    temps: {
      temp: number;
      weather: any;
      icon: any;
    }[],
    setTemps: any
  ] = useState([
    {
      temp: 0,
      weather: "",
      icon: "",
    },
  ]);
  const [cities, setCities] = useState([
    {
      id: 0,
      name: "",
      country: "",
      temp: 0,
    },
  ]);

  // #############################################
  //
  // Handling when the input field value is changed
  //
  // ##############################################
  const cityHandler = ({ target }: { target: any }) => {
    setTemps([
      {
        temp: 0,
        weather: "",
        icon: "",
      },
    ]);

    clearTimeout(timer);

    setValue(target.value);
    const startWith = target.value.trim();

    // if the search value is empty
    // set empty object
    if (startWith === "") {
      setTemps([
        {
          temp: 0,
          weather: "",
          icon: "",
        },
      ]);
      setCities([{ id: 0, name: "", country: "", temp: 0 }]);
      return;
    }

    let regex = new RegExp("^" + startWith + "(.)*", "i");

    // filtering the first 5 matches
    function* filter(cityList: any, condition: any, maxSize: any) {
      if (!maxSize || maxSize > cityList.length) {
        maxSize = cityList.length;
      }
      let count = 0;
      let i = 0;
      while (count < maxSize && i < cityList.length) {
        if (condition(cityList[i])) {
          yield cityList[i];
          count++;
        }
        i++;
      }
    }

    let arr = Array.from(
      filter(cityList, (city: any) => city.name.match(regex), 5)
    );

    if (arr.length === 0) {
      setTemps([
        {
          temp: 0,
          weather: "",
          icon: "",
        },
      ]);
      setCities([{ id: 0, name: "", country: "", temp: 0 }]);
      return;
    } else {
      setCities(arr);
    }

    setTimer(
      setTimeout(async () => {
        let newArr = await Promise.all(
          arr.map(async (city) => {
            return fetch(
              `http://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${process.env.REACT_APP_API_KEY}`
            )
              .then((data) => data.json())
              .catch((err) => {
                throw new Error(err);
              })
              .then((data) => {
                if (data)
                  return {
                    temp: data.main.temp - 273.15,
                    weather: data.weather[0].main,
                    icon: data.weather[0].icon,
                  };
                else return null;
              });
          })
        ).catch((err) => {
          dispatch(throwError(err));
          return [];
        });

        if (newArr.length !== 0) {
          setTemps(newArr);
        } else {
          setTemps([
            {
              temp: 0,
              weather: "",
              icon: "",
            },
          ]);
        }
      }, 2000)
    );
  };

  const suggestionsClickHandler = (city: any) => {
    dispatch(changeLocation(city.coord));
    dispatch(throwError(null));
    setCities([{ id: 0, name: "", country: "", temp: 0 }]);
    setTemps([
      {
        temp: 0,
        weather: "",
        icon: "",
      },
    ]);
    setValue(`${city.name}, ${city.country}`);
  };

  const currentLocationHandler = () => {
    setValue("");
    dispatch(throwError(null));
    locationFinder
      .then((data) => {
        dispatch(changeLocation({ lon: data.lon, lat: data.lat }));
      })
      .catch((err) => {
        dispatch(throwError(err));
      });
  };

  return (
    <div className={styles.searchBarWrapper}>
      <img
        className={styles.locationIcon}
        src={locationIcon}
        alt="loaction icon"
        onClick={currentLocationHandler}
      />

      <input
        className={styles.searchBar}
        type="search"
        onChange={cityHandler}
        value={value}
      />
      {cities[0].name && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsList}>
            {cities.map((city, ind) => (
              <button
                onClick={() => suggestionsClickHandler(city)}
                className={styles.suggestionsItem}
                key={city.id}
              >
                {`${city.name}, ${city.country}`}

                {temps[0].temp !== 0 && (
                  <span className={styles.showTemp}>
                    <span className={styles.tempAndDay}>
                      <p>{`${temps[ind].temp.toFixed(2)}`}</p>
                      <span>{temps[ind].weather}</span>
                    </span>
                    <span className={styles.icon}>
                      <img
                        src={`http://openweathermap.org/img/wn/${temps[ind].icon}.png`}
                        alt={temps[ind].weather}
                      />
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

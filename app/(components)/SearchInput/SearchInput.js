"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { get5DaysForecast, getCityData } from "../../redux/slices/weatherSlice";

export default function SearchInput(props) {
  const {
    citySearchLoading,
    citySearchData,
    forecastLoading,
    forecastData,
    forecastError,
  } = useSelector((state) => state.weather);
  // const searchQuery = useSelector(selectQuery);

  // dispatch
  const dispatch = useDispatch();

  // city state
  const [city, setCity] = useState();

  // unit state
  const [unit, setUnit] = useState("metric"); // metric = C and imperial = F

  // toggle unit
  const toggleUnit = () => {
    setLoadings(true);
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const fetchData = () => {
    dispatch(
      getCityData({
        city,
        unit,
      })
    ).then((res) => {
      if (!res.payload.error) {
        dispatch(
          get5DaysForecast({
            lat: res.payload.data.coord.lat,
            lon: res.payload.data.coord.lon,
            unit,
          })
        );
      }
    });
  };

  // initial render
  // useEffect(() => {
  //   fetchData();
  // }, [unit]);

  const [loadings, setLoadings] = useState(true);
  // check if any of redux loading state is still true
  const allLoadings = [citySearchLoading, forecastLoading];
  useEffect(() => {
    const isAnyChildLoading = allLoadings.some((state) => state);
    setLoadings(isAnyChildLoading);
  }, [allLoadings]);

  const router = useRouter();

  const handleCitySearch = (e) => {
    e.preventDefault();
    setLoadings(true);
    fetchData();
    router.push("/dash");
  };

  const handleSetCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleCitySearch}
      className={`${props.searchStyle} 
      w-[311px] sm:w-[504px] h-14 pr-5 bg-neutral-800 rounded-lg justify-center items-center inline-flex 
      `}
    >
      <input
        onChange={handleSetCity}
        required
        value={city}
        placeholder={!city ? "Search Location" : city}
        readOnly={loadings}
        type="text"
        name="city"
        class={`w-[311px] sm:w-[504px] px-5 bg-neutral-800 rounded-lg justify-center items-center inline-flex outline-none text-[#7F7F98]`}
      />
      {loadings ? (
        <RotatingLines
          visible={true}
          height="40"
          width="40"
          color="grey"
          strokeWidth="2"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : null}
    </form>
  );
}

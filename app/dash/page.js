"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/svgs/Logo.svg";
import Image from "next/image";
import Detail from "../(components)/WeatherDetails/WeatherDetails";
import FiveDaysUpdate from "../(components)/FiveDayforecast/FiveDayforecast";
import Current from "../(components)/Current/Current";

import { useSelector } from "react-redux";
import Link from "next/link";
import SearchInput from "../(components)/SearchInput/SearchInput";

export default function Page() {
  const {
    citySearchLoading,
    citySearchData,
    forecastLoading,
    forecastData,
    forecastError,
  } = useSelector((state) => state.weather);

  console.log("fetchCity", citySearchData);
  // main loadings state
  const [loadings, setLoadings] = useState(true);

  // check if any of redux loading state is still true
  const allLoadings = [citySearchLoading, forecastLoading];
  useEffect(() => {
    const isAnyChildLoading = allLoadings.some((state) => state);
    setLoadings(isAnyChildLoading);
  }, [allLoadings]);

  // function to filter forecast data based on the time of the first object
  const filterForecastByFirstObjTime = (forecastData) => {
    if (!forecastData) {
      return [];
    }

    const firstObjTime = forecastData[0].dt_txt.split(" ")[1];
    return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
  };

  const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);

  return (
    <div className="max-w-[1366px] mx-auto bg-_dark p-2 sm:p-6 lg:flex gap-4">
      <div className="bg-_lowDark p-4 w-full xl:w-[664px] rounded-xl mb-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Link
              href="/"
              class="w-14 h-14 p-2 bg-neutral-800 rounded-lg justify-center items-center inline-flex"
            >
              <div class="grow shrink basis-0 self-stretch px-[5px] pt-2.5 pb-[10.22px] opacity-80 justify-center items-center inline-flex">
                <Image src={logo} />
              </div>
            </Link>
            <SearchInput />
          </div>
          {loadings ? null : (
            <>
              {citySearchData && citySearchData.error ? (
                <div>{citySearchData.error}</div>
              ) : (
                <>
                  {forecastError ? (
                    <div>{forecastError}</div>
                  ) : (
                    <>
                      {citySearchData && citySearchData.data ? (
                        <>
                          <Current citySearchData={citySearchData} />
                        </>
                      ) : (
                        <div className="error-msg">No Data Found</div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        <>
          {citySearchData && citySearchData.data ? (
            <>
              <Detail citySearchData={citySearchData} />
            </>
          ) : null}
        </>
        {filteredForecast.length > 0 ? (
          <FiveDaysUpdate filteredForecast={filteredForecast} />
        ) : null}
      </div>
    </div>
  );
}

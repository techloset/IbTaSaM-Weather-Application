import Image from "next/image";
import React from "react";
import cloud from "@/public/svgs/Vector.svg";
import SearchInput from "./(components)/SearchInput/SearchInput";

export default function Page() {
  return (
    <div className="bg-Img flex flex-col items-center">
      <div className="text-slate-300 text-[21.65px] font-700 leading-[140%] flex items-center mt-[50px]">
        <Image src={cloud} className="mr-1" /> Weather App
      </div>
      <div class="mt-[160px] text-[20px] sm:text-[32px] font-bold leading-[140%]">
        <span className="text-white">Welcome to </span>
        <span className="text-blue-300">Weather App</span>
      </div>
      <div class="text-slate-300 text-[14px] sm:text-[20px] font-normal leading-[140%] mt-[8px]">
        Choose a location to see weather forecast
        Choose a location to see weather forecast
      </div>

      <SearchInput searchStyle="mt-[32px] sm:mt-[56px]" />
    </div>
  );
}

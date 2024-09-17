import React from "react";
import Appbar from "./ui/Appbar";
import Prices from "./ui/Prices";
import { RateProvider } from "../providers/RateProvider";
import AveragePrice from "./ui/AveragePrice";

const Hompage = () => {
  return (
    <RateProvider>
      <div className="w-full h-[100dvh] bg-[#191D28] flex flex-col text-white">
        <Appbar />
        <AveragePrice />
        <Prices />
      </div>
    </RateProvider>
  );
};

export default Hompage;

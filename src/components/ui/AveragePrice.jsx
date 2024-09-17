import axios from "axios";
import React from "react";
import { useRates } from "../../providers/RateProvider";

// https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=btcinr

const AveragePrice = () => {
  const { avgPrice, selectedCrypto } = useRates();

  const formatedAvgPrice = () => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(avgPrice);
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center gap-4 my-10 font-baloo">
      <div className="text-[#77797F] font-baloo">Best Price to Trade</div>
      <div className="text-3xl lg:text-5xl font-semibold">
        {avgPrice && formatedAvgPrice()}
      </div>
      <div className="text-sm text-[#77797F]">{`Average ${selectedCrypto}/INR net price including commission`}</div>
    </div>
  );
};

export default AveragePrice;

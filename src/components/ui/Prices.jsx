import React from "react";
import axios from "axios";
import { useRates } from "../../providers/RateProvider";

const Prices = () => {
  const { rates, selectedCrypto } = useRates();

  const exchangeRates =
    rates &&
    rates
      .filter(
        (item) =>
          item.name.substring(0, item.name.indexOf("/")) !== selectedCrypto
      )
      .map((item, index) => {
        return (
          <ExchangeInfo
            index={index + 1}
            key={index}
            platform={item.name.substring(0, item.name.indexOf("/"))}
            buy={item.buy}
            ltp={item.last}
            sell={item.sell}
          />
        );
      });

  return (
    <div className="w-full gap-2">
      <div className="flex justify-between items-center gap-2 lg:grid lg:grid-cols-6 lg:gap-2 lg:place-items-center text-[#74777D] font-semibold text-[10px] lg:text-xl p-4 mx-4">
        <p className="place-items-start">#</p>
        <p>Platform</p>
        <p>Last Traded Price</p>
        <p>Buy / Sell Price</p>
        <p>Difference</p>
        <p>Saving</p>
      </div>

      <div>{rates ? exchangeRates : <p>Loading.....</p>}</div>
    </div>
  );
};

const ExchangeInfo = ({ index, platform, ltp, buy, sell }) => {
  const { avgPrice, selectedCrypto } = useRates();

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(number);
  };

  const formattedPrices = React.useMemo(() => {
    const formatLtp = formatNumber(ltp);
    const formatBuy = formatNumber(buy);
    const formatSell = formatNumber(sell);

    const diff = ltp - avgPrice;
    const formatSaving =
      diff < 0 ? formatNumber(-1 * diff) : formatNumber(diff);
    const percentage = (diff / avgPrice) * 100;

    return { formatLtp, formatBuy, formatSell, formatSaving, percentage, diff };
  }, [selectedCrypto]);

  const { formatLtp, formatBuy, formatSell, formatSaving, percentage, diff } =
    formattedPrices;

  return (
    <div className="flex justify-between items-center gap-2 lg:grid lg:grid-cols-6 lg:gap-2 lg:place-items-center text-[#74777D] font-semibold text-[10px] lg:text-xl p-4 mx-4 bg-[#2E3241] my-2 rounded-xl">
      <p>{index}</p>
      <p>{platform}</p>
      <p>{formatLtp}</p>
      <p>
        {formatBuy} / {formatSell}
      </p>
      <p className={`${diff < 0 ? "text-[#DA5756]" : "text-[#5DC7C2]"}`}>
        {percentage < 0
          ? `${percentage.toFixed(2)}%`
          : `${percentage.toFixed(2)}%`}
      </p>
      <p className={`${diff < 0 ? "text-[#DA5756]" : "text-[#5DC7C2]"}`}>
        {diff < 0 ? (
          <span>&#9660; {formatSaving}</span>
        ) : (
          <span>&#9650; {formatSaving}</span>
        )}
      </p>
    </div>
  );
};

export default Prices;

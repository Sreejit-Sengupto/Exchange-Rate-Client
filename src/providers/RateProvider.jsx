import React from "react";
import { useContext, createContext } from "react";
import axios from "axios";

const RateContext = createContext(null);

export const RateProvider = ({ children }) => {
  const [rates, setRates] = React.useState([]);
  const [avgPrice, setAvgPrice] = React.useState(0);
  const [selectedCrypto, setSelectedCrypto] = React.useState("BTC");

  const getPrices = async () => {
    try {
      const response = await axios.get(
        "https://exchange-rate-server.onrender.com/api/v1/market/exchange-data"
      );
      setRates(response.data.data.exchangeData);
    } catch (error) {
      console.log(error);
    }
  };

  const cryptoInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=${selectedCrypto.toLowerCase()}inr`
      );

      const highPrice = parseInt(response.data.highPrice);
      const lowPrice = parseInt(response.data.lowPrice);
      const avg = (highPrice + lowPrice) / 2;

      setAvgPrice(avg);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getPrices();
    cryptoInfo();
  }, [selectedCrypto]);

  const currencies =
    rates &&
    rates.map(({ name }) => ({ name: name.substring(0, name.indexOf("/")) }));

  const contextData = {
    rates,
    selectedCrypto,
    setSelectedCrypto,
    avgPrice,
    currencies,
  };

  return (
    <RateContext.Provider value={contextData}>{children}</RateContext.Provider>
  );
};

export const useRates = () => useContext(RateContext);

export default RateContext;

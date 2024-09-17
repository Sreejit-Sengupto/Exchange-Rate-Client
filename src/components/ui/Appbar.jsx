import React from "react";
import { useRates } from "../../providers/RateProvider";
import { BsTelegram as TelegramLogo } from "react-icons/bs";

const Appbar = () => {
  const { currencies, selectedCrypto, setSelectedCrypto } = useRates();

  const options =
    currencies &&
    currencies.map((item, index) => (
      <option value={item.name} key={index}>
        {item.name}
      </option>
    ));

  const handleSelectCurrency = (event) => {
    event.preventDefault();
    setSelectedCrypto(event.target.value);
  };

  return (
    <div className="flex justify-between items-center p-3 font-baloo">
      <div>
        <h1 className="text-lg lg:text-3xl font-semibold text-[#60B1B4] font-suse">
          HODLINFO
        </h1>
      </div>

      <div className="flex justify-center items-center gap-2 lg:gap-6">
        <p className="bg-[#2E3241] py-2 px-3 lg:px-5 rounded-xl text-[#C3D0E0]">
          INR
        </p>

        <select
          name="crypto"
          id="crypto"
          onChange={handleSelectCurrency}
          className="bg-[#2E3241] py-[10px] px-3 lg:px-5 rounded-xl text-[#C3D0E0]"
        >
          {options}
        </select>

        <button className="bg-[#2E3241] py-2 px-3 lg:px-5 rounded-xl text-[#C3D0E0]">
          Buy {selectedCrypto}
        </button>
      </div>

      <div>
        <button className="hidden lg:block bg-[#3DC6C1] p-1 lg:py-2 lg:px-5 rounded-xl text-base">
          Connect Telegram
        </button>
        <button className="block lg:hidden bg-[#3DC6C1] py-2 px-3 rounded-xl text-base">
          <TelegramLogo />
        </button>
      </div>
    </div>
  );
};

export default Appbar;

import React, { useContext } from "react";
import {BsWallet2} from 'react-icons/bs'
import { AppState } from "../App";

const Header = () => {
  const App = useContext(AppState);

  const handleToggle = () => {
    App.setToggle(true);
  };
  return (
    <div className="sticky top-0 max-w-[1240px] bg-[#212936] h-1/4 pt-4 m-auto flex justify-between items-center text-white">
      <p className="text-[48px] font-bold ">dDrive</p>

      <div className="flex justify-between items-center">
        <div
          className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium
        cursor-pointer bg-black px-4 py-2 rounded-lg"
        >
          Balance : {App.balance.slice(0, 5)} ETH
        </div>

        <div
          className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer
        bg-black px-4 py-2 rounded-lg flex justify-between items-center"
        >
          {App.account.slice(0, 8)}...{App.account.slice(38)}
          <BsWallet2 size={25} className="ml-3" />
        </div>
        <div
          className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer
        bg-black px-4 py-2 rounded-lg flex justify-between items-center"
        >
          <button onClick={handleToggle} className="animate-pulse text-red-600">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

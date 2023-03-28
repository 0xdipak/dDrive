import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AppState } from "../App";

const Share = () => {
  const App = useContext(AppState);
  const [sAddress, setSAddress] = useState("");
  const [accessList, setAccessList] = useState([]);

  const sharing = async (e) => {
    e.preventDefault();
    await App.uploadContract.allow(sAddress);
    App.setToggle(false);
  };

//   const cancel = async (e) => {
//     e.preventDefault();
//     await App.uploadContract.disallow(sAddress);
//     App.setToggle(false);
//   };
//   console.log(accessList);

  useEffect(() => {
    const accessList = async () => {
      const accessList = await App.uploadContract.shareAccess();
      setAccessList(accessList);
    };

    accessList();
  }, []);

  return (
    <div
      className={`${
        !App.toggle ? "scale-0" : "scale-100"
      } flex justify-center items-center text-white h-screen w-screen fixed top-0 left-0 bg-black
    bg-opacity-50 transform transition-transform duration-300 z-50`}
    >
      <div
        className="bg-[#212936] shadow-lg shadow-gray-500 rounded-xl w-[600px] md:w-2/5
        h-72 p-6"
      >
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Share With</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes onClick={() => App.setToggle(false)} />
            </button>
          </div>

          <div className="flex justify-between items-center border border-gray-500 rounded-xl mt-8">
            <input
              onChange={(e) => setSAddress(e.target.value)}
              className="block w-full text-sm bg-transparent border-0 focus:outline-none focus:ring-0 p-2"
              name="Address"
              placeholder="Address"
              required
              type="text"
            />
          </div>
          {accessList.map((item, i) => (
            <div key={i} className="text-white flex justify-center items-center py-5">
              <select className="w-full bg-gray-500">
                <option>Pepole With Access</option>
                <option>{item}</option>
              </select>
            </div>
          ))}
          <button
            onClick={sharing}
            className="px-2 py-2.5 border border-gray-400 bg-transparent font-medium leading-tight text-white text-sm hover:shadow-lg
        focus:outline-none rounded-full hover:bg-black/30 mx-16 mt-4"
          >
            Share
          </button>

          {/* <button
          onClick={cancel}
            className="px-2 py-2.5 border border-gray-400 bg-transparent font-medium leading-tight text-white text-sm hover:shadow-lg
        focus:outline-none rounded-full hover:bg-black/30 mx-16 mt-5 "
          >
            Cancel
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Share;

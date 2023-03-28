import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { AppState } from "../App";
import { Bars } from "react-loader-spinner";
import Logo from "../assets/metamask.png";

const ImgCard = () => {
  const App = useContext(AppState);
  const [data, setData] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    let dataArray;
    if (otherAddress) {
      dataArray = await App.uploadContract.display(otherAddress);
    } else {
      dataArray = await App.uploadContract.display(App.account);
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const dataStr = dataArray.toString();
      const dataStrArray = dataStr.split(",");
        const images = dataStrArray.map((item, i) => {
          return (
            <div>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                key={i}
                target="_blank"
              >
                <img
                  className="border-2 border-gray-500 rounded-full w-[200px] h-[200px]"
                  src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                  key={i}
                  alt="images"
                />
              </a>
            </div>
          );
        });
      setData(images);
    } else {
      swal({
        title: "No Image Found",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full h-full items-center bg-[#212936] mt-16">
      <div
        className="flex justify-center items-start w-[500px] md:w-[600px] shadow-lg shadow-gray-700 rounded-xl
   border-t"
      >
        <div className="flex flex-col justify-center items-center p-3">
          <input
            onChange={(e) => setOtherAddress(e.target.value)}
            className="block w-[400px] text-white text-lg mt-5 bg-gray-600 border-0 focus:outline-none focus:ring-0 p-2 rounded-lg"
            placeholder="Enter Address"
            type="text"
          />
          {loading ? (
            <div
              className="w-[200px] px-2 border border-gray-400 bg-transparent font-medium leading-tight text-white text-sm hover:shadow-lg
        focus:outline-none rounded-full hover:bg-black/30 mx-16 mt-5 flex justify-center items-center"
            >
              <Bars width={30} height={46} />
            </div>
          ) : (
            <button
              onClick={getData}
              className="w-[200px] px-2 py-2.5 border border-gray-400 bg-transparent font-medium leading-tight text-white text-sm hover:shadow-lg
        focus:outline-none rounded-full hover:bg-black/30 mx-16 mt-5"
            >
              Get Data
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 mt-20 gap-5 object-center w-[1240px]">
        {data}
      </div>
    </div>
  );
};

export default ImgCard;

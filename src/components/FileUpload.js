import axios from "axios";
import React, { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import swal from "sweetalert";
import { AppState } from "../App";

const FileUpload = () => {
  const App = useContext(AppState);
  const [file, setFile] = useState(null);
  const [fileName, setFilName] = useState("No Image Selected");

  const handleSubmit = async (e) => {
    App.setLoading(true);
    e.preventDefault();
    if (file) {
      try {
         const formData = new FormData();
         formData.append("file", file);

         const resFile = await axios({
           method: "post",
           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
           data: formData,
           headers: {
             pinata_api_key: `08bcc3de100928262ca2`,
             pinata_secret_api_key: `0bdd9c247a0d71c80cd3f6d12d3de96dd11108e6bd9814e4217595547f7a2925`,
             "Content-Type": "multipart/form-data",
           },
         });
         const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        App.uploadContract.add(App.account, ImgHash);
        swal({
          title: "Image Uploaded Successfully",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setFile(null);
        setFilName('No Image Selected');
      } catch (err) {
        console.log(err.message);
      }
    }
    App.setLoading(false);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
        setFile(e.target.files[0]);
    }
    setFilName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="w-[500px] md:w-[600px] bg-[#212936] shadow-lg shadow-gray-700 rounded-xl h-[300px] p-8">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col justify-center items-center text-white">
          <p className="text-xl">Upload Image</p>
          <hr className="border-2 border-gray-500 w-full my-5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-evenly mt-10">
            <label className="text-white text-lg">Choose Image : </label>
            <input
              onChange={retrieveFile}
              type="file"
              name="data"
              disabled={!App.account}
            />
          </div>
          <span className="text-center text-gray-300 py-1 ml-12">
            Image : {fileName}
          </span>
        </div>
        {App.loading ? (
          <div
            className="px-2 border border-gray-400 bg-transparent font-medium leading-tight text-white text-sm hover:shadow-lg
        focus:outline-none rounded-full hover:bg-black/30 mx-16 mt-5 flex justify-center items-center"
          >
            <Bars width={30} height={46} />
          </div>
        ) : (
          <button
            className="px-2 py-2.5 mt-10 border border-gray-400 bg-transparent font-medium leading-tight text-white text-sm hover:shadow-lg
        focus:outline-none rounded-full hover:bg-black/30 mx-16"
            type="submit"
            disabled={!file}
          >
            Upload File
          </button>
        )}
      </form>
    </div>
  );
};

export default FileUpload;

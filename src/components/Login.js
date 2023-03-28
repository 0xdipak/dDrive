import React, { useContext, useState } from 'react'
import { AppState } from '../App';
import Logo from '../assets/metamask.png'

const Login = () => {
    const App = useContext(AppState);
    const {ethereum} = window;
    const [error, setError] = useState('');

    const loginWallet = async() => {
        try {
            await ethereum.request({method: "wallet_requestPermissions", params: [{eth_accounts: {}}]});
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            App.setAccount(accounts[0]);
            App.setLogin(true);
        }
        catch(err) {
            setError(err.message);
        }
    }



  return (
    <div className="min-w-full bg-[#212936] h-4/5 flex justify-center items-center flex-col">
      <p className="text-4xl font-bold">dDrive</p>

      <div
        className="w-1/3 h-40 mt-4 bg-black bg-opacity-70 p-2 rounded-lg shadow-lg border-4 border-opacity-40
        border-black flex flex-col justify-center items-center"
      >
        <h1 className="text-white text-2xl font-medium text-center">Login</h1>
        {ethereum != undefined ? (
          <div
            onClick={loginWallet}
            className="flex border-opacity-60 bg-opacity-90 text-sm font-medium border-2 border-blue-800 cursor-pointer
            bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2"
          >
            Connect With Metamask
            <img className="h-10" src={Logo} alt="metamask" />
          </div>
        ) : (
          // Install metamask
          <div className="flex flex-col justify-center items-center">
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              target="_blank"
            >
              <div
                className="flex border-opacity-60 bg-opacity-90 text-sm font-medium border-2 border-blue-800 cursor-pointer
                 bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2"
              >
                Install Metamsk
                <img className="h-10" src={Logo} alt="metamask" />
              </div>
            </a>
            <p className="text-red-600 text-sm mt-2">
              Login Required Metamask Extension
            </p>
          </div>
        )}
        <p className="text-red-600 text-sm mt-2">{error}</p>
      </div>
    </div>
  );
}

export default Login
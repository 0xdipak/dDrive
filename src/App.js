import { createContext, useEffect, useState} from "react";
import Home from './components/Home'
import Header from './components/Header'
import Login from "./components/Login";
import { ethers } from "ethers";
import ABI from './artifacts/contracts/Upload.sol/Upload.json';

const AppState = createContext();

function App() {

  const { ethereum } = window;
  const [account, setAccount] = useState('');
  const [login, setLogin] = useState(false);
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  // COntract Instances
  const contractAddress = "0x4145f339d0c1EF6E45846fd98E152E01E4Db407E";
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const uploadContract = new ethers.Contract(contractAddress, ABI.abi, signer);
  // console.log(uploadContract);

  const getBalance = async() => {
    const balance = await signer.getBalance();
    setBalance(ethers.utils.formatEther(balance));
  }

  useEffect(() => {
    getBalance();
    ethereum.on("accountsChanged", function (accounts) {});
  },[])


  return (
    <AppState.Provider 
    value={{
      setAccount, 
      account, 
      setLogin, 
      balance,
      account,
      uploadContract,
      loading,
      setLoading,
      toggle,
      setToggle
      }}>
      <div className="max-w-full h-screen bg-[#212936] text-gray-500">
        {login ? (
          <div className="min-h-full min-w-full">
            <Header />
            <Home />
          </div>
        )
        :
        (<Login />)}
        
      </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};

//Contract deployed to :  0x4145f339d0c1EF6E45846fd98E152E01E4Db407E

// pinata_api_key: `
// 08bcc3de100928262ca2`,
//             pinata_secret_key: `
// 0bdd9c247a0d71c80cd3f6d12d3de96dd11108e6bd9814e4217595547f7a2925`,

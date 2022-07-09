import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { useContext } from "react";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);


  const [formData, setFormdata] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    // console.log(e.target.value)
    setFormdata((prevState) => ({ ...prevState, [name]: e.target.value }));
  };


  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please Install Metamask");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions()
      } else {
        console.log("no account found");
      }
      // console.log("acc ==>", accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransactions = async () => {
    // console.log("send trans==>");
    try {
      if (!ethereum) {
        return alert("Please Install Metamask");
      }

      // get data from form
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);


      await ethereum.request({
        method:'eth_sendTransaction',
        params:[{
          from:currentAccount,
          to:addressTo,
          gas:'0x5208',
          value: parsedAmount._hex,

        }]
      })

     const transactionHash = await transactionContract.addToBlockChain(addressTo,parsedAmount,message,keyword);

     setIsLoading(true);
     console.log(`Loading - ${transactionHash.hash}`);
     await transactionHash.wait();
     console.log(`Success - ${transactionHash.hash}`);
     setIsLoading(false);

     const transactionCount = await transactionContract.getTransactionCount();
     setTransactionCount(transactionCount.toNumber())

    } catch (error) {}
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransactions,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};


export const useTransactionContext = () => useContext(TransactionContext);
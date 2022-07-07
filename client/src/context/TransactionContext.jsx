import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionsProvider = ({ children }) => {
  const [currentAccount,setCurrentAccount] = useState([]);
  const [formData,setFormdata] = useState({addresTo:'' , amount:'' ,keyword:'', message:''});

  const handleChange = (e,name) => {
      setFormdata((prevState) => ({...prevState,[name]:e.target.value}))
  }



  const checkIfWalletIsConnected = async () => {

    try {

      if(!ethereum) {
        return alert('Please Install Metamask')
      }
  
      const accounts  = await ethereum.request({method : 'eth_accounts'});
  
      if (accounts.length) {
        setCurrentAccount(accounts[0])
      }
      else{
        console.log('no account found')
      }
      console.log('acc ==>',accounts)
      
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum Object')
      
    }

  }

  const connectWallet = async () => {
    try {

      if(!ethereum) {
      return alert('Please Install Metamask')
    }

    const accounts  = await ethereum.request({method : 'eth_requestAccounts'})
    setCurrentAccount(accounts[0])

    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum Object')
    }
  }


  const sendTransactions = async () => {

    try {
      if(!ethereum) {
        return alert('Please Install Metamask')
      }
  
     // get data from form  
      
    } catch (error) {

      
    }
  }

  useEffect( () => {
    checkIfWalletIsConnected()
  },[])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
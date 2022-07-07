import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionsProvider = ({ children }) => {
  const [currentAccount,setCurrentAccount] = useState([])


  const checkIfWalletIsConnected = async () => {
    if(!ethereum) {
      return alert('Please Install Metamask')
    }

    const accounts  = await ethereum.request({method : 'eth_accounts'});

    if (accounts.length) {
      setCurrentAccount(accounts[0])
    }
    console.log('acc ==>',accounts)
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

  useEffect( () => {
    checkIfWalletIsConnected()
  },[])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
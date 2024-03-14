'use client'
// context/EthereumContext.js
import React, { createContext, useContext, useState } from 'react';

const EthereumContext = createContext();

export function EthereumProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [addressContract, setAddressContract] = useState('')
  const [reloadTotal, setReloadTotal] = useState(false)


  return (
    <EthereumContext.Provider value={{ provider, setProvider,
     walletAddress, setWalletAddress,
      addressContract, setAddressContract,
      reloadTotal, setReloadTotal }}>
      {children}
    </EthereumContext.Provider>
  );
}

export function useEthereum() {
  return useContext(EthereumContext);
}

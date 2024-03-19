'use client'
// components/MetaMaskButton.js
import React, { useState , useEffect} from 'react';
import { ethers } from 'ethers';
import styles from './MetaMaskButton.module.css';
import { useEthereum } from '../context/EthereumContext';


function MetaMaskButton() {
  const [connected, setConnected] = useState(false);
  const { provider, setProvider, walletAddress, setWalletAddress ,
    addressContract, setAddressContract,reloadTotal, setReloadTotal
   } = useEthereum();
  const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"ADMIN","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SELLER","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAW","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"seriNumberUser","type":"string"}],"name":"buy30daysCombo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"seriNumberUser","type":"string"},{"internalType":"uint16","name":"vip","type":"uint16"}],"name":"buy30daysScanBot","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buy30daysSwapBot","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"seriNumberUser","type":"string"}],"name":"buyComboEthPro","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"seriNumberUser","type":"string"}],"name":"buyScanEthPro","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buySwapEthPro","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_seller","type":"address"},{"internalType":"uint256","name":"_money","type":"uint256"}],"name":"changeMoneyOfSeller","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newSeriNumber","type":"string"}],"name":"changeSeriNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"changeWalletScan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"changeWalletSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"getExpScan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"getExpScanETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getExpScanEthPro","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"Seri","type":"string"}],"name":"getExpSerinumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"getExpStopLoss","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"getExpSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getExpSwapEthPro","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getMoneyPendingSeller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceCombo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceComboEthPro","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceScan","outputs":[{"internalType":"uint256[3]","name":"","type":"uint256[3]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceScanEthPro","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceSwapEthPro","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"getSerial","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getTotalCustomer","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalMoneyPendingSeller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUserScan","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUserSwap","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addressCheck","type":"address"}],"name":"getVIP","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"grantRoleWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addCustomer","type":"address"}],"name":"removeCustomer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"revokeRoleSeller","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"revokeRoleWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addCustomer","type":"address"},{"internalType":"address","name":"_seller","type":"address"}],"name":"setCustomer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"uint256","name":"expTimestamp","type":"uint256"},{"internalType":"uint16","name":"vip","type":"uint16"}],"name":"setLicenseScan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"uint256","name":"expTimestamp","type":"uint256"}],"name":"setLicenseScanETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"uint256","name":"expTimestamp","type":"uint256"}],"name":"setLicenseScanETHPro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"SN","type":"string"},{"internalType":"uint256","name":"expTimestamp","type":"uint256"}],"name":"setLicenseSeriNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"uint256","name":"expTimestamp","type":"uint256"}],"name":"setLicenseStoploss","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"uint256","name":"expTimestamp","type":"uint256"}],"name":"setLicenseSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"uint256","name":"expTimestamp","type":"uint256"}],"name":"setLicenseSwapETHPro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInWei","type":"uint256"}],"name":"setPriceCombo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInWei","type":"uint256"}],"name":"setPriceComboEthPro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInWeiVip1","type":"uint256"},{"internalType":"uint256","name":"priceInWeiVip2","type":"uint256"},{"internalType":"uint256","name":"priceInWeiSVip","type":"uint256"}],"name":"setPriceScan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInWei","type":"uint256"}],"name":"setPriceScanEthPro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInWei","type":"uint256"}],"name":"setPriceSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceInWei","type":"uint256"}],"name":"setPriceSwapEthPro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setSeller","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"},{"internalType":"string","name":"seriNumberUser","type":"string"}],"name":"setSeriNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setWithdrawDisable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setWithdrawEnable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountLimit","type":"uint256"}],"name":"setWithrawLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addressUser","type":"address"}],"name":"unSetAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountInWei","type":"uint256"}],"name":"withdrawBNBLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawSeller","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  const VNCToolsAddress = '0xf9734DAb975debaE20853EC2Cbd800F16417D11F'

  useEffect(() => {
    if (window.ethereum) {
      const providermetamask = new ethers.providers.Web3Provider(window.ethereum);

      // Handle the accountsChanged event
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setConnected(true);
          setProvider(providermetamask)
          setWalletAddress(accounts[0]);
          const signer = providermetamask.getSigner();
          setAddressContract(new ethers.Contract(VNCToolsAddress, ABI, signer));
         
        } else {
          setConnected(false);
          setWalletAddress('');
          setProvider(null);
          setAddressContract(null);
        }
      };

      // Add accountsChanged event listener
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Clean up the listener when the component unmounts
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [provider, setAddressContract, setProvider, setWalletAddress]);
  async function connectToMetaMask() {
    try {
      if (window.ethereum) {
        const providermetamask = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await providermetamask.send("eth_requestAccounts", []);
        if (accounts && accounts.length > 0) {
          setProvider(providermetamask)
          setConnected(true);
          setWalletAddress(accounts[0]);
          const signer = providermetamask.getSigner();
          setAddressContract(new ethers.Contract(VNCToolsAddress,ABI,signer))

        }
      } else {
        console.log('MetaMask not detected');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  }

  async function disconnectFromMetaMask() {
    try {
      if (window.ethereum) {
        setConnected(false);
        setWalletAddress('');
        setProvider(null);
      }
    } catch (error) {
      console.error('Error disconnecting from MetaMask:', error);
    }
  }

  return (
    <div className={styles.container}>
      
    {walletAddress ? (
      <div className={styles.connected}>
        <div className={styles.linenear}>  
          <p>Wallet :    {walletAddress.slice(0,10) + '......' +  walletAddress.slice(-10)}</p>
          <button onClick={disconnectFromMetaMask}>Disconnect</button>
        </div>
        
      </div>
    ) : (
      <button className={styles.connectButton} onClick={connectToMetaMask}>
        Connect to MetaMask
      </button>
    )}
  </div>
  );
}

export default MetaMaskButton;

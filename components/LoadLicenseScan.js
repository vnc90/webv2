'use client'
import { ethers } from 'ethers';
import { useEthereum } from '../context/EthereumContext';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { toast } from 'react-toastify';

function LoadLicense() {

  const [expScan, setExpScan] = useState('N/A');
  const [seriNumber, setSeriNumber] = useState('N/A');
  const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum();
  // const [reloadComponent, setReloadComponent] = useState(false);
  const [priceScan1, setPriceScan1] = useState(0);
  const [priceScan2, setPriceScan2] = useState(0);
  const [priceScan3, setPriceScan3] = useState(0);
  const [vip, setVip] = useState('N/A');

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  let tempSeriNumber = ''
  useEffect(() => {
    async function fetchBalance() {

      if (walletAddress ) {
        const timeexpscan = await addressContract.functions.getExpScan(walletAddress)
        const seriNume = await addressContract.getSerial(walletAddress);
        tempSeriNumber = seriNume
        console.log(tempSeriNumber);
        const priceScan= await addressContract.getPriceScan()
        const getVip = await addressContract.getVIP(walletAddress)
        const currentTimeStampInSeconds = Math.floor(new Date().getTime() / 1000)
        let day = (timeexpscan - currentTimeStampInSeconds)/86400;
        if(day <0){
            day = 0;
        }else{{
            day = day.toFixed(1)
        }}
        if (getVip == 1){
          setVip('VIP1')
        }else if(getVip ==2){
          setVip('VIP2')
        }else if (getVip ==3){
          setVip('SuperVip')
        }else {
          setVip('Not Found')
        }
        setSeriNumber(seriNume)
        setPriceScan1(priceScan[0])
        setPriceScan2(priceScan[1])
        setPriceScan3(priceScan[2])

        setExpScan(day)
      }
      else {
       return;
      }
    }

    fetchBalance();
  }, [provider,walletAddress,reloadTotal]);
  async function buy30dayScan1() {
    let transaction
    console.log(tempSeriNumber);
    try {
      if (addressContract) {
        const balance = await provider.getBalance(walletAddress);
        if (balance.lt(priceScan1)) {
          toast("You don't have enough money to buy", { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
          return
        }
        if((tempSeriNumber === '') &(seriNumber === "")){
          toast('Please input SeriNumber, setup TC Scan Bot and get SeriNumber', { type: 'warning',hideProgressBar: true, autoClose: 5000,position:'bottom-right' });
          return}
        setLoading(true);
        if(tempSeriNumber){
          transaction = await addressContract.buy30daysScanBot(tempSeriNumber,1,{ value: priceScan1 });

        } else {
          transaction = await addressContract.buy30daysScanBot(seriNumber,1,{ value: priceScan1 });

        }
        const result = await provider.waitForTransaction(transaction.hash)
        if(result.status ===1){

          toast('Buy Successfull', { type: 'success',hideProgressBar: true, autoClose: 3000,position:'bottom-right' });

        }else {
          toast('Buy Fail', { hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
        }
        setLoading(false);
        // setReloadComponent(!reloadComponent);
        setReloadTotal(!reloadTotal);
        
      }
    } catch (error) {
      console.error('Error disconnecting from MetaMask:', error);
      setLoading(false);
      toast(error.toString(), {hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
      // setReloadComponent(!reloadComponent);

    }
  }
  async function buy30dayScan2() {
    let transaction
    console.log(tempSeriNumber);
    try {
      if (addressContract) {
        const balance = await provider.getBalance(walletAddress);
        if (balance.lt(priceScan2)) {
          toast("You don't have enough money to buy", { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
          return
        }
        if((tempSeriNumber === '') &(seriNumber === "")){
          toast('Please input SeriNumber, setup TC Scan Bot and get SeriNumber', { type: 'warning',hideProgressBar: true, autoClose: 5000,position:'bottom-right' });
          return}
        setLoading1(true);
        if(tempSeriNumber){
          transaction = await addressContract.buy30daysScanBot(tempSeriNumber,2,{ value: priceScan2 });

        } else {
          transaction = await addressContract.buy30daysScanBot(seriNumber,2,{ value: priceScan2 });

        }
        const result = await provider.waitForTransaction(transaction.hash)
        if(result.status ===1){

          toast('Buy Successfull', { type: 'success',hideProgressBar: true, autoClose: 3000,position:'bottom-right' });

        }else {
          toast('Buy Fail', { hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
        }
        setLoading1(false);
        // setReloadComponent(!reloadComponent);
        setReloadTotal(!reloadTotal);
        
      }
    } catch (error) {
      console.error('Error disconnecting from MetaMask:', error);
      setLoading1(false);
      toast(error.toString(), {hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
      // setReloadComponent(!reloadComponent);

    }
  }
  async function buy30dayScan3() {
    let transaction
    console.log(tempSeriNumber);
    try {
      if (addressContract) {
        const balance = await provider.getBalance(walletAddress);
        if (balance.lt(priceScan3)) {
          toast("You don't have enough money to buy", { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
          return
        }
        if((tempSeriNumber === '') &(seriNumber === "")){
          toast('Please input SeriNumber, setup TC Scan Bot and get SeriNumber', { type: 'warning',hideProgressBar: true, autoClose: 5000,position:'bottom-right' });
          return}
        setLoading2(true);
        if(tempSeriNumber){
          transaction = await addressContract.buy30daysScanBot(tempSeriNumber,3,{ value: priceScan3 });

        } else {
          transaction = await addressContract.buy30daysScanBot(seriNumber,3,{ value: priceScan3 });

        }
        const result = await provider.waitForTransaction(transaction.hash)
        if(result.status ===1){

          toast('Buy Successfull', { type: 'success',hideProgressBar: true, autoClose: 3000,position:'bottom-right' });

        }else {
          toast('Buy Fail', { hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
        }
        setLoading2(false);
        // setReloadComponent(!reloadComponent);
        setReloadTotal(!reloadTotal);
        
      }
    } catch (error) {
      console.error('Error disconnecting from MetaMask:', error);
      setLoading2(false);
      toast(error.toString(), {hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
      // setReloadComponent(!reloadComponent);

    }
  }
  function settempSeriNumber(value) {
      tempSeriNumber = value;
  }
  return (
    <div className={styles.card}>
        <div className={styles.columeL}>
        {seriNumber ? 
            (<><p>Your Tier : {vip}</p>
            <p>Time remaining : {expScan} days</p>
            <p>Your Serial Number : {seriNumber}</p>
            </>):
            (
              <><h3>Get Serial Number on TC SCAN Bot</h3><input
              type="text"
              onChange={(e) => settempSeriNumber(e.target.value)}
              placeholder="Enter Your Seri Number" /></>)}
        </div>
        <div className={styles.colume}>
      
        <button className={styles.gridButton}  onClick={buy30dayScan1} disabled={loading}>
            {loading ? 'Buying...' : 'Buy VIP1 30 Days'}
        </button>
        <button className={styles.gridButton}  onClick={buy30dayScan2} disabled={loading1}>
            {loading1 ? 'Buying...' : 'Buy VIP2 30 Days'}
        </button>
              <button className={styles.gridButton}  onClick={buy30dayScan3} disabled={loading2}>
            {loading2 ? 'Buying...' : 'Buy SuperVIP 30 Days'}
        </button>
        </div>
     
     
    </div>
  );
}

export default LoadLicense;

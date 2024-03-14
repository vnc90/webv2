'use client'
import { useEthereum } from '../../context/EthereumContext';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { toast } from 'react-toastify';

function BuyScanEthPro() {

  const [expScan, setExpScan] = useState('N/A');
  const [seriNumber, setSeriNumber] = useState('N/A');
  const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum();
  const [priceScan1, setPriceScan1] = useState(0);
  const [loading, setLoading] = useState(false);

  let tempSeriNumber = ''
  useEffect(() => {
    async function fetchBalance() {

      if (walletAddress ) {
        const timeexpscan = await addressContract.functions.getExpScanEthPro(walletAddress)
        const seriNume = await addressContract.getSerial(walletAddress);
        tempSeriNumber = seriNume
        console.log(tempSeriNumber);
        const priceScan= await addressContract.getPriceScanEthPro()
        const currentTimeStampInSeconds = Math.floor(new Date().getTime() / 1000)
        let day = (timeexpscan - currentTimeStampInSeconds)/86400;
        if(day <0){
            day = 0;
        }else{{
            day = day.toFixed(1)
        }}
        setSeriNumber(seriNume)
        setPriceScan1(priceScan)


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
          transaction = await addressContract.buyScanEthPro(tempSeriNumber,{ value: priceScan1 });

        } else {
          transaction = await addressContract.buyScanEthPro(seriNumber,{ value: priceScan1 });

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
  
  function settempSeriNumber(value) {
      tempSeriNumber = value;
  }
  return (
    <div className={styles.card}>
        <div className={styles.columeL}>
        {seriNumber ? 
            (<>
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
                {loading ? 'Buying...' : 'Buy 30 Days'}
            </button>
        </div>

     
     
    </div>
  );
}

export default BuyScanEthPro;

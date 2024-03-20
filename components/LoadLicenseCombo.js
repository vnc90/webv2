'use client'
import { ethers } from 'ethers';
import { useEthereum } from '../context/EthereumContext';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { toast } from 'react-toastify';

function LoadLicense() {


  const [seriNumber, setSeriNumber] = useState('N/A');
  const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum();
  // const [reloadComponent, setReloadComponent] = useState(false);
  const [priceCombo, setPriceCombo] = useState(0);
  const [loading, setLoading] = useState(false);
  let tempSeriNumber = ''
  useEffect(() => {
    async function fetchBalance() {

      if (walletAddress ) {

        const seriNume = await addressContract.getSerial(walletAddress);
        const priceCombo= await addressContract.getPriceCombo()
        setSeriNumber(seriNume)
        setPriceCombo(priceCombo)

      }
      else {
       return;
      }
    }

    fetchBalance();
  }, [provider,walletAddress,reloadTotal]);
  async function buy30dayCombo() {
    let transaction
    try {
      if (addressContract) {
        const balance = await provider.getBalance(walletAddress);
        if (balance.lt(priceCombo)) {
          toast("You don't have enough money to buy", { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
          return
        }
  
        if((tempSeriNumber === '') &(seriNumber === "")){
          toast('Please input SeriNumber, setup TC Scan Bot and get SeriNumber', { type: 'warning',hideProgressBar: true, autoClose: 5000,position:'bottom-right' });
          return}
        setLoading(true);
        if(tempSeriNumber){
          transaction = await addressContract.buy30daysCombo(tempSeriNumber,{ value: priceCombo });

        } else {
          transaction = await addressContract.buy30daysCombo(seriNumber,{ value: priceCombo });

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
    <>
        <div className="flex justify-left mx-auto w-full px-3 text-medium font-light mt-3">
      <div className='w-full'>
        <li>Savings combo when buying swap and scan bot</li>
    </div>
    </div>
    <div className={styles.card}>
        <div className={styles.columeL}>
        {seriNumber ? 
            (<p>{ethers.utils.formatUnits(priceCombo)} BNB for Scan + Swap bot</p>):
            (
            <input
              type="text"
              onChange={(e) => settempSeriNumber(e.target.value)}
              placeholder="Enter Your Seri Number" />)}
        </div>
        <div className={styles.colume}>
      
        <button className={styles.gridButton}  onClick={buy30dayCombo} disabled={loading}>
            {loading ? 'Buying...' : 'Buy 30 Days'}
              </button>
        </div>
     
     
    </div></>
  );
}

export default LoadLicense;

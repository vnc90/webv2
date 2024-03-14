'use client'
import { useEthereum } from '../../context/EthereumContext';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { toast } from 'react-toastify';

function BuySwapEthPro() {
  const [expSwap, setExpSwap] = useState('N/A');
  const [priceSwap, setPriceSwap] = useState(0);
  const [loading, setLoading] = useState(false);
  const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum();

  useEffect(() => {
    async function fetchBalance() {

      if (walletAddress ) {
        const timeexpswap = await addressContract.functions.getExpSwapEthPro(walletAddress)
        const priceSwap = await addressContract.getPriceSwapEthPro()
        const currentTimeStampInSeconds = Math.floor(new Date().getTime() / 1000)
        let day = (timeexpswap - currentTimeStampInSeconds)/86400;
        if(day <0){
            day = 0;
        }else{{
            day = day.toFixed(1)
        }}
        setExpSwap(day);
        setPriceSwap(priceSwap);

      }
      else {
       return;
      }
    }

    fetchBalance();
  }, [provider,walletAddress,reloadTotal]);

  async function buy30daySwap() {
    try {
      if (addressContract) {
        const balance = await provider.getBalance(walletAddress);
        if (balance.lt(priceSwap)) {
          toast("You don't have enough money to buy", { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
          return
        }
        setLoading(true);
        const transaction = await addressContract.buySwapEthPro({ value: priceSwap });
        const result = await provider.waitForTransaction(transaction.hash)
        if(result.status ===1){

          toast('Buy Successfull', { type: 'success',hideProgressBar: true, autoClose: 1000,position:'bottom-right' });

        }else {
          toast('Buy Fail', { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
        }
        setLoading(false);
        setReloadTotal(!reloadTotal);

        
      }
    } catch (error) {
      console.error('Error disconnecting from MetaMask:', error);
      setLoading(false);
      toast(error.toString(), {hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });

    }
  }

  return (
    <div className={styles.card}>
    <p className= {styles.columeL}>Time remaining: {expSwap} days</p>
    <div className={styles.colume}>
            <button className={styles.gridButton}  onClick={buy30daySwap} disabled={loading}>
            {loading ? 'Buying...' : 'Buy 30 Days'}
              </button>
        </div>
    </div>
  );
}

export default BuySwapEthPro;

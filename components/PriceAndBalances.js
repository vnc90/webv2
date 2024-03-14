'use client'
import React, { useEffect,useState } from 'react';
import { ethers } from 'ethers';
import styles from './MetaMaskButton.module.css';
import { useEthereum } from '../context/EthereumContext';

function PriceAndBalances () {

    const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum();
    const [priceSwap, setPriceSwap] = useState(ethers.BigNumber.from('350000000000000000'));
    const [priceCombo, setPriceCombo] = useState(ethers.BigNumber.from('1500000000000000000'));
    const [balance, setBalance] = useState(0);
    const [priceScan1, setPriceScan1] = useState(ethers.BigNumber.from('500000000000000000'));
    const [priceScan2, setPriceScan2] = useState(ethers.BigNumber.from('1000000000000000000'));
    const [priceScan3, setPriceScan3] = useState(ethers.BigNumber.from('1300000000000000000'));


    useEffect(() => {
        async function fetchBalance() {
    
          if (walletAddress ) {
            setBalance(await provider.getBalance(walletAddress))
            const priceScan = await addressContract.getPriceScan()
            setPriceScan1(priceScan[0])
            setPriceScan2(priceScan[1])
            setPriceScan3(priceScan[2])
            setPriceSwap(await addressContract.getPriceSwap())
            setPriceCombo(await addressContract.getPriceCombo())

            
          }
          else {
           return;
          }
        }
    
        fetchBalance();
      }, [provider,walletAddress,reloadTotal]);

      return (
        
            <table>
                <tbody>
                <tr>
                    <td>Your Balance</td>
                    <td>{ parseFloat(ethers.utils.formatUnits( balance)).toFixed(2)} BNB</td>
                </tr>
                <tr>
                    <td>30-day price of SWAP BOT</td>
                    <td>{ethers.utils.formatUnits(priceSwap)} BNB</td>
                </tr>
                <tr>
                    <td>30-day price of VIP1 SCAN BOT</td>
                    <td>{ethers.utils.formatUnits(priceScan1)} BNB</td>
                </tr>
                <tr>
                    <td>30-day price of VIP2 SCAN BOT</td>
                    <td>{ethers.utils.formatUnits(priceScan2)} BNB</td>
                </tr>
                <tr>
                    <td>30-day price of SuperVip SCAN BOT</td>
                    <td>{ethers.utils.formatUnits(priceScan3)} BNB</td>
                </tr>
                
                <tr>
                    <td>30-day price of SuperVip SCAN + SWAP BOT</td>
                    <td>{ethers.utils.formatUnits(priceCombo)} BNB</td>
                </tr>
                </tbody>
                <style jsx>{`
        table {
          width: 70%;
          border-collapse: collapse;
          font-size : 1em;
        }

        td {
          text-align: center;
          padding: 10px;
          border: 1px solid #dddddd;
        }
      `}</style>
            </table>

        
      )
}
export default PriceAndBalances;
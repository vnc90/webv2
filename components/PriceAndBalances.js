'use client'
import React, { useEffect,useState } from 'react';
import { ethers } from 'ethers';
import styles from './MetaMaskButton.module.css';
import { useEthereum } from '../context/EthereumContext';

function PriceAndBalances () {

    const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum();
    const [priceSwap, setPriceSwap] = useState(ethers.BigNumber.from('0'));
    const [priceCombo, setPriceCombo] = useState(ethers.BigNumber.from('0'));
    const [balance, setBalance] = useState(0);
    const [priceScan1, setPriceScan1] = useState(ethers.BigNumber.from('0'));
    const [priceScan2, setPriceScan2] = useState(ethers.BigNumber.from('0'));
    const [priceScan3, setPriceScan3] = useState(ethers.BigNumber.from('0'));
    const [priceSwapPro, setPriceSwapPro] = useState(ethers.BigNumber.from('0'));
    const [priceScanPro, setPriceScanPro] = useState(ethers.BigNumber.from('0'));
    const [comboPro, setComboPro] = useState(ethers.BigNumber.from('0'));



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
            setComboPro(await addressContract.getPriceComboEthPro())
            setPriceScanPro(await addressContract.getPriceScanEthPro())
            setPriceSwapPro(await addressContract.getPriceSwapEthPro())

            
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
                    <td>TC SWAP</td>
                    <td>{ethers.utils.formatUnits(priceSwap)} BNB</td>
                </tr>
                <tr>
                    <td>TC SCAN - Vip 1</td>
                    <td>{ethers.utils.formatUnits(priceScan1)} BNB</td>
                </tr>
                <tr>
                    <td>TC SCAN - Vip 2</td>
                    <td>{ethers.utils.formatUnits(priceScan2)} BNB</td>
                </tr>
                <tr>
                    <td>TC SCAN - Supper Vip</td>
                    <td>{ethers.utils.formatUnits(priceScan3)} BNB</td>
                </tr>
                
                <tr>
                    <td>COMBO TC SCAN - SVip + SWAP </td>
                    <td>{ethers.utils.formatUnits(priceCombo)} BNB</td>
                </tr>
                <tr>
                    <td>Scan ETH Pro</td>
                    <td>{ethers.utils.formatUnits(priceScanPro)} BNB</td>
                </tr>
                <tr>
                    <td>Swap ETH Pro</td>
                    <td>{ethers.utils.formatUnits(priceSwapPro)} BNB</td>
                </tr>
                <tr>
                    <td>COMBO SCAN SWAP ETH Pro</td>
                    <td>{ethers.utils.formatUnits(comboPro)} BNB</td>
                </tr>
                </tbody>
                <style jsx>{`
        table {
          width: 70%;
          border-collapse: collapse;
          font-size : 1em;
        }

        td {
          text-align: left;
          padding: 10px;
          border: 1px solid #dddddd;
        }
      `}</style>
            </table>

        
      )
}
export default PriceAndBalances;
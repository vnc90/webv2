'use client'
import { ethers } from 'ethers';
import { useEthereum } from '../context/EthereumContext';
import styles from '../styles/Home.module.css';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';

function Tools() {
  const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [input, setInput] = useState('')
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')


  async function changeSeriNumber() {
    try {
      if (addressContract) {
        if(input === ''){
            toast('Please input SeriNumber, setup TC Scan Bot and get SeriNumber', { type: 'warning',hideProgressBar: true, autoClose: 5000,position:'bottom-right' });
            return}
        setLoading(true);
        const transaction = await addressContract.changeSeriNumber(input);
        const result = await provider.waitForTransaction(transaction.hash)
        if(result.status ===1){

          toast('Change Successfull', { type: 'success',hideProgressBar: true, autoClose: 1000,position:'bottom-right' });

        }else {
          toast('Change Fail', { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
        }
        setLoading(false);
        setReloadTotal(!reloadTotal);

        
      }
    } catch (error) {
      console.error('Error changeSeriNumber', error);
      setLoading(false);
      toast(error.toString(), {hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
    
        }}

    async function changeWalletScan() {
        try {
            if (addressContract) {
            if(input1 === ''){
                toast('Please input new wallet address', { type: 'warning',hideProgressBar: true, autoClose: 5000,position:'bottom-right' });
                return}

            if(input1.toLowerCase() === walletAddress.toLowerCase()){
                toast('Can not tranfer license to yourself', { type: 'error',hideProgressBar: true, autoClose: 4000,position:'bottom-right' });
                return
                }
            setLoading1(true);
            const timeexpscannew = await addressContract.getExpScan(input1);
            const currentTimeStampInSeconds = Math.floor(new Date().getTime() / 1000)          
            if(timeexpscannew > currentTimeStampInSeconds  ){
                toast('New Wallet had license', { type: 'error',hideProgressBar: true, autoClose: 4000,position:'bottom-right' });
                setLoading1(false)
                return
            }
            const transaction = await addressContract.changeWalletScan(input1);
            const result = await provider.waitForTransaction(transaction.hash)
            if(result.status ===1){
    
                toast('Change Successfull', { type: 'success',hideProgressBar: true, autoClose: 1000,position:'bottom-right' });
    
            }else {
                toast('Change Fail', { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
            }
            setLoading1(false);
            setReloadTotal(!reloadTotal);
    
            
            }
        } catch (error) {
            console.error('Error changeWalletScan', error);
            setLoading1(false);
            toast(error.toString(), {hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
                 }}

    async function changeWalletSwap() {
        try {
            if (addressContract) {
            if(input2 === ''){
                toast('Please input new wallet address', { type: 'warning',hideProgressBar: true, autoClose: 5000,position:'bottom-right' });
                return}
            if(input2.toLowerCase() === walletAddress.toLowerCase()){
                toast('Can not tranfer license to yourself', { type: 'error',hideProgressBar: true, autoClose: 4000,position:'bottom-right' });
                return
                }
            setLoading2(true);
            const timeexpscannew = await addressContract.getExpSwap(input2);
            const currentTimeStampInSeconds = Math.floor(new Date().getTime() / 1000)          
            if(timeexpscannew > currentTimeStampInSeconds  ){
                    toast('New Wallet had license', { type: 'error',hideProgressBar: true, autoClose: 4000,position:'bottom-right' });
                    setLoading2(false)
                    return
                }
            const transaction = await addressContract.changeWalletSwap(input2);
            const result = await provider.waitForTransaction(transaction.hash)
            if(result.status ===1){
    
                toast('Change Successfull', { type: 'success',hideProgressBar: true, autoClose: 1000,position:'bottom-right' });
    
            }else {
                toast('Change Fail', { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
            }
            setLoading2(false);
            setReloadTotal(!reloadTotal);
    
            
            }
        } catch (error) {
            console.error('Error changeSeriNumber', error);
            setLoading2(false);
            toast(error.toString(), {hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });

            }}

    return (

        <div className={styles.grid}>
            <div className= {styles.card2}>
                <p>Change Serial TC SCAN</p>
                <input type="text"  placeholder = "Enter New Seri Number" onChange={(e) => setInput(e.target.value) }></input>
                <button type="button"  onClick ={changeSeriNumber} disabled={loading}>  {loading ? 'Changing...' : 'Change' }</button>
            </div>
            <div className= {styles.card2}>
                <p> Change TC SCAN Wallet</p>
                <input type="text"  placeholder = "Enter New Wallet Address" onChange={(e) => setInput1(e.target.value) }></input>
                <button type="button"  onClick ={changeWalletScan} disabled={loading1}>  {loading1 ? 'Changing...' : 'Change' }</button>
            </div>
            <div className= {styles.card2}>
                <p> Change TC SWAP Wallet</p>
                <input type="text"  placeholder = "Enter New Wallet Address" onChange={(e) => setInput2(e.target.value) }></input>
                <button type="button"  onClick ={changeWalletSwap} disabled={loading2}>  {loading2? 'Changing...' : 'Change' }</button>
            </div>
        </div>

    )
}
export default Tools;

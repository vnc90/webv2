'use client'
import { ethers } from 'ethers';
import { useEthereum } from '../context/EthereumContext';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { toast } from 'react-toastify';

function SellerPage() {
  const { provider, walletAddress, addressContract,reloadTotal, setReloadTotal } = useEthereum()
  const [customer, setCustomer] = useState([]);
  const [balanceMoney, setBalanceMoney] = useState(ethers.BigNumber.from('0'));
  const [loading, setLoading] = useState(false);
  const [hasRoleWithDraw, setHasRoleWithDraw] = useState(false)
  const [withdrawEnable, setWithdrawEnable] = useState(false)
  const [exp, setExp] = useState([])

  useEffect(() => {
    async function fetchExpDates(customers) {
        const expPromises = customers.map(async (wallet) => {
          try {
            const expScanPlus = await getExpTCSWAP(wallet);
            const expSwapPlus = await getExpTCSCAN(wallet);
            const expSwapPro = await getExpSwapEthPro(wallet);
            const expScanPro = await getExpScanEthPro(wallet);
            return {
              ScanPlus: expScanPlus,
              SwapPlus: expSwapPlus,
              SwapPro: expSwapPro,
              ScanPro: expScanPro,
            };
          } catch (error) {
            console.error(`Error fetching expiration data for wallet ${wallet}: ${error}`);
            return {
              ScanPlus: 'Error',
              SwapPlus: 'Error',
              SwapPro: 'Error',
              ScanPro: 'Error',
            };
          }
        });
    
        return await Promise.all(expPromises);
      }
    async function fetchBalance() {

      if (!walletAddress ) return;
      try {
        setHasRoleWithDraw(await addressContract.hasRole('0xe27592a68a79c541972a95a186227e8435146610cb2d3eb8f8589c9a507d61b2', walletAddress))
        setWithdrawEnable(await addressContract.withdrawEnable());
        const [money, customerAddresses] = await Promise.all([
            addressContract.getMoneyPendingSeller(walletAddress),
            addressContract.getTotalCustomer(walletAddress),
          ]);
        setBalanceMoney(money);
        setCustomer(customerAddresses);
        const expDates = await fetchExpDates(customerAddresses);
        setExp(expDates);

      }
      catch(err) {
      console.log(err);
      }
    }

    fetchBalance();
  }, [provider,walletAddress,reloadTotal]);

  async function withdraw() {
    try {
      if (addressContract) {
        
        if (balanceMoney.eq(0)) {
          toast("You don't have money to withdraw", { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
          return
        }
        setLoading(true);
        const transaction = await addressContract.withdrawSeller();
        const result = await provider.waitForTransaction(transaction.hash)
        if(result.status ===1){

          toast('Withdraw Successfull', { type: 'success',hideProgressBar: true, autoClose: 1000,position:'bottom-right' });

        }else {
          toast('Withdraw Fail', { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
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
   const calcuDay = (exp) => {
    const currentTimeStampInSeconds = Math.floor(new Date().getTime() / 1000)
    let day = (exp - currentTimeStampInSeconds)/86400;
    console.log(day);
    return day < 0 ? 0 : day.toFixed(1)
  }
  async function getExpTCSCAN(wallet){
    const exp = await addressContract.getExpScan(wallet)
    return calcuDay(exp)
  }

  async function getExpTCSWAP(wallet){
    const exp = await addressContract.getExpSwap(wallet)
    return calcuDay(exp)
  }

  async function getExpSwapEthPro(wallet){
    const exp = await addressContract.getExpSwapEthPro(wallet)
    return calcuDay(exp)
  }

  async function getExpScanEthPro(wallet){
    const exp = await addressContract.getExpScanEthPro(wallet)
    return calcuDay(exp)
  }
  if(hasRoleWithDraw){
    if(withdrawEnable){
     return (
            <>
            <div className={styles.card}>
            <p className= {styles.columeL}>Số Dư Hiện Tại: {parseFloat(ethers.utils.formatUnits(balanceMoney)).toFixed(2)} BNB</p>
            
            <div className={styles.colume}>
                    <button className={styles.gridButton}  onClick={withdraw} disabled={loading}>
                    {loading ? 'Đang Rút Tiền...' : 'Rút Tiền'}
                    </button>
                </div>
            </div>
            <table className='m-auto rounded-lg border border-gray-100 w-full'>
                <thead className='bg-gray-100 text-xs rounded-sm'>
                    <tr> 
                        <th className='text-center  font-normal px-1 py-1'>No.</th>
                        <th className='text-center font-normal'>Customer Address</th>
                        <th className='text-center  font-normal px-2 py-1'>Exp TC SWAP</th>
                        <th className='text-center font-normal px-2 py-1'>Exp TC SCAN</th>
                        <th className='text-center font-normal px-2 py-1'>Exp ETHER SWAP</th>
                        <th className='text-center font-normal px-2 py-1'>Exp ETHER SCAN</th>
                    </tr>
                </thead>
                <tbody>
                    {exp.map((item, index)=> (
                        <tr key={index}>
                            <td className='text-center' >{index + 1}</td>
                            <td className='text-center' >{customer[index]}</td>
                            <td className='text-center' >{item["ScanPlus"]}</td>
                            <td className='text-center' >{item["SwapPlus"]}</td>
                            <td className='text-center' >{item["SwapPro"]}</td>
                            <td className='text-center' >{item["ScanPro"]}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            </>)

    }else {
        return (<>
            <div className= "text-center text-xl2 pt-6">Số Dư Hiện Tại: {parseFloat(ethers.utils.formatUnits( balanceMoney)).toFixed(2)} BNB</div>
            <div className="text-center text-red-500 font-bold text-3xl pb-5"> Rút Tiền Đang Tạm Khóa </div>
            <table className='m-auto rounded-lg border border-gray-100 w-full pt-5'>
                <thead className='bg-gray-100 text-xs rounded-sm'>
                    <tr> 
                        <th className='text-center  font-normal px-1 py-1'>No.</th>
                        <th className='text-center font-normal'>Customer Address</th>
                        <th className='text-center  font-normal px-2 py-1'>Exp TC SWAP</th>
                        <th className='text-center font-normal px-2 py-1'>Exp TC SCAN</th>
                        <th className='text-center font-normal px-2 py-1'>Exp ETHER SWAP</th>
                        <th className='text-center font-normal px-2 py-1'>Exp ETHER SCAN</th>
                    </tr>
                </thead>
                <tbody>
                    {exp.map((item, index)=> (
                        <tr key={index}>
                            <td className='text-center' >{index + 1}</td>
                            <td className='text-center' >{customer[index]}</td>
                            <td className='text-center' >{item["ScanPlus"]}</td>
                            <td className='text-center' >{item["SwapPlus"]}</td>
                            <td className='text-center' >{item["SwapPro"]}</td>
                            <td className='text-center' >{item["ScanPro"]}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </>)
    }

    }  else {
    return <p className='text-center text-red-500 font-semibold text-4xl'>You Don't have accesss this funtion</p>
  }
}

export default SellerPage;

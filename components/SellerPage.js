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
  useEffect(() => {
    async function fetchBalance() {

      if (walletAddress ) {
        setHasRoleWithDraw(await addressContract.hasRole('0xe27592a68a79c541972a95a186227e8435146610cb2d3eb8f8589c9a507d61b2', walletAddress))
        setWithdrawEnable(await addressContract.withdrawEnable());
        const money = await addressContract.functions.getMoneyPendingSeller(walletAddress)
        setBalanceMoney(money[0])
        const cs =  await addressContract.functions.getTotalCustomer(walletAddress)
        setCustomer(cs[0])
      }
      else {
       return;
      }
    }

    fetchBalance();
  }, [provider,walletAddress,reloadTotal]);

  async function withdraw() {
    try {
        console.log(customer)
      if (addressContract) {
        
        if(!is_seller) { 
            toast("You do not have access to withdraw funds", { hideProgressBar: true, autoClose: 1000 ,position:'bottom-right',type: 'error' });
            return
        }
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
            <table className='m-auto'>
                <thead className='bg-gray-300'>
                    <tr> 
                        <th>No.</th>
                        <th>Customer Address</th>
                        <th>License Exp Days</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.map((item, index)=> (
                        <tr>
                            <td>{index}</td>
                            <td>{item}</td>
                            <td>abc</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            </>)

    }else {
        return (<>
            <div className= "text-center text-xl2 pt-6">Số Dư Hiện Tại: {parseFloat(ethers.utils.formatUnits( balanceMoney)).toFixed(2)} BNB</div>
            <div className="text-center text-red-500 font-bold text-3xl"> Rút Tiền Đang Tạm Khóa </div>
        </>)
    }

    }  else {
    return <p className='text-center text-red-500 font-semibold text-4xl'>You Don't have accesss this funtion</p>
  }
}

export default SellerPage;

'use client'
import { ethers } from 'ethers';
import { useEthereum } from '../context/EthereumContext';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { toast } from 'react-toastify';

function PageConfig() {

  const { provider, walletAddress, addressContract } = useEthereum();
  const [hasRoleAdmin, setHasRoleAdmin] = useState(false)
  const [hasRoleWithDraw, setHasRoleWithDraw] = useState(false)
  const [withdrawEnable, setWithdrawEnable] = useState(false)
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);

  const [vip, setVip] = useState('VIP1');
  const [input1, setInput1] = useState(['']);
  const [input2, setInput2] = useState(['']);
  const [input3, setInput3] = useState(['']);
  const [input4, setInput4] = useState(['']);
  const [input5, setInput5] = useState(['']);
  const [input6, setInput6] = useState(['']);
  const [input7, setInput7] = useState(['']);
  const [input8, setInput8] = useState(['']);
  const [input9, setInput9] = useState(['']);
  const [input10, setInput10] = useState(['']);
  const [input11, setInput11] = useState(['']);
  const [input12, setInput12] = useState(['']);
  const [input13, setInput13] = useState(['']);
  const [input14, setInput14] = useState(['']);
  const [input15, setInput15] = useState(['']);
  const [moneyPending, setMoneyPending] = useState(ethers.BigNumber.from(0));

  const [balanceBNB, setBlanceBNB] = useState(0);



 


  const ADMIN_ROLE = '0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42'
  const WITHDRAW_ROLE = '0x7a8dc26796a1e50e6e190b70259f58f6a4edd5b22280ceecc82b687b8e982869'

  useEffect(() => {
    async function fetchBalance() {

      if (walletAddress ) {

        if(await addressContract.hasRole(ADMIN_ROLE, walletAddress)) {
          setHasRoleAdmin(true)} else { setHasRoleAdmin(false)}
        if(await addressContract.hasRole(WITHDRAW_ROLE, walletAddress)) {
          setHasRoleWithDraw(true)} else { setHasRoleWithDraw(false)}
        
        setWithdrawEnable(await addressContract.withdrawEnable());
        setBlanceBNB(await provider.getBalance('0xf9734DAb975debaE20853EC2Cbd800F16417D11F'))
        setMoneyPending(await addressContract.getTotalMoneyPendingSeller())
      }
      else {
       return;
      }
    }

    fetchBalance();
  }, [provider,walletAddress]);

  function setLoadingFail(){
    setLoading(false);
    setLoading1(false);
    setLoading2(false);
    setLoading3(false);
    setLoading4(false);
    setLoading5(false);
    setLoading6(false);
    setLoading7(false);


  }
  function handleVipChanged(event) {
  
    const vipGet = event.target.value;
    if (vipGet === 'VIP1'){
      setVip(1)
    }else if (vipGet === 'VIP2'){
      setVip(2)
    }else if (vipGet === 'SuperVIP'){
      setVip(3)
    }else {
      setVip(0)
    }
  }

  function reTurnTimeStamp(day){
    const currentTimeStampInSeconds = Math.floor(new Date().getTime() / 1000)
    return currentTimeStampInSeconds + (day*86400)
  }
  async function setConfig(FT) {
    let transaction
    try {
        if(FT === "01") {
          setLoading(true);
          transaction = await addressContract.setSeriNumber(input2,input1);
        }else if(FT === "02") {
          setLoading1(true);
          transaction = await addressContract.setLicenseScan(input3,reTurnTimeStamp(input4),vip);
        }else if(FT === "03") {
          setLoading2(true);
          transaction = await addressContract.setLicenseScanETH(input5,reTurnTimeStamp(input6));
        }else if(FT === "04") {
          setLoading3(true);
          transaction = await addressContract.setLicenseSwap(input7,reTurnTimeStamp(input8));
        }else if(FT === "05") {
          setLoading4(true);
          transaction = await addressContract.setLicenseStoploss(input9,reTurnTimeStamp(input10));
        }else if(FT === "06") {
          setLoading5(true);
          transaction = await addressContract.withdrawBNBLimit(Math.round(input11*(10**18)).toString());
        }else if(FT === "07") {
          setLoading6(true);
          transaction = await addressContract.setLicenseStoploss(input12,reTurnTimeStamp(input13));
        }else if(FT === "08") {
          setLoading7(true);
          transaction = await addressContract.setLicenseStoploss(input14,reTurnTimeStamp(input15));
        }
        const result = await provider.waitForTransaction(transaction.hash)
        if(result.status ===1){
          toast('Set Successfull', { type: 'success',hideProgressBar: true, autoClose: 3000,position:'bottom-right' });
        }else {
          toast('Set Fail', { hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
        }
        setLoadingFail();

    } catch (error) {
      console.log(withdrawEnable);
      console.error('Error disconnecting from MetaMask:', error);
      setLoadingFail();
      toast(error.toString(), {hideProgressBar: true, autoClose: 3000 ,position:'bottom-right',type: 'error' });
      // setReloadComponent(!reloadComponent);

    }
  }

  if(hasRoleAdmin){

    return (
      <div className='text-xs font-medium'>
      <div className="footer-line"><style jsx>{`
        .footer-line {
          width: 100%;
          height: 1px;
          background-color: #ddd;
          margin: 10px 0;

        }
      `}</style></div>
      <div className="font-medium text-xl text-center text-blue-600 ">
        Số Tiền Đang Pending cho Seller : {ethers.utils.formatEther(moneyPending)} BNB
      </div>
      <div className={styles.grid}>
        <div className= {styles.card2}>
            <p>Set Serial TC SCAN</p>
            <input type="text"  placeholder = "Nhập Số Seri Tại Đây" onChange={(e) => setInput1(e.target.value) }></input>
            <input type="text"  placeholder = "Nhập Địa Chỉ Ví Tại Đây" onChange={(e) => setInput2(e.target.value) }></input>
            <button type="button"  onClick ={() => setConfig("01")} disabled={loading}>  {loading ? 'Đang Set SeriNumber...' : 'Set' }</button>
        </div>
        <div className= {styles.card2}>
            <p>Gia Hạn TC SCAN</p>
            <input type="text"  placeholder = "Nhập Địa Chỉ Ví" onChange={(e) => setInput3(e.target.value) }></input>
            <select onChange={handleVipChanged}>
              <option value="VIP0">Chọn VIP</option>
              <option value="VIP1">VIP1</option>
              <option value="VIP2">VIP2</option>
              <option value="SuperVIP">SuperVIP</option>
            </select>
            <input type="number"  placeholder = "Nhập Số Ngày Gia Hạn" onChange={(e) => setInput4(e.target.value) }></input>
            <button type="button"  onClick ={ () => setConfig("02")} disabled={loading1}>  {loading1 ? 'Đang Gia Hạn...' : 'Gia Hạn' }</button>
        </div>
        <div className= {styles.card2}>
            <p>Gia Hạn TC SCAN ETH</p>
            <input type="text"  placeholder = "Nhập Địa Chỉ Ví" onChange={(e) => setInput5(e.target.value) }></input>
            <input type="number"  placeholder = "Nhập Số Ngày Gia Hạn" onChange={(e) => setInput6(e.target.value) }></input>
            <button type="button"  onClick ={() => setConfig("03")} disabled={loading2}>  {loading2? 'Đang Gia Hạn...' : 'Gia Hạn' }</button>
        </div>
      </div>
      <div className="footer-line"><style jsx>{`
        .footer-line {
          width: 100%;
          height: 1px;
          background-color: #ddd;
          margin: 10px 0;

        }
      `}</style></div>
      <div className={styles.grid}>

        <div className= {styles.card2}>
            <p>Gia Hạn TC SWAP</p>
            <input type="text"  placeholder = "Nhập Địa Chỉ Ví" onChange={(e) => setInput7(e.target.value) }></input>
            <input type="number"  placeholder = "Nhập Số Ngày Gia Hạn" onChange={(e) => setInput8(e.target.value) }></input>
            <button type="button"  onClick ={() => setConfig("04")} disabled={loading3}>  {loading3? 'Đang Gia Hạn...' : 'Gia Hạn' }</button>
        </div>
        <div className= {styles.card2}>
            <p>Gia Hạn STOPLOSS</p>
            <input type="text"  placeholder = "Nhập Địa Chỉ Ví" onChange={(e) => setInput9(e.target.value) }></input>
            <input type="number"  placeholder = "Nhập Số Ngày Gia Hạn" onChange={(e) => setInput10(e.target.value) }></input>
            <button type="button"  onClick ={() => setConfig("05")} disabled={loading4}>  {loading4? 'Đang Gia Hạn...' : 'Gia Hạn' }</button>
        </div>
      </div>
      <div className="footer-line"><style jsx>{`
        .footer-line {
          width: 100%;
          height: 1px;
          background-color: #ddd;
          margin: 10px 0;

        }
      `}</style></div>
      <div className={styles.grid}>
        {/* @todo 7 8 9 10 */}
        <div className= {styles.card2}>
            <p>Gia Hạn ETHER SWAP PRO</p>
            <input type="text"  placeholder = "Nhập Địa Chỉ Ví" onChange={(e) => setInput12(e.target.value) }></input>
            <input type="number"  placeholder = "Nhập Số Ngày Gia Hạn" onChange={(e) => setInput13(e.target.value) }></input>
            <button type="button"  onClick ={() => setConfig("07")} disabled={loading6}>  {loading6? 'Đang Gia Hạn...' : 'Gia Hạn' }</button>
        </div>
        <div className= {styles.card2}>
            <p>Gia Hạn ETHER SCAN PRO</p>
            <input type="text"  placeholder = "Nhập Địa Chỉ Ví" onChange={(e) => setInput14(e.target.value) }></input>
            <input type="number"  placeholder = "Nhập Số Ngày Gia Hạn" onChange={(e) => setInput15(e.target.value) }></input>
            <button type="button"  onClick ={() => setConfig("08")} disabled={loading7}>  {loading7? 'Đang Gia Hạn...' : 'Gia Hạn' }</button>
        </div>
      </div>
      <div className="footer-line"><style jsx>{`
        .footer-line {
          width: 100%;
          height: 1px;
          background-color: #ddd;
          margin: 10px 0;

        }
      `}</style></div>
      <div className= {styles.grid}>
      <div>
        { !hasRoleWithDraw ? null :
        <>
        <div className= {styles.card2}>
            {!withdrawEnable? <p>Rút Tiền Đang Tạm Khóa</p> : <p>Rút Tiền Về Ví</p>}
            <p>Số dư: {ethers.utils.formatUnits(balanceBNB)} BNB</p>
            <input type="number"  placeholder = "Nhập Số BNB Muốn Rút" onChange={(e) => setInput11(e.target.value) }></input>
            <button type="button"  onClick ={() => setConfig("06")} disabled={loading5}>  {loading5? 'Đang Rút Tiền...' : 'Rút Tiền'  }</button>
        </div>
        </>}
      </div>
          </div>
    </div>
    );
  }else {
    return <p>You Don't have accesss this funtion</p>
  }

}

export default PageConfig;

import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import MetaMaskButton from '../components/MetaMaskButton';
import LoadLicense from '../components/LoadLicense';
import LoadLicenseScan from '../components/LoadLicenseScan';
import PriceAndBalances from '../components/PriceAndBalances';
import LoadLicenseCombo from '../components/LoadLicenseCombo';
import Tools  from '../components/Tools';
import BuySwapEthPro from '../components/ethpro/BuySwapEthPro';
import BuyScanEthPro from '../components/ethpro/BuyScanEthPro';
import BuyComboEtherPro from '../components/ethpro/BuyComboEthPro';
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <MetaMaskButton />
        <div className="page-container">
          
          {/* <PriceAndBalances /> */}

        </div>  
        <div className='font-normal text-base'>
        <div className='border-t border-gray-300 mx-auto w-full m-5'></div>
        <h1 className='font-medium text-xl'>TC SCAN LICENSE:</h1> 
         <LoadLicenseScan/>
         <h1 className='font-medium text-xl'>TC SWAP LICENSE:</h1> 
        <LoadLicense/>
        <h1 className='font-medium text-xl'>BUY TC SCAN + SWAP BOT:</h1> 
        <LoadLicenseCombo/>
        <div className='border-t border-blue-700 mx-auto w-full mb-3'></div>
        <h1 className='font-medium text-xl'>ETHER SWAP PRO LICENSE:</h1>
        <BuySwapEthPro/>
        <h1 className='font-medium text-xl'>ETHER SCAN PRO LICENSE:</h1>
        <BuyScanEthPro/>
        <h1 className='font-medium text-xl'>BUY COMBO ETHER SCAN PRO + ETHER SWAP PRO:</h1>
        <BuyComboEtherPro/>      
        
        <div className='border-t border-blue-700 mx-auto w-full mb-3'></div>
        <h1 className='font-medium text-xl'>Tools: </h1>
         <Tools />
         <div className="footer-line"><style jsx>{`
        .footer-line {
          width: 100%;
          height: 1px;
          background-color: #ddd;
          margin: 10px 0;

        }
      `}</style></div>
      </div>
        <p>
          Download Bots on{' '}
          <a href="https://drive.google.com/drive/folders/1jKJeeRnqAKy1paZShIFgNKPlfSraxKrb">Google Driver</a>, Contact Us on  {' '}
          <a href="https://t.me/vnctools">Telegram</a>.
        </p>
        <p>&copy; 2023 TCBOT.US . All rights reserved.</p>
      </section>
    </Layout>
  );
}
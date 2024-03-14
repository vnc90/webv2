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
          
          <PriceAndBalances />
        <style jsx>{`
        .page-container {
          margin-top: 10px;
          display: flex;
          justify-content: center; /* Center horizontally */

        }
      `}</style>
        </div>        
        <h1>TC SCAN LICENSE:</h1> 
         <LoadLicenseScan/>
         <h1>TC SWAP LICENSE:</h1> 
        <LoadLicense/>
        <h1>BUY SCAN + SWAP BOT :</h1> 
        <LoadLicenseCombo/>
        <h1>BUY ETHER SWAP PRO:</h1>
        <BuySwapEthPro/>
        <h1>BUY ETHER SCAN PRO:</h1>
        <BuyScanEthPro/>
        <h1>BUY COMBO ETHER SCAN PRO + ETHER SWAP PRO:</h1>
        <BuyComboEtherPro/>
         <h1>Tools: </h1>
         <Tools />
         <div className="footer-line"><style jsx>{`
        .footer-line {
          width: 100%;
          height: 1px;
          background-color: #ddd;
          margin: 10px 0;

        }
      `}</style></div>
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
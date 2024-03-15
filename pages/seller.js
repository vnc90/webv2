import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import MetaMaskButton from '../components/MetaMaskButton';
import PriceAndBalances from '../components/PriceAndBalances';
import SellerPage from '../components/SellerPage';


export default function admin() {

  return (
    <>
    <Layout>
      <Head>
        <title>SELLER PAGE</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <MetaMaskButton />
        <div className="flex mt-[10px] justify-center">
          
          <PriceAndBalances />
        </div>     
    </section>
    <div className="border-t mt-4"></div>
    <SellerPage/>
    </Layout>
    </>
  );
}
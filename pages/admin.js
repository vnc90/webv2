import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import MetaMaskButton from '../components/MetaMaskButton';
import PriceAndBalances from '../components/PriceAndBalances';
import PageConfig from '../components/AdminSetPrice';

export default function admin() {

  return (
    <>
    <Layout>
      <Head>
        <title>TC TOOLs Admin</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <MetaMaskButton />
        <div className="page-container">
{/*           
          <PriceAndBalances /> */}

        </div>     
        <PageConfig/>

    </section>

    </Layout>
    </>
  );
}
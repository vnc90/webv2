import '../styles/global.css';
import React from 'react';
import { EthereumProvider } from '../context/EthereumContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return (
  <EthereumProvider>
  <Component {...pageProps} />
  <ToastContainer  />
  </EthereumProvider>)
 
}

import '../styles/globals.css'
import Layout from '../components/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { SessionProvider } from "next-auth/react"
import React, { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  const { session, ...otherPageProps } = pageProps;

 

  return (<>
   {/*  // <SessionProvider session={session}> */}
      <Layout>
       
        <Component {...otherPageProps} />
        
        <Analytics/>
        <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        />
      </Layout>
    {/* //</SessionProvider> */}

    </>
  )
}

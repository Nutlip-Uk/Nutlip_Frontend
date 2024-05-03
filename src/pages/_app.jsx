import '../styles/globals.css'
import { useState, useEffect } from "react";
import Layout from '../components/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }) {
  const { session, ...otherPageProps } = pageProps;

  const [dotco, setDotco]=useState(true);

  const router = useRouter()

  useEffect(() => {
    // Check if we're on the /transaction page and dotco is true
    if (dotco && router.pathname === '/transactions' || router.pathname==="/mortgages/result" || router.pathname==="/conveyancer/result") {
      // Redirect to the root URL
      router.replace('/comingsoon');
    }
  }, [dotco, router.pathname]);
 

  return (
    // <SessionProvider session={session}>
    
      <Layout>
       
        <Component {...otherPageProps} />
        

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
    
   
  )
}

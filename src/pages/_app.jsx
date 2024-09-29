import '../styles/globals.css'
import { useState, useEffect } from "react";
import Layout from '../components/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import 'rsuite/dist/rsuite-no-reset.min.css';

export default function App({ Component, pageProps }) {
  const { session, ...otherPageProps } = pageProps;
  const router = useRouter();
  const [userInformation, setUserInformation] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Access localStorage here to avoid SSR issues
    setUserInformation(localStorage.getItem('userInformation'));
    setUserType(localStorage.getItem('userType'));
  }, []);

  useEffect(() => {
    if (!router.isReady || userInformation === null || userType === null) return;

    const protectedRoutes = {
      '/dashboard': () => userType === 'Real_estate_agent',
      '/mortgages/result': () => false, // Always redirect
    };

    const currentRoute = router.pathname;
    const isProtected = protectedRoutes[currentRoute];

    if (isProtected) {
      const hasAccess = isProtected();
      if (!hasAccess || userType === null || userInformation === null) {
        console.log(`Redirecting from ${currentRoute} to /accessdenied`);
        router.replace('/accessdenied');
      }
    }
  }, [router.isReady, userInformation, userType, router.pathname, router]);

  return (
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
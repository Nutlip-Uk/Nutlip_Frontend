import Hero from '../components/Home/Hero';
import Why from '../components/Home/Why';
import Revolutionizing from '../components/Home/Revolutionizing';
import PropertyView from '../components/Home/PropertyView';
import Welcome from '../components/welcome/welcome';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/Login.context';
import { UserTypeContext } from '../context/UserType.context';
import { useRouter } from 'next/router';
import VirtualTourViewer from '../components/virtualTour';

export default function Home() {
  const router = useRouter();
  const { userInformation } = useContext(LoginContext);
  const { userType } = useContext(UserTypeContext);

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
    <main className='wrapper'>
      {userInformation?.user?.newUser === true ? <Welcome /> : null}

      <Hero />
      <Revolutionizing />
      <PropertyView />
      <Why />

    </main>
  );
}
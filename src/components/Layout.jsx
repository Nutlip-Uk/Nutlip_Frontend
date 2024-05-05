import { AppProps } from "next/app";
import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RegistrationContextProvider } from "../context/Register.context";
import { AgentOfferContextProvider } from "../context/AgentOffer.context";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider, useSession } from "next-auth/react";
import Script from "next/script";


const Layout = ({ children }) => {

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
  //   const { data: session } = useSession();
  return (
    <SessionProvider>
      <div className="font-poppins">
         
         <Script
  defer
  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initmap`} 
></Script>
   
        <RegistrationContextProvider>
          <Navbar />
          <AgentOfferContextProvider>
            {children}
            <Analytics />
          </AgentOfferContextProvider>
          <Footer />
        </RegistrationContextProvider>
      </div>
    </SessionProvider>
  );
};

export default Layout;

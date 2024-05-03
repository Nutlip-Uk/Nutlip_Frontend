import { AppProps } from "next/app";
import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RegistrationContextProvider } from "../context/Register.context";
import { AgentOfferContextProvider } from "../context/AgentOffer.context";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider, useSession } from "next-auth/react";
import Head from "next/head";
import { GOOGLE_MAPS_API_KEY } from '../utils/keys';

const Layout = ({ children }) => {
  //   const { data: session } = useSession();
  return (
    <SessionProvider>
      <div className="font-poppins">
         <Head>
         <script
  defer
  src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`} 
></script>
      </Head>
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

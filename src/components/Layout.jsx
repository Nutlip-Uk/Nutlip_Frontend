import { AppProps } from "next/app";
import { PropsWithChildren, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RegistrationContextProvider } from "../context/Register.context";
import { AgentOfferContextProvider } from "../context/AgentOffer.context";
import { ImageProvider } from "../context/ImageContext.context";
import { PrivatePostPropertyContextProvider } from "../context/privatePostProperty.context";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider, useSession } from "next-auth/react";
import LoginProvider, { LoginContext } from "../context/Login.context";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { MakeAnOfferProvider } from "../context/MakeAnOffer.context";
import { UserTypeContext, UserTypeProvider } from "../context/UserType.context";
import { BuyProvider } from "../context/Buy.context";



const Layout = ({ children }) => {


  //   const { data: session } = useSession();




  return (
    <SessionProvider>
      <div className="font-poppins">


        <BuyProvider>
          <AntdRegistry>
            <MakeAnOfferProvider>
              <PrivatePostPropertyContextProvider>
                <ImageProvider>
                  <LoginProvider>
                    <RegistrationContextProvider>
                      <UserTypeProvider>
                        <Navbar />
                        <AgentOfferContextProvider>
                          {children}
                          <Analytics />
                        </AgentOfferContextProvider>
                        <Footer />
                      </UserTypeProvider>
                    </RegistrationContextProvider>
                  </LoginProvider>
                </ImageProvider>
              </PrivatePostPropertyContextProvider>
            </MakeAnOfferProvider>
          </AntdRegistry>
        </BuyProvider>


      </div>
    </SessionProvider>
  );
};

export default Layout;

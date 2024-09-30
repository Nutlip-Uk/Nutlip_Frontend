import { AppProps } from "next/app";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RegistrationContextProvider } from "../context/Register.context";
import { AgentOfferContextProvider } from "../context/AgentOffer.context";
import { ImageProvider, useImageContext } from "../context/ImageContext.context";
import { PrivatePostPropertyContextProvider } from "../context/privatePostProperty.context";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider, useSession } from "next-auth/react";
import LoginProvider, { LoginContext } from "../context/Login.context";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { MakeAnOfferProvider } from "../context/MakeAnOffer.context";
import { UserTypeContext, UserTypeProvider } from "../context/UserType.context";
import { BuyProvider } from "../context/Buy.context";
import Loading from "./Loading";
import { CustomProvider } from 'rsuite';


const Layout = ({ children }) => {

  return (
    <CustomProvider >


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
    </CustomProvider>
  );
};

export default Layout;

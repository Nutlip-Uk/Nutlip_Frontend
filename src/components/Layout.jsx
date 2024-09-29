import { AppProps } from "next/app";
<<<<<<< HEAD
import { PropsWithChildren, useContext, useEffect, useState } from "react";
=======
import { PropsWithChildren, useContext, useEffect } from "react";
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RegistrationContextProvider } from "../context/Register.context";
import { AgentOfferContextProvider } from "../context/AgentOffer.context";
<<<<<<< HEAD
import { ImageProvider, useImageContext } from "../context/ImageContext.context";
=======
import { ImageProvider } from "../context/ImageContext.context";
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
import { PrivatePostPropertyContextProvider } from "../context/privatePostProperty.context";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider, useSession } from "next-auth/react";
import LoginProvider, { LoginContext } from "../context/Login.context";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { MakeAnOfferProvider } from "../context/MakeAnOffer.context";
import { UserTypeContext, UserTypeProvider } from "../context/UserType.context";
import { BuyProvider } from "../context/Buy.context";
<<<<<<< HEAD
import Loading from "./Loading";
import { CustomProvider } from 'rsuite';
=======

>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731


const Layout = ({ children }) => {

<<<<<<< HEAD
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
=======

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
>>>>>>> 3a30097087fe14f9e156140d83b0807a172c1731
  );
};

export default Layout;

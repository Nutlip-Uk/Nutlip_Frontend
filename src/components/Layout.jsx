import { AppProps } from "next/app"
import { PropsWithChildren } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { RegistrationContextProvider } from "../context/Register.context"
import { AgentOfferContextProvider } from "../context/AgentOffer.context"


const Layout = ({ children }) => {
    return (
        <div className="font-poppins">
            <RegistrationContextProvider>
                <Navbar/>
                    <AgentOfferContextProvider>
                        {children}
                    </AgentOfferContextProvider>
                <Footer />
            </RegistrationContextProvider>
        </div>
    )
}


export default Layout
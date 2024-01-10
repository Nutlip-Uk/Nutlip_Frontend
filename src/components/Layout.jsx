import { AppProps } from "next/app";
import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="font-poppins">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

import Image from "next/image";
import styles from "../styles/Navbar.module.css"
import sty from "../styles/MainNav.module.css";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
// import { RegistrationContext, } from '../context/Register.context'
// import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const router = useRouter();
  


  return (
   <div className={sty.navigation}>
     <nav className={sty.nav}>
      <div
        className={`${router.pathname === "/register" ? sty.reg : sty.NavMain}`}
      >
        <Link href="/">
          <Image src="/nav_icon.svg" width={130} height={90} alt={""} />
        </Link>
        {router.pathname === "/register" ? null : <MainNavbar />}
      </div>
    </nav>
   </div>
  );
};


export default Navbar;

const MainNavbar = () => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);

  const router = useRouter();
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  useEffect(() => {
    setOpen(false);

    setNotification(false);
  }, [router]);

  return (
    <>
      <div className={`${open ? sty.navContainer : sty.Hide}`}>
        <div className={`${open ? sty.navLinks : sty.Hide}`}>
          <li>
            <Link href={"/comingsoon"}>Sell</Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/comingsoon",
              }}
            >
              Buy
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/comingsoon",
              }}
            >
              Rent
            </Link>
          </li>
          <li>
            <Dropdown>
              <MenuButton endDecorator={<ArrowDropDown />}>Services</MenuButton>
              <Menu>
                <Link href={"/comingsoon"} className={sty.textdoc}>
                <MenuItem>Find Mortgage broker</MenuItem>
                </Link>
               <Link href={"/comingsoon"} className={sty.textdoc}>
               <MenuItem>Find a Conveyancer</MenuItem>
               </Link>
              </Menu>
            </Dropdown>
          </li>
          <li>
            <a>Blockchain</a>
          </li>
          <div className={sty.NavLogin}>
            <Link
              href={ "/comingsoon"}
            >
              Sign up
            </Link>
            <Link
              href={{
                pathname: "/comingsoon",
              }}
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>

      <div className={sty.MenuBtn}>
        <Image
          className={``}
          src={open ? "/close-icon.svg" : "/menu_icon.svg"}
          width={30}
          height={30}
          alt={""}
          onClick={() => {
            setOpen(!open);
          }}
        />
      </div>

      {/* <div id="google_translate_element"></div> */}
    </>
  );
};


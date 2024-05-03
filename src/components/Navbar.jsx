import Image from "next/image";
import sty from "../styles/MainNav.module.css";
import {  useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { RegistrationContext } from "../context/Register.context";
// import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const router = useRouter();
  const { userInformation } = useContext(RegistrationContext);

  return (
    <div className={sty.navigation}>
      <nav className={sty.nav}>
        <div
          className={`${
            router.pathname === "/register" ? sty.reg : sty.NavMain
          }`}
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
  const { userInformation } = useContext(RegistrationContext);

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [popup, setPopup] = useState(false);

  const router = useRouter();
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
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

  const Popped = () => {
    setPopup(!popup);
    setOpen(false)
  };

  return (
    <>
      <div className={`${open ? sty.navContainer : sty.Hide}`}>
        <div className={`${open ? sty.navLinks : sty.Hide}`}>
          <li>
            <Link href={"/sell"}>Sell</Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/buy",
              }}
            >
              Buy
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/rent",
              }}
            >
              Rent
            </Link>
          </li>
          <li>
            <Dropdown>
              <MenuButton endDecorator={<ArrowDropDown />}>Services</MenuButton>
              <Menu>
                <Link href={"/mortgages"} className={sty.textdoc}>
                  <MenuItem>Find Mortgage broker</MenuItem>
                </Link>
                <Link href={"/conveyancer"} className={sty.textdoc}>
                  <MenuItem>Find a Conveyancer</MenuItem>
                </Link>
              </Menu>
            </Dropdown>
          </li>
          <li>
            <a href={"https://nutlip-blockchain.vercel.app"}>Blockchain</a>
          </li>

          {userInformation ? (
            <>
               <div className={sty.UserLogContainer} >
                <div className={sty.userInfo} onClick={Popped}>
                  <img src="/navbar/userimg.png" alt="" />
                  <p>{userInformation?.user?.name}</p>
                </div>  

                <img src="/navbar/notification.png" alt="" />
              </div>
            </>
          ) : (
            <div className={sty.NavLogin}>
              <Link href={"/register?option=signup"}>Login</Link>
              <Link
                href={{
                  pathname: "/register",
                }}
              >
                Book a demo
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className={sty.MenuBtn}>
        <img src="/navbar/notification.png" alt="" />
        <div className={sty.MobileuserInfo} onClick={Popped}>
          <img src="/navbar/userimg.png" alt="" />
        </div>

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

      {popup ? (
                <>
                  <div className={sty.userPopUpContainer}>
                    <div className={sty.popUpHeader}>
                      <img src="/navbar/userimg.png/" alt="" />
                      <p>{userInformation?.user?.email}</p>
                    </div>
                    <div className={sty.popUpList}>
                      <div className={sty.popUplink}>
                        <img src="/navbar/search.svg" />
                        <p>Recent Search</p>
                      </div>
                      <hr />
                      <div className={sty.popUplink}>
                        <img src="/navbar/heart.svg" />
                        <p>Saved properties</p>
                      </div>
                      <hr />
                      <div className={sty.popUplink}>
                        <img src="/navbar/transaction.svg" />
                        <Link href={"/transactions"}>Transactions</Link>
                      </div>
                      <hr />
                      <div className={sty.popUplink}>
                        <img src="/navbar/settings.svg" />
                        <p>Account settings</p>
                      </div>
                      <hr />
                      <div className={sty.popUplink}>
                        <img src="/navbar/logout.svg" />
                        <p>Logout</p>
                      </div>

                      <button>Book a demo</button>
                    </div>
                  </div>
                </>
              ) : null}
    </>
  );
};

import Image from "next/image";
import sty from "../styles/MainNav.module.css";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RegistrationContext } from "../context/Register.context";
import { LoginContext } from "../context/Login.context";
// import { signOut, useSession } from 'next-auth/react'
// import { DownOutlined } from "@ant-design/icons";
// import { Dropdown, Space } from "antd";

const Navbar = () => {
  const router = useRouter();

  const { userInformation, setUserInformation, handleLogout } =
    useContext(LoginContext);
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
          {router.pathname === "/register" ? null : (
            <MainNavbar
              userInformation={userInformation}
              handleLogout={handleLogout}
              
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const MainNavbar = ({ userInformation, handleLogout }) => {
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
    setOpen(false);
  };

  const items = [
    {
      key: "1",
      label: <Link href="/mortgages">Find Mortgage broker</Link>,
    },
    {
      key: "2",
      label: <Link href="/conveyancer">Find a Conveyancer</Link>,
    },
  ];

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
            {/* <Dropdown menu={{ items }}> */}
            <a onClick={(e) => e.preventDefault()}>
              {/* <Space> */}
              Services
              {/* <DownOutlined /> */}
              {/* </Space> */}
            </a>
            {/* </Dropdown> */}
          </li>
          <li>
            <a href={"https://blockchain.nutlip.co.uk"}>Blockchain</a>
          </li>

          {userInformation?.user ? (
            <>
              <div className={sty.UserLogContainer}>
                <div className={sty.userInfo} onClick={Popped}>
                  {userInformation.user?.name ? (
                    <img src="/navbar/userimg.png" alt="" />
                  ) : null}
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
        {userInformation?.user ? (
          <>
            {" "}
            <img src="/navbar/notification.png" alt="" />
            <div className={sty.MobileuserInfo} onClick={Popped}>
              <img src="/navbar/userimg.png" alt="" />
            </div>{" "}
          </>
        ) : null}

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

      {/*<div id="google_translate_element"></div>*/}

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
                <p onClick={handleLogout}>Logout</p>
              </div>

              <button>Book a demo</button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
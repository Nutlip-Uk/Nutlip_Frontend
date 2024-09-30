import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard/main.module.css";
import { useRouter } from "next/router";
import PostProperty from './../../components/dashboard/PostProperty';
import Listing from './../../components/dashboard/Listing';
import Transactions from './../../components/dashboard/Transactions';
import Subscription from './../../components/dashboard/Subscription';
import Statistics from './../../components/dashboard/Statistics';
import Messages from './../../components/dashboard/Messages';
import Favourites from './../../components/dashboard/Favourites';
import Account from './../../components/dashboard/Account';



export default function Dashboard() {

  const router = useRouter();
  const data = router.query;
  const [type, setType] = useState(data.option);
  let postProperty = "postProperty";
  let listing = "listing";
  let transactions = "transaction";
  let subscription = "subscription";
  let statistics = "statistics";
  let messages = "messages";
  let favourites = "favourites";
  let account = "account";

  useEffect(() => {
    setType(data.option);
  });
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.Section}>
      <div className={`${open ? styles.Sidebar : styles.CloseSidebar}`}>
        <div className={styles.sidebaricon} onClick={() => setOpen(!open)}>
          {open ? "<" : ">"}
        </div>
        <div className={styles.SidebarLink}>
          <img src="/dashboard/dashboardicons/dashboard.svg" alt="" />
          <p>Dashboard</p>
        </div>
        <div className={`${type === "postProperty" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${postProperty}`)}

        >
          <img src="/dashboard/dashboardicons/post.svg" alt="" />
          <p>Post Property</p>
        </div>

        <div className={`${type === "listing" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${listing}`)}>
          <img src="/dashboard/dashboardicons/listing.svg" alt="" />
          <p>My Listings</p>
        </div>

        <div className={`${type === "transaction" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${transactions}`)}>
          <img src="/dashboard/dashboardicons/transactions.svg" alt="" />
          <p>Transactions</p>
        </div>

        <div className={`${type === "subscription" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${subscription}`)}>
          <img src="/dashboard/dashboardicons/subscription.svg" alt="" />
          <p>Subscriptions</p>
        </div>

        <div className={`${type === "statistics" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${statistics}`)}>
          <img src="/dashboard/dashboardicons/statistics.svg" alt="" />
          <p onClick={() => setOpen(false)}>Statistics</p>
        </div>

        <div className={`${type === "messages" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${messages}`)}>
          <img src="/dashboard/dashboardicons/messages.svg" alt="" />
          <p>Messages</p>
        </div>

        <div className={`${type === "favourites" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${favourites}`)}>
          <img src="/dashboard/dashboardicons/favourites.svg" alt="" />
          <p>Favourites</p>
        </div>

        <div className={`${type === "account" ? styles.selected : styles.SidebarLink}`}
          onClick={() => router.push(`/dashboard?option=${account}`)}>
          <img src="/dashboard/dashboardicons/account.svg" alt="" />
          <p>Account</p>
        </div>

        <div className={styles.SidebarLink} >
          <img src="/dashboard/dashboardicons/signout.svg" alt="" />
          <p>Sign Out</p>
        </div>
      </div>


      <div className={styles.mainContent}>
        {type === "" && <PostProperty />}
        {type === "postProperty" && <PostProperty />}
        {type === "listing" && <Listing />}
        {type === "transaction" && <Transactions />}
        {type === "subscription" && <Subscription />}
        {type === "statistics" && <Statistics />}
        {type === "messages" && <Messages />}
        {type === "favourites" && <Favourites />}
        {type === "account" && <Account />}
      </div>
    </div>
  );
}















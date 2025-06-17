import React, { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";
import TweetForm from "./TweetForm";
import Tweet from "./Tweet";
import Trends from "./Trends";

function Home() {
  const [user, setUser] = useState(null);
  return (
    <div className={styles.container}>
      <aside className={styles.sidebarLeft}>
        <div className={styles.high}>
          <img
            src="../images/logo.png"
            alt="Logo site"
            className="logo"
            width={85}
          />
        </div>
        <div className={styles.down}>
          <img
            src="../images/user.png"
            alt="Avatar"
            className="avatar"
            width={30}
          />
          <div className="user-info">
          <strong>John </strong>
          <span>@JohnCena </span>
          </div>
          <button className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.inputBox}>
          <TweetForm />
        </div>
        <div className={styles.tweetsList}>
          <Tweet />
          <Tweet />
        </div>
      </main>
      <aside className={styles.sidebarRight}>
        <Trends />
      </aside>
    </div>
  );
}

export default Home;

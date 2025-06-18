import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import TweetForm from "./TweetForm";
import Tweet from "./Tweet";
import Trends from "./Trends";

function Home() {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const handleNewTweet = (text) =>
    setTweets([{ id: Date.now(), text }, ...tweets]);
  return (
    <div className={styles.container}>
      <aside className={styles.sidebarLeft}>
        <div className={styles.top}>
          <img
            src="../images/logo.png"
            alt="Logo site"
            className={styles.logo}
            width={85}
          />
        </div>
        <div className={styles.userSection}>
          <div className={styles.userRow}>
            <img
              src="../images/user.png"
              alt="Avatar"
              className={styles.avatar}
              width={60}
            />
            <div className={styles.userInfo}>
              <strong>John</strong>
              <span>@JohnCena</span>
            </div>
          </div>
          <button className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.inputBox}>
          <TweetForm onNewTweet={handleNewTweet} />
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
        <div className={styles.tweetsList}>
          <Tweet />
          <Tweet />
        </div>
      </main>
      <aside className={styles.sidebarRight}>
        <Trends tweets={tweets}/>
      </aside>
    </div>
  );
}

export default Home;

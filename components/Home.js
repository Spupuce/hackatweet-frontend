import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/user";
import styles from "../styles/Home.module.css";
import TweetForm from "./TweetForm";
import Tweet from "./Tweet";
import Trends from "./Trends";

function Home() {
  // data & input
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log("page Home user: ", user);
  const toto = fetch("http://localhost:3000/tweets/")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch tweets: ", data);
    });
  console.log("getTweets: ", toto);
  const [tweets, setTweets] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (selectedTag) {
      fetch(`/tweets/hashtags/${selectedTag.replace('#', '')}`)
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
    } else {
      fetch("/tweets")
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setTweets(data.tweets);
          }
        });
    }
  }, [selectedTag]);

  // logic
  const handleNewTweet = (text) => {
    // Envoi vers l'API
    fetch("/tweets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user._id,
        content: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          // Recharge les tweets après ajout
          fetch("/tweets")
            .then((res) => res.json())
            .then((data) => {
              if (data.result) {
                setTweets(data.tweets);
              }
            });
        }
      });
  };

  const handleDelete = (tweetId) => {
    fetch(`/tweets/delete/${tweetId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTweets((prevTweets) =>
            prevTweets.filter((tweet) => tweet._id !== tweetId)
          );
        }
      });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleResetTag = () => {
  setSelectedTag(null);
};


  // return
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
              <strong>{user.firstname}</strong>
              <span>@{user.username}</span>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.inputBox}>
          <TweetForm onNewTweet={handleNewTweet}  onResetTag={handleResetTag} />
        </div>
        <div className={styles.tweetsList}>
          {tweets.length === 0 ? (
            <p>No tweets yet.</p>
          ) : (
            tweets.map((tweet) => (
              <Tweet
                key={tweet._id}
                tweet={tweet}
                user={user}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
      <aside className={styles.sidebarRight}>
        <Trends tweets={tweets} />
      </aside>
    </div>
  );
}

export default Home;

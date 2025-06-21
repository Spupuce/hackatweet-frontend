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

  const [tweets, setTweets] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

    // Récupération des tweets à chaque changement de hashtag sélectionné
  useEffect(() => {
    if (selectedTag) {
      fetch(`/tweets/hashtags/${selectedTag.replace("#", "")}`)
        .then((res) => res.json())
        .then((data) => {
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

  // Récupération des hashtags au montage du composant
    useEffect(() => {
    fetchHashtags();
  }, []);

  // logic
    // Ajout d’un nouveau tweet, puis rafraîchissement des tweets et hashtags
  const handleNewTweet = (text) => {
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
        fetchTweets(selectedTag);
        fetchHashtags();
      }
    });
};

 // Suppression d’un tweet, puis rafraîchissement des tweets et hashtags
const handleDelete = (tweetId) => {
  fetch(`/tweets/delete/${tweetId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result) {
        fetchTweets(selectedTag);
        fetchHashtags();
      }
    });
};

// Récupérer les tweets
  const fetchTweets = (tag = null) => {
  const url = tag
    ? `/tweets/hashtags/${tag.replace('#', '')}`
    : "/tweets";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.result) setTweets(data.tweets);
    });
};

  // Récupérer les hashtags
const fetchHashtags = () => {
  fetch("/tweets/hashtags")
    .then(res => res.json())
    .then(data => {
      if (data.result) setHashtags(data.hashtags);
    });
};

 // Déconnexion de l'utilisateur
  const handleLogout = () => {
    dispatch(logoutUser());
  };

    // Sélection d’un hashtag pour filtrer les tweets
  const handleTagClick = (tag) => {
  setSelectedTag(`#${tag}`);
};

// Réinitialisation du filtre hashtag (affiche tous les tweets)
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
            style={{ cursor: "pointer" }}
            onClick={handleResetTag}
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
          <TweetForm onNewTweet={handleNewTweet} onResetTag={handleResetTag} />
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
        <Trends hashtags={hashtags} onTagClick={handleTagClick} />
      </aside>
    </div>
  );
}

export default Home;

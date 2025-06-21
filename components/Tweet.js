import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Tweet.module.css";

// Affichage du temps
function formatElapsedTime(dateString) {
  const now = new Date();
  const tweetDate = new Date(dateString);
  const diffMs = now - tweetDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  // moyenne d'un mois
  const diffMonths = Math.floor(diffDays / 30.44); 
  const diffYears = Math.floor(diffDays / 365);

  if (diffSec < 60) {
    return `il y a ${diffSec} seconde${diffSec > 1 ? "s" : ""}`;
  } else if (diffMin < 60) {
    return `il y a ${diffMin} minute${diffMin > 1 ? "s" : ""}`;
  } else if (diffHrs < 24) {
    return `il y a ${diffHrs} heure${diffHrs > 1 ? "s" : ""}`;
  } else if (diffDays < 7) {
    return `il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  } else if (diffWeeks < 4) {
    return `il y a ${diffWeeks} semaine${diffWeeks > 1 ? "s" : ""}`;
  } else if (diffMonths < 12) {
    return `il y a ${diffMonths} mois`;
  } else {
    return `il y a ${diffYears} an${diffYears > 1 ? "s" : ""}`;
  }
}

// Coloration des hashtags
function parseTweetText(text) {
  const parts = text.split(/(\s+)/);
  return parts.map((part, i) =>
    part.startsWith("#") && part.length > 1 ? (
      <span key={i} className={styles.hashtag}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

function Tweet({ tweet, user, onDelete }) {
  // Initialisation des likes
  const [likers, setLikers] = useState(tweet.likers || []);
  const [liked, setLiked] = useState(false);

  // Vérifie si l'utilisateur connecté a liké ce tweet
  useEffect(() => {
    setLiked(likers.includes(user._id));
  }, [likers, user._id]);

  // Vérifie si l'utilisateur connecté est le propriétaire du tweet
  const isOwner = tweet.user && tweet.user._id === user._id;

  // Gestion du like
  const handleLike = () => {
    fetch("/tweets/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, tweetId: tweet._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setLikers(data.likers);
        }
      });
  };

  return (
    <div className="tweet">
      <div className="tweet-header">
        <img
          src="../images/user.png"
          alt="Avatar"
          className="avatar"
          width={60}
        />
        <strong>{tweet.user.firstname} </strong>
        <span className="grey">@{tweet.user.username} </span>
        <span className="tweet-date grey">
          · {formatElapsedTime(tweet.date)}
        </span>
      </div>
      <div className="tweet-content">
        <p>{parseTweetText(tweet.content)}</p>
      </div>
      <div className={styles.tweetActions}>
        <button
          className="like-btn"
          onClick={handleLike}
          aria-label={liked ? "Supprimer le like" : "Aimer"}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${styles.heart} ${liked ? styles.liked : ""}`}
          />
          <span className={styles.likeCount}>{likers.length}</span>
        </button>
        {tweet.user && tweet.user._id === user._id && onDelete && (
          <button onClick={() => onDelete(tweet._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Tweet;

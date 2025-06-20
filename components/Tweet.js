import React, { useState } from "react";
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
  const diffMonths = Math.floor(diffDays / 30.44); // moyenne d'un mois
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

function Tweet({ tweet, user, onLike, onDelete }) {
  // data & input
  const currentUser = useSelector((state) => state.user.value);
  // Si pas de tweet, on ne rend rien
  if (!tweet || !tweet.content) return null;

  const isOwner = tweet.user === user._id;


  const [liked, setLiked] = useState(false);

  return (
    <div className="tweet">
      <div className="tweet-header">
        <img
          src="../images/user.png"
          alt="Avatar"
          className="avatar"
          width={60}
        />
        <strong>{user.firstname} </strong>
        <span className="grey">@{user.username} </span>
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
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Supprimer le like" : "Aimer"}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${styles.heart} ${liked ? styles.liked : ""}`}
          />
        </button>
        {isOwner && (
          <button onClick={() => onDelete && onDelete(tweet._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Tweet;

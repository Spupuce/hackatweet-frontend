import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Tweet.module.css";

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
  // Si pas de tweet, on ne rend rien
  if (!tweet || !tweet.text) return null;

  const isOwner = user && tweet.userId === user.id;
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
        <strong>John </strong>
        <span className="grey">@JohnCena </span>
        <span className="tweet-date grey">. 5 hours</span>
      </div>
      <div className="tweet-content">
        <p>{parseTweetText(tweet.text)}</p>
      </div>
      <div className={styles.tweetActions}>
        <button
          className="like-btn"
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Retirer le like" : "Aimer"}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`${styles.heart} ${liked ? styles.liked : ""}`}
          />
        </button>
        {isOwner && onDelete && (
          <button onClick={() => onDelete(tweet.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Tweet;

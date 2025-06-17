import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

function Tweet({ tweet, user, onLike, onDelete }) {
  const isOwner = user && tweet.userId === user.id;

  return (
    <div className="tweet">
      <div className="tweet-header">
        <img src="../images/user.png"
            alt="Avatar"
            className="avatar"
            width={30} />
        <strong>John </strong>
        <span>@JohnCena </span>
        <span className="tweet-date">. 5 hours</span>
      </div>
      <div className="tweet-content">
        <p>Ceci est un tweet ! </p>
        <span className="hastag">#cenation</span>
      </div>
      <div className="tweet-actions">
        <button onClick={() => onLike(tweet.id)}>
          <FontAwesomeIcon icon={faHeart} /> 
        </button>
        {isOwner && (
          <button onClick={() => onDelete(tweet.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Tweet;

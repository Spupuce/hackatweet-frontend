import React, { useState } from "react";
import styles from "../styles/TweetForm.module.css";

function TweetForm({ onNewTweet, onResetTag }) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() && text.length <= 280) {
      onNewTweet(text);
      setText("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2
        className={styles.title}
        style={{ cursor: "pointer" }}
        onClick={onResetTag}
        title="Revenir à l'accueil"
      >
        Home
      </h2>
      <input
        type="text"
        className={styles.input}
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={280}
        placeholder="What's up ?"
        required
      />
      <div className={styles.footer}>
        <span className={styles.counter}>{text.length}/280</span>
        <button className={styles.button} type="submit">Tweet</button>
      </div>
    </form>
  );
}

export default TweetForm;

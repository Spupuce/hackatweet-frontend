import React, { useState } from "react";

function TweetForm({ onNewTweet }) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim() && text.length <= 280) {
      onNewTweet(text);
      setText("");
    }
  };

  return (
    <form className="tweet-form" onSubmit={handleSubmit}>
        <h2>Home</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={280}
        placeholder="What's up ?"
        required
      />
      <div className="tweet-form-footer">
        <span>{text.length}/280</span>
        <button type="submit">Tweet</button>
      </div>
    </form>
  );
}

export default TweetForm;

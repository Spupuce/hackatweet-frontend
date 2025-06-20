import React, { useEffect, useState } from "react";
import styles from "../styles/Trends.module.css";

function Trends({ onTagClick }) {
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/tweets/hashtags")
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setHashtags(
            data.hashtags.map(({ hashtag, count }) => ({
              tag: hashtag,
              count,
            }))
          );
        }
        setLoading(false);
      });
  }, []);
  return (
    <aside className={styles.trendsBox}>
      <h3 className={styles.title}>Trends</h3>
      <ul className={styles.trendsList}>
        {hashtags.length === 0 ? (
          <li className={styles.trendItem}>
            {/* Si rien à afficher ou pas de Tweet */}
            <span className={styles.hashtag}>No hashtag</span>
            <span className={styles.count}>0 Tweet</span>
          </li>
        ) : (
          hashtags.map(({ tag, count }) => (
            <li
              key={tag}
              className={styles.trendItem}
              onClick={() => onTagClick(tag.replace("#", ""))}
              style={{ cursor: "pointer" }}
            >
              <span className={styles.hashtag}>{tag}</span>
              <span className={styles.count}>
                {/* Si tweet superieur à 1 on ajoute un s */}
                {count} Tweet{count > 1 ? "s" : ""}
              </span>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

export default Trends;

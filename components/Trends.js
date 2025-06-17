import React from "react";
import styles from "../styles/Trends.module.css";

function Trends() {
  return (
    <aside className={styles.trendsBox}>
      <h3 className={styles.title}>Trends</h3>
      <ul className={styles.trendsList}>
        <li className={styles.trendItem}>
          <span className={styles.hashtag}>#hackatweet</span>
          <span className={styles.count}>2 Tweets</span>
        </li>
        <li className={styles.trendItem}>
          <span className={styles.hashtag}>#first</span>
          <span className={styles.count}>1 Tweet</span>
        </li>
        <li className={styles.trendItem}>
          <span className={styles.hashtag}>#cenation</span>
          <span className={styles.count}>1 Tweet</span>
        </li>
      </ul>
    </aside>
  );
}

export default Trends;

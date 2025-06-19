import React from "react";
import styles from "../styles/Trends.module.css";

// Extraction des Hashtags
function extractHashtags(tweets){
  const hashtags = {};
  // Tous ce qui commence par #
    tweets.forEach((tweet) => {
    const matches = tweet.text.match(/#\w+/g);
    if (matches) {
      matches.forEach((tag) => {
        // Si résultat à objet hashtag et incrémentation
        hashtags[tag] = (hashtags[tag] || 0) + 1;
      });
    }
  });
  // On retourne les hashtags triés par popularité
  return Object.entries(hashtags)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}


function Trends({tweets = []}) {
  const hashtags = extractHashtags(tweets)
  return (
    <aside className={styles.trendsBox}>
      <h3 className={styles.title}>Trends</h3>
      <ul className={styles.trendsList}>
        {hashtags.length === 0 ? (
          <li className={styles.trendItem}>
            {/* Si rien à afficher ou pas de Tweet */}
            <span className={styles.hashtag}>Aucun hashtag</span>
            <span className={styles.count}>0 Tweet</span>
          </li>
        ) : (
          hashtags.map(({ tag, count }) => (
            <li key={tag} className={styles.trendItem}>
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

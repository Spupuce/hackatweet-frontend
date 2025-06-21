import styles from "../styles/Trends.module.css";

function Trends({ hashtags = [], onTagClick }) {

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
          hashtags.map(({ hashtag, count }) => (
            <li
              key={hashtag}
              className={styles.trendItem}
              onClick={() => onTagClick(hashtag.replace("#", ""))}
              style={{ cursor: "pointer" }}
            >
              <span className={styles.hashtag}>{hashtag}</span>
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

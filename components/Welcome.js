import styles from '../styles/Welcome.module.css';

function Welcome() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.leftPanel}>
          <img
            src="/logoTwitterWhite.png"
            alt="logo Twitter"
            className={styles.largeLogo}
          />
        </div>
        <div className={styles.middlePanel}>
          <img
            src="/logoTwitterWhite.png"
            alt="logo Twitter"
            className={styles.smallLogo}
          />
          <div className={styles.title}>See what's happening</div>
          <h1>Join hackatweet today.</h1>
          <button className={styles.blueButton}>Sign up</button>
          <h3>Already have an account?</h3>
          <button className={styles.blackButton}>Sign in</button>
        </div>
        <div className={styles.rightPanel}>
          <p className={styles.log}>username</p>
        </div>
      </main>
    </div>
  );
}

export default Welcome;
import styles from "../styles/Welcome.module.css";
import Signupin from "./Signupin";
import { useState } from "react";


function Welcome() {
  // input & data
  const [signType, setSignType] = useState(""); // "signin" or "signup"

  // logic
  const deselect = () => {
    setSignType("");
  };
  const handleSignupBtn = (event) => {
    event.stopPropagation(); // prevent the deselect execution
    setSignType("signup");
  };
  const handleSigninBtn = (event) => {
    event.stopPropagation(); // prevent the deselect execution
    setSignType("signin");
  };
  let loginBox;

  // return
  if (signType) {
    loginBox = <Signupin signType={signType} />;
  }

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.leftPanel} onClick={deselect}>
          <img
            src="/logoTwitterWhite.png"
            alt="logo Twitter"
            className={styles.largeLogo}
          />
        </div>
        <div className={styles.middlePanel} onClick={deselect}>
          <img
            src="/logoTwitterWhite.png"
            alt="logo Twitter"
            className={styles.smallLogo}
          />
          <div className={styles.title}>See what's happening</div>
          <h1>Join hackatweet today.</h1>
          <button className={styles.blueButton} onClick={handleSignupBtn}>
            Sign up
          </button>
          <h3>Already have an account?</h3>
          <button className={styles.blackButton} onClick={handleSigninBtn}>
            Sign in
          </button>
        </div>
        <div className={styles.rightPanel}>{loginBox}</div>
      </main>
    </div>
  );
}

export default Welcome;

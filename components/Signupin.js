import styles from "../styles/Signupin.module.css";
import { useState } from "react";

function Signupin(props) {
  // input, data
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // logic

  // return
  const inviteMsg =
    props.signType === "signin"
      ? "Connect to hackatweet"
      : "Create your hackatweet account";
  const btnText = props.signType === "signin" ? "Sign in" : "Sign up";
  const firstnameInput = props.signType === "signup" && (
    <input
      placeholder="Firstname"
      onChange={(e) => setFirstname(e.target.value)}
      value={firstname}
      className={styles.inputField}
    />
  );

  return (
    <div>
      <main className={styles.main}>
        <h3>{inviteMsg}</h3>
        {firstnameInput}
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={styles.inputField}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={styles.inputField}
        />
        <button className={styles.whiteButton}>{btnText}</button>
      </main>
    </div>
  );
}

export default Signupin;

import styles from "../styles/Signupin.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../reducers/user";

function Signupin(props) {
  // input, data
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // logic
  const handleSubmit = async () => {
    const logData = { username, password };
    props.signType === "signup" && (logData.firstname = firstname);
    console.log("log Data input: ", logData);
    try {
      const response = await fetch(
        `http://localhost:3000/users/${props.signType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Log data output:", data);
      if (data.result) {
        dispatch(loginUser({ token: data.token, username: data.username }));
      } else {
        alert(data.error);
      }
        !data.result && alert(data.error);
      // setFirstname("");
      // setUsername("");
      // setPassword("");
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // return
  const inviteMsg =
    props.signType === "signin"
      ? "Connect to hackatweet"
      : "Create your hackatweet account";
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
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={styles.inputField}
        />
        <button className={styles.whiteButton} onClick={handleSubmit}>
          Submit
        </button>
      </main>
    </div>
  );
}

export default Signupin;

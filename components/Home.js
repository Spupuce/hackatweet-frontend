import React, { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";

//A enlever
const name = "John";
const email = "@johnCena";

function Home() {
  const [user, setUser] = useState(null);
  return (
    <div className={styles.container}>
      <aside className="sidebar-left">
        <div className="high">
          <img
            src="../images/logo.png"
            alt="Logo site"
            className="logo"
            width={85}
          />
        </div>
        <div className="down">
          <img src="../images/user.png" alt="Avatar" className="avatar"width={30}/>
          <div className="user-info">
            <strong>{name}</strong>
            <p>{email}</p>
            </div>
          <button>Logout</button>
        </div>
      </aside>
      <main>
        <div class="input-box">
          <h2>Home</h2>
          <input type="text" placeholder="What's up ?"/>
          <p>0/280</p>
          <button>Tweet</button>
        </div>
        <div class="box">
          <img src="../images/user.png" alt="Avatar" className="avatar"width={30}/>
        </div>
      </main>
      <aside></aside>
    </div>
  );
}

export default Home;

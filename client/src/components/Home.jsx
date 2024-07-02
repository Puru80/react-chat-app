import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", username);

    socket.emit("newUser", {userName:username, socketId: socket.id});

    navigate("/chat");
  }

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">SignIn to Open Text</h2>
      <label htmlFor="userName">UserName</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;

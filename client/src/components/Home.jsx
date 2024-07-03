import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Button, Input } from "antd";

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let sessionId = `${Date.now()}-${Math.random()}`

    window.sessionStorage.setItem("sessionId", sessionId);
    window.sessionStorage.setItem("username", username);

    socket.emit("newUser", {sessionId: sessionId, userName:username});

    navigate("/chat");
  }

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">SignIn to Open Text</h2>
      <label htmlFor="userName">UserName</label>
      <Input
        placeholder="Enter your username"
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button type="primary" htmlType="submit" className="home__cta">SIGN IN</Button>
    </form>
  );
};

export default Home;

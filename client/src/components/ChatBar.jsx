import React from "react";
import { useState, useEffect } from "react";
import "../index.css";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("user list", (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Text</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.sessionId}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;

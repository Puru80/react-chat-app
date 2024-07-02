import React, { useState, useEffect } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });
    if (message.trim()) {
      // Send message to server
      socket.emit("message", {
        userName: users.find((user) => user.socketId === socket.id).userName,
        text: message,
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
      });
    }
    setMessage("");

    handleTyping();
  };

  const handleTyping = () => {
    if(message === "") return;
    socket.emit("typing", { socketId: `${socket.id}` });
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;

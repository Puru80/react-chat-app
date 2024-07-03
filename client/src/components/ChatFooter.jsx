import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    socket.on("user list", (data) => {
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

    setIsTyping(false);
    handleTyping();
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      // Emit typing event to server
      socket.emit("typing", {isTyping: isTyping, sessionId: window.sessionStorage.getItem('sessionId')}); 
    }

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      // Emit typing stopped event to server
      socket.emit("typing", {
        isTyping: isTyping,
        sessionId: window.sessionStorage.getItem("sessionId"),
      });
    }, 5000); // Reset typing status after 2s of inactivity
  };

  return (
    <div className="chat__footer">
      {/* <div className="message__status">Message Status</div> */}
      <form className="form" onSubmit={handleSendMessage}>
        <Input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleTyping}
        />
        <Button type="primary" htmlType="submit" className="sendBtn">
          SEND
        </Button>
      </form>
    </div>
  );
};

export default ChatFooter;

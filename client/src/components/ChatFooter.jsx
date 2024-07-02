import React, { useState, useEffect, useRef } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);

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

    setIsTyping(false);
    handleTyping();
  };

  // const handleTyping = () => {
  //   if(message === "") return;
  //   socket.emit("typing", { socketId: `${socket.id}` });
  // };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", isTyping); // Emit typing event to server
    }

    clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", isTyping); // Emit typing stopped event
    }, 5000); // Reset typing status after 2s of inactivity
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
          onKeyUp={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;

import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "../index.css";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState({});
  const [username, setUsername] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Check for session ID and username in local storage
    const storedSessionId = window.sessionStorage.getItem('sessionId');
    const storedUsername = window.sessionStorage.getItem('username');

    if (storedSessionId && storedUsername) {
      socket.emit('reconnect_user', { sessionId: storedSessionId, userName: storedUsername });
      setUsername(storedUsername);
    }
  }, [socket]);

  useEffect(() => {
    socket.on("messageResponse", (data) => 
      setMessages([...messages, data]));

  }, [socket, messages]);

  useEffect(() => {
    socket.on("initialMessages", (initialMessages) => {
      console.log("initialMessages: ", initialMessages);
      setMessages(initialMessages);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      console.log("typingResponse", data);
      setTypingStatus(data)
    });
  }, [socket]);

  useEffect(() => {
    // Scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          socket={socket}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;

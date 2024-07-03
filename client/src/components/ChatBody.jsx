import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Button } from "antd";
import { Header } from "antd/es/layout/layout";

const ChatBody = ({ messages, typingStatus, lastMessageRef, socket }) => {
  const navigate = useNavigate();
  const userName = window.sessionStorage.getItem("username");

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  function renderTypingIndicator() {
    const typingUsername = typingStatus.userName; // Get username of typing user

    if (typingUsername && typingUsername.length > 0) {
      return (
        <div className="message__status">
          {typingUsername} is typing...
        </div>
      );
    }

    return null; // No typing indicator if no users are typing
  }

  return (
    <>
      <Header className="chat__mainHeader">
        <p>Hangout With Sockets</p>
        <Button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </Button>
      </Header>

      <div className="message__container">
        {messages.map((message) =>
          message.userName === userName ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p className="recipient__name">{message.userName}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {renderTypingIndicator()}

        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;

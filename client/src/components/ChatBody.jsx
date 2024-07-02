import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ChatBody = ({ messages, typingStatus, lastMessageRef, socket }) => {
  const navigate = useNavigate();

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
      <header className="chat__mainHeader">
        <p>Hangout With Sockets</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.socketId === socket.id ? (
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

        {/* {<div className="message__status">
          {typingStatus &&
          typingStatus.userName &&
          typingStatus.userName.length > 0 ? (
            <p>{typingStatus.userName} is typing...</p>
          ) : null}
        </div>} */}

        <div>
          {renderTypingIndicator()}
        </div>

        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;

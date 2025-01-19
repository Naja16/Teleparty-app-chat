// src/components/ChatMessages.tsx
import React from "react";
import { SessionChatMessage } from "teleparty-websocket-lib";

interface ChatMessagesProps {
  messages: SessionChatMessage[];
  nickname: string;
}

const ChatMessages = ({ messages, nickname }: ChatMessagesProps) => {
  return (
    <div className="chat-messages">
      {messages.map((msg, index) => {
        // console.log(" Messsagesss in Render--->", msg);
        return (
          <div
            key={index}
            className={`message ${
              msg.userNickname === nickname ? "my-message" : "other-message"
            }`}
          >
            <div className="message-bubble">
              {!msg.isSystemMessage && (
                <img src={msg.userIcon} alt="User icon" className="user-icon" />
              )}
              <span className="nickname">{msg.userNickname}</span>
              <p>{msg.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;

// src/components/ChatRoom.tsx
import React, { useState, useEffect } from "react";
import { TelepartyService } from "../services/telepartyService.ts";
import MessageInput from "./MessageInput.tsx";
import ChatMessages from "./ChatMessages.tsx";
import UserSettings from "./UserSettings.tsx";
import { SessionChatMessage } from "teleparty-websocket-lib";

const telepartyService = new TelepartyService();

const ChatRoom = () => {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [messages, setMessages] = useState<SessionChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Handle incoming messages
  useEffect(() => {
    // Ensure the correct message handler type is used
    const handleMessage = (msg) => {
      console.log(" Messages Recived --->", msg);
      if (msg.type === "sendMessage") {
        setMessages((prevMessages) => [...prevMessages, msg.data]);
      }
    };

    // Assign the message handler
    telepartyService.eventHandler.onMessage = handleMessage;

    return () => {
      // Clean up on unmount
      telepartyService.close();
    };
  }, []);

  const handleCreateRoom = async () => {
    if (nickname && userIcon) {
      const room = await telepartyService.createChatRoom(nickname, userIcon);
      setRoomId(room);
    } else {
      alert("Please provide a nickname and user icon.");
    }
  };

  const handleJoinRoom = async () => {
    if (roomId && nickname && userIcon) {
      if (telepartyService.isConnected) {
        telepartyService.close();
      }
      await telepartyService.joinChatRoom(roomId, nickname, userIcon);
    } else {
      alert("Please provide a valid room ID, nickname, and user icon.");
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    telepartyService.setTypingPresence(true);
    setTimeout(() => {
      setIsTyping(false);
      telepartyService.setTypingPresence(false);
    }, 1500);
  };

  const sendMessage = (message: string) => {
    const res = telepartyService.sendMessage(message);
    console.log("res", res);
  };
  return (
    <div className="chat-room">
      <UserSettings
        nickname={nickname}
        setNickname={setNickname}
        userIcon={userIcon}
        setUserIcon={setUserIcon}
      />
      <div className="actions">
        <button onClick={handleCreateRoom}>Create Room</button>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      {roomId && (
        <>
          <ChatMessages messages={messages} nickname={nickname} />
          <MessageInput onTyping={handleTyping} sendMessage={sendMessage} />
        </>
      )}
      {isTyping && <div className="typing">Someone is typing...</div>}
    </div>
  );
};

export default ChatRoom;

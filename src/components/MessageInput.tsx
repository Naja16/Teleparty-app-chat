// src/components/MessageInput.tsx
import React, { useState } from 'react';
import { TelepartyService } from '../services/telepartyService';

interface MessageInputProps {
  onTyping: () => void;
  sendMessage: (message: string) => void;
}

const MessageInput = ({ onTyping, sendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={onTyping}
        placeholder="Type a message..."
        rows={2}
      />
      <button className="send-btn" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;

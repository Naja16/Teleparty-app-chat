// src/App.tsx
import React from 'react';
import ChatRoom from './components/ChatRoom.tsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Teleparty Chat Room</h1>
      <ChatRoom />
    </div>
  );
};

export default App;

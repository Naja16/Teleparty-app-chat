// src/components/UserSettings.tsx
import React from 'react';

interface UserSettingsProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  userIcon: string;
  setUserIcon: (userIcon: string) => void;
}

const UserSettings = ({ nickname, setNickname, userIcon, setUserIcon }: UserSettingsProps) => {
  return (
    <div className="user-settings">
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Set your nickname"
      />
      <input
        type="text"
        value={userIcon}
        onChange={(e) => setUserIcon(e.target.value)}
        placeholder="Set your user icon URL"
      />
    </div>
  );
};

export default UserSettings;

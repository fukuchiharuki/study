import React, { useState } from 'react';
import ChatAPI from './ChatAPI';
import useFriendStatus from './useFriendStatsu';

const friendList = [
  { id: "fukuchi", name: "福地" },
  { id: "miyamoto", name: "宮本" },
  { id: "asahi", name: "朝日" },
];

function ChatRecipientPicker() {
  const [recipientId, setRecipientId] = useState(friendList[0].id);
  const recipientIsOnline = useFriendStatus(recipientId);

  return (
    <div>
      <select value={recipientId} onChange={e => setRecipientId(e.target.value)}>
        {friendList.map(it =>
          <option key={it.id} value={it.id}>
            {it.name}
          </option>
        )}
      </select>
      <p>{recipientIsOnline ? "ONLINE" : "offline"}</p>
      <hr />
      {friendList.map(it =>
        <div key={it.id}>
          <span>{it.name}</span>
          <button onClick={() => ChatAPI.login(it.id)}>
            Login
          </button>
          <button onClick={() => ChatAPI.logout(it.id)}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatRecipientPicker;
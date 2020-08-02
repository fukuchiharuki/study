import React, { useState, useEffect, Fragment } from 'react';
import ChatAPI, { OnlineStatus } from './ChatAPI';

function FriendStatus(props: { friend: { id: string } }) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  function handleStatusChange(status: OnlineStatus) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  const status = (isOnline === null)
    ? "Loading..."
    : isOnline ? "Online" : "Offline";

  return <Fragment>{status}</Fragment>;
}

export default FriendStatus;
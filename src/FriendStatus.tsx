import React, { Fragment } from 'react';
import useFriendStatus from './useFriendStatsu';

function FriendStatus(props: { friend: { id: string } }) {
  const isOnline = useFriendStatus(props.friend.id);

  const status = (isOnline === null)
    ? "Loading..."
    : isOnline ? "Online" : "Offline";

  return <Fragment>{status}</Fragment>;
}

export default FriendStatus;
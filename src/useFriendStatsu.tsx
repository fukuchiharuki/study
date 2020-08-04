import { useState, useEffect } from 'react';
import ChatAPI, { OnlineStatus } from './ChatAPI';

function useFriendStatus(id: string): boolean | null {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  function handleStatusChange(status: OnlineStatus) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(id, handleStatusChange);
    };
  }, [id]);

  return isOnline;
}

export default useFriendStatus;
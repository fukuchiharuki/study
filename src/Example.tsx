import React, { useState, useEffect } from 'react';
import FriendStatus from './FriendStatus';
import ChatAPI from './ChatAPI';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <hr />
      <p>
        <FriendStatus friend={{ id: "fukuchi" }} />
      </p>
      <button onClick={() => ChatAPI.login("fukuchi")}>
        Login
      </button>
      <button onClick={() => ChatAPI.logout("fukuchi")}>
        Logout
      </button>
    </div>
  );
}

export default Example;
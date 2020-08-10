import React, { useContext } from 'react';
import { Theme } from './ContextProvider';

function ContextConsumer(props: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useContext(Theme);
  return (
    <div style={{ ...theme, width: "100vw", height: "100vh" }}>
      <button onClick={() => toggleTheme()}>Change theme</button>
      {props.children}
    </div>
  );
}

export default ContextConsumer;
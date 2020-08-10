import React, { useState } from 'react';
import ContextConsumer from './ContextConsumer';

const themes = {
  light: {
    backgroundColor: "white",
    color: "#333",
  },
  dark: {
    backgroundColor: "#333",
    color: "white",
  },
};

export const Theme = React.createContext({
  theme: themes.light,
  toggleTheme: () => { },
});

function ContextProvider() {
  const [theme, setTheme] = useState(themes.light);
  const toggleTheme = () => setTheme(Object.is(theme, themes.light) ? themes.dark : themes.light);

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      <ContextConsumer>
        <p>Some text...</p>
      </ContextConsumer>
    </Theme.Provider>
  );
}

export default ContextProvider;
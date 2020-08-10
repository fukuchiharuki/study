import React, { useRef } from "react";
import FancyInput, { Focusable } from "./FancyInput";

export default function FancyUser() {
  const inputEl = useRef<Focusable>(null);
  return (
    <div>
      <FancyInput ref={inputEl} />
      <button onClick={() => inputEl.current?.focus()}>Forcus</button>
    </div>
  );
}
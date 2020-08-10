import React, { useRef, useImperativeHandle, forwardRef } from "react";

export interface Focusable {
  focus(): void,
}

const FancyInput: React.ForwardRefRenderFunction<Focusable, {/* type of Props */ }> =
  (props, ref) => {
    const inputEl = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      focus() { inputEl.current?.focus(); }
    }));
    return <input type="text" ref={inputEl} />;
  }
export default forwardRef(FancyInput);
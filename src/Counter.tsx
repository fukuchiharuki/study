import React, { useState } from 'react';

function Counter(props: { initialValue: number }) {
  const { initialValue } = props;
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(initialValue)}> C </button> {/* value */}
      <button onClick={() => setCount(it => it + 1)}> + </button> {/* function */}
      <button onClick={() => setCount(it => it - 1)}> - </button> {/* function */}
    </div>
  );
}

export default Counter;
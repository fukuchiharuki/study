import React, { Fragment, useState } from 'react';
import useTodoReducer, { TodoItem, doTodo, addTodo, removeTodo } from './useTodoReducer';

function TodoList() {
  const [todoList, dispatch] = useTodoReducer();

  return (
    <div>
      <Adder />
      <hr />
      {todoList.map(it =>
        <Fragment key={it.id}>
          <Item item={it} />
        </Fragment>
      )}
    </div>
  );

  function Adder() {
    const [text, setText] = useState("");
    return (
      <div>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={() => { dispatch(addTodo(text)); setText("") }}>Add</button>
      </div>
    );
  }

  function Item(props: { item: TodoItem }) {
    const { item: it } = props;
    const textDecoration = it.done ? "line-through" : "none";
    const cursor = "pointer";
    return (
      <div>
        <span onClick={() => dispatch(doTodo(it.id))} style={{ textDecoration, cursor }}>{it.text}</span>
        <span onClick={() => dispatch(removeTodo(it.id))} role="img" aria-label="trash" style={{ cursor }}>🚮</span>
      </div>
    );
  }
}

export default TodoList;
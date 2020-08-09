import { useState } from "react";

enum TodoActionType {
  ADD,
  DO,
  REMOVE,
}

interface TodoAddAction {
  type: typeof TodoActionType.ADD,
  payload: { text: string },
}

interface TodoDoAction {
  type: typeof TodoActionType.DO,
  payload: { id: number },
}

interface TodoRemoveAction {
  type: typeof TodoActionType.REMOVE,
  payload: { id: number },
}

type TodoAction = TodoAddAction | TodoDoAction | TodoRemoveAction;

export function addTodo(text: string): TodoAddAction {
  const type = TodoActionType.ADD;
  return { type, payload: { text } };
}

export function doTodo(id: number): TodoDoAction {
  const type = TodoActionType.DO;
  return { type, payload: { id } };
}

export function removeTodo(id: number): TodoRemoveAction {
  const type = TodoActionType.REMOVE;
  return { type, payload: { id } };
}

export interface TodoItem {
  id: number,
  text: string,
  done: boolean,
}

export default function useTodoReducer(initialValue: TodoItem[] = []): [TodoItem[], (action: TodoAction) => void] {
  const [todoList, setTodoList] = useState(initialValue);
  function dispatch(action: TodoAction) {
    const nextList = reducer(todoList, action);
    setTodoList(nextList);
  }
  return [todoList, dispatch];
}

function reducer(todoList: TodoItem[], action: TodoAction) {
  switch(action.type) {
    case TodoActionType.ADD: {
      const id: number = Date.now() * 1000 + Math.floor(Math.random() * 101);
      const { text } = action.payload;
      const done = false;
      return todoList.concat([{ id, text, done }]);
    }
    case TodoActionType.DO: {
      const { id } = action.payload;
      return todoList.map(it => {
        if (it.id !== id) return it;
        return { ...it, done: true };
      });
    }
    case TodoActionType.REMOVE: {
      const { id } = action.payload;
      return todoList.filter(it => it.id !== id);
    }
    default:
      return todoList;
  }
}
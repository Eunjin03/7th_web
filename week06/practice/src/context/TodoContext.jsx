import { createContext, useState } from "react";

// 데이터를 담고 있음
export const TodoContext = createContext();

// 데이터를 제공하는 컴포넌트
export function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");

  // 렌더링 방지
  const handelSubmit = (e) => {
    e.preventDefault();
  };

  // 1. 추가하기
  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100), text: text },
    ]);
    setText("");
  };

  // 2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 3. 수정하기
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: text } : todo))
    );
    setEditingId("");
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        text,
        setText,
        editingId,
        setEditingId,
        editText,
        setEditText,
        handelSubmit,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

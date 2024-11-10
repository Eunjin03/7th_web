import { useContext } from "react";
import "./App.css";
import Button from "../components/button";
import Input from "../components/input";
import { TodoContext } from "./context/TodoContext";

function App() {
  const {
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
  } = useContext(TodoContext);

  return (
    <section>
      <form onSubmit={handelSubmit}>
        <Input
          isValue={true}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={"add-input"}
        />
        <Button act={addTodo} text={"할 일 등록"} className={"add"} />
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-list">
            {editingId === todo.id ? (
              <div>
                <Input
                  isValue={false}
                  defaultValue={todo.text}
                  onChange={(e) => setEditText(e.target.value)}
                  className={"edit-input"}
                />
              </div>
            ) : (
              <div>
                <p>{todo.text}</p>
              </div>
            )}

            <div className="todo-buttons">
              <Button
                act={() => deleteTodo(todo.id)}
                text={"삭제하기"}
                className={"delete"}
              />
              {/* <button onClick={() => deleteTodo(todo.id)}>삭제하기</button> */}
              {editingId === todo.id ? (
                <Button
                  act={() => updateTodo(editingId, editText)}
                  text={"수정 완료"}
                  className={"update-success"}
                />
              ) : (
                <Button
                  act={() => setEditingId(todo.id)}
                  text={"수정하기"}
                  className={"update"}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;

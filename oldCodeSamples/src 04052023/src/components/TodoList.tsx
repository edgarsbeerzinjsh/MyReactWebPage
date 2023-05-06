import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { TodoItem } from "./TodoItem";
import "../styles/components/todos.scss";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  decription?: string;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const inputTodo = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputTodo.current?.focus();
  }, [todos]);

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const newTodo: Todo = {
            title: inputValue,
            id: Math.random().toString(),
            isDone: false,
          };
          setTodos([...todos, newTodo]);
          setInputValue("");
        }}
      >
        <label htmlFor="todo-title">Add todo</label>
        <div>
          <input
            ref={inputTodo}
            id="todo-title"
            type="text"
            value={inputValue}
            placeholder="Nopirkt pārtiku..."
            onChange={(event) => {
              const newValue = event.target.value;
              setInputValue(newValue);
            }}
          />

          <Button type="submit">Add todo</Button>
        </div>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <>
              <TodoItem
                onTodoSave={(newTitle) => {
                  const newTodos = todos.map((todoItem) => {
                    if (todoItem.id === todo.id) {
                      return {
                        ...todoItem,
                        title: newTitle,
                      };
                    }

                    return todoItem;
                  });

                  setTodos(newTodos);
                }}
                todo={todo}
                key={todo.id}
                onDelete={() => {
                  const newTodos = todos.filter((todoItem) => {
                    return todoItem.id !== todo.id;
                  });

                  setTodos(newTodos);
                }}
                onCheckboxChange={() => {
                  const newTodos = todos.map((todoItem) => {
                    if (todoItem.id === todo.id) {
                      return {
                        ...todoItem,
                        isDone: !todoItem.isDone,
                      };
                    }

                    return todoItem;
                  });

                  setTodos(newTodos);
                }}
              />
            </>
          );
        })}
      </ul>
    </div>
  );
}

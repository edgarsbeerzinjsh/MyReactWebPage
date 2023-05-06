import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { TodoItem } from "./TodoItem";
import "../styles/components/todos.scss";
import { isEmpty } from "../validation/isEmpty";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  decription?: string;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formTodo, setFormTodo] = useState({
    inputTodo: {
      value: "",
      error: ""
    }
  })

  const inputTodo = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputTodo.current?.focus();
  }, [formTodo]);

  const changeInputValue = ((value: string, error: string, key: string) => {
    return (
      setFormTodo({
        ...formTodo,
        [key]: {
          ...formTodo[key as keyof typeof formTodo],
          value: value,
          error: error,
        },
    }))
  });

  const isUniqueTitle = (value: string, todos: Todo[]) => {
    let titles: string[] = [];
    todos.forEach((todo) => {
      if (!titles.includes(todo.title)) {
        titles.push(todo.title);      
      }
    });
    return titles.includes(value);
  }

  return (
    <div className="container">
      <form
        noValidate
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const title = formTodo.inputTodo.value;
          let titleError = "";
          
          if (isEmpty(title))
          {
            titleError = "Todo title is required";
          }

          if (isUniqueTitle(title, todos))
          {
            titleError = "Todo title must be unique";
          }
          
          if (titleError) {
            changeInputValue(title, titleError, "inputTodo")
          } else {
            const newTodo: Todo = {
              title: title,
              id: Math.random().toString(),
              isDone: false,
            };
            setTodos([...todos, newTodo]);
            changeInputValue("", "", "inputTodo");
          }
        }}
      >
          <label htmlFor="todo-title">
          Add todo
            <div>
              <input
                ref={inputTodo}
                id="todo-title"
                type="text"
                value={formTodo.inputTodo.value}
                placeholder="Nopirkt pārtiku..."
                onChange={(event) => {
                  const newValue = event.target.value;
                  changeInputValue(newValue, "", "inputTodo");
                }}
                />

              <Button type="submit">Add todo</Button>
            </div>
            {formTodo.inputTodo.error && <p>{formTodo.inputTodo.error}</p>}
          </label>
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
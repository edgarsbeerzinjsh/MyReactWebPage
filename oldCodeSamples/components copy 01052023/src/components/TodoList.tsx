import { useState } from 'react';
import { Button } from './Button';
import { TodoItem } from './TodoItem';

type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  description?: string;
}

export function ToDoList() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  console.log("todos", todos);

  return (
    <div className="container">
      <h1>Todo App</h1>
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
            id="todo-title"
            type="text"
            value={inputValue}
            placeholder="Todo title"
            onChange={(event) => {
              const newValue = event.target.value;
              setInputValue(newValue);
            }}
          />

          <Button 
            type="submit"
            children="Add new todo"
          />              
        </div>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem 
              todo={todo}
              key={todo.id}
              onCheckboxChange={() => {
                const newTodos = todos.map((newTodo) => {
                  if (newTodo.id === todo.id) {
                    return {...newTodo, isDone: !newTodo.isDone};
                  }

                  return newTodo;
                });

                setTodos(newTodos);
              }}
              onDelete={() => {
                const newTodos = todos.filter((newTodo) => {
                  return newTodo.id !== todo.id;
                });

                setTodos(newTodos);
              }}
              onEdit={(editText) => {
                const newTodos = todos.map((newTodo) => {
                  if (newTodo.id === todo.id) {
                    return {...newTodo, title: editText};
                  }

                  return newTodo;
                });

                setTodos(newTodos);
              }}
            />
          );
        })}
      </ul>
    </div>
   
  );
}
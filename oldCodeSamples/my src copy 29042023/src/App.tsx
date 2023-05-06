import { useState } from 'react';
import './styles/App.scss';
import { TodoItem } from './components/TodoItem';
import { InputText } from './components/InputText';
import { Button } from './components/Button';
import { TodoListFromServer } from './components/TodoListFromServer';




type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  description?: string;
}



// izveidot todo State
// izveidot todo Formu

function App() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  console.log("todos", todos);

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form   
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
        <InputText
          id="todo-title"
          labelName="Add todo"
          value={inputValue}
          placeholder="Todo title ..."
          onValueChange={(event) => {
            const newValue = event.target.value;
            setInputValue(newValue);
        }}/>        

        <Button 
          text="Add todo"
          type="submit"
        />
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
    <TodoListFromServer/>
    </div>
   
  );
}

export default App;

/*
Input Text label and input:

        <label htmlFor="todo-title">Add todo</label>
        <input 
          id="todo-title" 
          type="text" 
          value={inputValue}
          placeholder="Title" 
          onChange={(event) => {
            const newValue = event.target.value;
            setInputValue(newValue);
          }}/>

*/
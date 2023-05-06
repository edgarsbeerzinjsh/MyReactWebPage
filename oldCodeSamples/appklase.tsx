import { useState } from 'react';
import './styles/App.scss';

const name = "Edga";

type Todo = {
  title: string;
  id: string;
  isChecked: boolean;
  description?: string;
}
// Apdeito elementa vērtību (neReact):
// const name = querySelector(h2);
// name.textContent = "Elza";

// const button = querySelector(button);


function App() {
  //const [todos, setTodos] = useState([]);
  const [name, setName] = useState("Peteris");

  return (
    <div>
      <h2>{name}</h2>
      <button 
        onClick={() => {
          setName("Elza");
        }}
        >
        Change name
      </button>
    </div>
  );
}

/*
Bez Todo komponentes
            /*
            <li key={todo.id}>
              <span>{todo.title}</span>
              <input 
                type="checkbox" 
                checked={todo.isDone}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedTodoCopy = {...todo, isDone: isChecked};
                  const updatedTodos = todos.map((todo) => {
                    if (todo.id === updatedTodoCopy.id) {
                      return updatedTodoCopy;
                    }
                    return todo;
                  });
                  setTodos(updatedTodos);
                }}
              />
            </li>
            */



/*
interface TodoI {
  title: string;
  id: string;
  isChecked: boolean;
  description?: string;
}

interface ExtendedTodoI extends TodoI {
  year: number;
  month: string[];
}

type ExtendedTodo2I = TodoI & {
  yearEnd: number;
}

type UnionType = string | number;
type Variants = "a" | "b" | "c";

type PickedTodo = Pick<TodoI, "title" | "id">;
type OmitTodo = Omit<TodoI, "description">;

const todo: TodoI = {
  title: "Learn TypeScript",
  id: "1",
  isChecked: false,
  description: "Learn TypeScript"
}

let a = 5 as UnionType;

a = "abc";

const abc {} as unknown as ExtendedTodoI;

enum Variant {
  Success = "success",
  Warning = "warning",
  Error = "error"
}
*/

/*

const position = "Software Developer";
const skills = [
  {
    id: 1,
    name: "HTML",
    year: 2022,
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    id: 2,
    name: "CSS",
    year: 2022,
    month: ["Jan", "Feb", "Mar", "Apr", "May"]
  },
  {
    id: 3,
    name: "JavaScript",
    year: 2021,
    month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    id: 4,
    name: "PHP",
    year: 2023,
    month: ["Jan", "Feb", "Apr", "May", "Jun", "Jul", "Oct", "Nov", "Dec"]
  },
  {
    id: 5,
    name: "React",
    year: 2022,
    month: ["Jan", "Feb", "Mar", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    id: 6,
    name: "Vue",
    year: 2022,
    month: []
  },
  {
    id: 7,
    name: "TypeScript",
    year: 2022,
    month: ["Jan", "Feb", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  {
    id: 8,
    name: "C#",
    year: 2021,
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }
];

const lerningYear = 2020;
const showSkills = true;
const noName = "You have no name?!"

const activities = {
  2021: "Started learning C#",
  yeartwotwo: "Started learning TypeScript"
}

function App() {
  return (
    <div>
      {name ? 
      <h2 className="name-text">{name}</h2> : 
      <><h2 className="no-name-text">{noName}</h2>
      <h3 className="no-name-text">Here ware supposed to be your name</h3></>}
      {position ? <h3 className="position-text">{position}</h3> : null}
      {skills.length ? (
      <ul className="skills-list">
        {skills.map((skill, index) => {
          return (skill.year !== lerningYear ? 
          <li className="skill-list-item" key={index}>
            <p className="skill-list-name">{skill.name}</p>
            {skill.month.length ? (
            <div className="skill-month-line">
              {skill.month.map((month, month_index) => {
                return (<p className="skill-month-month" key={month_index}>{month}</p>);
                })}
            </div>
            ) : null}
          </li> : null);
        })}
      </ul>
      ) : null}

      {activities[2021]}
      <br></br>
      {activities.yeartwotwo}
      <br></br> 
      <h3>{sum(2, 1)}</h3>
      <br></br>
      <h4><Sum a={3} b={6}/></h4>    
    </div>
  );
}


export default App;
// standartā jsx un tsx
const sum = (a: number, b: number) => {
  return a + b;
}
// otrs variants
function sum2(a: number, b: number) => {
  return a + b;
}

// reactā
type SumProps = {
  a: number;
  b: number;
};

const Sum = (props: SumProps) => {
  return (
    <div>
      {sum(props.a, props.b)}
    </div>
  );
}
/*
function App() {

  console.log("Hi, my name is tuncis")
  return (
    <div>
      <h1>Hello world</h1>
      <h2>Heading 2 elemnt</h2>
      <ul>
        <li className='first-groupUL'>Item 1</li>
        <li className='first-groupUL'>Item 2</li>
        <li className='first-groupUL'>Item 3</li>
      </ul>

      <ul>
        <li>Item 4</li>
        <li id="list-item5" className='first-groupUL'>Item 5</li>
        <li id="list-item6" className='first-groupUL'>Item 6</li>
      </ul>

      <p></p>
      <div>
        <p>test1</p>
        <p>test2</p>
      </div>

      <div className='element'>
        Test1 text
      </div>

      <a href="https:/www.draugiem.lv">Draugiem.lv</a>
      <br></br>

      <button className='fancy-button'>Fancy button</button>
      <br></br>

      <button id='button2' className='fancy-button' disabled>Fancy button2</button>
      <br></br>

      <input type='text'/>
      <input type='checkbox'/>
      <input type='radio'/>
      <input type='submit'/>
      <input type='button'/>
      <input type='reset'/>
      <input type='image' alt='image'/>
      <input type='color'/>
      <input type='search'/>

            <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>  
      </ul>
      <ol>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
      </ol> 

    </div>
  );
}

export default App;
*/

/*
Settteru piemēri


import { useState } from 'react';
import './styles/App.scss';

const name = "Edga";

type Todo = {
  title: string;
  id: string;
  isChecked: boolean;
  description?: string;
}

function App() {
  //const [todos, setTodos] = useState([]);
  const [name, setName] = useState("Peteris");
  const [count, setCount] = useState(0);
  const [object, setObject] = useState<Todo>({})

  return (
    <div>
      <h2>{name}</h2>
      <button 
        onClick={() => {
          setName("Elza");
        }}
        >
        Change name
      </button>
    </div>
  );
}
*/

/*
Pirms componentu


import { useState } from 'react';
import './styles/App.scss';

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

        <button type="submit">Add todo</button>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <input 
                type="checkbox" 
                checked={todo.isDone}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const updatedTodoCopy = {...todo, isDone: isChecked};
                  const updatedTodos = todos.map((todo) => {
                    if (todo.id === updatedTodoCopy.id) {
                      return updatedTodoCopy;
                    }
                    return todo;
                  });
                  setTodos(updatedTodos);
                }}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
*/
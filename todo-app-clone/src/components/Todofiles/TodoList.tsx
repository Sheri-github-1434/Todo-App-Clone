import React, { useEffect, useState} from 'react';
import { TodoListItem } from './TodoListItem';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import firebase from "../../firebase"

interface Props {
  todos: Todo[];
  toggleTodo: ToggleTodo;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {


  const todoLists = () => {
    const storage = (localStorage.getItem("todos"))
    if(storage) {
      return JSON.parse(localStorage.getItem("todos") || "{}")
    } 
  }


  const [todoList, setTodoList] = useState(todoLists())
  

  useEffect(() => {
    const todoRef = firebase.database().ref('Todo');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const todoLists = [];
      for (let id in todos) {
        todoLists.push({ id, ...todos[id] });
      }
        setTodoList(todoList);
    }, []);
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
      localStorage.getItem("todos")
  }, [todos])

  console.log(localStorage.getItem("todos"))

  return (
    <>
    
    <ul style={{
     fontFamily: "sans-serif",
     listStyle: "none",
     marginLeft: "256px",
     marginTop: '40px',
     color: "black",
     width: "80%",
    }}>
    
      {todos.map(todo => ( 
 <TodoListItem key={Math.floor(Math.random()* 1000)} todo={todo} toggleTodo={toggleTodo} />
      ))}  
    </ul>
    </>
  )
}

import './App.css';
import Header from './Header';
import {Todos} from './Todos';
import React,{useState} from 'react';
import {Footer} from './Footer';
import {AddTodo} from './AddTodo';
function App() {
  const onDelete = (todo) =>{
    console.log("I am onDelete of todo",todo)
    //let index=todos.indexOf(todo);
    //todos.splice(index,1);

    setTodos(todos.filter((e)=>{
    return e!==todo;
    }))
  }

  const addTodo=(title,desc)=>{
    console.log("I am adding this todo",title,desc)
    let sno = todos[todos.length-1].sno+1;
    const myTodo={
      sno:sno,
      title:title,
      desc:desc,
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
  }
const [todos,setTodos]=useState([
{
  sno:1,
  title:"Go to the market",
  desc : "You need to go to the market to get this job done"
},
{
  sno:2,
  title:"Go to the mall",
  desc : "You need to go to the  mall to get this job done"
},
{
  sno:3,
  title:"Go to the gym",
  desc : "You need to go to the  gym to get this job done"
},
]);
  return (
  
  <>
  <Header title="MyTodos List" searchBar={false} />
  <AddTodo addTodo={addTodo}/>
  <Todos todos={todos} onDelete={onDelete}/>
  <Footer/>
  
  </>
   
  );
}
export default App;

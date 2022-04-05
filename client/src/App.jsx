import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [ task, setTask ] = useState('')
  const [ todolist, setTodoList ] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5001/')
    .then(res => setTodoList(res.data))
    .catch(err => console.log(err.message))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5001/task',{task})
      .then(res => (
         setTodoList(arr => [...arr, res.data]),
         setTask('')
      ))
      .catch(err => console.log(err.message))
  }

  const deleteFunc = (e, id) => {
    e.preventDefault()

    console.log(id)

    axios.post(`http://localhost:5001/delete/${id}`)
      .then(res => setTodoList(res.data))
      .catch(err => console.log(err.message))
    // console.log(id)

  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={e => setTask(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <br></br>

      { todolist.length > 0 ? 
      todolist.map(m=> {
      return <form key={m._id} onSubmit={e => deleteFunc(e, m._id)}>
          <p>{m.task}</p>
          <button type="submit">X</button>
        </form>
      })
      : <div>No Todo is available</div>  
    }

    </div>
  );
}

export default App;

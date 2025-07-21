import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid"


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
  const todoString = localStorage.getItem("todos");
  return todoString ? JSON.parse(todoString) : [];
});
const [showFinished, setshowFinished] = useState(true)

  // Save todos to localStorage every time they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished= (e)=>{
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('')
    console.log(todos)
  
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    console.log(e)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-center text-3xl'>Task Manager - Manage your task at one place</h1>
        <div className="addttodo my-5 flex flex-col gap-3">
          <h2 className='text-2xl font-bold'>Add a todo</h2>
          <input onChange={handleChange} value={todo} className='bg-white rounded-2xl w-full p-2' type="text" />
          <button onClick={handleAdd} disabled={todo.length <=3} className='bg-violet-500 cursor-pointer disabled:bg-violet-800 hover:bg-violet-900 px-2 font-bold py-0.5 rounded-md text-white '>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <div className='h-1 bg-black opacity-15 mx-auto my-4 w-[90%]'></div>
        <h2 className='text-2xl font-bold'>
          Your Todos
        </h2>
        <div className="todos">
          {todos.length === 0 && <div className='mx-5'>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => (handleEdit(e, item.id))} className='bg-violet-500 hover:bg-violet-900 px-2 font-bold py-0.5 rounded-md text-white mx-1 '><MdEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-500 hover:bg-violet-900 px-2 font-bold py-0.5 rounded-md text-white mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

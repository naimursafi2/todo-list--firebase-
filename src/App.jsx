import React, { useEffect, useState } from 'react'
import { getDatabase, push, ref, set, onValue  } from "firebase/database";


const App = () => {
  let[todoData, setTodoData] = useState("");
  let[todoList, setTodoList] = useState([]);
  const db = getDatabase();


  const handleAdd = () => {
    set(push(ref(db, "todoList")), {
      todoData,
    });
 }


useEffect(()=>{
  onValue(ref(db, "todoList"), (snapshot) => {
    let arr = [];
  snapshot.forEach((item)=>{
      arr.push(item.val())
  })
     setTodoList(arr);  
});
},[])



  return (
    <div>
      <input onChange={(e) => setTodoData(e.target.value)} type="text" placeholder='name plz'/>
      <button onClick={handleAdd}>Add</button>
      <div>
        <ul>
        {
          todoList.map((item)=>(
          <li>
            <p>{item.todoData}</p>
          </li>

         ))}
          
        </ul>
      </div>
    </div>
  )
}

export default App

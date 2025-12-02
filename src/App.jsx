import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";

const App = () => {
    let[todoData, setTodoData] = useState("");
    let[todoList, setTodoList] = useState([]);
    let[enableEdit, setEnableEdit] = useState("")
    let[updateData, setUpdateData] = useState("")

    const db = getDatabase();
    const handleAdd = ()=>{

        if(!todoData){
            return console.log("task is required");
            
        }
        set(push(ref(db,"todolist")),{
            data: todoData,
            
        }).then(()=>{
            setTodoData("")
        })     
    }

    const handleDelete = (id)=>{
     remove(ref(db, "todolist/"+id))   
    //  console.log(id);
     
    }
const handleUpdate = ()=>{
    update(ref(db, "todolist/"+enableEdit),{
        data: updateData
    }).then(()=>{
        setEnableEdit("");
        setUpdateData("");
    })
}
useEffect(()=>{
    onValue(ref(db,"todolist"),(snapshot)=>{
        let arr = [];
          snapshot.forEach((item)=>{
            arr.push({...item.val(), id: item.key})
            
        })
        setTodoList(arr);    
    })
},[])


  return (
    <div className='w-sm flex flex-col m-auto items-center ' >
        <h1 className='text-4xl mb-4 bg-amber-400 rounded-2xl mt-2 px-3 '>To Do List</h1>
    <div className="flex gap-2 w-full">
      <input onChange={(e)=>setTodoData(e.target.value)} type=" text" value={todoData} placeholder='input your task'/>
      <button onClick={handleAdd}  className='add'>Add</button>
    </div>
    <div className='flex flex-col w-full gap-2.5 bg-slate-600 p-5 mt-10 rounded-2xl '>
        {
        todoList.length > 0
        ?
            todoList.map((item)=>(
                <div key={item.id} className='flex bg-slate-400 py-2 rounded-2xl justify-between items-center gap-2'>
                   {
                    enableEdit == item.id 
                    ?
                    <input type='text'onChange={(e)=>setUpdateData(e.target.value)} value={updateData}/>
                    :
                    <p>{item.data} </p>
                   }
                    <div className='flex gap-1.5'>
                        {
                            enableEdit == item.id
                            ?
                            <button onClick={handleUpdate} className='bg-green-600 text-white px-2 py-2 rounded-2xl text-xs cursor-pointer '>update</button>
                            :

                        <>
                        <button onClick={()=>{setEnableEdit(item.id); setUpdateData(item.data)}} className='bg-yellow-600 text-white px-2 py-2 rounded-2xl text-xs cursor-pointer '>Edit</button>
                    <button onClick={()=>handleDelete (item.id)} className='bg-red-600 text-white px-2 py-2 rounded-2xl text-xs cursor-pointer '>Delete</button>
                   </>
                        }
                    </div>
                </div>
            ))
            :
            <p className='text-white text-center text-2xl'>No task found</p>
}
    </div>
    </div>
  )
}

export default App

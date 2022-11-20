import React, { useContext } from 'react'
import { useRef, useState } from 'react'
import classes from './NewTodo.module.css'
import { TodosContext } from '../store/todos-context'

const NewTodo = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [editInputValue, setEditInputValue] = useState('')
  
  const todosCtx = useContext(TodosContext);

  const todoInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (e) => {
     e.preventDefault();
     
     if(inputValue?.trim().length === 0) {
        //throw an error
        return;
     }

     if(!todosCtx.isModalOpen) {
      todosCtx.addTodo(inputValue)
      setInputValue('')
     }

    

     if(todosCtx.isModalOpen) {
      console.log('Is Editable!!!');
     }
  }

  const onChangeHandler = (e) => {
    setInputValue(e.target.value)
  }

  const onChangeEditHandler = (e) => {
    setEditInputValue(e.target.value)
  }

 

  let editableTitle;

  if(todosCtx.isModalOpen) {
    editableTitle = todosCtx.items.filter(el => el.id === todosCtx.editableItemId)[0].title

    console.log(editableTitle);
    

    // setEditInputValue(editableTitle)
  }
  
  


  return (
    <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="todo">{"Enter New Knowledge"}</label>
        <input value={inputValue} onChange={onChangeHandler} id='todo' type='text'/>
        <button>Add Knowledge</button>
    </form>
  )
}

export default NewTodo
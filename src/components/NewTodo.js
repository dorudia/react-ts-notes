import React, { useContext } from 'react'
import { useRef, useState } from 'react'
import classes from './NewTodo.module.css'
import { TodosContext } from '../reducer/todos-context'
import { useNavigate } from 'react-router-dom'

const NewTodo = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [editInputValue, setEditInputValue] = useState('')
  const navigate = useNavigate();
  
  const todosCtx = useContext(TodosContext);

  const submitHandler = (e) => {
     e.preventDefault();
     
     if(inputValue?.trim().length === 0) {
        //throw an error
        return;
     }

     if(!todosCtx.isModalOpen) {
      todosCtx.addTodo(inputValue)
      navigate(`/${inputValue}`)
      setInputValue('')
     }

     if(todosCtx.isModalOpen) {
      console.log('Is Editable!!!');
     }
  }

  const onChangeHandler = (e) => {
    if(e.target.value.includes('/')) {
      console.log('danger!!!');
    }
    setInputValue(e.target.value.replace('/', '-'))
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
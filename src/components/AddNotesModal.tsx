import React, {useState} from 'react'
import Modal from '../layers/Modal'
import classes from './EditTodoForm.module.css'

const AddNotesModal = () => {
  const [inputValue, setinputValue] = useState('')

  const onChangeHandler = (e: any) => {
    setinputValue(e.target.value)
  }

  const onSubmitHandler = (e: React.FormEvent) => {
     e.preventDefault();
     console.log('submit note!!!', inputValue);

     setinputValue('');
  }

  return (
    <Modal>
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <label htmlFor="todo">{"Enter New Note"}</label>
            <input value={inputValue} onChange={onChangeHandler} id='todo' type='text'/>
            <button>Add Note</button>
        </form>
    </Modal>
  )
}

export default AddNotesModal
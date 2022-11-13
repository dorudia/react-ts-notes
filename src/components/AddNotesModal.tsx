import React, {useState, useContext} from 'react'
import Modal from '../layers/Modal'
import classes from './EditTodoForm.module.css'
import { TodosContext } from '../store/todos-context';


const AddNotesModal = () => {
  const [inputValue, setinputValue] = useState('')

  const notesCtx = useContext(TodosContext);

  const onChangeHandler = (e: any) => {
    setinputValue(e.target.value)
  }

  const onSubmitHandler = (e: React.FormEvent) => {
     e.preventDefault();
     console.log('submit note!!!', inputValue, notesCtx.editableItemId);
     notesCtx.addTabs(notesCtx.editableItemId, inputValue)
     

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
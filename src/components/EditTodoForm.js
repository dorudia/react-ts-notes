import React, {useState, useContext} from 'react';
import classes from './EditTodoForm.module.css';
import { TodosContext } from '../reducer/todos-context';
import Modal from '../layers/Modal';


const EditTodoForm = (props) => {
    const todosCtx = useContext(TodosContext);
    const editableText = todosCtx.items.find(el => el.id === todosCtx.editableItemId)?.title;
    const [inputValue, setInputValue] = useState(editableText);

    const onChangeHandler = (e) => {
      setInputValue(e.target.value)
    }


    const submitHandler = (event) => {
        event.preventDefault();
        todosCtx.updateTodo(todosCtx.editableItemId, inputValue);
        todosCtx.isModalOpenHandler(false);
        props.setEditTodoModal();

    }

    return (
        <Modal showEditTodoModal={props.setEditTodoModal}>
            <form onSubmit={submitHandler}  className={classes.form}>
                <label htmlFor="todo">{"Edit Knowledge"}</label>
                <input value={inputValue} onChange={onChangeHandler} id='todo' type='text'/>
                <button>Save</button>
            </form>
        </Modal>       
    )
}

export default EditTodoForm
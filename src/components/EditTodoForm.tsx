import React, {useState, useContext} from 'react';
import classes from './EditTodoForm.module.css';
import { TodosContext } from '../store/todos-context';
import Modal from '../layers/Modal';


const EditTodoForm: React.FC = (props) => {
    const todosCtx = useContext(TodosContext);
    const editableText = todosCtx.items.find(el => el.id === todosCtx.editableItemId)?.title;
    const [inputValue, setInputValue] = useState<any>(editableText);

    const onChangeHandler = (e: any) => {
      setInputValue(e.target.value)
    }


    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        todosCtx.updateTodo(todosCtx.editableItemId, inputValue);
        todosCtx.isModalOpenHandler(false);

    }

    return (
        <Modal>
            <form onSubmit={submitHandler}  className={classes.form}>
                <label htmlFor="todo">{"Edit Knowledge"}</label>
                <input value={inputValue} onChange={onChangeHandler} id='todo' type='text'/>
                <button>Save</button>
            </form>
        </Modal>       
    )
}

export default EditTodoForm
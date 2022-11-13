import classes from './TodoItem.module.css'
import { TodosContext } from '../store/todos-context'
import { useContext, useState } from 'react'
import Modal from '../layers/Modal'

const TodoItem: React.FC<{id: string, title: string}> = (props) => {
    const todosCtx = useContext(TodosContext)


    const onDeleteItem = () => {
        todosCtx.removeTodo(props.id)
    }

    const onEditItem = () => {
        todosCtx.editModehandler()
        // todosCtx.editableItemId = props.id;
        // console.log(todosCtx.editableItemId);
        todosCtx.onSetEditableId(props.id)
    }

    const clickHandler = () => {
        todosCtx.setKnowledgeTitle(props.title)
        todosCtx.onSetEditableId(props.id)
    }

    return (
        <li className={classes.item} onClick={clickHandler}>
            <h3>{props.title}</h3>
            <div className={classes.icons}>
                <div className={classes.editItem} onClick={onEditItem}></div>
                <div className={classes.deleteItem} onClick={onDeleteItem}></div>
            </div>
        </li>
    )
}

export default TodoItem;
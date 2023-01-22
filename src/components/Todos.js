
import React, {useContext, useEffect} from 'react'
import { TodosContext } from '../reducer/todos-context'
import TodoItem from './TodoItem'
import classes from './Todos.module.css'

const Todos= (props) => {
  const todosCtx = useContext(TodosContext);

  const activeId = todosCtx.editableItemId;

  useEffect(()=> {
    todosCtx.onSetEditableId(todosCtx.items[0]?.id)
    // console.log(todosCtx.items);
  },[todosCtx.items])
  
  
  return (
    <ul className={classes.todos}>
       {todosCtx.items.map(item => {
        return <TodoItem key={item.id} id={item.id} title={item.title} setShowEditTodoModal={props.setEditTodoModal}/>
       })}
    </ul>
  )
}

export default Todos
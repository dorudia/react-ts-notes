import { title } from 'process'
import React, {useContext, useState, useEffect} from 'react'
import { TodosContext } from '../store/todos-context'
import TodoItem from './TodoItem'
import classes from './Todos.module.css'

const Todos: React.FC = (props) => {
  const todosCtx = useContext(TodosContext);

  const activeId = todosCtx.editableItemId;

  useEffect(()=> {
    todosCtx.onSetEditableId(todosCtx.items[0]?.id)
  },[todosCtx.items])
  
  
  
  return (
    <ul className={classes.todos}>
       {todosCtx.items.map(item => {
        return <TodoItem key={item.id} id={item.id} title={item.title} />
       })}
    </ul>
  )
}

export default Todos
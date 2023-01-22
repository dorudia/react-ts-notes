import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import ContentLayer from '../layers/ContentLayer'
import EditTodoForm from './EditTodoForm'
import Navbar from './Navbar'
import NewTodo from './NewTodo'
import NotesList from './NotesList'
import Todos from './Todos'

const RootLayout = () => {
  const [showEditTodoModal, setShowEditTodoModal] = useState(false);
  
  const onSetShowEditTodoModal = () => {
    setShowEditTodoModal(!showEditTodoModal);
  }

  return (
    <>
    <Navbar/>
    <ContentLayer>
        <div className='grid-container'>
          <div className='left-container'>
            <NewTodo />
            <Todos setEditTodoModal={onSetShowEditTodoModal}/>
          </div>
          <div className="right-container">
            <NotesList/>
          </div> 
        </div>
      </ContentLayer>
      {showEditTodoModal && <EditTodoForm setEditTodoModal={onSetShowEditTodoModal}/>}
    </>
  )
}

export default RootLayout
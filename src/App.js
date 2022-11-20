import React, {useContext, useState} from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import './App.css'
import { TodosContext } from './store/todos-context';
import ContentLayer from './layers/ContentLayer';
import EditTodoForm from './components/EditTodoForm';
import NotesList from './components/NotesList';






const App = () => {
  const [showEditTodoModal, setShowEditTodoModal] = useState(false)

  // const todosCtx = useContext(TodosContext);
  
  const onSetShowEditTodoModal = () => {
    setShowEditTodoModal(!showEditTodoModal);
  }
  

  return (
    <>
      <nav>CSS-SCSS-JS-React-Hooks-Router-Context-Redux-Typescript...</nav>
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
  );
}

export default App;

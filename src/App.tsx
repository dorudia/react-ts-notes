import React, {useContext, useEffect} from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
// import Todo from './models/todo';
import './App.css'
import TodosContextProvider from './store/todos-context';
import { TodosContext } from './store/todos-context';
import ContentLayer from './layers/ContentLayer';
import Modal from './layers/Modal';
import EditTodoForm from './components/EditTodoForm';
import NotesList from './components/NotesList';






const App: React.FC = () => {

  const todosCtx = useContext(TodosContext);
  // console.log(todosCtx);
  

  // useEffect(() => {
  // console.log('changed edit mode');
  
  // }, [todosCtx.editMode])
  

  return (
    <>
      <nav>React-Hooks-Context-JS-Redux-Typescript</nav>
      <ContentLayer>
        <div className='grid-container'>
          <div className='left-container'>
            <NewTodo />
            <Todos />
          </div>
          <div className="right-container">
             <NotesList/>
          </div> 
        </div>
      </ContentLayer>
      {todosCtx.isModalOpen && <EditTodoForm/>}
    </>
  );
}

export default App;

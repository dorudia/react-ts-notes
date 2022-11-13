import React, {useContext, useState} from 'react'
import { TodosContext } from '../store/todos-context';
import AddNotesModal from './AddNotesModal';
import classes from './NotesList.module.css'

const NotesList: React.FC<{}> = (props) => {
  const todosCtx = useContext(TodosContext);
  const [showModal, setShowModal] = useState(false)

  const showModalHandler = ()=> {
    setShowModal(!showModal);
  }

  return ( <>
  <div className={classes.notesListContainer}>
    <h2>
      {todosCtx.knowledgeTitle} 
      <span onClick={showModalHandler}>Add +</span>
    </h2>
    <ul>
      <li><h4>test li 1</h4></li>
      <li><h4>test li 2</h4></li>
      <li><h4>test li 3</h4></li>
      <li>+</li>
    </ul>
  </div>
  {showModal && <AddNotesModal/>}
  </>
  )
}

export default NotesList;
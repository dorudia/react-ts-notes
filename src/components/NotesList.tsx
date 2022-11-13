import React, {useContext, useState} from 'react'
import { TodosContext } from '../store/todos-context';
import AddNotesModal from './AddNotesModal';
import classes from './NotesList.module.css'

type Todo = {id: string, title: string, tabs: {id: string, item: string}[] | undefined}

const NotesList: React.FC<{}> = (props) => {
  const [activeItem, setActiveItem] = useState<{id: string, item: string}[] | undefined>([])
  const todosCtx = useContext(TodosContext);
  const [showModal, setShowModal] = useState(false)

  const showModalHandler = ()=> {
    setShowModal(!showModal);
  }

  const editableItemId = todosCtx.editableItemId
  

  React.useEffect(() => {
    console.log('changed id');
    console.log(todosCtx.items);

    const activeTab: any = todosCtx.items.find(el => el.id === todosCtx.editableItemId);
    console.log(activeTab?.tabs);

    setActiveItem(activeTab?.tabs)
    
    
  }, [editableItemId])

  

  // const activeItem: Todo | any = todosCtx.items.filter(el => el.id === todosCtx.editableItemId) 

  // console.log(activeItem.tabs);
  
  

  return ( <>
  <div className={classes.notesListContainer}>
    <h2>
      {todosCtx.knowledgeTitle} 
      <span onClick={showModalHandler}>Add +</span>
    </h2>
    <ul>
      {activeItem && activeItem.map((el: any) => (
        <li key={el.id}>{el.item}</li>
      ))}
    </ul>
  </div>
  {showModal && <AddNotesModal/>}
  </>
  )
}

export default NotesList;
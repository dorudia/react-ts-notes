import React, {useContext, useState} from 'react'
import { TodosContext } from '../store/todos-context';
import AddNotesModal from './AddNotesModal';
import classes from './NotesList.module.css';
import TextareaAutosize from 'react-textarea-autosize';

const NotesList = () => {
  const [activeItem, setActiveItem] = useState([]);
  const todosCtx = useContext(TodosContext);
  const [showTabModal, setShowTabModal] = useState(false);
  const [myDescription, setMyDescription] = useState('')
  const [itemTitle, setItemTitle] = useState('')

  const showTabModalHandler = ()=> {
    setShowTabModal(!showTabModal);
    // todosCtx.isModalOpenHandler(true)
  }

  const editableItemId = todosCtx.editableItemId
  

  React.useEffect(() => {
    // console.log('changed id');

    const activeTab = todosCtx.items.find(el => el.id === todosCtx.editableItemId);
    // console.log(activeTab?.tabs);
    // console.log(activeTab);

    setActiveItem(activeTab)

    console.log(activeItem?.tabs);

    setItemTitle(() => {
      if(activeItem && activeItem.tabs ) {
        return activeItem?.tabs[0]?.itemName || 'No Notes!'
     }
    });

    setMyDescription(() => {
      if(activeItem && activeItem.tabs ) {
        return activeItem?.tabs[0]?.itemtext || ""
     }
    });


    // setMyDescription(activeItem?.tabs ? activeItem?.tabs[0]?.itemtext : '');
    
    
  }, [editableItemId, activeItem?.tabs])

  

  const handleTabClick = (id) => {
    console.log(id);
    const description = activeItem.tabs.find(el => el.id === id).itemtext;
    const itemTitle = activeItem.tabs.find(el => el.id === id).itemName;
    setMyDescription(description);
    setItemTitle(itemTitle)
  }

  
  

  return ( <>
  <div className={classes.notesListContainer}>
    <h2>
      {todosCtx.knowledgeTitle} 
      <span onClick={showTabModalHandler}>Add +</span>
    </h2>
    <ul>
      {activeItem?.tabs && activeItem?.tabs.map((el) => (
        <li key={el.id} onClick={() => handleTabClick(el.id)}>{el.itemName}</li>
      ))}
    </ul>
    <div className='tab-details'>
      <h3>{itemTitle}</h3>
      <TextareaAutosize defaultValue={myDescription} readOnly/>    
    </div>
  </div>
  {showTabModal && <AddNotesModal showTabModalHandler={showTabModalHandler}/>}
  </>
  )
}

export default NotesList;
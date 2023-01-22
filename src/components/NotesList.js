import React, {useContext, useEffect, useState} from 'react'
import { TodosContext } from '../reducer/todos-context';
import AddNotesModal from './AddNotesModal';
import classes from './NotesList.module.css';
import {NavLink, useParams, useNavigate} from 'react-router-dom';
import TabDetails from './TabDetails';


const NotesList = () => {
  const [activeItem, setActiveItem] = useState([]);
  const [tabs, setTabs] = useState([])
  const todosCtx = useContext(TodosContext);
  const [showTabModal, setShowTabModal] = useState(false);
  const [myDescription, setMyDescription] = useState('')
  const [itemTitle, setItemTitle] = useState('')
  const params = useParams();
  const navigate = useNavigate();
  console.log(navigate.status);

  const showTabModalHandler = ()=> {
    setShowTabModal(!showTabModal);
  }

  useEffect(() => {
    
    const activeTab = todosCtx.items.find(el => el.title === params.todo);
    setActiveItem(activeTab)
    console.log(activeTab?.tabs);
    setTabs(activeTab?.tabs)

    setItemTitle(() => {
      return activeTab?.tabs.length ? activeTab.tabs[0].itemName: "No Tabs Found!"
    });

    setMyDescription(() => {
      return activeTab?.tabs.length ? activeTab.tabs[0].itemText: "No Tabs Found!"
    });
    
    console.log(params.todo);
    if(!params.todo) {
      setActiveItem(todosCtx.items[0])
      setItemTitle(todosCtx.items[0]?.tabs[0].itemName);
      setMyDescription(todosCtx.items[0]?.tabs[0].itemtext);
      console.log('emtpy parans', activeItem, itemTitle, myDescription);
    }

  }, [ todosCtx.items, params])

  

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
      {params.todo || "CSS"}
      <span onClick={showTabModalHandler}>Add +</span>
    </h2>
    <ul>
      {tabs?.map((el) => (
        <li key={el.id} onClick={() => handleTabClick(el.id)}>
          <NavLink 
             to={`/${params.todo}/${el.itemName.replace('/','-')}`}
             className={({isActive}) => isActive ? classes.active : undefined}
          >
            {el.itemName}
          </NavLink>
        </li>
      ))}
    </ul>
      <TabDetails defaultTitle={itemTitle} defaultDescription={myDescription} myTabs={tabs}/>
    
  </div>
  {showTabModal && <AddNotesModal showTabModalHandler={showTabModalHandler}/>}
  </>
  )
}



export default NotesList;
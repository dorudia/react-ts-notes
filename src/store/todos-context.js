import React, {useState, useEffect} from "react";
// import Todo from "../models/todo";


export const TodosContext = React.createContext({
    items: [],
    isModalOpen: false,
    getTodos: () => {},
    addTodo: () => {},
    removeTodo: () => {},
    updateTodo: () => {},
    isModalOpenHandler: () => {},
    editableItemId: "",
    onSetEditableId: () => {},
    knowledgeTitle: "",
    setKnowledgeTitle: () => {},
    addTabs: () => {},
});

const TodosContextProvider = (props) => {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [editableItemId, seteditableItemId] = useState('')
    const [knowledgeTitle, setKnowledgeTitle] = useState("CSS")

    const isModalOpenHandler = (text) => {
      setisModalOpen(text)
    }
    

    const fetchNotes = async () => {
      const response = await fetch('https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes.json');
      if(!response.ok) {
         throw new Error("Something went wrong!");
      }

      const data = await response.json();
      // console.log(data);

      const transformedData = [];
      

     for(const key in data) {

      const transformedTabs= [];

      for(const el in data[key].items) {
        const tabsObject = {
          id: el,
          itemName: data[key].items[el].itemName,
          itemtext: data[key].items[el].itemText
        }

        transformedTabs.push(tabsObject)
      }

         const contentObj = {
             id: key,
             title: data[key].title,
             tabs: transformedTabs
         }

         transformedData.push(contentObj);
     }

     setTodos(transformedData);
      
    }


    useEffect(() => {

      try {
        fetchNotes();
      } catch (error) {
        console.log(error)
      } finally {
        console.log(todos);
      }

    }, [])

    const deleteNotesItem = (id) => {
        fetch(
           // don't add .json at [data Name]
          `https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`,
          {
            method: 'Delete',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
                 // if sucess do something
            } else {
                 // if fail throw error
              throw new Error('could not delete data');
            }
          })
          .catch((error) => {
            console.log(error);
          });

          console.log('deletted!!!!!');
          
    }
    

    function addTodo(text) {
      const newTodo =  {title: text, }
      // setTodos([...todos, newTodo]);
      fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes.json`, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {'ContentType': 'aplication/json'}
      }).then(() => {
        fetchNotes();
      })
      
    }

    // 

    const addTabs = async (id, text1, text2) => {
      fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}/items.json`, {
        method: 'POST',
        body: JSON.stringify({itemName: text1, itemText: text2}),
        headers: {'ContentType': 'aplication/json'}
      }).then(() => {
        fetchNotes();
      })     
  }
  
    const deleteItemHandler = (id) => {
      const filterdTodos = todos.filter(item => item.id !== id)
      setTodos(filterdTodos);
      deleteNotesItem(id);
    }

    const updateTodo = async (id, text) => {
        const myItem = todos.find(el => el.id === id);
        console.log(myItem);

        const response = await fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}/title.json`, {
          method: 'PUT',
          body: JSON.stringify(text),
          headers: {'ContentType': 'aplication/json'}
        })
        if(!response.ok) {
          throw new Error('Something went wrong!')
        }
        fetchNotes()      
    }

    const setEditableId = (id) => {
      seteditableItemId(id)
    }

    const contextValue = {
        items: todos,
        isModalOpen: isModalOpen,
        getTodos: fetchNotes,
        addTodo: addTodo,
        removeTodo: deleteItemHandler,
        updateTodo: updateTodo,
        isModalOpenHandler,
        editableItemId: editableItemId,
        onSetEditableId: setEditableId,
        knowledgeTitle,
        setKnowledgeTitle,
        addTabs,
    }

   return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>

}

export default TodosContextProvider;
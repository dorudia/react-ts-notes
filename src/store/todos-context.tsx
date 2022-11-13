import React, {useState, useEffect} from "react";
// import Todo from "../models/todo";


type Todo = {id: string, title: string, tabs: {id: string, item: string}[]}

type TodoContextObj = {
    items: Todo[];
    editMode: boolean;
    getTodos: () => void;
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, text: string) => void;
    editModehandler: () => void;
    editableItemId: string;
    onSetEditableId: (id: string) => void;
    knowledgeTitle: string | null,
    setKnowledgeTitle: (text: string) => void;
    addTabs: (id: string, text: string) => void;
}

export const TodosContext = React.createContext<TodoContextObj>({
    items: [],
    editMode: false,
    getTodos: () => {},
    addTodo: (text: string) => {},
    removeTodo: (id: string) => {},
    updateTodo: (id: string, text: string) => {},
    editModehandler: () => {},
    editableItemId: "",
    onSetEditableId: () => {},
    knowledgeTitle: "",
    setKnowledgeTitle: (text: string) => {},
    addTabs: (id: string, text: string) => {},
});

type Props = { children: React.ReactNode }

const TodosContextProvider: React.FC<Props> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isEditMode, setisEditMode] = useState(false);
    const [editableItemId, seteditableItemId] = useState('')
    const [knowledgeTitle, setKnowledgeTitle] = useState("CSS")

    const editModehandler = () => {
       setisEditMode(!isEditMode)
    }
    

    const fetchNotes = async () => {
      const response = await fetch('https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes.json');
      if(!response.ok) {
         throw new Error("Something went wrong!");
      }

      const data = await response.json();
      // console.log(data);

      const transformedData: { id: string; title: string; tabs: {id: string, item: string}[] }[] = [];
      

     for(const key in data) {

      const transformedTabs: {id: string, item: string}[] = [];

      for(const el in data[key].items) {
        const tabsObject = {
          id: el,
          item: data[key].items[el].itemName
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
        // setEditableId(todos[0]?.id)
      }

    }, [])

    const deleteNotesItem = (id: string) => {
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
    

    function addTodo(text: string) {
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

    const addTabs = async (id: string, text: string) => {
      fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}/items.json`, {
        method: 'POST',
        body: JSON.stringify({itemName: text}),
        headers: {'ContentType': 'aplication/json'}
      }).then(() => {
        fetchNotes();
      })     
  }
  
    const deleteItemHandler = (id: string) => {
      const filterdTodos = todos.filter(item => item.id !== id)
      setTodos(filterdTodos);
      deleteNotesItem(id);
    }

    const updateTodo = async (id: string, text: string) => {
        const response = await fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`, {
          method: 'PUT',
          body: JSON.stringify({title: text}),
          headers: {'ContentType': 'aplication/json'}
        })
        if(!response.ok) {
          throw new Error('Something went wrong!')
        }
        fetchNotes()      
    }

    const setEditableId = (id: string) => {
      seteditableItemId(id)
    }

    const contextValue: TodoContextObj= {
        items: todos,
        editMode: isEditMode,
        getTodos: fetchNotes,
        addTodo: addTodo,
        removeTodo: deleteItemHandler,
        updateTodo: updateTodo,
        editModehandler: editModehandler,
        editableItemId: editableItemId,
        onSetEditableId: setEditableId,
        knowledgeTitle,
        setKnowledgeTitle,
        addTabs,
    }

   return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>

}

export default TodosContextProvider;
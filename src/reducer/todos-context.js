import React, {useState, useEffect} from "react";
// import Todo from "../models/todo";
import useDataFetch from "../hooks/use-data-fetch";


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

    const {todos, updateTodos, deleteNotesItem, addTodos, addNewTabs} = useDataFetch();
    const [isModalOpen, setisModalOpen] = useState(false);
    const [editableItemId, seteditableItemId] = useState('');
    const [knowledgeTitle, setKnowledgeTitle] = useState("CSS");
  
    const isModalOpenHandler = (text) => {
      setisModalOpen(text)
    }

    const setEditableId = (id) => {
      seteditableItemId(id)
    }

    const contextValue = {
        items: todos,
        isModalOpen: isModalOpen,
        addTodo: addTodos,
        removeTodo: deleteNotesItem,
        updateTodo: updateTodos,
        isModalOpenHandler,
        editableItemId: editableItemId,
        onSetEditableId: setEditableId,
        knowledgeTitle,
        setKnowledgeTitle,
        addTabs: addNewTabs
    }

   return <TodosContext.Provider value={contextValue}>{props.children}</TodosContext.Provider>

}

export default TodosContextProvider;
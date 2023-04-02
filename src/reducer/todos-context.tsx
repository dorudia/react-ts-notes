import React, { useState, useEffect } from "react";
import { string } from "yargs";
// import Todo from "../models/todo";
import useDataFetch from "../hooks/use-data-fetch";
import { ItemType, CtxType, BoxProps } from "../types/types";

export const TodosContext = React.createContext({
  // items: [],
  // isModalOpen: false,
  // // getTodos: () => {},
  // addTodo: () => {},
  // removeTodo: () => {},
  // updateTodo: () => {},
  // isModalOpenHandler: () => {},
  // editableItemId: string,
  // onSetEditableId: () => {},
  // knowledgeTitle: string,
  // setKnowledgeTitle: () => {},
  // addTabs: () => {},
});

const TodosContextProvider = ({ children }: BoxProps) => {
  const { todos, updateTodos, deleteNotesItem, addTodos, addNewTabs } =
    useDataFetch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [editableItemId, seteditableItemId] = useState("");
  const [knowledgeTitle, setKnowledgeTitle] = useState("");

  const isModalOpenHandler = (text: boolean) => {
    setisModalOpen(text);
  };

  const setEditableId = (id: string) => {
    seteditableItemId(id);
  };

  const contextValue: CtxType = {
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
    addTabs: addNewTabs,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;

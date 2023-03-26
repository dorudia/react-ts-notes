import React, { useState, useContext } from "react";
import classes from "./EditTodoForm.module.css";
import { TodosContext } from "../reducer/todos-context";
import Modal from "../layers/Modal";
import { CtxType } from "../types/types";

const EditTodoForm: React.FC<{ setEditTodoModal: () => void }> = (props) => {
  const todosCtx = useContext(TodosContext) as CtxType;
  const editableText: any = todosCtx.items.find(
    (el) => el.id === todosCtx.editableItemId
  )?.title;
  const [inputValue, setInputValue] = useState<string>(editableText);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    todosCtx.updateTodo(todosCtx.editableItemId, inputValue);
    todosCtx.isModalOpenHandler(false);
    props.setEditTodoModal();
  };

  return (
    <Modal showEditTodoModal={props.setEditTodoModal}>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="todo">{"Edit Knowledge"}</label>
        <input
          value={inputValue}
          onChange={onChangeHandler}
          id="todo"
          type="text"
        />
        <button>Save</button>
      </form>
    </Modal>
  );
};

export default EditTodoForm;

import React, { useState, useContext } from "react";
import classes from "./EditTodoForm.module.css";
import { TodosContext } from "../reducer/todos-context";
import Modal from "../layers/Modal.js";
import { CtxType } from "../types/types";

const EditTodoForm: React.FC<{ setEditTodoModal: () => void }> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
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

    if (inputValue?.trim().length === 0) {
      //throw an error
      setErrorMessage("Please enter some text!");
      return;
    }

    if (todosCtx.items.map((el) => el.title).includes(inputValue.trim())) {
      setErrorMessage("Allready exist!");
      return;
    }

    todosCtx.updateTodo(todosCtx.editableItemId, inputValue);
    todosCtx.isModalOpenHandler(false);
    todosCtx.onSetEditableId(todosCtx.editableItemId);
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
        <h5 style={{ color: "red", marginBottom: 8 }}>{errorMessage}</h5>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoForm;

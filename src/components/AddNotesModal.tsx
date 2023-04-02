import React, { useState, useEffect, useContext, useRef } from "react";
import Modal from "../layers/Modal.js";
import classes from "./AddNotesModal.module.css";
import { TodosContext } from "../reducer/todos-context";
import { CtxType } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";

const AddNotesModal: React.FC<{ showTabModalHandler: () => void }> = (
  props
) => {
  const [inputValue, setinputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const todosCtx = useContext(TodosContext) as CtxType;
  const navigate = useNavigate();
  const notesCtx = useContext(TodosContext) as CtxType;
  const params = useParams();
  console.log(params.todo);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
    setErrorMessage("");
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue?.trim().length === 0) {
      //throw an error
      setErrorMessage("Please enter some text!");
      return;
    }

    const tabs = todosCtx.items.filter(
      (el) => el.title === todosCtx.knowledgeTitle
    );

    const tabsItems = tabs[0].tabs.map((item) => item.itemName);
    console.log(tabs[0].tabs);

    if (tabsItems.includes(inputValue.trim())) {
      setErrorMessage("Allready exist!");
      return;
    }

    // console.log("submit note!!!", inputValue, notesCtx.editableItemId);

    // if (inputValue.trim().length < 3) {
    //   console.log("title to short!");
    //   return;
    // }

    if (textareaValue.trim().length < 1) {
      console.log("title to short!");
      setErrorMessage2("Description required");
      return;
    }

    setinputValue("");
    navigate(`/${todosCtx.knowledgeTitle}/${inputValue}`);
    console.log(notesCtx.items.filter((el) => el.title === params.todo)[0].id);

    // todosCtx.onSetEditableId(
    //   todosCtx.items.filter((el) => el.title === params.todo)[0].id
    // );

    notesCtx.addTabs(notesCtx.editableItemId, inputValue, textareaValue);
    props.showTabModalHandler();

    console.log("onSubmit!", notesCtx.editableItemId);
    todosCtx.isModalOpenHandler(false);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "66px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [textareaValue]);

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
    setErrorMessage2("");
  };

  return (
    <Modal setShowTabModal={props.showTabModalHandler}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <label htmlFor="todo">Enter New Note</label>
        <input
          value={inputValue}
          onChange={onChangeHandler}
          id="todo"
          type="text"
        />
        <h5 style={{ color: "red", marginBottom: 8 }}>{errorMessage}</h5>
        <label htmlFor="textarea-tab">Description</label>
        <textarea
          ref={textareaRef}
          id="textarea-tab"
          style={{
            width: "100%",
            display: "block",
            resize: "none",
            backgroundColor: "#eee",
            margin: "1rem 0",
            padding: "1rem",
          }}
          value={textareaValue}
          onChange={textAreaChange}
        >
          {textareaValue}
        </textarea>
        <h5 style={{ color: "red", marginBottom: 8 }}>{errorMessage2}</h5>
        <button>Add Note</button>
      </form>
    </Modal>
  );
};

export default AddNotesModal;

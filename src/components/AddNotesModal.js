import React, {useState, useEffect, useContext, useRef} from 'react'
import Modal from '../layers/Modal'
import classes from './AddNotesModal.module.css'
import { TodosContext } from '../reducer/todos-context';


const AddNotesModal = (props) => {
  const [inputValue, setinputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState()
  const textareaRef = useRef(null);

  const notesCtx = useContext(TodosContext);

  const onChangeHandler = (e) => {
    setinputValue(e.target.value)
  }

  const onSubmitHandler = (e) => {
     e.preventDefault();
     console.log('submit note!!!', inputValue, notesCtx.editableItemId);
     notesCtx.addTabs(notesCtx.editableItemId, inputValue, textareaValue);
     props.showTabModalHandler();
     if(inputValue.trim().length < 3) {
      console.log('title to short!');
      return;
     }

     if(textareaValue.trim().length < 3) {
      console.log('title to short!');
      return;
     }
     

     setinputValue('');
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "66px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [textareaValue]);

  const textAreaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const styles = {
    container: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textareaDefaultStyle: {
      // padding: 5,
      width: '100%',
      display: "block",
      resize: "none",
      backgroundColor: "#eee",
      margin: "1rem 0",
      padding: "1rem"
    },
  };

  return (
    <Modal setShowTabModal={props.showTabModalHandler}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <label htmlFor="todo">{"Enter New Note"}</label>
            <input value={inputValue} onChange={onChangeHandler} id='todo' type='text'/>
            <textarea ref={textareaRef}
              style={styles.textareaDefaultStyle}
              value={textareaValue}
              onChange={textAreaChange}
            >
               {textareaValue}
           </textarea>
            <button>Add Note</button>
        </form>
    </Modal>
  )
}

export default AddNotesModal
import React, {useState, useEffect, useContext, useRef} from 'react'
import Modal from '../layers/Modal'
import classes from './EditTodoForm.module.css'
import { TodosContext } from '../store/todos-context';


const AddNotesModal = () => {
  const [inputValue, setinputValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<String>();

  const notesCtx = useContext(TodosContext);

  const onChangeHandler = (e: any) => {
    setinputValue(e.target.value)
  }

  const onSubmitHandler = (e: React.FormEvent) => {
     e.preventDefault();
     console.log('submit note!!!', inputValue, notesCtx.editableItemId);
     notesCtx.addTabs(notesCtx.editableItemId, inputValue)
     

     setinputValue('');
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "66px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const styles: { [name: string]: React.CSSProperties } = {
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
    <Modal>
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <label htmlFor="todo">{"Enter New Note"}</label>
            <input value={inputValue} onChange={onChangeHandler} id='todo' type='text'/>
            <textarea ref={textareaRef}
              style={styles.textareaDefaultStyle}
              onChange={textAreaChange}
            >
               {value}
           </textarea>
            <button>Add Note</button>
        </form>
    </Modal>
  )
}

export default AddNotesModal
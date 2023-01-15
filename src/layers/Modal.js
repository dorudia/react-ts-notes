import React, {useContext} from 'react';
import classes from './Modal.module.css'
import { TodosContext } from '../reducer/todos-context';

const Modal = (props) => {
  // const notesCtx = useContext(TodosContext)

  const clickWrapperHandler = () => {
    if( props.showEditTodoModal) {
      props.showEditTodoModal();
    }
    
    if(props.setShowTabModal) {
      props.setShowTabModal();
    }
  }

  return (
    <div className={classes.modalWrapper} onClick={clickWrapperHandler} >
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;
import classes from "./TodoItem.module.css";
import { TodosContext } from "../reducer/todos-context";
import { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CtxType } from "../types/types";

const TodoItem: React.FC<{
  id: string;
  title: string;
  setShowEditTodoModal: () => void;
}> = (props) => {
  const todosCtx = useContext(TodosContext) as CtxType;
  const params = useParams();

  const onDeleteItem = () => {
    todosCtx.removeTodo(props.id);
  };

  const onEditItem = () => {
    todosCtx.isModalOpenHandler(true);
    todosCtx.editableItemId = props.id;
    console.log(todosCtx.editableItemId);
    todosCtx.onSetEditableId(props.id);
    props.setShowEditTodoModal();
  };

  const clickHandler = () => {
    todosCtx.setKnowledgeTitle(props.title);
    todosCtx.onSetEditableId(props.id);
    console.log("li clicked");
  };

  return (
    <li className={classes.item} onClick={clickHandler}>
      <NavLink
        to={`/${props.title}`}
        className={({ isActive }) => (isActive ? classes.active : undefined)}
      >
        <h3>{props.title}</h3>
      </NavLink>
      <div className={classes.icons}>
        <div className={classes.editItem} onClick={onEditItem}></div>
        <div className={classes.deleteItem} onClick={onDeleteItem}></div>
      </div>
    </li>
  );
};

export default TodoItem;

import React, { useState, useContext, useEffect } from "react";
import { TodosContext } from "../reducer/todos-context";
import TextareaAutosize from "react-textarea-autosize";
import { useParams } from "react-router-dom";
import { CtxType, TabType, ItemType } from "../types/types";

const TabDetails: React.FC<{
  myTabs: TabType[] | undefined;
  defaultDescription: string | undefined;
  defaultTitle: string | undefined;
}> = (props) => {
  const [activeItem, setActiveItem] = useState<ItemType>();
  const todosCtx = useContext(TodosContext) as CtxType;
  const [myDescription, setMyDescription] = useState<string>();
  const [itemTitle, setItemTitle] = useState<string>("");
  const params = useParams() as any;
  // console.log(params.todo);

  useEffect(() => {
    setMyDescription(() => {
      if (props.myTabs?.length) {
        return props.myTabs?.find((el: TabType) => el.itemName === params.item)
          ?.itemtext;
      } else {
        return "Add new Tab, is empty!";
      }
    });
  }, [params.item, props.myTabs]);

  useEffect(() => {
    setItemTitle(params.item);

    // console.log(props.myTabs);

    if (!params.item) {
      if (props.myTabs === undefined) {
        // console.log("undefined-Tabs");
      } else {
        // console.log(props.myTabs[0]?.itemtext);
        setMyDescription(props.myTabs[0]?.itemtext);
      }
    } else {
      // console.log(
      //   props.myTabs?.find((el) => el.itemName === params.item)?.itemtext
      // );
    }
  }, [params, todosCtx.items, props.myTabs]);

  return (
    <div className="tab-details">
      <h3>{itemTitle || props.defaultTitle} </h3>
      <TextareaAutosize
        defaultValue={myDescription || props.defaultDescription}
        readOnly
      />
    </div>
  );
};

export default TabDetails;

import React, { useContext, useEffect, useState } from "react";
import { TodosContext } from "../reducer/todos-context";
import AddNotesModal from "./AddNotesModal";
import classes from "./NotesList.module.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import TabDetails from "./TabDetails";
import { TabType, CtxType } from "../types/types";
import { ItemType } from "../types/types";

const NotesList: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ItemType>();
  const [tabs, setTabs] = useState<TabType[]>();
  const todosCtx = useContext(TodosContext) as CtxType;
  const [showTabModal, setShowTabModal] = useState(false);
  const [myDescription, setMyDescription] = useState<string | undefined>("");
  const [itemTitle, setItemTitle] = useState<string | undefined>("");
  const params = useParams();
  const navigate = useNavigate();
  // console.log(navigate.status);

  const showTabModalHandler = () => {
    setShowTabModal(!showTabModal);
  };

  useEffect(() => {
    // console.log(todosCtx?.items[0]?.title);
    if ((!params.todo && todosCtx.items) || params.todo === "undefined") {
      navigate(`${todosCtx.items[0]?.title}`);
    }

    todosCtx.onSetEditableId(
      todosCtx.items?.filter((el) => el.title === params.todo)[0]?.id
    );

    // console.log(params.todo);
    // console.log(todosCtx.items);
  }, [todosCtx.items, params.todo, navigate]);

  useEffect(() => {
    const activeTab = todosCtx.items.find((el) => el.title === params.todo);
    setActiveItem(activeTab);
    setTabs(activeTab?.tabs);

    setItemTitle(() => {
      return activeTab?.tabs.length
        ? activeTab.tabs[0].itemName
        : "No Tabs Found!";
    });

    setMyDescription(() => {
      return activeTab?.tabs.length
        ? activeTab?.tabs[0].itemText
        : "No Tabs Found!";
    });

    // console.log(params.todo);
    if (!params.todo) {
      setActiveItem(todosCtx.items[0]);
      setItemTitle(todosCtx.items[0]?.tabs[0].itemName);
      setMyDescription(todosCtx.items[0]?.tabs[0].itemText);
      console.log("emtpy parans", activeItem, itemTitle, myDescription);
    }
  }, [todosCtx.items, params]);

  const handleTabClick = (id: string) => {
    const description = activeItem?.tabs.find((el) => el.id === id)?.itemText;
    const itemTitle = activeItem?.tabs.find((el) => el.id === id)?.itemName;
    setMyDescription(description);
    setItemTitle(itemTitle);
    // console.log("tab clicked");
  };

  return (
    <>
      <div className={classes.notesListContainer}>
        <h2>
          {params.todo}
          <span onClick={showTabModalHandler}>Add +</span>
        </h2>
        <ul>
          {tabs?.map((el) => (
            <li
              className="tab-item"
              key={el.id}
              onClick={() => {
                handleTabClick(el.id);
              }}
            >
              <NavLink
                to={`/${params.todo}/${el.itemName.replace("/", "-")}`}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {el.itemName}
              </NavLink>
            </li>
          ))}
        </ul>
        <TabDetails
          defaultTitle={itemTitle}
          defaultDescription={myDescription}
          myTabs={tabs}
        />
      </div>
      {showTabModal && (
        <AddNotesModal showTabModalHandler={showTabModalHandler} />
      )}
    </>
  );
};

export default NotesList;

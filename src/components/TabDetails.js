import React, {useState, useContext, useEffect} from "react";
import { TodosContext } from "../reducer/todos-context";
import TextareaAutosize from 'react-textarea-autosize';
import {useParams} from 'react-router-dom'



const TabDetails = (props) => {
    const [activeItem, setActiveItem] = useState([]);
    const todosCtx = useContext(TodosContext);
    const [myDescription, setMyDescription] = useState('')
    const [itemTitle, setItemTitle] = useState('')
    const params = useParams()
    console.log(params.todo);

    useEffect(() => {
        setMyDescription(() => {
            if(props.myTabs?.length) {
                return props.myTabs?.find(el => el.itemName === params.item)?.itemtext
            } else {
                return "Add new Tab, is empty!"
            }
        }) 
    },[params.item, props.myTabs])
    
  
    useEffect(() => {
  
      setItemTitle(() => {
         return params.item
      });

      console.log(activeItem?.tabs?.find(el => el.itemName === params.item));

    if(!params.item) {

        if(props.myTabs === undefined) {
            console.log('undefined-Tabs');
        } else {
            console.log(props.myTabs[0]?.itemtext);
            setMyDescription(props.myTabs[0]?.itemtext)
        }
    } else {
        console.log(props.myTabs?.find(el => el.itemName === params.item)?.itemtext);
    }     
      
    }, [params, todosCtx.items, props.myTabs])
  
    return <div className='tab-details'>
    <h3>{itemTitle || props.defaultTitle} </h3>
    <TextareaAutosize defaultValue={myDescription || props.defaultDescription} readOnly/>    
  </div>
  }

  export default TabDetails;
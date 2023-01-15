import {useState, useEffect, useCallback} from 'react';

const useDataFetch = () => {
  const [todos, setTodos] = useState([]);

  const fetchNotes = async () => {
    const response = await fetch('https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes.json');
    if(!response.ok) {
        throw new Error("Something went wrong!");
    }

    const data = await response.json();
    // console.log(data);

    const transformedData = [];
    

    for(const key in data) {

    const transformedTabs= [];

    for(const el in data[key].items) {
      const tabsObject = {
        id: el,
        itemName: data[key].items[el].itemName,
        itemtext: data[key].items[el].itemText
      }

      transformedTabs.push(tabsObject)
    }

        const contentObj = {
            id: key,
            title: data[key].title,
            tabs: transformedTabs
        }

        transformedData.push(contentObj);
    }

    setTodos(transformedData);

    console.log(todos);
      
  }


  useEffect(() => {

    try {
      fetchNotes();
    } catch (error) {
      console.log(error)
    } finally {
      console.log(todos);
    }

  }, [])

  const deleteNotesItem = (id) => {
    fetch(
        // don't add .json at [data Name]
      `https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`,
      {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => {
      if (response.ok) {
            // if sucess do something
            fetchNotes();
      } else {
            // if fail throw error
        throw new Error('could not delete data');
      }
    }).catch((error) => {
      console.log(error);
    });

    console.log('deletted!!!!!');
      
  }

  function addTodos(text) {
    const newTodo =  { title: text }
    // setTodos([...todos, newTodo]);
    fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes.json`, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {'ContentType': 'aplication/json'}
    }).then(() => {
      fetchNotes();
    })    
  }

  const addNewTabs = async (id, text1, text2) => {
    fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}/items.json`, {
      method: 'POST',
      body: JSON.stringify({itemName: text1, itemText: text2}),
      headers: {'ContentType': 'aplication/json'}
    }).then(() => {
      fetchNotes();
    })     
  }

  const updateTodos = async (id, text) => {
    const myItem = todos.find(el => el.id === id);
    console.log(myItem);

    const response = await fetch(`https://react-ctx-redux-ts-notes-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}/title.json`, {
      method: 'PUT',
      body: JSON.stringify(text),
      headers: {'ContentType': 'aplication/json'}
    })
    if(!response.ok) {
      throw new Error('Something went wrong!')
    }
    fetchNotes();
  }

  return {todos, fetchNotes, deleteNotesItem, addTodos, addNewTabs, updateTodos};
}

export default useDataFetch;
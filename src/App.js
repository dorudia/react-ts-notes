import React from 'react';
import NotesList from './components/NotesList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import TabDetails from './components/TabDetails';

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/:todo",
          element: <NotesList/>,
        },
        {
          path: "/:todo/:item",
          element: <TabDetails/>,
        }
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router}/>
      
    </>
  );
}

export default App;

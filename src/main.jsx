import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './Layout.jsx';
import Bites from './components/Bites.jsx'
import Home from './components/Home.jsx';

import { store } from './app/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:"/",
        element : <Home/>
      },
      {
        path:"/bites",
        element : <Bites/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
)

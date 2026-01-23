import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'normalize.css' //preguntar a cami si puedo usar este reset  
import {BrowserRouter} from "react-router-dom"
import { UserProvider } from '../context/UsersContex.jsx'
import { HomeProvider } from '../context/HomeContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HomeProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </HomeProvider>
  </StrictMode>,
)

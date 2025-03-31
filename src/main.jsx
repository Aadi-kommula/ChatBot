import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FollowCursor from './FollowCursor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <FollowCursor/>
  </StrictMode>,
)

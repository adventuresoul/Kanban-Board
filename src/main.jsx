import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { KanbanProvider } from './context/KanbanProvider.jsx'

createRoot(document.getElementById('root')).render(
    <KanbanProvider>
        <App />
    </KanbanProvider>
)

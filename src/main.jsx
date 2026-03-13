/**
 * @file         main.jsx
 * @description  Entry point of the Duo Designs customer application.
 *               Initializes React, QueryClient, and Router.
 *
 * @module       root/main
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (React)
 *   - react-dom/client (ReactDOM)
 *   - react-router-dom (BrowserRouter)
 *   - @tanstack/react-query (QueryClientProvider)
 *   - App.jsx
 *   - styles/globals.css
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './styles/globals.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

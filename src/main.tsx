import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Layout from './components/Layout'
import Login from './components/Login'
import MyPage from './components/MyPage'
import { AuthGuard } from './components/Auth'
//import App from './App.tsx'
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route element={ <AuthGuard /> }>
                    <Route element= { <Layout /> }>
                        <Route path="/" element={ <MyPage /> } />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)

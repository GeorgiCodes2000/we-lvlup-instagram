import { ReactElement } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import './App.css'

function App(): ReactElement | null {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}
export default App

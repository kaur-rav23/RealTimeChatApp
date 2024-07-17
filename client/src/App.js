import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Joins from './components/Joins/Joins'
import Chat from './components/Chat/Chat'
const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Joins />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    </Router>
)

export default App;

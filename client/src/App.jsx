import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Submit from './pages/Submit'
import Submissions from './pages/Submissions'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div className='min-h-screen text-neutral-300 bg-background font-mono'>
        <Routes>
          <Route path='/' element={<Submit />} />
          <Route path='/submissions' element={<Submissions />} />
        </Routes>
        <Toaster position="bottom-left" />
      </div>
    </Router>
  )
}

export default App
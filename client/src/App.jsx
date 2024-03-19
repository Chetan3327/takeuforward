import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Submit from './pages/Submit'
import Submissions from './pages/Submissions'

const App = () => {
  return (
    <Router>
      <div className='bg-background min-h-screen text-neutral-200 font-mono'>
        <Routes>
          <Route path='/' element={<Submit />} />
          <Route path='/submissions' element={<Submissions />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
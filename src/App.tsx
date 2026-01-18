import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/Register' element={<Register />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

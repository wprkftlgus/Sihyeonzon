import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main'
import Login from './pages/login'
import Register from './pages/register'
import Createpost from './pages/createpost'
import Postdetail from './pages/postdetail'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/Register' element={<Register />}></Route>
      <Route path='/createpost' element={<Createpost />}></Route>
      <Route path='/postdetail/:id' element={<Postdetail />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

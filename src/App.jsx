import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import RootLayout from './components/layouts/RootLayout';
import Shop from './components/pages/Shop';
import Error from './components/pages/Error';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='*' element={<Error/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

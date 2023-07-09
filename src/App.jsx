import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { Home } from './pages/Home'
import { AddTodoPage } from './pages/AddTodoPage'
import { NotFoundPage } from './pages/NotFoundPage'

import { Header } from './components/Header'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/add-todo' element={ <AddTodoPage /> } />
          <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

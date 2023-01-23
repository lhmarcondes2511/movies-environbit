import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import { Home, Favorites, PageNotFound, Filme } from './pages'
import { Header, Footer } from './components'
import FilmeDetail from './pages/Filme/filmeDetail'

function App() {
  return (
    <div className='container'>
      <Header />
      
      <div className='body'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Home />} />
          <Route path='/myfavorite' element={<Favorites />} />
          <Route path='/filme' element={<Filme />} />
          <Route path='/filmeDetail' element={<FilmeDetail />} />
          <Route path='*' element={<PageNotFound />}>
          </Route>
        </Routes>
      </div>

      <Footer/>
    </div>
  )
}

export default App;

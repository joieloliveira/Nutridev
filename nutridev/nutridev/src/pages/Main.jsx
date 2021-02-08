import React from 'react';
import './main.css'

import Header from '../components/Header';
import Nav from '../components/Nav';
import Routes from '../Routers';
import Footer from '../components/Footer';
 
function Main() {
  return (
      <div>
        <Header></Header>
        <div className="container">
            <Nav></Nav>
            <Routes></Routes>
            <Footer></Footer>
        </div>
      </div>
  )
}

export default Main;
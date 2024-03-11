// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom';
import Home from './components/Home/Home';
import PersistLogin from './features/auth/PersistLogin';
import Layout from './protectedlayout/Layout.js';
import { Toaster } from 'react-hot-toast';
import UpdateMarks from './components/UpdateMarks/UpdateMarks.jsx';
import MyMarks from './components/MyMarks/MyMarks.jsx';
import { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import CumilativeMarks from './components/CumilativeMarks/CumilativeMarks.jsx';



function App() {
  return (
    <>
      <Router>
      <Suspense fallback={<h4>Loading...</h4>}>
          <Navbar/>
         

        </Suspense>
        <Routes>
          <Route element={<Login/>} path='/'/>
          <Route element={<Signup/>} path='signup'/>

          <Route element={<PersistLogin/>}>
            <Route path="private" element={<Layout/>}>
            <Route path='home'>
                <Route element={<Home/>} index/>
              </Route>

              <Route path='updatemarks'>
                <Route element={<UpdateMarks/>} index/>
              </Route>

              <Route path='mymarks'>
                <Route element={<MyMarks/>} index/>
              </Route>

              {/* <Route path='cumilativemarks'>
                <Route element={<CumilativeMarks/>} index/>
              </Route> */}

       
   

          </Route>
          </Route>

          {/* <Route path='/home'element={<Home/>}/> */}


        </Routes>
      </Router>
      <Toaster/>
    </>
  )

}

export default App;

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';


import Home from './components/Home/Home';
import Slidebar from './components/Slidebar/Slidebar';
import Restaurant from './components/Restaurant/Restaurant';
import AddRestaurant from './components/AddRestaurant/AddRestaurant';
import UpdateRestaurant from './components/UpdateRestaurant/UpdateRestaurant';

function App() {
  return (
    <div className='App'>
      <React.Fragment>
        <Slidebar></Slidebar>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/:name' element={<Restaurant />}></Route>
          <Route exact path='/addRestaurant' element={<AddRestaurant />}></Route>
          <Route exact path='/updateRestaurant/:id' element={<UpdateRestaurant />}></Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;

import React from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Items,Pokemon,Pokemons } from './pages';
import MapPage from './pages/MapPage';
import Item from './pages/Item';
import LocationDetail from './pages/LocationDetail';

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/pokemons/:name" element={<Pokemon/>} />
        <Route path="/pokemons" element={<Pokemons/>} />
        <Route path='/items' element={<Items/>} />
        <Route path="/items/:name" element={<Item />} />
        <Route path="/location" element={<MapPage />} />
<Route path="/location/:name" element={<LocationDetail />} />
        <Route path="/" element={<Pokemons/>} />
        

      </Routes>
    </div>
      </BrowserRouter>
      
  );
}

export default App;

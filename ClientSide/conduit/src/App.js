import React from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Navbar';
import Home from './Components/Home';
import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Route path="/user/register" exact component={Register} />
      <Route path="/user/login" exact component={Login} />
      <Route path="/" exact component={Home} />
    </>
  );
}

export default App;

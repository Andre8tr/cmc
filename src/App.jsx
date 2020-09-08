import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx'
import Reset from './components/Reset.jsx'
import { auth } from './firebase'

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  })
  return firebaseUser !== false ? (
    <Router>
    <div className="container">
    <Navbar firebaseUser={firebaseUser} />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/reset">
          <Reset />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>

      </Switch>
    </div>
    </Router>
  ): <p> </p>;
}

export default App;

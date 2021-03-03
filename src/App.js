import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import { useStateValue } from "./StateProvider";
import './App.css';

function App() {
  const [{ user, color }, dispatch] = useStateValue();
  return (
    <div className="app">
     <div className={`app__body ${color}`}>
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
    </div>
  );
}

export default App;

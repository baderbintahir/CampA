import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login.js'
import Home from './components/Home/Home.js'
import Users from './components/Users/Users.js'
import Societies from './components/Societies/Societies.js'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js'

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <ProtectedRoute path="/" exact component={Home} />
                    <ProtectedRoute path="/users" exact component={Users} />
                    <ProtectedRoute path="/societies" exact component={Societies} />
                    <Route path="*" component={() => "404 PAGE NOT FOUND"} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
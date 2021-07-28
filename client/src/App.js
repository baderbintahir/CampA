import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js'
import Login from './components/Login/Login.js'
import Home from './components/Home/Home.js'
import Users from './components/Users/Users.js'
import Societies from './components/Societies/Societies.js'
import Society from './components/Society/Society.js'
import ChangePassword from './components/ChangePassword/ChangePassword.js'

import './index.css'

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <ProtectedRoute path="/" exact component={Home} />
                    <ProtectedRoute path="/users" exact component={Users} />
                    <ProtectedRoute path="/societies" exact component={Societies} />
                    <ProtectedRoute path="/societies/:id" exact component={Society} />
                    <ProtectedRoute path="/change password" exact component={ChangePassword} />
                    <Route path="*" component={() => "404 PAGE NOT FOUND"} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
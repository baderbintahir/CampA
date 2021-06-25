import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login.js'
import Home from './components/Home/Home.js'
import DataPage from './components/DataPage/DataPage.js'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js'

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <ProtectedRoute path="/" exact component={Home} />
                    <ProtectedRoute path="/users" exact component={DataPage} />
                    <ProtectedRoute path="/societies" exact component={DataPage} />
                    <Route path="*" component={() => "404 PAGE NOT FOUND"} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
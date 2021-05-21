import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login.js'
import Home from './components/Home/Home.js'
import DataPage from './components/DataPage/DataPage.js'

const App = () => {
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    if (user) {
        return (
            <Login />
        )
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users" exact component={DataPage} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
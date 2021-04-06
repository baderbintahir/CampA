import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getPosts } from './actions/posts.js'
import Nav from './components/Nav/Nav.js'
import Feed from './components/Feed/Feed.js'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return(
        <div className="app">
            <Nav />
            <Feed />
        </div>
    )
}

export default App
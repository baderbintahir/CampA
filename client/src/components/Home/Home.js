import React from 'react'
import Nav from '../Nav/Nav'
import Feed from './Feed/Feed'
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <Nav />
            <Feed />
        </div>
    )
}

export default Home
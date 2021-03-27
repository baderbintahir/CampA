import React from 'react'
import './Post.css'
import User from '../../../User/User.js'

const Post = () => {
    
    return(
        <div className="post-wrapper feed-box">
            <User username="Talha" />
            <p className="post-content">
                lorum Ipsum
            </p>
            <span className="date">21 Dec, 2020</span>
        </div>
    )
}

export default Post
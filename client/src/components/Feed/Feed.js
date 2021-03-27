import React from 'react'
import './Feed.css'
import PostForm from './PostForm/PostForm.js'
import Posts from './Posts/Posts.js'

const Feed = () => {
    
    return(
        <div className="feed-wrapper">
            <PostForm />
            <Posts />
        </div>
    )
}

export default Feed
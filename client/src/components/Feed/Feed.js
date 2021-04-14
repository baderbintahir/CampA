import React, { useState } from 'react'
import './Feed.css'
import PostForm from './PostForm/PostForm.js'
import Posts from './Posts/Posts.js'

const Feed = () => {
    const [currentId, setCurrentId] = useState(null)
    
    return(
        <div className="feed-wrapper">
            <PostForm currentId={currentId} setCurrentId={setCurrentId} />
            <Posts setCurrentId={setCurrentId} />
        </div>
    )
}

export default Feed
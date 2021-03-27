import React from 'react'
import './Posts.css'
import Post from './Post/Post.js'

const Posts = () => {
    
    return(
        <div className="posts-wrapper">            
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Posts
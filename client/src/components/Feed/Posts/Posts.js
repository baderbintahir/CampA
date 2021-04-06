import React from 'react'
import { useSelector } from 'react-redux'

import './Posts.css'
import Post from './Post/Post.js'

const Posts = () => {
    const posts = useSelector((state) => state.posts)

    console.log(posts)
    
    return(
        <div className="posts-wrapper">            
            <Post />
        </div>
    )
}

export default Posts
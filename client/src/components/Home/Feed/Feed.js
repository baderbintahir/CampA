import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getPosts } from '../../../actions/posts.js'

import './Feed.css'
import PostForm from './PostForm/PostForm.js'
import Posts from './Posts/Posts.js'

const Feed = () => {
    const [currentId, setCurrentId] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    
    return(
        <div className="feed-wrapper">
            <PostForm currentId={currentId} setCurrentId={setCurrentId} />
            <Posts setCurrentId={setCurrentId} />
        </div>
    )
}

export default Feed
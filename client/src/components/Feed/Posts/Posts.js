import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

import './Posts.css'
import Post from './Post/Post.js'

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts)

    console.log(posts)

    return (
        !posts.length ? <CircularProgress /> : (
            <div className="posts-wrapper">
                {posts.slice(0).reverse().map((post) => (
                    <div key={post._id}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </div>
                ))}
            </div>
        )
    )
}

export default Posts
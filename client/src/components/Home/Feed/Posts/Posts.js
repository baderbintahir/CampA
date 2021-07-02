import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

import './Posts.css'
import Post from './Post/Post.js'

import { isAdmin } from '../../../../privileges.js'

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts)
    const user = JSON.parse(localStorage.getItem('profile'))



    console.log(posts)

    return (
        !posts.length ? <CircularProgress /> : (
            <div className="posts-wrapper">
                {
                    posts.slice(0).reverse().map(post => {
                        if (post.filter) {
                            if (user.result.roles.includes(`${post.filter} vicePresident`) || user.result.roles.includes(`${post.filter} President`) || user.result.roles.includes(`${post.filter} Admin`) || user.result.roles.includes(`${post.filter} Member`) || isAdmin()) {
                                return (
                                    <div key={post._id}>
                                        <Post post={post} setCurrentId={setCurrentId} />
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div key={post._id}>
                                    <Post post={post} setCurrentId={setCurrentId} />
                                </div>

                            )
                        }

                        return true
                    })}
            </div>
        )
    )
}

export default Posts
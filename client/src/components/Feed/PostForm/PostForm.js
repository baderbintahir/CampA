import React from 'react'
import './PostForm.css'
import User from '../../User/User.js'

const PostForm = () => {
    
    return(
        <div className="post__form-wrapper feed-box">
            <div className="post__form-top">
                <User username="Bader" />
                <span>Filter</span>
            </div>

            <div className="post__form-textarea">
                <textarea placeholder="Type a message..." />
            </div>

            <div className="post__form-bottom">
                <span className="post__form-attach__btn">Attach</span>
                <span className="post__form-publish__btn">Publish</span>
            </div>
        </div>
    )
}

export default PostForm
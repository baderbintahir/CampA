import React from 'react'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import './Post.css'
import User from '../../../../User/User.js'
import moment from 'moment'

import { deletePost } from '../../../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    
    return(
        <div className="post-wrapper feed-box">
            <div className="post__top-bar">
                <User username="Talha" />
                <div>
                    <button
                     className="post__opt-btn"
                     onClick={() => setCurrentId(post._id)}>
                        <EditIcon fontSize="small"/>
                    </button>

                    <button
                     className="post__opt-btn"
                     onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small"/>
                    </button>
                </div>
            </div>
            <p className="post-content">
                {post.message}
            </p>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
        </div>
    )
}

export default Post
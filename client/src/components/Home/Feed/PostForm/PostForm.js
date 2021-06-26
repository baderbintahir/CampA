import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import './PostForm.css'
import User from '../../../User/User.js'
import { createPost, updatePost } from '../../../../actions/posts.js'
import { isAdmin } from '../../../../privileges.js'

import AttachFileIcon from '@material-ui/icons/AttachFile';

const PostForm = ({ currentId, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'))

    const [postData, setPostData] = useState({
        user_id: user.result._id,
        user_name: user.result.name,
        message: '',
        selectedFile: ''
    })
    const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const clear = () => {
        setCurrentId(0)
        setPostData({
            user_id: user.result._id,
            user_name: user.result.name,
            message: '',
            selectedFile: ''
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (postData.message) {
            if (currentId) {
                dispatch(updatePost(currentId, postData))
            } else {
                dispatch(createPost(postData))
            }
        }

        clear()

    }

    if (!isAdmin()) {
        return null
    }

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div className="post__form-wrapper feed-box">
                <div className="post__form-top">
                    <User username={user.result.name} />
                    <span>Filter</span>
                </div>

                <div className="post__form-textarea">
                    <textarea placeholder="Type a message..." name="message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                </div>

                <div className="post__form-bottom">
                    <label className="file-upload__icon">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                            key={postData.selectedFile}
                        />

                        <AttachFileIcon />

                    </label>
                    <button className="post__publish-btn" type="submit">Publish</button>
                </div>
            </div>
        </form>
    )
}

export default PostForm
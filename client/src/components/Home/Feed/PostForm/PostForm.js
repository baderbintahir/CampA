import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import './PostForm.css'
import User from '../../../User/User.js'
import { createPost, updatePost } from '../../../../actions/posts.js'

const PostForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        user_id: '',
        post_id: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null)
    const dispatch = useDispatch()

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const clear = () => {
        setCurrentId(0)
        setPostData({
            title: '',
            user_id: '',
            post_id: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentId){            
            dispatch(updatePost(currentId, postData))
        } else{            
            dispatch(createPost(postData))
        }

        clear()

    }

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div className="post__form-wrapper feed-box">
                <div className="post__form-top">
                    <User username="Bader" />
                    <span>Filter</span>
                </div>

                <div className="post__form-textarea">
                    <textarea placeholder="Type a message..." name="message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
                </div>

                <div className="post__form-bottom">
                    {/* <span className="post__form-attach__btn">Attach</span>
                    <span className="post__form-publish__btn">Publish</span> */}
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                    <button className="post__form-publish__btn" type="submit">Publish</button>
                </div>
            </div>
        </form>
    )
}

export default PostForm
import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import './User.css'

const User = (username) => {
    return (
        <div className="nav-user__info">
            <Avatar />
            <h4 className="nav-user__name">{username}</h4>
        </div>
    )
}

export default User
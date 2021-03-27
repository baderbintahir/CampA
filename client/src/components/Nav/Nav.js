import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import User from '../User/User.js'
import './Nav.css'

const Nav = () => {
    return(
        <div className="nav-wrapper">
            <div className="nav-left">
                <div className="nav-logo">
                    <span className="nav-logo-span">CampA</span>
                </div>
            </div>

            <div className="nav-right">
                <User username="Bader" />

                <IconButton>
                    <NotificationsActiveIcon />
                </IconButton>

            </div>
        </div>
    )
}

export default Nav
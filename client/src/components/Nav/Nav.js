import React from 'react'
import { useHistory } from "react-router-dom";
import { IconButton } from '@material-ui/core'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import User from '../User/User.js'
import NavOptions from './NavOptions/NavOptions.js'
import './Nav.css'

const Nav = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    const handleClick = () => {
        history.push('/')
    }
    
    return(
        <div className="nav-wrapper">
            <div className="nav-left">
                <div className="nav-logo">
                    <span 
                        className="nav-logo-span"
                        onClick={handleClick}
                    >CampA</span>
                </div>
            </div>

            <div className="nav-right">
                <User username={user.result.name} />

                <IconButton>
                    <NotificationsActiveIcon />
                </IconButton>

                <IconButton>
                    <NavOptions />
                </IconButton>

            </div>
        </div>
    )
}

export default Nav
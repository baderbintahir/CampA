import React from 'react';
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch } from 'react-redux'
import { isAdmin } from '../../../privileges.js'

import { logout } from "../../../actions/auth.js"

const StyledMenu = ((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const NavOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch()
    const history = useHistory()

    const navigationHandleClick = (event) => {
        history.push(`/${event.target.innerText.toLowerCase()}`);
    }

    const logoutHandle = () => {
        dispatch(logout(history))
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ArrowDropDownIcon
                onClick={handleClick}
            />
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    isAdmin() ? (
                        <div>
                            <MenuItem
                                onClick={navigationHandleClick}
                            >
                                <ListItemText primary="Users" />
                            </MenuItem>
                            <MenuItem
                                onClick={navigationHandleClick}
                            >
                                <ListItemText primary="Societies" />
                            </MenuItem>
                            <MenuItem
                                onClick={navigationHandleClick}
                            >
                                <ListItemText primary="Change Password" />
                            </MenuItem>
                        </div>
                    ) : null
                }

                <hr />

                <MenuItem
                    onClick={logoutHandle}
                >
                    <ListItemText primary="Log Out" />
                </MenuItem>
            </StyledMenu>
        </div>
    );
}

export default NavOptions
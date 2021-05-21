import React from 'react';
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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

    const history = useHistory()

    const navigationHandleClick = (event) => {
        history.push(`/${event.target.innerText.toLowerCase()}`);
    }

    const logout = () => {
        console.log('Log Out')
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

                <hr />

                <MenuItem
                    onClick={logout}
                >
                    <ListItemText primary="Log Out" />
                </MenuItem>
            </StyledMenu>
        </div>
    );
}

export default NavOptions
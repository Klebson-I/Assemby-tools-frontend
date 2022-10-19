import React, {useState} from 'react';
import {Menu, MenuItem} from "@mui/material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import {LoginForm} from "../Components/LoginForm/LoginForm";
import {Link} from "react-router-dom";

const styleObject = {
    menu: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
    },
    menuItem: {
        fontSize: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 100px'
    },
    icon: {
        fontSize: '60px',
    },
    header: {
        textAlign: 'center',
        borderBottom: '1px solid black',
        paddingBottom: '15px',
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    }
}

export const Login = () => {
    const [isAdminSelect, setIsAdminSelect] = useState(false);

    const handleAdminUserClick = () => {
        setIsAdminSelect(true);
    };

    const handleGoBackClick = () => {
        setIsAdminSelect(false);
    };

    return <>
        {
            isAdminSelect ?
                <LoginForm handleGoBackClick={handleGoBackClick}/>
                :<Menu open={true} sx={styleObject.menu}>
                    <h1 style={styleObject.header}>Select user type</h1>
                    <MenuItem sx={styleObject.menuItem} onClick={handleAdminUserClick}>
                        <SupervisorAccountIcon sx={styleObject.icon}/>
                        Admin
                    </MenuItem>
                    <Link to='/app' style={styleObject.link}>
                        <MenuItem sx={styleObject.menuItem}>
                            <PersonIcon sx={styleObject.icon}/>
                            Standard user
                        </MenuItem>
                    </Link>
                </Menu>
        }
    </>
}
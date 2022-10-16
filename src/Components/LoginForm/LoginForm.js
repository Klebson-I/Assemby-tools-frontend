import React, {useState} from 'react';
import {IconButton, Paper, TextField} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const styleObject = {

}

export const LoginForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // TODO handle checking if password is correct
    };

    return <form onSubmit={handleFormSubmit}>
        <h1>Login as admin</h1>
        <div>
            <TextField
                id="outlined-basic"
                label="Login"
                variant="outlined"
                value={login}
                onChange={(e) =>setLogin(e.target.value)}
            />
        </div>
        <div>
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
            />
            <IconButton
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
                <VisibilityOffIcon/>
            </IconButton>
        </div>
    </form>
};
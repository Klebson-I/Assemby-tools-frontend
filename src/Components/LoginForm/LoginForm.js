import React, {useState} from 'react';
import {Button, IconButton, Paper, TextField} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {handleFetch} from "../../Hooks/useFetch";
import {useUserState, useUserStateDispatch} from "../../context/UserContext/UserContext";
import {addToUserState} from "../../context/UserContext/actions";
import { useNavigate } from 'react-router-dom';

const styleObject = {
    formContainer: {
        border: '1px solid black',
        borderRadius: '20px',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative'
    },
    header: {
        display: 'flex',
    },
    textFieldDiv: {
        display: 'flex',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    submitButton: {
        width: '30%',
        fontSize: '21px',
        marginBottom: '5px'
    },
    goBackButton: {
        position: 'absolute',
        left: '20px',
        top: '10px'
    },
    textField: {
        width: '70%'
    }
};

export const LoginForm = ({handleGoBackClick}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const userStateDispatch = useUserStateDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const arePassesCorrect = await handleFetch('POST',
            {
                login,
                password,
            },
            'admin',
            () => {
                    userStateDispatch(addToUserState({
                            userType: 'admin',
                            login,
                            password,
                        }));
                    navigate('/app')
            },
            () => console.log('Bad passes'),
        );
        console.log(arePassesCorrect);
    };

    return <form onSubmit={handleFormSubmit} style={styleObject.formContainer}>
        <IconButton sx={styleObject.goBackButton} onClick={handleGoBackClick}>
            <ArrowBackIcon/>
        </IconButton>
        <header style={styleObject.header}>
            <h1>Login as admin</h1>
        </header>
        <div style={styleObject.textFieldDiv}>
            <TextField
                id="outlined-basic"
                label="Login"
                variant="outlined"
                value={login}
                onChange={(e) =>setLogin(e.target.value)}
                sx={styleObject.textField}
            />
        </div>
        <div style={styleObject.textFieldDiv}>
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                sx={styleObject.textField}
            />
            <IconButton
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
                <VisibilityOffIcon/>
            </IconButton>
        </div>
        <Button type='submit' color='primary' variant='contained' sx={styleObject.submitButton}>Submit</Button>
    </form>
};
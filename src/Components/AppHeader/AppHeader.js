import React, {useEffect, useRef, useState} from 'react';
import {Paper, Typography, Box, IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {styleObject} from "./styles";
import {useNavigate} from 'react-router-dom';
import logo from '../../images/logo.png';

const textAnimationArray = [
    'Set your tool',
    'Get tool for specific action',
    'Search for tool in catalog',
    'Compare selected tools',
];

export const AppHeader = () => {
    const navigate = useNavigate();
    const [actualText, setActualText] = useState(textAnimationArray[0]);
    const [textToWrite, setTextToWrite] = useState('');
    const [restartIntervalToggle, setRestartIntervalToggle] = useState(false);

    const setText = (counter) => setTextToWrite(prev => prev += actualText[counter]);

    useEffect(() => {
        let counter = 0;
        const interval = setInterval(() => {
            if (counter < actualText.length) {
                setText(counter);
                counter++;
            }
            else {
                setActualText((prev) => {
                    if (textAnimationArray.indexOf(prev) < textAnimationArray.length - 1) {
                        return textAnimationArray[textAnimationArray.indexOf(prev) + 1];
                    }
                    else {
                        return textAnimationArray[0];
                    }
                })
                clearInterval(interval);
                setTimeout(() => {
                    setTextToWrite('');
                    setRestartIntervalToggle(prev => !prev);
                },10000);
            }
        },100);
        return () => clearInterval(interval);
    },[restartIntervalToggle]);

    const handleClick = () => navigate('/app/userAccount');

    return <Paper
        elevation={1}
        sx={styleObject.container}
    >
        <Box
            sx={styleObject.box}
        >
            <Typography variant="h2" sx={styleObject.typography}>
                <img src={logo} alt='page-logo' height='75px' width='auto'/>
            </Typography>
            <div style={styleObject.animationDiv}>
                <span style={styleObject.animationText}> {textToWrite} </span>
            </div>
            <IconButton color="primary" size="small" onClick={handleClick}>
                <AccountCircleIcon
                    color="action"
                    sx={styleObject.accountIcon}
                />
            </IconButton>
        </Box>
    </Paper>
}
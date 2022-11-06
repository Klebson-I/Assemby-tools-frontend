import React from 'react';
import {Paper, Typography, Box, IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {styleObject} from "./styles";
import {useNavigate} from 'react-router-dom';

export const AppHeader = () => {

    const navigate = useNavigate();

    const handleClick = () => navigate('/app/userAccount');

    return <Paper
        elevation={1}
        sx={styleObject.container}
    >
        <Box
            sx={styleObject.box}
        >
            <Typography variant="h2" sx={styleObject.typography}>
                Assembly tools
            </Typography>
            <IconButton color="primary" size="small" onClick={handleClick}>
                <AccountCircleIcon
                    color="action"
                    sx={styleObject.accountIcon}
                />
            </IconButton>
        </Box>
    </Paper>
}
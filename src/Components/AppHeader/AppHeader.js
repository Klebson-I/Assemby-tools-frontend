import React from 'react';
import {Paper, Typography, Box, IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {styleObject} from "./styles";

export const AppHeader = () => {
    return <Paper
        elevation={1}
    >
        <Box
            sx={styleObject.box}
        >
            <Typography variant="h2" sx={styleObject.typography}>
                Assembly tools
            </Typography>
            <IconButton color="primary" size="small">
                <AccountCircleIcon
                    color="action"
                    sx={styleObject.accountIcon}
                />
            </IconButton>
        </Box>
    </Paper>
}
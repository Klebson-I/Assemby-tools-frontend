import React from "react";
import {Paper} from "@mui/material";

// @TODO create images for each action block

const styleObject = {
    paper: {
        width: '30%',
        marginTop: '20px',
        minHeight:'200px',
        fontSize: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        transition: 'ease-in 0.1s',
        "&:hover": {
            transform: 'rotateZ(1deg) rotateX(5deg) rotateY(5deg)',
            cursor:'pointer',
        },
    },
};

export const ActionBlock = ({
    actionName
}) => {
    return <Paper sx={styleObject.paper} elevation={5}>
        {actionName}
    </Paper>
}
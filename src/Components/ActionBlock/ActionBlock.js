import React from "react";
import {Paper} from "@mui/material";
import {styleObject} from "./style";

export const ActionBlock = ({
    actionName,
    image,
    setAction
}) => {
    return <Paper sx={styleObject.paper} elevation={5} onClick={() => setAction(actionName)}>
        <img src={image} style={styleObject.image}/>
        <span>{actionName}</span>
    </Paper>
}
import React from "react";
import {Paper} from "@mui/material";
import {styleObject} from "./style";

export const ActionBlock = ({
    actionName,
    image,
}) => {
    return <Paper sx={styleObject.paper} elevation={5}>
        <img src={image} style={styleObject.image}/>
        <span>{actionName}</span>
    </Paper>
}
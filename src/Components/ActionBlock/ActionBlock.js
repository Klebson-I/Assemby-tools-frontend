import React from "react";
import {Paper} from "@mui/material";
import {styleObject} from "./style";

// @TODO create images for each action block

export const ActionBlock = ({
    actionName
}) => {
    return <Paper sx={styleObject.paper} elevation={5}>
        {actionName}
    </Paper>
}
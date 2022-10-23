import React from "react";
import {Paper} from "@mui/material";
import {styleObject} from "./style";

export const ActionBlock = ({
    actionName
}) => {
    return <Paper sx={styleObject.paper} elevation={5}>
        {actionName}
    </Paper>
}
import React from "react";
import {Paper} from "@mui/material";
import {styleObject} from "./styles";
import {getProperImage} from "./utils";


export const ItemBlock = ({ toolParams }) => {
    console.log( toolParams )
    return <Paper sx={styleObject.paper} elevation={5}>
        <img src={getProperImage(toolParams.type)} style={styleObject.image}/>
        {toolParams.name}
    </Paper>
}
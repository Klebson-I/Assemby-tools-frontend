import React from "react";
import {Paper} from "@mui/material";
import {styleObject} from "./styles";
import {getProperImage} from "./utils";
import { useNavigate } from "react-router-dom";


export const ItemBlock = ({ toolParams }) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(`/app/singletool/${toolParams.type}/${toolParams.id}`);

    return <Paper sx={styleObject.paper} elevation={5} onClick={handleClick}>
        <img src={getProperImage(toolParams.type)} style={styleObject.image}/>
        {toolParams.name}
    </Paper>
}
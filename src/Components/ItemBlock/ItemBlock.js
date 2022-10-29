import React from "react";
import {IconButton, Paper} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {styleObject} from "./styles";
import {getProperImage} from "./utils";
import { useNavigate } from "react-router-dom";


export const ItemBlock = ({ toolParams, navigateDisable = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateDisable) {
            return;
        }
        navigate(`/app/singletool/${toolParams.type}/${toolParams.id}`);
    }

    return <Paper sx={styleObject.paper} elevation={5} onClick={handleClick}>
        <IconButton style={styleObject.infoButton}>
            <InfoOutlinedIcon/>
        </IconButton>
        <img src={getProperImage(toolParams.type)} style={styleObject.image}/>
        {toolParams.name}
    </Paper>
}
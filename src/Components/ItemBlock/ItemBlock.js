import React from "react";
import {IconButton, Paper} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {styleObject} from "./styles";
import { useNavigate } from "react-router-dom";
import {getProperImage} from "../ItemBlockForSetTool/utils";


export const ItemBlock = ({ toolParams, navigationDisable = false}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigationDisable) {
            return;
        }
        navigate(`/app/singletool/${toolParams.type}/${toolParams.id}`);
    }

    return <Paper sx={styleObject.paper} elevation={5} onClick={handleClick}>
        {
            !navigationDisable && <IconButton style={styleObject.infoButton}>
                <InfoOutlinedIcon/>
            </IconButton>
        }
        <img src={getProperImage(toolParams.type)} style={styleObject.image} alt='toolImage'/>
        {toolParams.name}
    </Paper>
}
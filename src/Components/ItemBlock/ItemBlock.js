import React from "react";
import {Paper} from "@mui/material";
import boltImage from "../../images/bolt.jpg";
import holderImage from "../../images/holder.jpg";
import cutImage from "../../images/cut.jpg";

const styleObject = {
    paper: {
        width: '30%',
        marginTop: '20px',
        minHeight:'200px',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'center',
        transition: 'ease-in 0.1s',
        "&:hover": {
            transform: 'rotateZ(1deg) rotateX(5deg) rotateY(5deg)',
            cursor:'pointer',
        },
        paddingBottom: '5px',
    },
    image: {
        width: '50%',
        height: 'auto',
    }
};

const getProperImage = (type) => {
    switch (type) {
        case 'assemblyItem': return boltImage;
        case 'turningHolder': return holderImage;
        case 'cuttingInsert': return cutImage;
        default: break;
    }
}

export const ItemBlock = ({ toolParams }) => {
    console.log( toolParams )
    return <Paper sx={styleObject.paper} elevation={5}>
        <img src={getProperImage(toolParams.type)} style={styleObject.image}/>
        {toolParams.name}
    </Paper>
}
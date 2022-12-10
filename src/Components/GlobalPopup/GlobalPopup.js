import React from "react";
import {IconButton, Paper} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";

const styleObject = {
    globalPopup: {
        position: 'fixed',
        zIndex: '100',
        top: '50vh',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        minWidth: '75%',
        minHeight: '400px',
        maxHeight: '500px',
        borderRadius: '10px',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    topDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    heading: {
        marginLeft: '20px',
    },
}

export const GlobalPopup = ({component, headingText}) => {
    const dispatchPopupState = useGlobalPopupDispatchState();

    const closePopup = () => dispatchPopupState(addToGlobalPopupState({
        isOpen: false,
        component: {},
    }))

    return <Paper sx={styleObject.globalPopup} elevation={10}>
        <div style={styleObject.topDiv}>
            <h2 style={styleObject.heading}>{headingText}</h2>
            <IconButton onClick={closePopup}>
                <CloseIcon fontSize='large'/>
            </IconButton>
        </div>
            {component}
    </Paper>
}
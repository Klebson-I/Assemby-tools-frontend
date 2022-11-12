import React, {useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useInfoPopupDispatchState} from "../../context/InfoContext/InfoContext";
import {addToInfoPopupState} from "../../context/InfoContext/actions";

export const InfoPopup = ({text, severity}) => {
    const [isOpen, setIsOpen] = useState(true);
    const infoPopupDispatch = useInfoPopupDispatchState();

    const handleClose = () => {
        setIsOpen(false);
        infoPopupDispatch(addToInfoPopupState({
            isOpen: false,
            severity: '',
            text: '',
        }))
    };

    return <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={5000}
        onClose={() => handleClose()}
        severity={severity}

    >
        <Alert onClose={() => handleClose()} severity={severity} variant='filled'>
            {text}
        </Alert>
    </Snackbar>
};
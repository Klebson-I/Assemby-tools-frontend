import React, {useEffect, useState} from "react";
import {Button, Paper, TextField} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {useSetToolState} from "../../context/SetToolContext/SetToolContext";
import {ItemBlock} from "../ItemBlock/ItemBlock";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import {handleFetch} from "../../Hooks/useFetch";

const styleObject = {
    selectedItemsContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    buttonsDiv: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: '20px 0'
    },
    button: {
        fontSize: '22px',
    },
    textfieldDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    textfield: {
        width: '50%'
    },
}

export const SelectionComplete = () => {
    const setToolState = useSetToolState();
    const dispatchGlobalPopupState = useGlobalPopupDispatchState();
    const [isNameValid, setIsNameValid] = useState(false);
    const [name, setName] = useState('');

    const getItemsObjectsFromState = () => {
        return Object.values(setToolState).filter((stateProperty) => typeof stateProperty === 'object')
    };

    const goBack = () => dispatchGlobalPopupState(addToGlobalPopupState({
        isOpen: false,
        component: {},
    }));

    const saveTool = async () => {
        await handleFetch(
            'POST',
            {
                ...setToolState,
                name,
            },
            'settool',
            () => {},
            () => {},
        );
    };

    useEffect(() => {
        if (name !== '' && name.length >= 4) {
            return setIsNameValid(true);
        }
        setIsNameValid(false);
    },[name])


    return <Paper elevation={0}>
        <div style={styleObject.selectedItemsContainer}>
            {
                getItemsObjectsFromState().map((item) => <ItemBlock toolParams={item} navigationDisable={true}/>)
            }
        </div>
        <div style={styleObject.textfieldDiv}>
            <TextField
                label={isNameValid ? 'Tool name' : "Set tool name"}
                margin='normal'
                color='primary'
                error={!isNameValid}
                sx={styleObject.textfield}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div style={styleObject.buttonsDiv}>
            <Button
                variant='outlined'
                color ='primary'
                onClick={goBack}
                sx={styleObject.button}
                startIcon={<ArrowBackIcon fontSize='large'/>}
            >
                GO BACK
            </Button>
            <Button
                onClick={saveTool}
                variant='outlined'
                color='success'
                sx={styleObject.button}
                disabled={!isNameValid}
                startIcon={<SaveOutlinedIcon fontSize='large'/>}
            >
                SAVE TOOL
            </Button>
        </div>
    </Paper>
}
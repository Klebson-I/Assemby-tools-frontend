import React from "react";
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import './style.css';

export const SaveToolField = ({isNameValid, setName, saveTool, goBack, name}) => {
    return <>
            <div className='textfieldDiv'>
                <TextField
                    label={isNameValid ? 'Tool name' : "Set tool name"}
                    margin='normal'
                    color='primary'
                    error={!isNameValid}
                    className='textfield'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='buttonsDiv'>
                <Button
                    variant='outlined'
                    color ='primary'
                    onClick={goBack}
                    className='button'
                    startIcon={<ArrowBackIcon fontSize='large'/>}
                >
                    GO BACK
                </Button>
                <Button
                    onClick={saveTool}
                    variant='outlined'
                    color='success'
                    className='button'
                    disabled={!isNameValid}
                    startIcon={<SaveOutlinedIcon fontSize='large'/>}
                >
                    SAVE TOOL
                </Button>
            </div>
        </>
}


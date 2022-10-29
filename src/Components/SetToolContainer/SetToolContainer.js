import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Step, StepLabel, Stepper} from "@mui/material";
import {handleFetch} from "../../Hooks/useFetch";
import {ItemBlock} from "../ItemBlock/ItemBlock";

const styleObject = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonGroup: {
        width: '100%',
        marginTop: '100px'
    },
    button: {
        width: '33%',
        height: '200px',
        fontSize: '50px'
    },
    buttonsDiv: {
        width: '100%',
    },
    stepper: {
        width: '100%',
        marginTop: '50px',
    },
    toolsSelectContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
}

const ACTION_SELECT_ARRAYS = {
    MILLING: [],
    TURNING: ['Select cutting insert', 'Select turning holder', 'Select assembly item'],
    DRILLING: ['Select drill', 'Select drill holder'],
}

const ACTIONS = ['MILLING', 'TURNING', 'DRILLING'];

const fetchForItems = async (step, setItem ,goodCallback, badCallback) => {
    let specificUrl ='';
    switch (step) {
        case 'Select cutting insert': specificUrl = 'cuttinginsert';break;
        case 'Select turning holder': specificUrl = 'turningholder';break;
        case 'Select assembly item': specificUrl = 'assemblyitem'; break;
        default: break;
    }
    const items = await handleFetch(
        'GET',
        {},
        specificUrl,
        () => {},
        () => {},
    )
    setItem(items);
}

export const SetToolContainer = () => {
    const [steps, setSteps] = useState([]);
    const [action, setAction] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [isStepComplete, setIsStepComplete] = useState(true);
    const [items, setItems] = useState([]);

    const handleStepChange = (index) => {
        if (!isStepComplete) {
            return;
        }
        setStepIndex(index);
    }

    useEffect(() => {
        if(action === '') {
            return;
        }
        fetchForItems(steps[stepIndex], setItems);
    },[steps, action, stepIndex])

    useEffect(() => {
        if(action === '') {
            return;
        }
        setSteps(ACTION_SELECT_ARRAYS[action]);
    },[action]);

    return <div style={styleObject.container}>
        {
            action === '' && <div style={styleObject.buttonsDiv}>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    sx={styleObject.buttonGroup}
                >
                    {
                        ACTIONS.map((action) => <Button
                            key={action}
                            onClick={() => setAction(action)}
                            sx={styleObject.button}>
                            {action}
                        </Button>)
                    }
                </ButtonGroup>
            </div>
        }
        {
            action !== '' && <>
                <Stepper activeStep={stepIndex} alternativeLabel sx={styleObject.stepper}>
                    {steps.map((label, index) => (
                        <Step key={label} onClick={() => handleStepChange(index)}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div style={styleObject.toolsSelectContainer}>
                    {
                        items.map((item) => <ItemBlock key={item.id} toolParams={item} navigateDisable={true}/>)
                    }
                </div>
            </>
        }
    </div>
}
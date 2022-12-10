import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Step, StepLabel, Stepper} from "@mui/material";
import { ItemBlockForSetTool} from "../ItemBlockForSetTool/ItemBlockForSetTool";
import {addToItemState} from "../../context/ItemsContext/actions";
import {useSetToolState, useSetToolStateDispatch} from "../../context/SetToolContext/SetToolContext";
import {styleObject} from "./style";
import {
    ACTION_SELECT_ARRAYS,
    ACTIONS, arrayOfMillTypes,
    ASSEMBLY_TOOL_OBJECT,
    fetchForItems, getInfoHeaderText,
    isSettingToolComplete, optionalSteps,
    setActionForMilling
} from "./utils";
import {SelectionComplete} from "../SelectionComplete/SelectionComplete";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import {resetItemState} from "../../context/SetToolContext/actions";

export const SetToolContainer = () => {
    const [steps, setSteps] = useState([]);
    const [action, setAction] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [compareArray, setCompareArray] = useState([]);
    const setToolStateDispatch = useSetToolStateDispatch();
    const setToolState = useSetToolState();
    const dispatchGlobalPopupState = useGlobalPopupDispatchState();
    const [infoHeader, setInfoHeader] = useState("");

    const getClassByAction = (action) => {
        switch (action) {
            case ACTIONS[2] : return styleObject.buttonDrill;
            case ACTIONS[1]: return styleObject.buttonLathe;
            case ACTIONS[0]: return styleObject.buttonMill;
        }
    };

    useEffect(() => {
        if (!ACTIONS.includes(action)) {
            return;
        }
        setToolStateDispatch(resetItemState());
        setToolStateDispatch(addToItemState(
            ASSEMBLY_TOOL_OBJECT[action],
        ));
    },[action])

    const handleStepChange = (index) => {
        if (!setToolState[ACTION_SELECT_ARRAYS[action][stepIndex]].id && index > stepIndex) {
            return;
        }
        setStepIndex(index);
        setCompareArray([]);
    }

    useEffect(() => {
        if(action === '') {
            return;
        }
        const stepName = steps[stepIndex];
        setInfoHeader("")
        if (optionalSteps.includes(stepName)) {
            setInfoHeader(getInfoHeaderText[stepName])
        }
        fetchForItems(stepName, setItems, setToolState);
    },[steps, action, stepIndex])

    useEffect(() => {
        if(action === '') {
            return;
        }
        setSteps(ACTION_SELECT_ARRAYS[action]);
    },[action]);


    useEffect(() => {
        if(isSettingToolComplete(setToolState) && action!=='' && stepIndex === steps.length - 1) {
            console.log('oh no')
            dispatchGlobalPopupState(addToGlobalPopupState({
                isOpen: 'true',
                component: <SelectionComplete/>,
                headingText:'Selection is complete',
            }))
        }
    },[setToolState]);

    useEffect(() => {
        const actualSelected = arrayOfMillTypes.find((key) => setToolState[key]?.id);
        if (setToolState.action === 'MILLING' && actualSelected !== steps[stepIndex]) {
            setActionForMilling({
                setToolState,
                setAction,
                steps,
                stepIndex,
                setToolStateDispatch,
            })
        }
    },[setToolState])

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
                            sx={getClassByAction(action)}>
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
                {
                    infoHeader && <div>
                        <h1>
                            {infoHeader}
                        </h1>
                    </div>
                }
                <div style={styleObject.toolsSelectContainer}>
                    {
                        items.map((item) => <ItemBlockForSetTool
                            key={item.id}
                            toolParams={item}
                            compareArray={compareArray}
                            setCompareArray={setCompareArray}
                        />)
                    }
                </div>
            </>
        }
    </div>
}
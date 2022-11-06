import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Step, StepLabel, Stepper} from "@mui/material";
import { ItemBlockForSetTool} from "../ItemBlockForSetTool/ItemBlockForSetTool";
import {addToItemState} from "../../context/ItemsContext/actions";
import {useSetToolState, useSetToolStateDispatch} from "../../context/SetToolContext/SetToolContext";
import {styleObject} from "./style";
import {ACTION_SELECT_ARRAYS, ACTIONS, ASSEMBLY_TOOL_OBJECT, fetchForItems, isSettingToolComplete} from "./utils";
import {SelectionComplete} from "../SelectionComplete/SelectionComplete";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";

export const SetToolContainer = () => {
    const [steps, setSteps] = useState([]);
    const [action, setAction] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [compareArray, setCompareArray] = useState([]);
    const setToolStateDispatch = useSetToolStateDispatch();
    const setToolState = useSetToolState();
    const dispatchGlobalPopupState = useGlobalPopupDispatchState();

    useEffect(() => {
        if (!ACTIONS.includes(action)) {
            return;
        }
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
        fetchForItems(steps[stepIndex], setItems, setToolState);
    },[steps, action, stepIndex])

    useEffect(() => {
        if(action === '') {
            return;
        }
        setSteps(ACTION_SELECT_ARRAYS[action]);
    },[action]);

    useEffect(() => {
        if(isSettingToolComplete(setToolState) && action!=='' && stepIndex === steps.length - 1) {
            dispatchGlobalPopupState(addToGlobalPopupState({
                isOpen: 'true',
                component: <SelectionComplete/>,
                headingText:'Selection is complete',
            }))
        }
    },[setToolState]);

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
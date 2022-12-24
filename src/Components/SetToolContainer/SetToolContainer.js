import React, {useEffect, useState} from 'react';
import {Button, Step, StepLabel, Stepper} from "@mui/material";
import { ItemBlockForSetTool} from "../ItemBlockForSetTool/ItemBlockForSetTool";
import {addToItemState} from "../../context/ItemsContext/actions";
import {useSetToolState, useSetToolStateDispatch} from "../../context/SetToolContext/SetToolContext";
import {
    ACTION_SELECT_ARRAYS,
    ACTIONS, arrayOfMillTypes,
    ASSEMBLY_TOOL_OBJECT,
    fetchForItems, filterParams, getInfoHeaderText,
    isSettingToolComplete, optionalSteps,
} from "./utils";
import {SelectionComplete} from "../SelectionComplete/SelectionComplete";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import {resetItemState} from "../../context/SetToolContext/actions";
import {SetToolOperationButtons} from "../SetToolOperationButtons/SetToolOperationButtons";
import './style.css';
import {ParamFilter} from "../ParamFilter/ParamFilter";
import {useParamsFilterState} from "../../context/ParamsFilterContext/ParamsFilterContext";

const stepStrChange = (str) =>
    str.toLowerCase()
    .replaceAll('_', ' ');

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
    const [isParamFilterOpen, setIsParamFilterOpen] = useState(false);
    const paramsFilterState = useParamsFilterState();

    useEffect(() => {
        if (!isParamFilterOpen) {
            return;
        }
        const toolWithParam = items[0];
        dispatchGlobalPopupState(addToGlobalPopupState({
            isOpen: true,
            component: <ParamFilter tool={toolWithParam}/>,
            headingText: 'Select param to search'
        }))
    },[isParamFilterOpen])

    useEffect(() => {
        if (!ACTIONS.concat(arrayOfMillTypes).includes(action)) {
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
            dispatchGlobalPopupState(addToGlobalPopupState({
                isOpen: 'true',
                component: <SelectionComplete/>,
                headingText:'Selection is complete',
            }))
        }
    },[setToolState]);

    return <div className='container'>
        {
            action === '' && <SetToolOperationButtons setAction={setAction}/>
        }
        {
            action !== '' && <>
                <Stepper activeStep={stepIndex} alternativeLabel className='stepper'>
                    {steps.map((label, index) => (
                        <Step key={label} onClick={() => handleStepChange(index)}>
                            <StepLabel>{stepStrChange(label)}</StepLabel>
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
                {
                    items.length && <div className='paramButtonDiv'>
                        <Button
                            className='paramButton'
                            variant='contained'
                            onClick={() => setIsParamFilterOpen(true)}
                        >
                            <span className='paramButton__span'>Filter by param panel</span>
                        </Button>
                    </div>
                }
                <div className='toolsSelectContainer'>
                    {
                            filterParams(items, paramsFilterState)
                            .map((item) => <ItemBlockForSetTool
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
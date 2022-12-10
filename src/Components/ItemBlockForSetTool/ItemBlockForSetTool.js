import React, {useEffect, useState} from "react";
import {Checkbox, IconButton, Paper, Tooltip} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {styleObject} from "./styles";
import {getProperImage, isSomeToolAlreadySelected} from "./utils";
import {useSetToolState, useSetToolStateDispatch} from "../../context/SetToolContext/SetToolContext";
import {addToSetToolState} from "../../context/SetToolContext/actions";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import {ToolParamsTableForSetTool} from "../ToolParamTableForSetTool";
import CompareIcon from '@mui/icons-material/Compare';
import {CompareTable} from "../CompareTable/CompareTable";


export const ItemBlockForSetTool = ({toolParams, compareArray, setCompareArray}) => {
    const [checked, setChecked] = useState(false);
    const [isToolSelect, setIsToolSelect] = useState(false);
    const setToolState = useSetToolState();
    const setToolStateDispatch = useSetToolStateDispatch();
    const dispatchGlobalPopupState = useGlobalPopupDispatchState();

    useEffect(() => {
        if (!compareArray.length) {
            setChecked(false);
        }
    },[compareArray])

    useEffect(() => {
        const isToolSelectedInToolState = setToolState[toolParams.type]?.id === toolParams.id;
        setIsToolSelect(isToolSelectedInToolState);
    },[toolParams.type, toolParams.id, setToolState]);

    const handleAssemblyClick = () => {
        if (!isToolSelect) {
            setToolStateDispatch(addToSetToolState({
                [`${toolParams.type}`]: toolParams,
            }))
            //TODO to separate function
            if (['END_MILL_MONO_HOLDER', 'END_MILL_HOLDER', 'DISC_CUTTER_HOLDER'].includes(toolParams.type)) {
                const arr = ['END_MILL_MONO_HOLDER', 'END_MILL_HOLDER', 'DISC_CUTTER_HOLDER'].filter(
                    (item) => item !== toolParams.type
                )
                for (let item of arr) {
                    setToolStateDispatch(addToSetToolState({
                        [item]: {},
                    }))
                }
            }
            return;
        }
        setToolStateDispatch(addToSetToolState({
            [`${toolParams.type}`]: {},
        }))
    };

    useEffect(() => {
        console.log(toolParams)
        if (isSomeToolAlreadySelected(setToolState, toolParams)) {
            setIsToolSelect(true);
            return;
        }
        setIsToolSelect(false);
    },[setToolState, toolParams]);

    const handleSelectCheckbox = (e) => {
        e.stopPropagation();
        if (compareArray.length < 2 && !checked) {
            setChecked(!checked);
            setCompareArray((compareArray) => [
                ...compareArray,
                toolParams,
            ])
            return;
        }
        if (checked) {
            setCompareArray((compareArray) => compareArray.filter(({id}) => id !== toolParams.id))
            setChecked(!checked);
        }
    };

    const handleInfoClick = (e) => {
        e.stopPropagation();
        dispatchGlobalPopupState(addToGlobalPopupState({
            isOpen: true,
            component: <ToolParamsTableForSetTool tool={toolParams}/>,
            headingText: 'Tool parameters'
        }))
    };

    const handleCompareClick = (e) => {
        e.stopPropagation();
        dispatchGlobalPopupState(addToGlobalPopupState({
            isOpen: true,
            component: <CompareTable toolArray={compareArray}/>,
            headingText: 'Compare tools'
        }))
    };

    const getProperIcon = () => {
        if (checked && compareArray.length === 2) {
            return <Tooltip title='Compare tools'>
                <IconButton style={styleObject.infoButton} onClick={(e) => handleCompareClick(e)}>
                    <CompareIcon/>
                </IconButton>
            </Tooltip>
        }
        return <Tooltip title='Check tool parameters'>
            <IconButton style={styleObject.infoButton} onClick={(e) => handleInfoClick(e)}>
                <InfoOutlinedIcon/>
            </IconButton>
        </Tooltip>
    }

    return <>
            <Paper
                    sx={isToolSelect ? styleObject.paperSelected : styleObject.paper}
                    elevation={5}
                    onClick={handleAssemblyClick}
                >
                    {
                        !checked && compareArray.length === 2
                        ? <Tooltip title='Two items to compare already selected'>
                                <RemoveCircleOutlineIcon sx={styleObject.compareDisableIcon}/>
                            </Tooltip>
                        : <Tooltip title='Select tool to compare'>
                                <Checkbox
                                    sx={styleObject.checkbox}
                                    checked={checked}
                                    onClick={(e) => handleSelectCheckbox(e)}/>
                            </Tooltip>
                    }
                {
                    getProperIcon()
                }
                    <img src={getProperImage(toolParams.type)} style={styleObject.image} alt='toolImage'/>
                    {toolParams.name}
                </Paper>
    </>
}
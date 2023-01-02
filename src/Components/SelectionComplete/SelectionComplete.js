import React, {useEffect, useState} from "react";
import {Paper} from "@mui/material";
import {useSetToolState} from "../../context/SetToolContext/SetToolContext";
import {ItemBlock} from "../ItemBlock/ItemBlock";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import {handleFetch} from "../../Hooks/useFetch";
import {useInfoPopupDispatchState} from "../../context/InfoContext/InfoContext";
import {addToInfoPopupState} from "../../context/InfoContext/actions";
import {OPTIONAL_ID} from "../SetToolContainer/utils";
import {SaveToolField} from "../SaveToolField/SaveToolField";
import './style.css';

export const SelectionComplete = () => {
    const setToolState = useSetToolState();
    const dispatchGlobalPopupState = useGlobalPopupDispatchState();
    const [isNameValid, setIsNameValid] = useState(false);
    const [name, setName] = useState('');
    const infoPopupStateDispatch = useInfoPopupDispatchState();

    const getItemsObjectsFromState = () => {
        return Object.values(setToolState).filter(
            (stateProperty) => typeof stateProperty === 'object' && stateProperty.id && stateProperty.id !== OPTIONAL_ID
        )
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
            ({msg}) => {
                infoPopupStateDispatch(addToInfoPopupState({
                    isOpen: true,
                    text: msg,
                    severity: 'success',
                }));
                dispatchGlobalPopupState(addToGlobalPopupState({
                    isOpen: false,
                }))
            },
            ({msg}) => {
                infoPopupStateDispatch(addToInfoPopupState({
                    isOpen: true,
                    text: msg,
                    severity: 'error',
                }))
            },
        );
    };

    useEffect(() => {
        if (name !== '' && name.length >= 4) {
            return setIsNameValid(true);
        }
        setIsNameValid(false);
    },[name])


    return <Paper elevation={0}>
        <div className='selectedItemsContainer'>
            {
                getItemsObjectsFromState().map((item, index) => <ItemBlock key={index} toolParams={item} navigationDisable={true}/>)
            }
        </div>
        <SaveToolField
            isNameValid={isNameValid}
            setName={setName}
            saveTool={saveTool}
            goBack={goBack}
            name={name}
        />
    </Paper>
}
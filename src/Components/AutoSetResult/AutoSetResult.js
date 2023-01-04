import React, {useEffect, useState} from "react";
import {ItemBlock} from "../ItemBlock/ItemBlock";
import './style.css';
import {SaveToolField} from "../SaveToolField/SaveToolField";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {handleFetch} from "../../Hooks/useFetch";
import {setProperSaveObjectForTool} from "./utils";
import {addToInfoPopupState} from "../../context/InfoContext/actions";
import {useInfoPopupDispatchState} from "../../context/InfoContext/InfoContext";

export const AutoSetResult = ({tool}) => {
    const [isNameValid, setIsNameValid] = useState(false);
    const [name, setName] = useState('');
    const dispatchGlobalPopupState = useGlobalPopupDispatchState();
    const infoPopupStateDispatch = useInfoPopupDispatchState();

    const goBack = () => dispatchGlobalPopupState(addToGlobalPopupState({
        isOpen: false,
        component: {},
    }));

    const getNameByIndex = (name, index) => `${name}  --${index+1}--`;

    const saveTool = async () => {
        const arrayOfPromises = Object.values(tool)
            .map((singleTool, index) => handleFetch(
                'POST',
                setProperSaveObjectForTool(singleTool,
                    getNameByIndex(name, index)),
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
                ));
        await Promise.all(arrayOfPromises);
    };

    useEffect(() => {
        if (name !== '' && name.length >= 4) {
            return setIsNameValid(true);
        }
        setIsNameValid(false);
    },[name])

    return <div className='setResultDiv'>
        {
            Object.entries(tool)
                .map(([name, toolObject], index) => <div className='singleToolContainer' key={index}>
                    <span className='actionName'>{name}</span>
                    <div className='toolItems'>
                        {
                            toolObject.map((item, index) => <ItemBlock key={index} toolParams={item} navigationDisable={true}/>)
                        }
                    </div>
                </div>)
        }
        <SaveToolField
            isNameValid={isNameValid}
            name={name}
            setName={setName}
            goBack={goBack}
            saveTool={saveTool}
        />
    </div>
};
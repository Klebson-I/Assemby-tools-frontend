import React, {useState} from "react";
import './style.css';
import {
    areProperParamsInStateFilled,
    constructQueryStringForAction,
    getArrayOfParametersForInputs,
    getImageForAction
} from "./utils";
import {ActionParamInput} from "../ActionParamInput/ActionParamInput";
import {Button} from "@mui/material";
import {useInfoPopupDispatchState} from "../../context/InfoContext/InfoContext";
import {addToInfoPopupState} from "../../context/InfoContext/actions";
import {handleFetch} from "../../Hooks/useFetch";
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import {AutoSetResult} from "../AutoSetResult/AutoSetResult";

export const ActionAssembly = ({action}) => {
    const infoPopupStateDispatch = useInfoPopupDispatchState();
    const dispatchGlobalPopup = useGlobalPopupDispatchState();
    const [paramsValues, setParamsValues] = useState({
        D: 0,
        L: 0,
        L2: 0,
        L3: 0,
        H: 0,
        R: 0,
        AP: 0,
        IT: 'IT6',
        BOTTOM: 'V',
        δ: '45deg',
        Ls: '16',
        Hs: '4',
    });

    const handleAutoAssembly = async () => {
        if (!areProperParamsInStateFilled(paramsValues, action)) {
            return infoPopupStateDispatch(addToInfoPopupState({
                isOpen: true,
                text: 'Fill all inputs',
                severity: 'error',
            }));
        }
        const queryString = constructQueryStringForAction(action, paramsValues);
        console.log(queryString);
        const tool = await handleFetch(
            'GET',
            '',
            queryString,
            () => {},
            () => {},
            );
        if (tool?.msg) {
            console.log(tool.msg)
            return infoPopupStateDispatch(addToInfoPopupState({
                isOpen: true,
                text: tool.msg,
                severity: 'error',
            }));
        }
        dispatchGlobalPopup(addToGlobalPopupState({
            isOpen: true,
            component: <AutoSetResult tool={tool}/>,
            headingText: 'Tools for action'
        }))
    }

    return <div className='container'>
        <div className='divideContainer'>
            <div className='leftSide'>
                <h1>{action}</h1>
                <img src={getImageForAction(action)} alt="operation draw" className='actionImage'/>
                <span className='imageSpan'>Draw with params to determine</span>
            </div>
            <div className='rightSide'>
                <h2 className='rightSideHeader'>Set parameters of action</h2>
                {
                    getArrayOfParametersForInputs(action)
                        .map((param, index) => <ActionParamInput
                            param={param}
                            value={paramsValues}
                            setValue={setParamsValues}
                            key={index}
                        />)
                }
            </div>
        </div>
        <Button
            variant='contained'
            color='primary'
            sx={{
                fontSize: '25px',
                margin: '30px 0',

            }}
            onClick={handleAutoAssembly}
        >ASSEMBLY TOOL AUTOMATICALLY</Button>
    </div>

}
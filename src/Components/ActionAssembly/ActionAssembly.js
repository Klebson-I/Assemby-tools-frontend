import React, {useState} from "react";
import './style.css';
import {getArrayOfParametersForInputs, getImageForAction} from "./utils";
import {ActionParamInput} from "../ActionParamInput/ActionParamInput";
import {Button} from "@mui/material";

export const ActionAssembly = ({action}) => {
    const [paramsValues, setParamsValues] = useState({
        D: 0,
        L: 0,
    });

    const handleAutoAssembly = () => {
        // validation is all params filled
        // query string construct
        // get assembly tool
        //display in popup
        //in display we can save tool
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
                        .map((param) => <ActionParamInput
                            param={param}
                            value={paramsValues}
                            setValue={setParamsValues}
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
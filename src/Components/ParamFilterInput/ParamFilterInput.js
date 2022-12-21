import React from 'react';
import './style.css';
import {Input} from "@mui/material";

export const ParamFilterInput = ({param}) => {
    console.log(param)
    const displayParam = (param) => {
        switch (param.valueType) {
            case "string": {
                return <div className='inputDiv'>
                    <span>{param.name}</span>
                    <Input type='text'/>
                </div>
            }
            case "boolean": {

            }
            case "number": {
                return <div className='inputDiv'>
                    <span>{param.name}</span>
                    <Input type='number'/>
                    <Input type='number'/>
                </div>
            }
        }
    };

    return <div className='inputsDiv'>
        {
            displayParam(param)
        }
    </div>
}
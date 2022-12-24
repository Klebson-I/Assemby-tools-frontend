import React from "react";
import {Input} from "@mui/material";
import './style.css';

export const ActionParamInput = ({value, setValue, param}) => {
    return <div className='paramContainer'>
        <span className='paramHeading'>{`${param.symbol} (${param.description})`}</span>
        <div className='inputLineDiv'>
            <Input
                type='number'
                value={value[param.symbol]}
                onChange={(e) => setValue((prev) => ({
                    ...prev,
                    [param.symbol]: e.target.value,
                }))}
            />
            <span>{param.unit}</span>
        </div>
    </div>
}
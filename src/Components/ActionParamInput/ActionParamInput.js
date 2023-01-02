import React from "react";
import {Input, MenuItem, Select} from "@mui/material";
import './style.css';

const BOTTOM_DOMAIN = ['FLAT', 'V'];
const IT_DOMAIN = ['IT6', 'IT7', 'IT8', 'IT9', 'IT10', 'IT11'];

const getMenuItemsForSelect = (param) =>
    param.symbol === 'IT'
        ? IT_DOMAIN.map((it,index) => <MenuItem key={index} value={it}>{it}</MenuItem>)
        : BOTTOM_DOMAIN.map((bottom, index) => <MenuItem key={index} value={bottom}>{bottom}</MenuItem>);


export const ActionParamInput = ({value, setValue, param}) => {
    return <div className='paramContainer'>
        <span className='paramHeading'>{`${param.symbol} (${param.description})`}</span>
        <div className='inputLineDiv'>
            {
                !['IT', 'BOTTOM'].includes(param.symbol) ?
                    <Input
                        type='number'
                        value={value[param.symbol]}
                        onChange={(e) => setValue((prev) => ({
                            ...prev,
                            [param.symbol]: e.target.value,
                        }))}
                    /> :
                    <Select
                        value={value[param.symbol]}
                        onChange={(e) => setValue((prev) => ({
                            ...prev,
                            [param.symbol]: e.target.value,
                        }))}
                    >
                        {getMenuItemsForSelect(param)}
                    </Select>
            }
            {
                !['IT', 'BOTTOM'].includes(param.symbol) && <span>{param.unit}</span>
            }
        </div>
    </div>
}
import React from "react";
import {Input, MenuItem, Select} from "@mui/material";
import './style.css';

const SELECT_PARAMS_SYMBOLS = ['IT', 'BOTTOM', 'Hs', 'Ls', 'δ'];
const BOTTOM_DOMAIN = ['FLAT', 'V'];
const IT_DOMAIN = ['IT6', 'IT7', 'IT8', 'IT9', 'IT10', 'IT11'];
const LS_DOMAIN = [16, 20, 25, 32];
const HS_DOMAIN = [4, 5, 6.3, 8, 10, 5.6, 7.1, 9, 11.2, 12.5];
const DELTA_DOMAIN = ['45deg', '50deg', '55deg', '60deg'];

const getMenuItemsForSelect = (param) => {
    switch (param.symbol) {
        case 'IT': return IT_DOMAIN.map((it,index) => <MenuItem key={index} value={it}>{it}</MenuItem>);
        case 'BOTTOM': return BOTTOM_DOMAIN.map((bottom, index) => <MenuItem key={index} value={bottom}>{bottom}</MenuItem>);
        case 'Ls': return LS_DOMAIN.map((ls, index) => <MenuItem key={index} value={ls}>{ls}</MenuItem>);
        case 'Hs': return HS_DOMAIN.map((hs, index) => <MenuItem key={index} value={hs}>{hs}</MenuItem>);
        case 'δ': return DELTA_DOMAIN.map((delta, index) => <MenuItem key={index} value={delta}>{delta}</MenuItem>);
    };
}

export const ActionParamInput = ({value, setValue, param}) => {
    return <div className='paramContainer'>
        <span className='paramHeading'>{`${param.symbol} (${param.description})`}</span>
        <div className='inputLineDiv'>
            {
                !SELECT_PARAMS_SYMBOLS.includes(param.symbol) ?
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
                !['IT', 'BOTTOM', 'δ'].includes(param.symbol) && <span>{param.unit}</span>
            }
        </div>
    </div>
}
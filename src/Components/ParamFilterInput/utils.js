import {IconButton, Input, MenuItem, Select} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

export const createStringInput = ({param, value, setValue, removeParam}) => {
    return <div className='inputDiv'>
        <label>{param.name}</label>
        <Input
            type='text'
            placeholder='value'
            value={value}
            onChange={(e) => setValue(e.target.value)}/>
        <IconButton onClick={removeParam}>
            <DeleteIcon color='error'/>
        </IconButton>
    </div>
};

export const createBoolInput = ({param, value, setValue, removeParam}) => {
    return <div className='inputDiv'>
        <label>{param.name}</label>
        <Select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='selectInput'
        >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
        </Select>
        <IconButton onClick={removeParam}>
            <DeleteIcon color='error'/>
        </IconButton>
    </div>
};

export const createNumberInput = ({param, value, setValue, removeParam}) => {
    return <div className='inputDiv'>
        <label>{param.name}</label>
        <Input type='number' placeholder='min value'
            value={value?.min || null}
            onChange={(e) => setValue((prev) => ({
                ...prev,
                min: e.target.value,
            }))}
        />
        <Input type='number' placeholder='max value'
            value={value?.max || null}
           onChange={(e) => setValue((prev) => ({
               ...prev,
               max: e.target.value,
           }))}
        />
        <IconButton onClick={removeParam}>
            <DeleteIcon color='error'/>
        </IconButton>
    </div>
};

export const setStartValues = ({paramsFilterState, param, setValue}) => {
    const { value : paramValueFromState} = paramsFilterState.find(({name}) => name === param.name);
    switch (param.valueType) {
        case "string": {
            return setValue(paramValueFromState || '');
        }
        case "number": {
            return setValue({
                min: paramValueFromState.min,
                max: paramValueFromState.max,
            })
        }
        case "boolean": {
            return setValue(Boolean(paramValueFromState) || false);
        }
        default: break;
    }
};

export const isParamAlreadySelected = (paramsFilterState, param) =>
    paramsFilterState.map(({name}) => name).includes(param.name);
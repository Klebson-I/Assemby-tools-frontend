import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, TextField} from "@mui/material";
import './style.css'
import {ParamFilterInput} from "../ParamFilterInput/ParamFilterInput";
import {useParamsFilterStateDispatch} from "../../context/ParamsFilterContext/ParamsFilterContext";
import {addToParamFilterState} from "../../context/ParamsFilterContext/actions";

const PARAMS_TO_AVOID = ['match_code', 'id', 'name', 'type'];

const createParamsTypesObject = (tool) =>
    Object.entries(tool)
        .filter(([key,]) => !PARAMS_TO_AVOID.includes(key))
        .reduce((acc, param) => {
           const [key, value] = param;
           if (value === 'false' || value === 'true') {
               return {
                   ...acc,
                   [key]: {
                       name: key,
                       valueType: 'boolean',
                   }
               }
           }
           if (Number.isNaN(Number(value))) {
               return {
                   ...acc,
                   [key]: {
                       name: key,
                       valueType: 'string',
                   }
               }
           }
           return {
               ...acc,
               [key]: {
                   name: key,
                   valueType: 'number',
               }
           }
        },{})

export const ParamFilter = ({tool}) => {
    const [selectedParams, setSelectedParams] = useState([]);
    const [paramsToSelect, setParamsToSelect] = useState([]);
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const dispatchParamsFilterState = useParamsFilterStateDispatch();

    useEffect(() => {
        const params = createParamsTypesObject(tool);
        setParamsToSelect(params);
    }, []);

    const putParamToList = (paramKey) => {
        if (selectedParams.map(({name}) => name).includes(paramKey)) {
            return;
        }
        setSelectedParams([
            ...selectedParams,
            paramsToSelect[paramKey],
        ])
    };

    const submitFilters = () =>
        dispatchParamsFilterState(addToParamFilterState(selectedParams));

    return <>
        <div className='selectParamDiv'>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Object.keys(paramsToSelect)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Parameter name" />}
                onChange={(e,v) => setAutocompleteValue(v)}
            />
            <Button variant='outlined' onClick={() => putParamToList(autocompleteValue)}>
                <span> Add parameter</span>
            </Button>
        </div>
        {
            selectedParams.length
                ? selectedParams.map((param, index) =>
                    <ParamFilterInput param={param} key={index} setSelectedParams={setSelectedParams}/>
                )
                : null
        }
        <Button sx={{marginLeft: '30px'}} variant='outlined' onClick={submitFilters}>
            Submit filters
        </Button>
    </>
};
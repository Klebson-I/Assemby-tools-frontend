import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, TextField} from "@mui/material";
import './style.css'
import {ParamFilterInput} from "../ParamFilterInput/ParamFilterInput";
import {
    useParamsFilterState,
    useParamsFilterStateDispatch
} from "../../context/ParamsFilterContext/ParamsFilterContext";
import {addToParamFilterState} from "../../context/ParamsFilterContext/actions";
import {checkIsAllParamsHaveValues, createParamsTypesObject} from "./utils";
import {addToInfoPopupState} from "../../context/InfoContext/actions";
import {useInfoPopupDispatchState} from "../../context/InfoContext/InfoContext";

export const ParamFilter = ({tool, setIsParamFilterOpen}) => {
    const [selectedParams, setSelectedParams] = useState([]);
    const [paramsToSelect, setParamsToSelect] = useState([]);
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const dispatchParamsFilterState = useParamsFilterStateDispatch();
    const infoPopupStateDispatch = useInfoPopupDispatchState();
    const paramsFilterState = useParamsFilterState();

    useEffect(() => {
        const params = createParamsTypesObject(tool);
        setParamsToSelect(params);
        setSelectedParams(paramsFilterState);
        return () => setIsParamFilterOpen(false);
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

    const submitFilters = () => {
        if (checkIsAllParamsHaveValues(selectedParams)) {
            dispatchParamsFilterState(addToParamFilterState(selectedParams));
            return infoPopupStateDispatch(addToInfoPopupState({
                isOpen: true,
                text: 'Filters successfully applied',
                severity: 'success',
            }));
        }
        infoPopupStateDispatch(addToInfoPopupState({
            isOpen: true,
            text: 'Fill values of all field !',
            severity: 'error',
        }));
    }


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
                    <ParamFilterInput
                        param={param}
                        key={index}
                        setSelectedParams={setSelectedParams}
                        paramsFilterState = {paramsFilterState}
                        />
                )
                : null
        }
        <Button sx={{marginLeft: '30px'}} variant='outlined' onClick={submitFilters}>
            Submit filters
        </Button>
    </>
}
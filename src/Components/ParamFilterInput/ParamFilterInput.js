import React, {useEffect, useState} from 'react';
import './style.css';
import {createBoolInput, createNumberInput, createStringInput, isParamAlreadySelected, setStartValues} from "./utils";


export const ParamFilterInput = ({param, setSelectedParams, paramsFilterState}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (isParamAlreadySelected(paramsFilterState, param)) {
            setStartValues({paramsFilterState, param, setValue})
        }
    },[])

    useEffect(() => {
        setSelectedParams((prev) =>
            prev.map((paramFromState) => {
                if (paramFromState.name !== param.name) {
                    return paramFromState;
                }
                if (value?.hasOwnProperty('min') && value?.hasOwnProperty('max')) {
                    return {
                        ...paramFromState,
                        value: {
                            min: value.min,
                            max: value.max,
                        }
                    }
                }
                return {
                    ...paramFromState,
                    value: value,
                }
            }))
    },[value]);

    const removeParam = () =>
        setSelectedParams((prev) => prev.filter(({name}) => name !== param.name));

    const displayParam = (param) => {
        switch (param.valueType) {
            case "string": {
                return createStringInput({param, value, setValue, removeParam});
            }
            case "boolean": {
                return createBoolInput({param, value, setValue, removeParam});
            }
            case "number": {
                return createNumberInput({param, value, setValue, removeParam});
            }
        }
    };

    return <div className='inputsDiv'>
        {
            displayParam(param)
        }
    </div>
}
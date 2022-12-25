import throughHoleImage from '../../images/action-/through_hole.png';
import noThroughHoleImage from '../../images/action-/no_through_hole.png';

const PARAMS_FOR_ACTIONS = {
    'through hole': {
        D: {
            symbol: 'D',
            unit: 'mm',
            description: 'Hole diameter',
        },
        L: {
            symbol: 'L',
            unit: 'mm',
            description: 'Hole length',
        }
    },
    'no-through hole': {
        D: {
            symbol: 'D',
            unit: 'mm',
            description: 'Hole diameter',
        },
        L: {
            symbol: 'L',
            unit: 'mm',
            description: 'Hole length',
        }
    },
};

export const getImageForAction = (action) => {
    switch (action) {
        case 'through hole': {
            return throughHoleImage;
        }
        case 'no-through hole': {
            return noThroughHoleImage;
        }
    }
}

const getParametersToFillByAction = (action) => PARAMS_FOR_ACTIONS[action];

export const getArrayOfParametersForInputs = (action) => {
    const paramObject = getParametersToFillByAction(action);
    return Object.values(paramObject);
};

export const areProperParamsInStateFilled = (paramsValues, action) => {
    const paramObject = getParametersToFillByAction(action);
    const paramsKeysForAction = Object.keys(paramObject);
    return Object.entries(paramsValues)
        .filter(([key, ]) => paramsKeysForAction.includes(key))
        .every(([, value]) => !!value)
};

const createQueryParams = (valuesArrayToQuery) =>
    valuesArrayToQuery.reduce((acc, curr) => acc+= `/${curr}`,'');


export const constructQueryStringForAction = (action, params) => {
    const paramObject = getParametersToFillByAction(action);
    const paramsKeysForAction = Object.keys(paramObject);
    const valuesArrayToQuery = Object.entries(params)
        .filter(([key, ]) => paramsKeysForAction.includes(key))
        .map(([,value]) => value);
    let query = `autoassembly/${action.replace(/\s/g,'')}`;
    return query + createQueryParams(valuesArrayToQuery);
};


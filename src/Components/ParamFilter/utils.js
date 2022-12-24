const PARAMS_TO_AVOID = ['match_code', 'id', 'name', 'type'];

export const createParamsTypesObject = (tool) =>
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
        },{});

export const checkIsAllParamsHaveValues = (selectedParams) =>
    selectedParams.every(({value, valueType}) => {
        if (['boolean', 'string'].includes(valueType)) {
            return ![null, undefined, ''].includes(value);
        }
        else {
            const {min, max} = value;
            return ![undefined, '', null].includes(min) && ![undefined, '', null].includes(max);
        }
    })
import {handleFetch} from "../../Hooks/useFetch";

export const MOVES_FOR_TURNING = ['TURNING_HOLDER', 'CUTTING_INSERT', 'ASSEMBLY_ITEM'];
export const MOVES_FOR_DRILLING = ['DRILL', 'ISO50', 'COLLET'];

export const ACTION_SELECT_ARRAYS = {
    TURNING: MOVES_FOR_TURNING,
    DRILLING: MOVES_FOR_DRILLING,
    END_MILL_MONO_HOLDER: ['END_MILL_MONO_HOLDER', 'ISO50', 'COLLET'],
    END_MILL_HOLDER: ['END_MILL_HOLDER', 'INSERT_FOR_MILL', 'INSERT_SCREW_MILL', 'BIT', 'TORQUE_WRENCH'],
    DISC_CUTTER_HOLDER: ['DISC_CUTTER_HOLDER', 'INSERT_FOR_SLOT_CUT',
        'CASSETTE', 'INSERT_SCREW_MILL', 'CLAMPING_WEDGE_MILL', 'WEDGE_SCREW', 'BIT', 'KEY', 'TORQUE_WRENCH'],
    ANGLE_CUTTER: ['ANGLE_CUTTER', 'ISO50', 'COLLET']
}

export const ACTIONS = ['MILLING', 'TURNING', 'DRILLING'];

export const arrayOfMillTypes =  ['DISC_CUTTER_HOLDER', 'END_MILL_HOLDER', 'END_MILL_MONO_HOLDER', 'ANGLE_CUTTER'];

export const optionalSteps = ['TORQUE_WRENCH', 'ISO50', 'COLLET']

export const OPTIONAL_ID = 'OPTIONAL';

const getShapeAndSizeForCuttingInsert = (setToolState) => {
    let item = setToolState?.[ACTION_SELECT_ARRAYS.TURNING[0]];
    return item ? {shape: item.MTP, size: item.IS} : {};
 };

const getShapeAndSizeForCuttingInsertMilling = (setToolState) => {
    const key = arrayOfMillTypes.find((key) => setToolState[key]?.id);
    const { MTP, IS } = setToolState[key];
    return MTP && IS ? {shape: MTP, size: IS} : {};
};


const checkIsMillingAssemblyComplete = (setToolState) => {
    const actionKey = arrayOfMillTypes.find((key) => setToolState[key]?.id);
    const steps = ACTION_SELECT_ARRAYS[actionKey];
    if (!steps) {
        return false;
    }
    return steps.every((step) => {
        return setToolState[step]?.id;
    })
};

export const getInfoHeaderText = {
    TORQUE_WRENCH: "This part is optional, if you don't want to take it - just select 'No selection'",
    ISO50: "If you use CNC machine this is necessary to have",
    COLLET: "It's necessary if you took ISO50 in previous step",
}

const getProperUrlForItem = (step, setToolState) => {
    switch (step) {
        case 'TURNING_HOLDER': {
            return 'turningholder';
        }
        case 'CUTTING_INSERT': {
            const {shape, size} = getShapeAndSizeForCuttingInsert(setToolState);
            if (!shape || !size) {
                throw new Error('There is no turning holder select');
            }
            return `cuttinginsert/${shape}/${size}`;
        }
        case 'ASSEMBLY_ITEM': {
            return 'assemblyitem';
        }
        case 'DISC_CUTTER_HOLDER': {
            return 'millHolder/allMills/DISC_CUTTER_HOLDER';
        }
        case 'END_MILL_HOLDER': {
            return 'millHolder/allMills/END_MILL_HOLDER';
        }
        case 'END_MILL_MONO_HOLDER': {
            return 'monoMillTool/END_MILL_MONO_HOLDER';
        }
        case 'ANGLE_CUTTER': {
            return 'monoMillTool/ANGLE_CUTTER';
        }
        case 'INSERT_FOR_SLOT_CUT': {
            const {shape, size} = getShapeAndSizeForCuttingInsertMilling(setToolState);
            return `cuttingInsertMill/INSERT_FOR_SLOT_CUT/${shape}/${size}`;
        }
        case 'INSERT_FOR_MILL': {
            const {shape, size} = getShapeAndSizeForCuttingInsertMilling(setToolState);
            return `cuttingInsertMill/INSERT_FOR_MILL/${shape}/${size}`;
        }
        case 'KEY': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'BIT': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'CASSETTE': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'TORQUE_WRENCH': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'WEDGE_SCREW': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'CLAMPING_WEDGE_MILL': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'INSERT_SCREW_MILL': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'ISO50': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'COLLET': {
            return `assemblyMillItem/type/${step}`;
        }
        case 'DRILL': {
            return `drill`
        }
        default: return '';
    }
}



export const fetchForItems = async (step, setItem, setToolState) => {
    let specificUrl = getProperUrlForItem(step, setToolState);

    if (!specificUrl) {
        return setItem([]);
    }

    let items = await handleFetch(
        'GET',
        {},
        specificUrl,
        () => {},
        () => {},
    );

    if (optionalSteps.includes(step)) {
        items.push({
            id:OPTIONAL_ID,
            name: 'No selection',
            type: step,
        });
    }
    setItem(items);
};

export const ASSEMBLY_TOOL_OBJECT = {
    TURNING: {
        action: 'TURNING',
        CUTTING_INSERT: {},
        TURNING_HOLDER: {},
        ASSEMBLY_ITEM: {},
    },
    DISC_CUTTER_HOLDER: {
        action: 'MILLING',
        DISC_CUTTER_HOLDER: {},
        INSERT_FOR_SLOT_CUT: {},
        CASSETTE: {},
        INSERT_SCREW_MILL: {},
        BIT: {},
        KEY: {},
        TORQUE_WRENCH: {},
        CLAMPING_WEDGE_MILL: {},
        WEDGE_SCREW: {},
    },
    END_MILL_HOLDER: {
        action: 'MILLING',
        END_MILL_HOLDER: {},
        DISC_CUTTER_HOLDER: {},
        INSERT_FOR_MILL:{},
        CASSETTE: {},
        INSERT_SCREW_MILL: {},
        BIT: {},
        KEY: {},
        TORQUE_WRENCH: {},
        CLAMPING_WEDGE_MILL: {},
        WEDGE_SCREW: {},
    },
    END_MILL_MONO_HOLDER: {
        action: 'MILLING',
        END_MILL_MONO_HOLDER: {},
        COLLET: {},
        ISO50: {},
    },
    ANGLE_CUTTER: {
        action: 'MILLING',
        ANGLE_CUTTER: {},
        COLLET: {},
        ISO50: {},
    },
    DRILLING: {
        action: 'DRILLING',
        DRILL: {},
        COLLET: {},
        ISO50: {},
    },
};

export const isSettingToolComplete = (setToolState) => {
    if (!setToolState?.action) {
        return false;
    }
    const setToolStateValues = Object.values(setToolState);
    if (setToolState.action === 'MILLING') {
        return checkIsMillingAssemblyComplete(setToolState);
    }
    return setToolStateValues.every((value) => {
        if (typeof value === 'object') {
            return !!value.id;
        }
        return !!value;
    })
}

export const filterParams = (items, paramsFilterState) => {
    if (!paramsFilterState.length)  {
        return items;
    }
    let filteredItems = [...items];
    paramsFilterState.forEach((param) => {
        filteredItems = filteredItems.filter((item) => {
            const itemParamToFilter = item[`${param.name}`];
            if (param.valueType === 'number') {
                return Number(itemParamToFilter) >= Number(param.value.min) && Number(itemParamToFilter) <= Number(param.value.max)
            }
            if (param.valueType === 'string') {
                return param.value === itemParamToFilter;
            }
            if (param.valueType === 'boolean') {
                return Boolean(param.value) === Boolean(itemParamToFilter);
            }
            return true;
        })
    })
    return filteredItems;
};
import {handleFetch} from "../../Hooks/useFetch";
import {addToSetToolState} from "../../context/SetToolContext/actions";

export const MOVES_FOR_TURNING = ['TURNING_HOLDER', 'CUTTING_INSERT', 'ASSEMBLY_ITEM'];
export const MOVES_FOR_DRILLING = ['DRILL', 'DRILL_HOLDER'];
export const MOVES_FOR_MILLING_START = ['MILL HOLDER / MILL TOOL'];

export const ACTION_SELECT_ARRAYS = {
    MILLING: MOVES_FOR_MILLING_START,
    TURNING: MOVES_FOR_TURNING,
    DRILLING: MOVES_FOR_DRILLING,
    END_MILL_MONO_HOLDER: ['END_MILL_MONO_HOLDER', 'ISO50', 'COLLET'],
    END_MILL_HOLDER: ['END_MILL_HOLDER', 'INSERT_FOR_MILL', 'INSERT_SCREW_MILL', 'BIT', 'TORQUE_WRENCH'],
    DISC_CUTTER_HOLDER: ['DISC_CUTTER_HOLDER', 'INSERT_FOR_SLOT_CUT',
        'CASSETTE', 'INSERT_SCREW_MILL', 'CLAMPING_WEDGE_MILL', 'WEDGE_SCREW', 'BIT', 'KEY', 'TORQUE_WRENCH'],
}

export const ACTIONS = ['MILLING', 'TURNING', 'DRILLING'];

export const arrayOfMillTypes =  ['DISC_CUTTER_HOLDER', 'END_MILL_HOLDER', 'END_MILL_MONO_HOLDER'];

const arrayOfStepsToChangeMillAction = [
    ...arrayOfMillTypes,
    'MILL HOLDER / MILL TOOL',
];

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

const resetAssembliesFromPrevMillType = (setToolState, keyToLeft, setToolStateDispatch) => {
    const arrayOfKeysToLeave = [keyToLeft, 'action'];
    const keysToReset = Object.keys(setToolState).filter((key) =>
        !arrayOfKeysToLeave.includes(key));
    const updateObject = {};
    for (let key of keysToReset) {
        updateObject[key] = {};
    }
    setToolStateDispatch(addToSetToolState({
        ...setToolState,
        ...updateObject,
    }))
};

const checkIsMillingAssemblyComplete = (setToolState) => {
    const actionKey = arrayOfMillTypes.find((key) => setToolState[key].id);
    const steps = ACTION_SELECT_ARRAYS[actionKey];
    if (!steps) {
        return false;
    }
    return steps.every((step) => setToolState[step]?.id)
};

export const setActionForMilling = ({setToolState, setAction, steps, stepIndex, setToolStateDispatch}) => {
    if (setToolState.DISC_CUTTER_HOLDER?.id && arrayOfStepsToChangeMillAction.includes(steps[stepIndex])) {
        setAction('DISC_CUTTER_HOLDER');
        resetAssembliesFromPrevMillType(setToolState, 'DISC_CUTTER_HOLDER', setToolStateDispatch);
    }
    else if (setToolState.END_MILL_HOLDER?.id && arrayOfStepsToChangeMillAction.includes(steps[stepIndex])) {
        setAction('END_MILL_HOLDER');
        resetAssembliesFromPrevMillType(setToolState, 'END_MILL_HOLDER', setToolStateDispatch);
    }
    else if (setToolState.END_MILL_MONO_HOLDER?.id && arrayOfStepsToChangeMillAction.includes(steps[stepIndex])) {
        setAction('END_MILL_MONO_HOLDER');
        resetAssembliesFromPrevMillType(setToolState, 'END_MILL_MONO_HOLDER', setToolStateDispatch);
    }
}

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
        case 'MILL HOLDER / MILL TOOL' : {
            return 'millHolder/allMills';
        }
        case 'DISC_CUTTER_HOLDER': {
            return 'millHolder/allMills';
        }
        case 'END_MILL_HOLDER': {
            return 'millHolder/allMills';
        }
        case 'END_MILL_MONO_HOLDER': {
            return 'monoMillTool';
        }
        case 'INSERT_FOR_SLOT_CUT': {
            const {shape, size} = getShapeAndSizeForCuttingInsertMilling(setToolState);
            return `cuttingInsertMill/INSERT_FOR_SLOT_CUT/${shape}/${size}`;
        }
        case 'INSERT_FOR_MILL': {
            const {shape, size} = getShapeAndSizeForCuttingInsertMilling(setToolState);
            console.log(shape)
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

    // TODO jeśli pusta tablica to w zależności od stepu wyrzucić błąd

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
    MILLING: {
        action: 'MILLING',
        END_MILL_MONO_HOLDER: {},
        END_MILL_HOLDER: {},
        DISC_CUTTER_HOLDER: {},
        INSERT_FOR_SLOT_CUT: {},
        INSERT_FOR_MILL:{},
        CASSETTE: {},
        INSERT_SCREW_MILL: {},
        BIT: {},
        KEY: {},
        TORQUE_WRENCH: {},
        CLAMPING_WEDGE_MILL: {},
        WEDGE_SCREW: {},
        COLLET: {},
        ISO50: {},
    },
    DRILLING: {

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
import {handleFetch} from "../../Hooks/useFetch";

export const MOVES_FOR_TURNING = ['TURNING_HOLDER', 'CUTTING_INSERT', 'ASSEMBLY_ITEM'];
export const MOVES_FOR_DRILLING = ['DRILL', 'DRILL_HOLDER'];

export const ACTION_SELECT_ARRAYS = {
    MILLING: [],
    TURNING: MOVES_FOR_TURNING,
    DRILLING: MOVES_FOR_DRILLING,
}

export const ACTIONS = ['MILLING', 'TURNING', 'DRILLING'];

const getShapeAndSizeForCuttingInsert = (setToolState) => {
    let item = setToolState?.[ACTION_SELECT_ARRAYS.TURNING[0]];
    return item ? {shape: item.MTP, size: item.IS} : {};
 };

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
    }
}



export const fetchForItems = async (step, setItem, setToolState) => {
    let specificUrl = getProperUrlForItem(step, setToolState);

    if (!specificUrl) {
        return setItem([]);
    }

    const items = await handleFetch(
        'GET',
        {},
        specificUrl,
        () => {},
        () => {},
    );
    console.log(items);
    // TODO jeśli pusta tablica to w zależności od stepu wyrzucić błąd
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

    },
    DRILLING: {

    },
};

export const isSettingToolComplete = (setToolState) => {
    if (!setToolState?.action) {
        return false;
    }
    const setToolStateValues = Object.values(setToolState);
    return setToolStateValues.every((value) => {
        if (typeof value === 'object') {
            return !!value.id;
        }
        return !!value;
    })
}
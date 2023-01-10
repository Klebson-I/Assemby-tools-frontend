import throughHoleImage from '../../images/action-/through_hole.png';
import noThroughHoleImage from '../../images/action-/no_through_hole.png';
import cutBarImage from '../../images/action-/cut_bar.png';
import sideSlotImage from '../../images/action-/side_slot.png';
import surfacePlanningImage from '../../images/action-/surface_planning.png';
import pocketImage from '../../images/action-/pocket.png';
import openPocketImage from '../../images/action-/open_pocket.png';
import vSlotImage from '../../images/action-/v_slot.png';
import facePlanningImage from '../../images/action-/face_planning.png';
import externalGrooveImage from '../../images/action-/external_groove.png';

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
        },
        IT: {
          symbol: 'IT',
          unit: '--',
          description: 'Class of hole'
        },
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
        },
        IT: {
            symbol: 'IT',
            unit: '--',
            description: 'Class of hole',
        },
        BOTTOM: {
            symbol: 'BOTTOM',
            unit: '--',
            description: 'Hole bottom shape',
        }
    },
    'cut bar': {
        D: {
            symbol: 'D',
            unit: 'mm',
            description: 'Bar diameter',
        },
    },
    'side slot': {
        L: {
            symbol: 'L',
            unit: 'mm',
            description: 'Slot length',
        },
        L2: {
            symbol: 'L2',
            unit: 'mm',
            description: 'Slot depth',
        },
        H: {
            symbol: 'H',
            unit: 'mm',
            description: 'Slot height',
        }
    },
    'surface planning': {
        L: {
            symbol: 'L',
            unit: 'mm',
            description: 'Surface length',
        },
        L2: {
            symbol: 'L2',
            unit: 'mm',
            description: 'Surface width',
        },
        H: {
            symbol: 'H',
            unit: 'mm',
            description: 'Deep of cut',
        },
    },
    'pocket': {
        L: {
            symbol: 'L',
            unit: 'mm',
            description: 'Pocket length',
        },
        L2: {
            symbol: 'L2',
            unit: 'mm',
            description: 'Pocket width',
        },
        AP: {
            symbol: 'AP',
            unit: 'mm',
            description: 'Deep of cut',
        },
        R1: {
            symbol: 'R1',
            unit: 'mm',
            description: 'Max corner radius',
        },
        R2: {
            symbol: 'R2',
            unit: 'mm',
            description: 'Max corner radius bottom',
        },
    },
    'open pocket': {
        L: {
            symbol: 'L',
            unit: 'mm',
            description: 'Pocket length',
        },
        L2: {
            symbol: 'L2',
            unit: 'mm',
            description: 'Pocket width',
        },
        AP: {
            symbol: 'AP',
            unit: 'mm',
            description: 'Deep of cut',
        },
        R1: {
            symbol: 'R1',
            unit: 'mm',
            description: 'Max corner radius',
        },
        R2: {
            symbol: 'R2',
            unit: 'mm',
            description: 'Max corner radius bottom',
        },
    },
    'V slot': {
        Ls: {
            symbol: 'Ls',
            unit: 'mm',
            description: 'Slot width',
        },
        Hs: {
            symbol: 'Hs',
            unit: 'mm',
            description: 'Slot deep',
        },
        δ: {
            symbol: 'δ',
            unit: '---',
            description: 'Angle of slot',
        }
    },
    'face planning': {
        D: {
            symbol: 'D',
            unit: 'mm',
            description: 'Face diameter',
        },
        AP: {
            symbol: 'AP',
            unit: 'mm',
            description: 'Deep of cut',
        },
        HAND: {
            symbol: 'HAND',
            unit: '---',
            description: 'Direction'
        },
    },
    'external groove': {
        L: {
            symbol: 'L',
            unit: 'mm',
            description: 'Groove length',
        },
        AP: {
            symbol: 'AP',
            unit: 'mm',
            description: 'Deep of cut',
        },
        HAND: {
            symbol: 'HAND',
            unit: '---',
            description: 'Direction'
        },
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
        case 'cut bar': {
            return cutBarImage;
        }
        case 'side slot': {
            return sideSlotImage;
        }
        case 'surface planning': {
            return surfacePlanningImage;
        }
        case 'pocket': {
            return pocketImage;
        }
        case 'open pocket': {
            return openPocketImage;
        }
        case 'V slot': {
            return vSlotImage;
        }
        case 'face planning': {
            return facePlanningImage;
        }
        case 'external groove': {
            return externalGrooveImage;
        }
        default: break;
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
    valuesArrayToQuery.reduce((acc, curr) => acc +`/${curr}`,'');


export const constructQueryStringForAction = (action, params) => {
    const paramObject = getParametersToFillByAction(action);
    const paramsKeysForAction = Object.keys(paramObject);
    const valuesArrayToQuery = Object.entries(params)
        .filter(([key, ]) => paramsKeysForAction.includes(key))
        .map(([,value]) => value);
    let query = `autoassembly/${action.replace(/\s/g,'')}`;
    return query + createQueryParams(valuesArrayToQuery);
};


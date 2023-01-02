import {ASSEMBLY_TOOL_OBJECT} from "../SetToolContainer/utils";

const MILLING_TYPES = ['END_MILL_MONO_HOLDER', 'DISC_CUTTER_HOLDER', 'END_MILL_HOLDER'];

const getActionForObjectToSave = (tool) => {
    if (tool.some(({type}) => MILLING_TYPES.includes(type))) {
        return 'MILLING';
    }
    if (tool.some(({type}) => type === 'TURNING_HOLDER')) {
        return 'TURNING';
    }
    if (tool.some(({type}) => type === 'DRILL')) {
        return 'DRILLING';
    }
}

export const setProperSaveObjectForTool = (tool, name) => {
    console.log(tool);
    const action = getActionForObjectToSave(tool);
    const startObject = {...ASSEMBLY_TOOL_OBJECT[action], name, action};
    let reducedObject = tool.reduce((acc, curr) => {
        return {
            ...acc,
            [`${curr.type}`]: curr,
        }
    }, startObject);
    if (reducedObject.hasOwnProperty('END_MILL_MONO_HOLDER') || reducedObject.hasOwnProperty('DRILL')) {
        reducedObject = {
            ...reducedObject,
            COLLET: { id: 'OPTIONAL', name: 'No selection', type: 'COLLET' },
            ISO50: { id: 'OPTIONAL', name: 'No selection', type: 'ISO50' },
        }
    }
    return reducedObject;
};
import boltImage from "../../images/bolt.jpg";
import holderImage from "../../images/holder.jpg";
import cutImage from "../../images/cut.jpg";
import {FILTER_TYPES} from "../../constants";

export const getProperImage = (type) => {
    switch (type) {
        case FILTER_TYPES.assemblyItem: return boltImage;
        case FILTER_TYPES.turningHolder: return holderImage;
        case FILTER_TYPES.cuttingInsert: return cutImage;
        default: break;
    }
}

export const isSomeToolAlreadySelected = (setToolState, toolParams) => setToolState[toolParams.type] !== {} &&
    setToolState[toolParams.type].id === toolParams.id;
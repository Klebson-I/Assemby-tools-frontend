import boltImage from "../../images/bolt.jpg";
import holderImage from "../../images/holder.jpg";
import cutImage from "../../images/cut.jpg";
import endMillHolderImage from '../../images/end_mill_holder.png';
import discMillHolderImage from '../../images/disc_mill_holder.png';
import monoMillToolImage from '../../images/mono_end_mill_holder.png';
import cuttingInsertForMillImage from '../../images/mill_insert.png';
import cuttingInsertForCutAndSlotImage from '../../images/cut_slot_insert.png';
import cassetteImage from '../../images/cassette.png';
import insertScrewImage from '../../images/bolt.jpg';
import wedgeImage from '../../images/wedge.png';
import wedgeScrew from '../../images/wedge_screw.png';
import torqueWrenchImage from '../../images/torque_wrench.png';
import keyImage from '../../images/key.png';
import bitImage from '../../images/bit.jpg';
import colletImage from '../../images/collet.jpg';
import iso50Image from '../../images/iso50.jpg';
import drillImage from '../../images/drill.png';
import angleCutterImage from '../../images/angle_cutter.png';
import {FILTER_TYPES} from "../../constants";

export const getProperImage = (type) => {
    switch (type) {
        case FILTER_TYPES.assemblyItem: return boltImage;
        case FILTER_TYPES.turningHolder: return holderImage;
        case FILTER_TYPES.cuttingInsert: return cutImage;
        case FILTER_TYPES.discMillHolder: return discMillHolderImage;
        case FILTER_TYPES.endMillHolder: return endMillHolderImage;
        case FILTER_TYPES.monoMillTool: return monoMillToolImage;
        case FILTER_TYPES.cuttingInsertForMill: return cuttingInsertForMillImage;
        case FILTER_TYPES.cuttingInsertMillForCutAndSlot: return cuttingInsertForCutAndSlotImage;
        case FILTER_TYPES.cassette: return cassetteImage;
        case FILTER_TYPES.insertScrewMill: return insertScrewImage;
        case FILTER_TYPES.clampingWedgeMill: return wedgeImage;
        case FILTER_TYPES.wedgeScrew: return wedgeScrew;
        case FILTER_TYPES.torqueWrench: return torqueWrenchImage;
        case FILTER_TYPES.key: return keyImage;
        case FILTER_TYPES.bit: return bitImage;
        case FILTER_TYPES.iso50: return iso50Image;
        case FILTER_TYPES.collet: return colletImage;
        case FILTER_TYPES.drill: return drillImage;
        case FILTER_TYPES.angleCutter: return angleCutterImage;
        default: break;
    }
}

export const isSomeToolAlreadySelected = (setToolState, toolParams) => {
    return setToolState[toolParams.type] !== {} &&
        setToolState[toolParams.type]?.id === toolParams.id;
}

import boltImage from "../../images/bolt.jpg";
import holderImage from "../../images/holder.jpg";
import cutImage from "../../images/cut.jpg";

export const getProperImage = (type) => {
    switch (type) {
        case 'assemblyItem': return boltImage;
        case 'turningHolder': return holderImage;
        case 'cuttingInsert': return cutImage;
        default: break;
    }
}
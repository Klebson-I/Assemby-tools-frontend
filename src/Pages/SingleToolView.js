import React, {useEffect, useState} from "react";
import {AppHeader} from "../Components/AppHeader/AppHeader";
import {IconButton, Paper} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getProperImage} from "../Components/ItemBlockForSetTool/utils";
import {handleFetch} from "../Hooks/useFetch";
import { useParams, useNavigate } from 'react-router-dom';
import {FILTER_TYPES} from "../constants";
import {ToolParamsTable} from "../Components/ToolParamsTable/ToolParamsTable";
import A_B_K from '../images/iso-pictures/CUTTING_INSERT/A_B_K.png';
import H from '../images/iso-pictures/CUTTING_INSERT/H.png';
import L from '../images/iso-pictures/CUTTING_INSERT/L.png';
import O from '../images/iso-pictures/CUTTING_INSERT/O.png';
import P from '../images/iso-pictures/CUTTING_INSERT/P.png';
import R from '../images/iso-pictures/CUTTING_INSERT/R.png';
import S from '../images/iso-pictures/CUTTING_INSERT/S.png';
import T from '../images/iso-pictures/CUTTING_INSERT/T.png';
import W from '../images/iso-pictures/CUTTING_INSERT/W.png';
import C_D_E_M_V from '../images/iso-pictures/CUTTING_INSERT/C_D_E_M_V.png'
import turningHolderPic1 from '../images/iso-pictures/TURNING_HOLDER/1.png';
import turningHolderPic2 from '../images/iso-pictures/TURNING_HOLDER/2.png';
import ISO50 from '../images/iso-pictures/ASSEMBLY_ITEM/ISO50.png';
import COLLET from '../images/iso-pictures/ASSEMBLY_ITEM/COLLET.png';
import {ImageSlider} from "../Components/ImageSlider/ImageSlider";
import {stylesObjectForGlobalPopup} from "../App";
import {useGlobalPopupState} from "../context/GlobalPopupContext/GlobalPopupContext";
import {GlobalPopup} from "../Components/GlobalPopup/GlobalPopup";



const styleObject = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    productContainer: {
        marginTop: '20px',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    image: {
        height: 'auto',
        width: '50%'
    },
    leftSide: {
        width: '40%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    scrollContainer: {
        padding: '10px',
        width: '50%',
        height: '65vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '5px',
            color: 'black',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px grey',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'black',
            borderRadius: '10px',
        },
    },
};

const getUrlPrefixByToolType = (type) => {
    switch (type) {
        case FILTER_TYPES.assemblyItem: return 'assemblyitem';
        case FILTER_TYPES.turningHolder: return 'turningholder';
        case FILTER_TYPES.cuttingInsert: return 'cuttinginsert';
        case FILTER_TYPES.endMillHolder: return 'millHolder';
        case FILTER_TYPES.discMillHolder: return 'millHolder';
        case FILTER_TYPES.monoMillTool: return 'monoMillTool';
        case FILTER_TYPES.cuttingInsertMillForCutAndSlot: return 'cuttingInsertMill';
        case FILTER_TYPES.cuttingInsertForMill: return 'cuttingInsertMill';
        case FILTER_TYPES.clampingWedgeMill: return 'assemblyMillItem';
        case FILTER_TYPES.wedgeScrew: return 'assemblyMillItem';
        case FILTER_TYPES.insertScrewMill: return 'assemblyMillItem';
        case FILTER_TYPES.key: return 'assemblyMillItem';
        case FILTER_TYPES.bit: return 'assemblyMillItem';
        case FILTER_TYPES.torqueWrench: return 'assemblyMillItem';
        case FILTER_TYPES.cassette: return 'assemblyMillItem';
        case FILTER_TYPES.drill: return 'drill';
        case FILTER_TYPES.iso50: return 'assemblyMillItem';
        case FILTER_TYPES.collet: return 'assemblyMillItem';
        default: break;
    }
};


const getParamsImagesForCuttingInsert = ({SC}) => {
    switch (SC) {
        case 'H': return [H];
        case 'L': return [L];
        case 'P': return [P];
        case 'R': return [R];
        case 'S': return [S];
        case 'T': return [T];
        case 'W': return [W];
        case 'O': return [O];
        case 'C': return [C_D_E_M_V];
        case 'D': return [C_D_E_M_V];
        case 'M': return [C_D_E_M_V];
        case 'V': return [C_D_E_M_V];
        case 'E': return [C_D_E_M_V];
        case 'A': return [A_B_K];
        case 'B': return [A_B_K];
        case 'K': return [A_B_K];
    };
};

const getParamsImagesForTurningHolder = () => [turningHolderPic1, turningHolderPic2];

const getImageFunctionObject = {
    'CUTTING_INSERT':(tool) => getParamsImagesForCuttingInsert(tool),
    'TURNING_HOLDER': getParamsImagesForTurningHolder,
    [`${FILTER_TYPES.cuttingInsertForMill}`]:(tool) => getParamsImagesForCuttingInsert(tool),
    [`${FILTER_TYPES.cuttingInsertMillForCutAndSlot}`]:(tool) => getParamsImagesForCuttingInsert(tool),
    'ISO50':() => [ISO50],
    'COLLET':() => [COLLET],
};

const getParamsImages = (tool) => getImageFunctionObject[tool.type](tool);

const shouldDisplaySlider = ({type}) => [
    FILTER_TYPES.cuttingInsert,
    FILTER_TYPES.turningHolder,
    FILTER_TYPES.cuttingInsertForMill,
    FILTER_TYPES.cuttingInsertMillForCutAndSlot,
    FILTER_TYPES.iso50,
    FILTER_TYPES.collet,
].includes(type);

export const SingleToolView = () => {
    const [tool, setTool] = useState({});
    const [params, setParams] = useState([]);
    const {type, id} = useParams();
    const navigate = useNavigate();
    const globalPopupState = useGlobalPopupState();

    const goBack = () => navigate(-1);

    useEffect(() => {
        (async() => {
            const data = await handleFetch('GET',
                {},
                `params`,
                () => {},
                () => {},
            )
            setParams(data);
        })();
    },[setParams]);

    useEffect(() => {
        (async() => {
            const data = await handleFetch('GET',
                {},
                `${getUrlPrefixByToolType(type)}/${id}`,
                () => {},
                () => {},
            )
            setTool(data);
        })();
    },[id, type])

    return <div style={stylesObjectForGlobalPopup.global}>
        {
            globalPopupState.isOpen && <GlobalPopup
                component={globalPopupState.component}
                headingText=''
            />
        }
        {globalPopupState.isOpen && <div style={stylesObjectForGlobalPopup.globalCurtain}/>}
        <AppHeader/>
        <div style={styleObject.container}>
            <IconButton onClick={goBack}>
                <ArrowBackIcon fontSize='large'/>
            </IconButton>
            {
                tool.id && <div style={styleObject.productContainer}>
                    <div style={styleObject.leftSide}>
                        <img src={getProperImage(type)} style={styleObject.image} alt='icon'/>
                        <h3>{tool.name}</h3>
                        {
                            shouldDisplaySlider(tool) && <ImageSlider images={getParamsImages(tool)} />
                        }
                    </div>
                    <Paper elevation={8} sx={styleObject.scrollContainer}>
                        <ToolParamsTable tool={tool} params={params}/>
                    </Paper>
                </div>
            }
        </div>
    </div>
};
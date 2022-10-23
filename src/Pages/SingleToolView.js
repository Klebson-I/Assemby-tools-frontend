import {useEffect, useState} from "react";
import {AppHeader} from "../Components/AppHeader/AppHeader";
import {SearchForAction} from "../Components/SearchForAction/SearchForAction";
import {IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getProperImage} from "../Components/ItemBlock/utils";
import {handleFetch} from "../Hooks/useFetch";
import { useParams } from 'react-router-dom';
import {FILTER_TYPES} from "../constants";
import {ToolParamsTable} from "../Components/ToolParamsTable/ToolParamsTable";


const styleObject = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    productContainer: {
        marginTop: '20px',

    }
}

const getUrlPrefixByToolType = (type) => {
    switch (type) {
        case FILTER_TYPES.assemblyItem: return 'assemblyitem';
        case FILTER_TYPES.turningHolder: return 'turningholder';
        case FILTER_TYPES.cuttingInsert: return 'cuttinginsert';
        default: break;
    }
}

export const SingleToolView = () => {
    const [tool, setTool] = useState({});
    const {type, id} = useParams();

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
    },[])

    return <>
        <AppHeader/>
        <div style={styleObject.container}>
            <IconButton>
                <ArrowBackIcon fontSize='large'/>
            </IconButton>
            <SearchForAction searchText='Search for params'/>
            {
                tool && <div style={styleObject.productContainer}>
                    <img src={getProperImage(type)}/>
                    <ToolParamsTable tool={tool} />
                </div>
            }
        </div>
    </>
};
import {useEffect, useState} from "react";
import {AppHeader} from "../Components/AppHeader/AppHeader";
import {SearchForAction} from "../Components/SearchForAction/SearchForAction";
import {IconButton, Paper} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getProperImage} from "../Components/ItemBlockForSetTool/utils";
import {handleFetch} from "../Hooks/useFetch";
import { useParams, useNavigate } from 'react-router-dom';
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
        default: break;
    }
}

export const SingleToolView = () => {
    const [tool, setTool] = useState({});
    const {type, id} = useParams();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

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

    return <>
        <AppHeader/>
        <div style={styleObject.container}>
            <IconButton onClick={goBack}>
                <ArrowBackIcon fontSize='large'/>
            </IconButton>
            {
                tool && <div style={styleObject.productContainer}>
                    <div style={styleObject.leftSide}>
                        <img src={getProperImage(type)} style={styleObject.image} alt='icon'/>
                        <h3>{tool.name}</h3>
                    </div>
                    <Paper elevation={8} sx={styleObject.scrollContainer}>
                        <ToolParamsTable tool={tool} />
                    </Paper>
                </div>
            }
        </div>
    </>
};
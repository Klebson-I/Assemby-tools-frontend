import React, {useEffect, useState} from "react";
import {AppHeader} from "../Components/AppHeader/AppHeader";
import {handleFetch} from "../Hooks/useFetch";
import {AssemblyToolItem} from "../Components/AssemblyToolItem/AssemblyToolItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {GlobalPopup} from "../Components/GlobalPopup/GlobalPopup";
import {useGlobalPopupState} from "../context/GlobalPopupContext/GlobalPopupContext";
import {stylesObjectForGlobalPopup} from "../App";

const styleObject = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        overflowX: 'hidden'
    },
    backArrowDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
}

export const UserAccount = () => {
    const [assemblyTools, setAssemblyTools] = useState([]);
    const navigate = useNavigate();
    const globalPopupState = useGlobalPopupState();
    const [refreshToggle, setRefreshToggle] = useState(false);

    useEffect(() => {
        (async () => {
            const assemblyToolsFromDatabase = await handleFetch(
                'GET',
                {},
                'settool',
                () => {},
                () => {},
            );
            console.log(assemblyToolsFromDatabase);
            setAssemblyTools(assemblyToolsFromDatabase || []);
        })();
    },[refreshToggle]);

    const goBack = () => navigate('/app');

    return <div style={styleObject.container}>
        {
            globalPopupState.isOpen && <GlobalPopup
                component={globalPopupState.component}
                headingText={globalPopupState.headingText}
            />
        }
        {globalPopupState.isOpen && <div style={stylesObjectForGlobalPopup.globalCurtain}/>}
        <AppHeader/>
        <div style={styleObject.backArrowDiv}>
            <IconButton onClick={goBack}>
                <ArrowBackIcon fontSize='large'/>
            </IconButton>
        </div>
        <div>
            {
                assemblyTools.map((assemblyTool) => <AssemblyToolItem
                    key={assemblyTool.id}
                    assemblyTool={assemblyTool}
                    setRefreshToggle={setRefreshToggle}
                />)
            }
        </div>
    </div>
}
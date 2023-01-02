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
import {useInfoPopupDispatchState, useInfoPopupState} from "../context/InfoContext/InfoContext";
import {addToInfoPopupState} from "../context/InfoContext/actions";
import {InfoPopup} from "../Components/InfoPopup/InfoPopup";
import './style.css';

export const UserAccount = () => {
    const [assemblyTools, setAssemblyTools] = useState([]);
    const navigate = useNavigate();
    const globalPopupState = useGlobalPopupState();
    const [refreshToggle, setRefreshToggle] = useState(false);
    const infoPopupDispatch = useInfoPopupDispatchState();
    const infoPopupState = useInfoPopupState();

    useEffect(() => {
        (async () => {
             await handleFetch(
                'GET',
                {},
                'settool',
                ({payload}) => {
                    setAssemblyTools(payload || []);
                },
                ({msg}) => {
                    infoPopupDispatch(addToInfoPopupState({
                        isOpen: true,
                        text: msg,
                        severity: 'error',
                    }));
                },
            );
        })();
    },[refreshToggle]);

    const goBack = () => navigate('/app');

    return <div className='userAccountContainer'>
        {
            globalPopupState.isOpen && <GlobalPopup
                component={globalPopupState.component}
                headingText={globalPopupState.headingText}
            />
        }
        {globalPopupState.isOpen && <div style={stylesObjectForGlobalPopup.globalCurtain}/>}
        {infoPopupState.isOpen && <InfoPopup text={infoPopupState.text} severity={infoPopupState.severity} />}
        <AppHeader/>
        <div className='backArrowDiv'>
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
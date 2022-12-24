import {AppHeader} from "./Components/AppHeader/AppHeader";
import {ActionSelectContainer} from "./Components/ActionSelectContainer/ActionSelectContainer";
import {Menu} from "./Components/Menu/Menu";
import React, {useEffect} from "react";
import {handleFetch} from "./Hooks/useFetch";
import {useItemStateDispatch} from "./context/ItemsContext/ItemContext";
import {addToItemState} from "./context/ItemsContext/actions";
import {useFilterState} from "./context/FilterContext/FilterContext";
import {GlobalPopup} from "./Components/GlobalPopup/GlobalPopup";
import { useGlobalPopupState} from "./context/GlobalPopupContext/GlobalPopupContext";
import {InfoPopup} from "./Components/InfoPopup/InfoPopup";
import {useInfoPopupState} from "./context/InfoContext/InfoContext";
import {ParamsFilterContext} from "./context/ParamsFilterContext/ParamsFilterContext";

export const stylesObjectForGlobalPopup = {
    containerDiv: {
        width: '95%',
        display: 'flex',
        marginLeft: '10px',
    },
    global: {
        position: 'relative',
    },
    globalCurtain: {
        width: '100vw',
        height: '100%',
        backgroundColor: 'white',
        opacity: '0.65',
        zIndex: '99',
        position: 'absolute',
    },
}

export function App() {
    const filterState = useFilterState();
    const dispatchItemState = useItemStateDispatch();
    const globalPopupState = useGlobalPopupState();
    const infoPopupState = useInfoPopupState();

    useEffect(()=> {
        (async() => {
            const data = await handleFetch(
                'GET',
                {},
                'all',
                () => {},
                () => {},
                );
            dispatchItemState(addToItemState(data));
        })();
    },[filterState, dispatchItemState]);

  return <ParamsFilterContext>
        <div style={stylesObjectForGlobalPopup.global}>
            {
                globalPopupState.isOpen && <GlobalPopup
                    component={globalPopupState.component}
                    headingText={globalPopupState.headingText}
                />
            }
            {globalPopupState.isOpen && <div style={stylesObjectForGlobalPopup.globalCurtain}/>}
            {infoPopupState.isOpen && <InfoPopup text={infoPopupState.text} severity={infoPopupState.severity} />}
            <AppHeader/>
            <div style={stylesObjectForGlobalPopup.containerDiv}>
                <ActionSelectContainer/>
                <Menu/>
            </div>
        </div>
    </ParamsFilterContext>
}

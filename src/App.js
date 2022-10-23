import './App.css';
import {AppHeader} from "./Components/AppHeader/AppHeader";
import {ActionSelectContainer} from "./Components/ActionSelectContainer/ActionSelectContainer";
import {Menu} from "./Components/Menu/Menu";
import {useEffect} from "react";
import {handleFetch} from "./Hooks/useFetch";
import {useItemStateDispatch} from "./context/ItemsContext/ItemContext";
import {addToItemState} from "./context/ItemsContext/actions";
import {useFilterState} from "./context/FilterContext/FilterContext";

const stylesObject = {
    containerDiv: {
        width: '95%',
        display: 'flex',
        marginLeft: '10px'
    }
}

export function App() {
    const filterState = useFilterState();
    const dispatchItemState = useItemStateDispatch();

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

  return <>
        <AppHeader/>
        <div style={stylesObject.containerDiv}>
            <ActionSelectContainer/>
            <Menu/>
        </div>
  </>
}

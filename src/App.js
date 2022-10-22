import './App.css';
import {AppHeader} from "./Components/AppHeader/AppHeader";
import {ActionSelectContainer} from "./Components/ActionSelectContainer/ActionSelectContainer";
import {Menu} from "./Components/Menu/Menu";
import {FilterContext} from "./context/FilterContext/FilterContext";

const stylesObject = {
    containerDiv: {
        width: '95%',
        display: 'flex',
        marginLeft: '10px'
    }
}

export function App() {
  return <FilterContext>
        <AppHeader/>
        <div style={stylesObject.containerDiv}>
            <ActionSelectContainer/>
            <Menu/>
        </div>
  </FilterContext>
}

import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {ExpandLess, ExpandMore, StarBorder, CleaningServices, Sync} from "@mui/icons-material";
import {useFilterState, useFilterStateDispatch} from "../../context/FilterContext/FilterContext";
import {addToFilterState} from "../../context/FilterContext/actions";
import {FILTER_TYPES} from "../../constants";

const stylesObject = {
    containerDiv: {
        width: '20%',
        marginLeft: '40px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px'
    },
    listHeader: {
        fontSize: '30px'
    },
};



export const Menu = () => {
    const [openMilling, setOpenMilling] = useState(false);
    const [openTurning, setOpenTurning] = useState(false)
    const filterState = useFilterState();
    const dispatchFilterState = useFilterStateDispatch();

    const handleMillingClick = () => {
        setOpenMilling(!openMilling);
    };

    const handleTurningClick = () => {
        setOpenTurning(!openTurning);
    }

    const isFilterActive = (text) => filterState.toolsFilter.includes(text);

    const handleFilterClick = (filter) => {
        if(isFilterActive(filter)) {
            return;
        }
        dispatchFilterState(addToFilterState({
            toolsFilter: [...filterState.toolsFilter, filter],
        }))
    }

    return <div style={stylesObject.containerDiv}>
        <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={stylesObject.listHeader}>
                    Tools
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleMillingClick}>
                <ListItemIcon>
                    <CleaningServices />
                </ListItemIcon>
                <ListItemText primary="Milling" />
                {openMilling ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMilling} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} >
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Item 1" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} >
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Item 2" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Item 3" />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton onClick={handleTurningClick}>
                <ListItemIcon>
                    <Sync />
                </ListItemIcon>
                <ListItemText primary="Turning" />
                {openTurning ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTurning} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.cuttingInsert)} selected={isFilterActive(FILTER_TYPES.cuttingInsert)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Cutting inserts" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.turningHolder)} selected={isFilterActive(FILTER_TYPES.turningHolder)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Turning holders" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.assemblyItem)} selected={isFilterActive(FILTER_TYPES.assemblyItem)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Assembly items" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    </div>
}
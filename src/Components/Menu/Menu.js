import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {ExpandLess, ExpandMore, StarBorder, CleaningServices, Sync} from "@mui/icons-material";
import TornadoOutlinedIcon from '@mui/icons-material/TornadoOutlined';
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
    const [openTurning, setOpenTurning] = useState(false);
    const [openDrilling, setOpenDrilling] = useState(false)
    const filterState = useFilterState();
    const dispatchFilterState = useFilterStateDispatch();

    const handleMillingClick = () => {
        setOpenMilling(!openMilling);
    };

    const handleTurningClick = () => {
        setOpenTurning(!openTurning);
    }

    const handleDrillingClick = () => {
        setOpenDrilling(!openDrilling);
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
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.discMillHolder)} selected={isFilterActive(FILTER_TYPES.discMillHolder)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Disc mill holders" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.endMillHolder)} selected={isFilterActive(FILTER_TYPES.endMillHolder)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="End mill holders" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.monoMillTool)} selected={isFilterActive(FILTER_TYPES.monoMillTool)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Mono end mills" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.angleCutter)} selected={isFilterActive(FILTER_TYPES.angleCutter)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Angle cutters" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.cuttingInsertForMill)} selected={isFilterActive(FILTER_TYPES.cuttingInsertForMill)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Inserts for milling" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.cuttingInsertMillForCutAndSlot)}
                                    selected={isFilterActive(FILTER_TYPES.cuttingInsertMillForCutAndSlot)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Inserts for milling slot and cut" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.key)} selected={isFilterActive(FILTER_TYPES.key)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Keys" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.bit)} selected={isFilterActive(FILTER_TYPES.bit)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Bits" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.insertScrewMill)} selected={isFilterActive(FILTER_TYPES.insertScrewMill)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Insert screw" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.cassette)} selected={isFilterActive(FILTER_TYPES.cassette)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Cassettes" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.torqueWrench)} selected={isFilterActive(FILTER_TYPES.torqueWrench)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Torque wrenches" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.wedgeScrew)} selected={isFilterActive(FILTER_TYPES.wedgeScrew)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Wedge screws" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.clampingWedgeMill)} selected={isFilterActive(FILTER_TYPES.clampingWedgeMill)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Wedges" />
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
            <ListItemButton onClick={handleDrillingClick}>
                <ListItemIcon>
                    <TornadoOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary="Drilling" />
                {openDrilling ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDrilling} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.drill)} selected={isFilterActive(FILTER_TYPES.drill)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Drills" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.collet)} selected={isFilterActive(FILTER_TYPES.collet)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Drill collets" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleFilterClick(FILTER_TYPES.iso50)} selected={isFilterActive(FILTER_TYPES.iso50)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Drill iso50"/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    </div>
}
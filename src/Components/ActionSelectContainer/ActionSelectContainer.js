import React, {useEffect, useState} from "react";
import {appConstants} from "../Utils/constants"
import {ActionBlock} from "../ActionBlock/ActionBlock";
import {Box} from "@mui/material";
import {SearchForAction} from "../SearchForAction/SearchForAction";
import {FilterBlock} from "../FilterBlock/FilterBlock";
import {OptionBar} from "../OptionBar/OptionBar";
import {useItemState} from "../../context/ItemsContext/ItemContext";
import {useFilterState} from "../../context/FilterContext/FilterContext";
import {ItemBlock} from "../ItemBlock/ItemBlock";
import {styleObject} from "./style";

// @TODO create search bar for the proper action

export const ActionSelectContainer = () => {
    const [option, setOption] = useState('ACTIONS');
    const [tools, setTools] = useState([]);
    const itemState = useItemState();
    const filterState = useFilterState();

    useEffect(() => {
        if (!filterState.toolsFilter.length) {
            const allItems = Object?.values(itemState).flatMap((arr) => arr);
            setTools(allItems);
        }
    },[itemState, filterState])

    return <Box sx={styleObject.box}>
        <OptionBar option={option} setOption={setOption}/>
        <SearchForAction/>
        {option === 'TOOLS' && <FilterBlock/>}
        <Box sx={styleObject.boxForActions}>
            {
                option === 'ACTIONS' && appConstants.arrayOfActions.map((action, index) =>
                    <ActionBlock actionName={action} key={index}/>
                )
            }
            {
                option === 'TOOLS' && tools.map((tool, index) => <ItemBlock
                    key={index}
                    toolParams={tool}
                />)
            }
        </Box>
    </Box>
}
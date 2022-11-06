import React, {useEffect, useState} from "react";
import {appConstants} from "../Utils/constants"
import {ActionBlock} from "../ActionBlock/ActionBlock";
import {Box} from "@mui/material";
import {SearchForAction} from "../SearchForAction/SearchForAction";
import {FilterBlock} from "../FilterBlock/FilterBlock";
import {OptionBar} from "../OptionBar/OptionBar";
import {useItemState} from "../../context/ItemsContext/ItemContext";
import {useFilterState} from "../../context/FilterContext/FilterContext";
import {styleObject} from "./style";
import {SetToolContainer} from "../SetToolContainer/SetToolContainer";
import {ItemBlock} from "../ItemBlock/ItemBlock";

export const ActionSelectContainer = () => {
    const [option, setOption] = useState('ACTIONS');
    const [tools, setTools] = useState([]);
    const [wordFilter, setWordFilter] = useState('');
    const itemState = useItemState();
    const filterState = useFilterState();

    useEffect(() => {
        if (!filterState.toolsFilter.length) {
            const allItems = Object?.values(itemState).flatMap((arr) => arr);
            setTools(allItems);
        }
        else {
            const filteredItems = Object?.values(itemState)
                .flatMap((arr) => arr)
                .filter((item) => filterState.toolsFilter.includes(item.type));
            setTools(filteredItems);
        }
    },[itemState, filterState])

    return <Box sx={styleObject.box}>
        <OptionBar option={option} setOption={setOption}/>
        {
            option!=='SET TOOL' && <SearchForAction setWordFilter={setWordFilter}/>
        }
        {option === 'TOOLS' && <FilterBlock/>}
        {option === 'SET TOOL' && <SetToolContainer/>}
        <Box sx={styleObject.boxForActions}>
            {
                option === 'ACTIONS' && appConstants.arrayOfActions
                    .filter((action) => action.includes(wordFilter))
                    .map((action, index) => <ActionBlock actionName={action} key={index}/>
                )
            }
            {
                option === 'TOOLS' && tools
                    .filter((tool) => tool.name.includes(wordFilter))
                    .map((tool, index) => <ItemBlock
                    key={index}
                    toolParams={tool}
                />)
            }
        </Box>
    </Box>
}
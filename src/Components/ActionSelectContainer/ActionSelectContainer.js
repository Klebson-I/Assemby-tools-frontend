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
import cylindricalBore from "../../images/cylindrical_bore.png";
import externalGroove from "../../images/external_groove.png";
import internalGroove from "../../images/internal_groove.png";
import surfacePlanning from '../../images/surface_planning.png';
import standard from '../../images/standard.png';
import cutPipe from '../../images/cut pipe.png'
import cutRod from '../../images/cut rod .png';
import rectangularPocket from '../../images/rec pocket.png';
import noThroughBore from '../../images/bore no throught.png';
import openPocket from '../../images/open pocket 1.png';

const getImageByActionName = (actionName) => {
    switch (actionName) {
        case 'internal slot': return internalGroove;
        case 'side slot': return externalGroove;
        case 'surface planning': return surfacePlanning;
        case 'through hole': return cylindricalBore;
        case 'no-through hole': return noThroughBore;
        case 'cut pipe': return cutPipe;
        case 'cut bar': return cutRod;
        case 'pocket': return rectangularPocket;
        case 'open pocket': return openPocket;
        default: return standard;
    }
}

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
            console.log(itemState);
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
                    .map((action, index) => <ActionBlock
                        actionName={action}
                        image={getImageByActionName(action)}
                        key={index}
                    />
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
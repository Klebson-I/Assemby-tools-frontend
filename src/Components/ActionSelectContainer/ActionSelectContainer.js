import React, {useEffect, useState} from "react";
import {appConstants} from "../Utils/constants"
import {ActionBlock} from "../ActionBlock/ActionBlock";
import {Box} from "@mui/material";
import {SearchForAction} from "../SearchForAction/SearchForAction";
import {FilterBlock} from "../FilterBlock/FilterBlock";
import {OptionBar} from "../OptionBar/OptionBar";
import {useItemState} from "../../context/ItemsContext/ItemContext";
import {useFilterState} from "../../context/FilterContext/FilterContext";
import {SetToolContainer} from "../SetToolContainer/SetToolContainer";
import {ItemBlock} from "../ItemBlock/ItemBlock";
import cylindricalBore from "../../images/cylindrical_bore.png";
import externalGroove from "../../images/external_groove.png";
import vSlotImage from "../../images/v_slot.png";
import surfacePlanning from '../../images/surface_planning.png';
import standard from '../../images/standard.png';
import cutPipe from '../../images/cut pipe.png'
import cutRod from '../../images/cut rod .png';
import rectangularPocket from '../../images/rec pocket.png';
import noThroughBore from '../../images/bore no throught.png';
import openPocket from '../../images/open pocket 1.png';
import sideSlotImage from '../../images/side_slot.png';
import facePlanningImage from '../../images/face_planning.png';
import './style.css';
import {ActionAssembly} from "../ActionAssembly/ActionAssembly";

const getImageByActionName = (actionName) => {
    switch (actionName) {
        case 'V slot': return vSlotImage;
        case 'side slot': return sideSlotImage;
        case 'surface planning': return surfacePlanning;
        case 'through hole': return cylindricalBore;
        case 'no-through hole': return noThroughBore;
        case 'cut pipe': return cutPipe;
        case 'cut bar': return cutRod;
        case 'pocket': return rectangularPocket;
        case 'open pocket': return openPocket;
        case 'external groove': return externalGroove;
        case 'face planning': return facePlanningImage;
        default: return standard;
    }
}

export const ActionSelectContainer = () => {
    const [option, setOption] = useState('ACTIONS');
    const [tools, setTools] = useState([]);
    const [wordFilter, setWordFilter] = useState('');
    const itemState = useItemState();
    const filterState = useFilterState();
    const [action, setAction] = useState('');

    useEffect(() => {
        setAction('');
    },[option])

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

    return <Box className='box'>
        <OptionBar option={option} setOption={setOption}/>
        {
            option!=='ASSEMBLY TOOL' && <SearchForAction setWordFilter={setWordFilter}/>
        }
        {option === 'TOOLS' && <FilterBlock/>}
        {option === 'ASSEMBLY TOOL' && <SetToolContainer/>}
        <Box className='boxForActions'>
            {
                option === 'ACTIONS' && action === '' &&
                appConstants.arrayOfActions
                    .filter((action) => action.includes(wordFilter))
                    .map((action, index) => <ActionBlock
                        actionName={action}
                        image={getImageByActionName(action)}
                        key={index}
                        setAction={setAction}
                    />
                    )
            }
            {
                option === 'ACTIONS' && action !== '' &&
                    <ActionAssembly action={action} />
            }
            {
                option === 'TOOLS' && tools
                    .filter((tool) => tool.name?.includes(wordFilter))
                    .map((tool, index) => <ItemBlock
                    key={index}
                    toolParams={tool}
                />)
            }
        </Box>
    </Box>
}
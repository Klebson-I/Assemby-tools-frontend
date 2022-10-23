import React, {useEffect, useState} from "react";
import {useFilterState, useFilterStateDispatch} from "../../context/FilterContext/FilterContext";
import {Button, Paper} from "@mui/material";
import {addToFilterState} from "../../context/FilterContext/actions";
import ClearIcon from '@mui/icons-material/Clear';
import {styleObject} from "./styles";

export const FilterBlock = () => {
    const filterState = useFilterState();
    const dispatchFilterState = useFilterStateDispatch();
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        setFilters(filterState.toolsFilter);
    },[filterState]);

    const deleteFilter = (filter) => {
        dispatchFilterState(
            addToFilterState({
                toolsFilter: filterState.toolsFilter.filter((tool) => tool !== filter),
            })
        )
    }

    const FilterHeader = <span style={styleObject.filtersHeader}>Filters : </span>

    return <Paper sx={styleObject.filtersContainer}>
        { filters.length > 0 && FilterHeader}
        {
            filters.map((filter, index) => <Button
                key={index}
                sx={styleObject.filterButton}
                variant='contained'
                onClick={() => deleteFilter(filter)}
            >
                {filter.replaceAll('_'," ")}
                <ClearIcon/>
            </Button>)
        }
    </Paper>
}
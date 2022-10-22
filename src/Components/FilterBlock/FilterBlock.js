import React, {useEffect, useState} from "react";
import {useFilterState, useFilterStateDispatch} from "../../context/FilterContext/FilterContext";
import {Button, Paper} from "@mui/material";
import {addToFilterState} from "../../context/FilterContext/actions";

const styleObject = {
    filtersContainer: {
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    filterButton: {
        padding: '3px',
        margin: '5px'
    },
    filtersHeader: {
        fontSize: '22px',
        marginLeft: '3px'
    }
}

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
                {filter} X
            </Button>)
        }
    </Paper>
}
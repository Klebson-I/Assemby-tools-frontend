import React from "react";
import {TextField} from "@mui/material";

const styleObject = {
    search: {
        width: '80%',
        marginLeft: '20px',
        marginTop: '10px',
    },
};

export const SearchForAction = ({setWordFilter, searchText}) => {
    return <TextField
        id="standard-basic"
        label={searchText || "Search"}
        variant="standard"
        sx={styleObject.search}
        onChange = {(e) => setWordFilter(e.target.value)}
    />
}
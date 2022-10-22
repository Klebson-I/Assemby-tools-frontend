import React from "react";
import {TextField} from "@mui/material";

const styleObject = {
    search: {
        width: '80%',
        marginLeft: '20px'
    },
};

export const SearchForAction = () => {
    return <TextField
        id="standard-basic"
        label="Find action"
        variant="standard"
        sx={styleObject.search}
    />
}
import React from "react";
import {appConstants} from "../Utils/constants"
import {ActionBlock} from "../ActionBlock/ActionBlock";
import {Box} from "@mui/material";
import {SearchForAction} from "../SearchForAction/SearchForAction";

// @TODO create search bar for the proper action

const styleObject = {
    box: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent:'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '75%',
        marginTop:'20px'
    },
    boxForActions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        flexWrap: 'wrap',
        width: '100%',
    },
}

export const ActionSelectContainer = () => {
    return <Box sx={styleObject.box}>
        <SearchForAction/>
        <Box sx={styleObject.boxForActions}>
            {
                appConstants.arrayOfActions.map((action, index) =>
                    <ActionBlock actionName={action} key={index}/>
                )
            }
        </Box>
    </Box>
}
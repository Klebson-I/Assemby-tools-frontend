import React from "react";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

const styleObject = {
    toggleButton: {
        color: 'grey',
        minWidth: '33%',
        fontSize: '25px',

    },
    toggleGroup: {
        width: '100%',
    }
}

export const OptionBar = ({option, setOption}) => {

    const handleChange = ( event, newOption ) => {
        if (newOption === option) {
            return;
        }
        setOption(newOption);
    };

    const isDisable = (value) => value === option;

    return <ToggleButtonGroup
        color="secondary"
        value={option}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={styleObject.toggleGroup}
    >
        <ToggleButton value="ACTIONS" sx={styleObject.toggleButton} disabled={isDisable('ACTIONS')}>
            <FontDownloadIcon/>
            ACTIONS
        </ToggleButton>
        <ToggleButton value="TOOLS" sx={styleObject.toggleButton} disabled={isDisable('TOOLS')}>
            <BuildIcon/>
            TOOLS
        </ToggleButton>
        <ToggleButton value="SET TOOL" sx={styleObject.toggleButton} disabled={isDisable('SET TOOL')}>
            <SettingsIcon/>
            SET TOOL
        </ToggleButton>
    </ToggleButtonGroup>
}
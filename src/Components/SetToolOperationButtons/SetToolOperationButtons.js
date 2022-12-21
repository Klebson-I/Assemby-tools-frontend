import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {ACTIONS, arrayOfMillTypes} from "../SetToolContainer/utils";
import './style.css';

const MILL_OPTIONS = {
    DISC_CUTTER_HOLDER: 'DISC_CUTTER_HOLDER',
    END_MILL_HOLDER: 'END_MILL_HOLDER',
    END_MILL_MONO_HOLDER: 'END_MILL_MONO_HOLDER',
};

const getClassByAction = (action) => {
    switch (action) {
        case ACTIONS[2] : return 'buttonDrill base';
        case ACTIONS[1]: return 'buttonLathe base';
        case ACTIONS[0]: return 'buttonMill base';
    }
};

const getClassByMillType = (action) => {
    switch (action) {
        case MILL_OPTIONS.END_MILL_MONO_HOLDER : return 'base monoEndMill';
        case MILL_OPTIONS.END_MILL_HOLDER: return 'base endMill';
        case MILL_OPTIONS.DISC_CUTTER_HOLDER: return 'base discMill';
    }
};

const removeFloorSign = (str) => str.replaceAll('_', ' ');

export const SetToolOperationButtons = ({
        setAction
    }) => {

    const [localAction, setLocalAction] = useState('');
    const [isMillSelect, setIsMillSelect] = useState(false);

    useEffect(() => {
        if (localAction === ACTIONS[0]) {
            return setIsMillSelect(true);
        }
        setAction(localAction);
    },[localAction])

    return <div className='buttonsDiv'>
        {
            isMillSelect
            ? <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    className='buttonGroup'
                >
                    {
                        arrayOfMillTypes.map((action) => <Button
                            key={action}
                            onClick={() => setAction(action)}
                            className={getClassByMillType(action)}
                        >
                            <span className='buttonTextMill'>{removeFloorSign(action)}</span>
                        </Button>)
                    }
                </ButtonGroup>
            : <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    className='buttonGroup'
                >
                    {
                        ACTIONS.map((action) => <Button
                            key={action}
                            onClick={() => setLocalAction(action)}
                            className={getClassByAction(action)}>
                            <span className='buttonText'>{action}</span>
                        </Button>)
                    }
                </ButtonGroup>
        }
    </div>
}
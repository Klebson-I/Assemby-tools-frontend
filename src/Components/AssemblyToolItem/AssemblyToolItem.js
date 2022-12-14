import {Button, Paper, Tooltip} from "@mui/material";
import {ItemBlock} from "../ItemBlock/ItemBlock";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useGlobalPopupDispatchState} from "../../context/GlobalPopupContext/GlobalPopupContext";
import {addToGlobalPopupState} from "../../context/GlobalPopupContext/actions";
import React from "react";
import {handleFetch} from "../../Hooks/useFetch";
import {useInfoPopupDispatchState} from "../../context/InfoContext/InfoContext";
import {addToInfoPopupState} from "../../context/InfoContext/actions";
import {url} from "../../constants";
import fileSaver from 'file-saver';

const styleObject = {
    toolContainer: {
        display: 'flex',
        margin: '50px 10px',
        width: '95%',
        minWidth: '50rem',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    infoContainer: {
        minWidth: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '200px',
    },
    actionButton: {
        width: '90%',
        fontWeight: '700'
    },
    popupDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    popupSecondHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popupButtonsDiv: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '50px',
        width: '90%'
    },
    actionPopupButton: {
        fontSize: '25px',
        width: '30%',
    }
};

const HIDE_PARAM = {
    TRUE: 1,
    FALSE: 0,
};

export const AssemblyToolItem = ({assemblyTool, setRefreshToggle}) => {
    const dispatchGlobalPopupState = useGlobalPopupDispatchState();
    const infoPopupDispatch = useInfoPopupDispatchState();

    const closeWindow = () => dispatchGlobalPopupState(addToGlobalPopupState({
        isOpen: false,
    }))

    const getXML = async (hideParam) => {
        const res = await fetch(`${url}xml/${assemblyTool.id}/${hideParam}`);
        const blob = await res.blob();
        fileSaver.saveAs(blob, 'tool.xml');
        closeWindow();
    };

    const deleteAssemblyTool = () => handleFetch(
            'DELETE',
            {},
            `settool/${assemblyTool.id}`,
            ({msg}) => {
                setRefreshToggle((prev) => !prev);
                closeWindow();
                infoPopupDispatch(addToInfoPopupState({
                    isOpen: true,
                    text: msg,
                    severity: 'success'
                }))
            },
            ({msg}) => {
                infoPopupDispatch(addToInfoPopupState({
                    isOpen: true,
                    text: msg,
                    severity: 'error'
                }))
            },
        );

    const openDeleteDialog = () => {
        dispatchGlobalPopupState(addToGlobalPopupState({
            isOpen: true,
            component: <div style={styleObject.popupDiv}>
                <h2 style={styleObject.popupSecondHeader}>Are you sure you wanna delete tool with {assemblyTool.id} id ?</h2>
                <h3>You will not be able to undo this operation</h3>
                <div style={styleObject.popupButtonsDiv}>
                    <Button
                        variant='outlined'
                        color='primary'
                        sx={styleObject.actionPopupButton}
                        onClick={closeWindow}
                        startIcon={<ArrowBackIcon fontSize='large'/>}
                    >
                        Back
                    </Button>
                    <Button
                        variant='outlined'
                        color='error'
                        sx={styleObject.actionPopupButton}
                        onClick={() => deleteAssemblyTool()}
                        startIcon={<DeleteIcon fontSize='large'/>}
                    >
                        Proceed
                    </Button>
                </div>
            </div>,
            headingText:'Delete panel',
        }))
    };

    const openXMLDialog = () => {
        dispatchGlobalPopupState(addToGlobalPopupState({
            isOpen: true,
            component: <div style={styleObject.popupDiv}>
                <h2 style={styleObject.popupSecondHeader}>Do you want to hide unused tool parameters in XML file?</h2>
                <div style={styleObject.popupButtonsDiv}>
                    <Button
                        variant='outlined'
                        color='primary'
                        sx={styleObject.actionPopupButton}
                        onClick={() => getXML(HIDE_PARAM.TRUE)}
                    >
                        Yes
                    </Button>
                    <Button
                        variant='outlined'
                        color='error'
                        sx={styleObject.actionPopupButton}
                        onClick={() => getXML(HIDE_PARAM.FALSE)}
                    >
                        No
                    </Button>
                </div>
            </div>,
            headingText:'Hide parameters',
        }))
    };

    return <Paper sx={styleObject.toolContainer}>
        <div style={styleObject.infoContainer}>
            <Tooltip title='Tool name'><h2>{assemblyTool.name}</h2></Tooltip>
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<FileDownloadIcon/>}
                    sx={styleObject.actionButton}
                    onClick={openXMLDialog}
                >
                    Get XML
                </Button>
                <Button
                    variant='contained'
                    color='error'
                    startIcon={<DeleteIcon />}
                    sx={styleObject.actionButton}
                    onClick={() => openDeleteDialog()}
                >
                    Delete tool
                </Button>
        </div>
        {
            Object.values(assemblyTool)
                .filter((value) => typeof value !== 'string')
                .map((item) => <ItemBlock toolParams={item} key={item.id}/>)
        }
    </Paper>
};
import {blue} from "@mui/material/colors";

export const styleObject = {
    paper: {
        width: '30%',
        marginTop: '20px',
        minHeight:'200px',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'center',
        transition: 'ease-in 0.1s',
        paddingBottom: '5px',
        margin: '10px',
        position: 'relative',
        cursor: 'pointer',
    },
    paperSelected: {
        width: '30%',
        marginTop: '20px',
        minHeight:'200px',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'center',
        transition: 'ease-in 0.1s',
        paddingBottom: '5px',
        margin: '10px',
        position: 'relative',
        cursor: 'pointer',
        border: '4px solid green',
    },
    image: {
        width: '50%',
        height: 'auto',
    },
    infoButton: {
        position: 'absolute',
        left: '100%',
        top: '10px',
        transform: 'translateX(-110%)',
        color: blue[500],
    },
    checkbox: {
        position: 'absolute',
        left: '10px',
        top: '10px',
    },
    compareDisableIcon: {
        position: 'absolute',
        left: '19px',
        top: '19px',
    },
    paperOptional: {
        width: '30%',
        marginTop: '20px',
        minHeight:'200px',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'center',
        transition: 'ease-in 0.1s',
        paddingBottom: '5px',
        margin: '10px',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: '#c4daf5'
    },
};
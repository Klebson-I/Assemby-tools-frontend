import lathe from '../../images/lathe_machine.png';
import mill from '../../images/milling_machine.png';
import drill from '../../images/drilling_machine.png';

export const styleObject = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonGroup: {
        width: '100%',
        marginTop: '100px'
    },
    buttonMill: {
        width: '33%',
        height: '200px',
        fontSize: '50px',
        transition: 'ease-in-out 0.2s',
        backgroundPosition: 'center',
        '&:hover': {
            height: '300px',
            backgroundImage: `url(${mill})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'flex-end',
            color: 'black',
            fontWeight: '1000',
            backgroundPosition: 'center',
        },

    },
    buttonLathe: {
        width: '33%',
        height: '200px',
        fontSize: '50px',
        transition: 'ease-in-out 0.2s',
        backgroundPosition: 'center',
        '&:hover': {
            height: '300px',
            backgroundImage: `url(${lathe})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'flex-end',
            color: 'black',
            fontWeight: '1000',
            backgroundPosition: 'center',
        },

    },
    buttonDrill: {
        width: '33%',
        height: '200px',
        fontSize: '50px',
        transition: 'ease-in-out 0.2s',
        backgroundPosition: 'center',
        '&:hover': {
            height: '300px',
            backgroundImage: `url(${drill})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'flex-end',
            color: 'black',
            fontWeight: '1000',
            backgroundPosition: 'center',
        },
    },
    buttonsDiv: {
        width: '100%',
    },
    stepper: {
        width: '100%',
        marginTop: '50px',
    },
    toolsSelectContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
}

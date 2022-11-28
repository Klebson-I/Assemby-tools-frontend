export const styleObject = {
    paper: {
        width: '30%',
        marginTop: '20px',
        height:'250px',
        fontSize: '35px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'flex-start',
        transition: 'ease-in 0.1s',
        "&:hover": {
            transform: 'rotateZ(1deg) rotateX(5deg) rotateY(5deg)',
            cursor:'pointer',
        },
        margin: '10px',
    },
    image: {
        width: '100%',
        maxHeight: '200px',
    },
};
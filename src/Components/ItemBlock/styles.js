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
        "&:hover": {
            transform: 'rotateZ(1deg) rotateX(5deg) rotateY(5deg)',
            cursor:'pointer',
        },
        paddingBottom: '5px',
    },
    image: {
        width: '50%',
        height: 'auto',
    }
};
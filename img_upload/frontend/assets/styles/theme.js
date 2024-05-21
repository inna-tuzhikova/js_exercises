import {createMuiTheme} from '@material-ui/core/styles';

const mainTheme = createMuiTheme({
    palette: {
        background: {
            default: '#3D414C'
        },
        primary: {main: '#4c5362'},
        secondary: { main: '#3b8dc1' },
    },
    typography: {
        fontFamily: 'Roboto',
        useNextVariants: true,
    },
});

export default mainTheme;

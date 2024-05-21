import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import mainTheme from '../assets/styles/theme';
import ImageLoader from './ImageLoader';

const App = ({store, history}) =>
	<MuiThemeProvider theme={mainTheme}>
		<CssBaseline />
		<ImageLoader />
	</MuiThemeProvider>;

export default App;

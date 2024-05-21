import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TwoToolbarsBase from './TwoToolbarsBase';
import mainTheme from '../assets/styles/theme';

const App = () =>
<MuiThemeProvider theme={mainTheme}>
  <CssBaseline />
	<TwoToolbarsBase>
		<h1>Hello world!</h1>
	</TwoToolbarsBase>
</MuiThemeProvider>;

export default App;

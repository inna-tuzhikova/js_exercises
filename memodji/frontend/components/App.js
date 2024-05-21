import React from 'react';
import React from 'react'
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import mainTheme from '../assets/styles/theme';
import GamePage from './pages/GamePage';
import LeaderBoardPage from './pages/LeaderBoardPage';



const App = ({store, history}) => <Provider store={store}>
	<MuiThemeProvider theme={mainTheme}>
		<CssBaseline />
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path='/' component={GamePage} />
				<Route path='/lb' component={LeaderBoardPage} />
			</Switch>
		</ConnectedRouter>
	</MuiThemeProvider>
</Provider>;

export default App;

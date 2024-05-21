import React from 'react';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';


import Paper from '@material-ui/core/Paper';
import {goToLanding} from '../../domains/app';
import { tr } from '../../util';


const Page = ({name, isLanding, children}) => <>
	<AppBar position='fixed'>
		<Toolbar>
			{!isLanding &&
				<IconButton edge="start" color="inherit" onClick={goToLanding}>
					<BackIcon />
				</IconButton>
			}
			<Typography component="h1" variant="h6" color="inherit" noWrap>
				{tr(name || '')}
			</Typography>
		</Toolbar>
	</AppBar>
	<Container maxWidth="md" >
		<Paper>
			{/*
				AppBar is fixed to the screen, so it covers top ~50 px of content
				AppBar height is dynamic
				We could either apply theme.mixins.toolbar to the container,
				or just pad the page with one toolbar. Difference is trivial,
				although the latter is reported to work better, so that's what we do.
			*/}

			<Toolbar />
			{children}
		</Paper>
	</Container>
</>;

export default Page;

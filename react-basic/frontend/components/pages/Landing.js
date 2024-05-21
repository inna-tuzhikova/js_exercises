import React from 'react';
import Link from '@material-ui/core/Link';
import { tr } from '../../util';
import {goToTodos} from '../../domains/app.js';
import { AddIcon } from '../../assets/icons';
import Page from './Page';
const LandingPage = () => <Page isLanding={true}>
	<Link onClick={goToTodos}>{tr('TODOS')}</Link>
	<AddIcon/>
</Page>;

export default LandingPage;


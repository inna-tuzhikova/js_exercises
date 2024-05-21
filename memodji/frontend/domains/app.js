import { combineReducers, command } from './../util';
import { connectRouter, push, goBack as goBack_ } from 'connected-react-router';

import modals from './modals';
import todos from './todos';
import game from './game';

// if you go to /somepage via external link, goBack would take you back, this will take you to the main page
// You probably don't need to use goBack
const goToLanding = command(push(''));
const goTo = command(push);
const goToTodos = command(push('todos'));
const goBack = command(goBack_);

const manageApp = (history) => combineReducers({
    router: connectRouter(history),
    modals, todos, game, game
});

export {
    manageApp as default,
    goToLanding, goTo, goBack, goToTodos,
};

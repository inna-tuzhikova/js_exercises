import { combineReducers } from 'redux';
import manageClicks from './clicks';

export default combineReducers ({
  clicks: manageClicks,
});

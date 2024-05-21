import React from 'react';
import { connect } from 'react-redux';
import { addClick, addCounter, resetCounter } from './../domains/clicks';
import { withStyles } from '@material-ui/core/styles';
import AppStyle from './../assets/styles/AppStyle';
import ClickBox from './ClickBox';
import AddBox from './AddBox';
import _ from 'lodash/fp';

const App = ({classes, counters, addCounter, addClick, resetCounter}) => {
  return (
    <div className={classes.root}>
      <AddBox onAdd={() => addCounter()} />
      <div className={classes.countersContainer}>
        {counters.map(c => {
          return (
            <ClickBox
              clicks={c.clicks}
              onClick={() => addClick({id: c.id})}
              onReset={() => resetCounter({id: c.id})}/>
          );
        })}
      </div>
    </div>
  );
}

export default connect(
  state =>{return {counters: state.clicks};},
  {addClick, addCounter, resetCounter}
)(withStyles(AppStyle)(App));

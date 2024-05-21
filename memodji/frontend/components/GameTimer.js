import React from 'react';
import { useStyles } from './../util';
import GameTimerStyle from './../assets/styles/GameTimerStyle';

const GameTimer = ({sec}) => {
  const classes = useStyles(GameTimerStyle);
  const secToMinStr = (sec) => `${Math.floor(sec / 60)}:${('0' + sec%60).slice(-2)}`;

  return (
    <div className={classes.timer}>{secToMinStr(sec)}</div>
  );
};

export default GameTimer;

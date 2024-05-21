import React from 'react';
import { useStyles } from './../../util';
import GamePageStyle from './../../assets/styles/GamePageStyle';
import GameWrapper from './../GameWrapper';

const GamePage = () => {
  const classes = useStyles(GamePageStyle);
  return (
    <>
      <header className={classes.header}>Memodji</header>
      <p>
        <div className={classes.control}>Restart</div>
        <div className={classes.control}>Change level</div>
        <div className={classes.control}>Leader Board</div>
      </p>
      <main>
        <GameWrapper />
      </main>
    </>
  );
};

export default GamePage;

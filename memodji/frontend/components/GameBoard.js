import React from 'react';
import { useLens, useStyles } from './../util';
import { getCards } from './../domains/game';
import GameBoardStyle from './../assets/styles/GameBoardStyle';
import GameCard from './GameCard';

const GameBoard = ({gameover, gameplay, registerClick}) => {
  const classes = useStyles(GameBoardStyle);
  const cards = useLens(getCards);
  return (
    <div className={classes.gameBoard}>
      {cards.map((card, idx) => {
        return <GameCard key={idx} {...card} {...{gameover, registerClick}}/>;
      })}
    </div>
  );
};

export default GameBoard;

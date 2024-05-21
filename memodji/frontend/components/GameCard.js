import React from 'react';
import { useStyles } from './../util';
import GameCardStyle from './../assets/styles/GameCardStyle';
import { click, OPENED, CLOSED, MATCH, MISMATCH } from './../domains/game';
import clsx from 'clsx';

const GameCard = ({id, emodji, state, gameover, registerClick}) => {
  const classes = useStyles(GameCardStyle);
  const handleClick = (e) => {
    registerClick();
    if (! gameover) {
      click({id});
    }
  };
  console.log({state});
  return (
    <div className={classes.card} onClick={handleClick}>
      <div className={clsx(classes.card_flipContainer,
                          ([OPENED, MISMATCH, MATCH].includes(state)) && classes.flipped)}>
        <div className={clsx(classes.card_flipContainer__face,
                             classes.back)}></div>
        <div className={clsx(classes.card_flipContainer__face,
                             classes.front,
                             (state == MATCH) && classes.match,
                             (state == MISMATCH) && classes.mismatch
                           )}>{emodji}</div>
      </div>
    </div>
  );
};

export default GameCard;

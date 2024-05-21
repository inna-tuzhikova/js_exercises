import React, { useState, useEffect } from 'react';
import { useStyles, useLens, _ } from './../util';
import { isVictory,setGameState, getGameState,
         IDLE, GAMEPLAY, GAMEOVER } from './../domains/game';
import { winModal, loseModal } from './../domains/modals';
import GameBoard from './GameBoard';
import GameTimer from './GameTimer';
import WinModal from './modals/results/WinModal';


const GameWrapper = () => {
  const [timeElapsed, setTimeElapsed] = useState();
  const victory = useLens(isVictory);
  const gameState = useLens(getGameState);
  const registerClick = () => gameState == IDLE && setGameState(GAMEPLAY);

  useEffect(() => {
    if (gameState == IDLE) {
      setTimeElapsed(0);
      return;
    }
    if (gameState == GAMEOVER) {
      return;
    }
    if (! victory) {
      setTimeout(() => {
        setTimeElapsed(timeElapsed + 1);
      }, 1000);
    } else {
      console.log('You win');
      setGameState(GAMEOVER);
      WinModal.open();
    }
  });

  return (
    <>
      <GameBoard {...{gamover: gameState == GAMEOVER, registerClick}} />
      <GameTimer sec={timeElapsed} />
      <WinModal />
    </>
  );
};

export default GameWrapper;

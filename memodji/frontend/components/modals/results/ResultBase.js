import React from 'react';
import { initGame, closeAll } from './../../../domains/game';
import { closeModal } from './../../../domains/modals';
import { useStyles } from './../../../util';
import ModalBase from './../ModalBase';
import ResultModalStyle from './../../../assets/styles/ResultModalStyle';
import BouncingLetters from './BouncingLetters';


const ResultModal = ({modalType, modalId, onClick, buttonText, header}) => {
  const classes = useStyles(ResultModalStyle);
  const handleClick = (e) => {
    e.stopPropagation();
    closeModal();
    closeAll();
    setTimeout(() => initGame(), 500);
  };
  return (
    <ModalBase {...{modalType, modalId}}>
      <div className={classes.modal}>
        <header className={classes.modal__header}>
          <BouncingLetters text={header}/>
        </header>
        <p>
          Your rank is #2
        </p>
        <button
          className={classes.modal__btn}
          onClick={handleClick}>{buttonText}</button>
      </div>
    </ModalBase>
  );
};

export default ResultModal;

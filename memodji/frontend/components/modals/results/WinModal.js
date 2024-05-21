import React from 'react';
import { winModal } from './../../../domains/modals';
import ResultBase from './ResultBase';

const WinModal = () => {
  return (
    <ResultBase
      modalType={winModal.modalType}
      modalId='win'
      header='Win'
      buttonText='Play again'/>
  );
};

winModal.assignTo(WinModal);

export default WinModal;

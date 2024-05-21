import React from 'react';
import Modal from '@material-ui/core/Modal';
import { isOpen as isOpen_} from './../../domains/modals';
import { useLens } from './../../util';

const ModalBase = ({children, modalType, modalId, onClose}) => {
  const isOpen = useLens(isOpen_);
  const close  = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <Modal
      open={isOpen(modalType, modalId)}
      onClose={close}>
        {children}
    </Modal>);
};

export default ModalBase;

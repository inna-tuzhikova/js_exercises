import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { _, applyLenses, tr } from './../../util';
import {isOpen, closeModal} from './../../domains/modals';


const ModalRaw = ({isOpen, closeModal, type, modalId, title, children, onSubmit, submitDisabled, onClose}) => {
    const submitText = tr('SAVE');
    const cancelText = tr('CANCEL');
    const submitButtonProps = {
        disabled: submitDisabled,
        onClick: () => {
            onSubmit();
            closeModal();
        }
    };
    const triggerSubmit = () => {
        onSubmit();
        closeModal();
    };
    const close = () => {
        onClose();
        closeModal();
    };
        return (
          <Dialog onClose={close} open={isOpen(type, modalId)} >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
              <Button {...submitButtonProps}>
                {submitText}
              </Button>
              <Button color="secondary" onClick={closeModal}>
                {cancelText}
             </Button>
           </DialogActions>
         </Dialog>
     );
};

const Modal = connect(applyLenses({isOpen}), {closeModal})(ModalRaw);
export {Modal as default, ModalRaw};

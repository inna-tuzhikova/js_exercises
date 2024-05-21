import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLens, tr, translateSchema } from './../../util';
import {isOpen as isOpen_, closeModal} from './../../domains/modals';
import StableForm from './schemaCustoms/StableForm';

// Note that if initialData has fields not described in schema, they will be left as is
// So if you use a modal to update an object, it's id will be preserved
// This means you can put update* commands into onData
const SchemaFormModal = ({modalId, modalType, schema, initialData, onData, submitText='SAVE', ...params}) => {
    console.log('From sfm', {modalId, modalType, params});

    const isOpen = useLens(isOpen_);
    const [data, setData] = useState();
    const [readyToSubmit, setReady] = useState(false);
    submitText = tr(submitText);
    const cancelText = tr('CANCEL');
    const close = () => {
        closeModal();
        setData(); // reset the state
        setReady(false);
    };
    const submitButtonProps = {
        disabled: !readyToSubmit,
        onClick: () => {
            onData(data);
            close();
        }
    };
        return (
          <Dialog
            onClose={close}
            onClick={(e) => e.stopPropagation()}
            open={isOpen(modalType, modalId)} >
            <DialogTitle style={{width:'40em'}}>
                {schema.title}
            </DialogTitle>
            <DialogContent>
            <StableForm
                initialData={initialData}
                schema={translateSchema(schema)}
                onValid={(data) => {
                    setData(data);
                    setReady(true);
                }}
                onError={(errors) => null}
                onChange={() => {
                    setReady(false);
                }}
                {...params}/>
            </DialogContent>
            <DialogActions>
              <Button {...submitButtonProps}>
                {submitText}
              </Button>
              <Button color="primary" onClick={closeModal}>
                {cancelText}
             </Button>
           </DialogActions>
         </Dialog>
     );
};

export {SchemaFormModal as default};

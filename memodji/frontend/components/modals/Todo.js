import React from 'react';

import { translateSchema } from './../../util';
import SchemaFormModal from './SchemaFormModal';

import { todoModal } from './../../domains/modals';

const makeParams = ({isUpdate, todo, onData}) => ({
    onData,
    modalType: todoModal.modalType,
    modalId: todoModal.idExtractor(todo),
    schema: translateSchema({
        '$schema': 'http://json-schema.org/schema#',
        title: isUpdate ? 'UPDATE TODO' : 'ADD TODO',
        type: 'object',
        required: ['text'],
        properties: {
            text: {type: 'string', title: 'WHAT DO'}
        }
    }),
    initialData: todo, // undefined is fine too
});

const TodoModal = (props) => <SchemaFormModal {...makeParams(props)}/>;
// This is purely for convenience
// User would need to import this component to render the modal
// We would also need a command to open this modal
// So we add the command, among other things, to the component
todoModal.assignTo(TodoModal);

export {TodoModal as default};

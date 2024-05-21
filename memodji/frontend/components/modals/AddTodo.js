import React from 'react';
import { connect } from 'react-redux';

import { _, translateSchema, useAction } from './../../util';
import SchemaFormModal from './SchemaFormModal';

import {todoModal} from './../../domains/modals';
import {addTodo} from '../../domains/todos.js';

const params = {
    modalType: todoModal.modalType,
    modalId: todoModal.idExtractor(),
    schema: translateSchema({
        '$schema': 'http://json-schema.org/schema#',
        title: 'ADD TODO',
        type: 'object',
        required: ['text'],
        properties: {
            text: {type: 'string', title: 'WHAT DO'}
        }
    })
};

const AddTodoModal = () => {
    return <SchemaFormModal {...params} onData={addTodo}/>;
};

export {AddTodoModal as default};

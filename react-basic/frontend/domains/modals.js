import { lens, command, _ } from './../util';
import { LOCATION_CHANGE } from 'connected-react-router';

// User can use arbitrary number of params to describe the modal
// Let's keep them all
const openModal = command('OPEN_MODAL', (...params) => params);
// SyntheticEvents don't like being kept around because they're pooled
// We explicitly drop command args so you can put closeModal into onClick
const closeModal = command('CLOSE_MODAL', null);

const manageModals = (modalsStack=[], action) => {
    if (action.error) return modalsStack;
    if (closeModal.type == action.type) return _.initial(modalsStack);
    if (openModal.type == action.type) return [...modalsStack, action.payload];
    if (LOCATION_CHANGE == action.type && 'PUSH' == action.payload.action) return []; // reset modals on explicit navigation, but not on history navigation
    return modalsStack;
};

const getCurrentModal = lens(manageModals, _.last);
const arraysEqual = (arr1, arr2) => _.isArray(arr1) && _.isArray(arr2) && arr1.length == arr2.length && _.every(([a,b]) => a == b, _.zip(arr1, arr2));
const isOpen = lens(manageModals, (modals) => (...params) => _.any((modal) => arraysEqual(params, modal))(modals));
const isOpen_ = isOpen;

const idExtractor_ = (stuff) => _.isObject(stuff) ? stuff.id : stuff;
const modal = (modalType, idExtractor = idExtractor_) => {
    const open = openModal.decorated((next) => (...params) => next(modalType, idExtractor(...params)));
    const isOpen = isOpen_.then((isOpen) => (...params) => isOpen([modalType, idExtractor(...params)]));
    const modalNamespace = {modalType, isOpen, open, close: closeModal, idExtractor};
    const assignTo = (target) => Object.assign(target, modalNamespace);
    return {...modalNamespace, assignTo};
};

const todoModal = modal('todo');

export {
    manageModals as default,
    openModal, closeModal, // You probably don't need to use those directly, use per-modal namespaces
    getCurrentModal, isOpen, // You probably don't need to use those directly, use per-modal namespaces
    modal, // It's probably better to declare all modals in this file, so don't use this either
    // Per-modal namespaces:
    todoModal,
};

import _ from 'lodash/fp';
import uuid from 'uuid/v4';
import { lens } from './lens';
import { command } from './command';

const defaultOptions = {
    initialState : [],
    keyFunc : _.prop('id'),
    generateIds : uuid,
    extraGetters : {},
    extraUpdaters: {},
    upsert: true
};
const simpleCrud = (entityType, options={}) => {
    options = {...defaultOptions, ...options};
    const ENTITY_TYPE = _.snakeCase(entityType).toUpperCase();
    const EntityType = _.upperFirst(entityType);
    const commands = {
        [`load${EntityType}s`]: command('LOAD_' + ENTITY_TYPE),
        [`add${EntityType}`]: command('ADD_' + ENTITY_TYPE),
        [`update${EntityType}`]: command('UPDATE_' + ENTITY_TYPE, (update, oldValue=null) => ({update, oldValue})),
        [`delete${EntityType}`]: command('DELETE_' + ENTITY_TYPE),
    };
    // updaters produce updates compatible with Object.assign
    // If you need to change the id, decorate update* command directly
    // You rarely do though
    const wrapUpdater = (updater) => (...args) => ({update:updater(...args)});
    const extraUpdaters = _.flow(
        _.toPairs,
        _.map(([name, updater]) => [name, command('UPDATE_' + ENTITY_TYPE, wrapUpdater(updater))]),
        _.fromPairs
    )(options.extraUpdaters);

    const eventTypes = new Set(_.values(commands).map(_.prop('type')));

    const makeNewElement = (element) => options.generateIds ? {...element, id:options.generateIds(element)} : element;

    const removeElement = (elementToRemove) => (elements) => {
        const idToRemove = options.keyFunc(elementToRemove);
        const afterRemoval = elements.filter(elem => options.keyFunc(elem) != idToRemove);
        if (elements.length == afterRemoval.length) return elements;
        return afterRemoval;
    };

    const updateElement = ({update, oldValue=null}) => (elements) => {
        const idToUpdate = options.keyFunc(oldValue || update); // if we expect the computed id to change we'll provide the old value
        let updated = false;
        const updatedElems = elements.map((elem) => {
            if (idToUpdate != options.keyFunc(elem)) return elem;
            updated = true;
            return _.assign(elem, update);
        });
        if (updated) return updatedElems;
        if (options.upsert) return [...elements, update];
        return elements;
    };

    const manage = (state=options.initialState, action) => {
        if (!eventTypes.has(action.type)) return state;
        if (action.error) return state;
        switch (action.type[0]) {
            case 'L': return action.payload;
            case 'A': return [...state, makeNewElement(action.payload)];
            case 'U': return updateElement(action.payload)(state);
            case 'D': return removeElement(action.payload)(state);
            default: break;
        }
        return state;
    };

    const getById = (state) => (query) => {
        const idToGet = options.keyFunc(query);
        const fits = state.filter((elem) => options.keyFunc(elem) == idToGet);
        if (fits.length) return fits[0];
        return null;
    };
    const getters = {[`get${EntityType}`]: getById, ...options.extraLenses};
    const lenses = _.mapValues((getter) => lens(manage, getter))(getters);
    return {[`manage${EntityType}s`]:manage, ...commands, ...extraUpdaters, ...lenses};
};

export {
    simpleCrud,
};

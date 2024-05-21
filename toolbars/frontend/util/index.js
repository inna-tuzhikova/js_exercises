// For convenience, this file makes accessible all the useful stuff
import _ from 'lodash/fp';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { lens, combineLenses, useLens, combineReducers } from './lens';
import { command, setDispatch } from './command';
import { simpleCrud } from './simpleCrud';

const logcalls = (name) => (fun) => (...args) => {
    console.log(`${name} is called with: `, ...args); // eslint-disable-line no-console
    return fun(...args);
};

const translations = {
    'TODOS': 'Заметки',
    'UPDATE TODO': 'Изменить заметку',
    'ADD TODO': 'Добавить заметку',
    'WHAT DO': 'Текст заметки',
    'SAVE': 'Сохранить',
    'CANCEL': 'Отменить',
};

// TODO: this is a stub, replace with whatever translating package you use
const tr = (text) => translations[text] != undefined ? translations[text] : text;

const translateSchema = (schema) => {
    for (let [key, value] of Object.entries(schema)) {
        if (key == 'title') {
            schema[key] = tr(value);
        }
        if (key == 'enumNames') {
            schema[key] = schema[key].map((x) => tr(x));
        }
        if (typeof schema[key] == 'object' && schema[key]!= null) {
            schema[key] = translateSchema(schema[key]);
        }
    }
    return schema;
};

// TODO: recursive descent for multilevel schemas
const getSchemaDefaults = (schema) => {
    const props = schema.properties;
    if (! props) {
        return null;
    }
    return _.mapValues((spec) => spec.default || (spec.enum ? spec.enum[0] : null))(props);
};

const useStyles = (styles) => makeStyles(styles)(useTheme());

export {
    lens, combineLenses, useLens, combineReducers,

    command, setDispatch,

    tr,
    translateSchema,

    _,
    logcalls,
    clsx,
    useStyles,
    simpleCrud,
    getSchemaDefaults,
};

import _ from 'lodash/fp';
import { combineReducers as reduxCombineReducers } from 'redux';
import { useSelector } from 'react-redux';

const addPath = (current, prefix, init) => {
    if (current) return `${prefix}.${current}`;
    if (init) return addPath(init, prefix);
    return prefix;
};

/*
 * Makes a selector that encapsulates getting some data
 * Lens is basically a getter and a setter glued together
 * We don't need the setter functionality in redux though
 *
 * They are supposed to be the only way to access domain data,
 * thus describing the getter-part of domain interface.
 *
 * Each lens is scoped to some reducer (first argument)
 * It also has some data-retrieving logic (second argument)
 *
 * By default it just returns the whole piece of store that
 * belongs to this reducer. For complex reducers this is
 * discouraged though, because it lets components couple with
 * store shape.
 *
 * Lenses can be extended via .then (works similar to 
 * promises, but synchronously) and combined with combineLenses
 *
 * Examples (note that getPlayer returns a closure):
 *
 * store = {
 *     scores: {'2cd5a3f26':17, '3bf8dc5a3':67}},
 *     players: [
 *         {id: '2cd5a3f26', name: 'Alex'},
 *         {id: '3bf8dc5a3', name: 'Bob'},
 *     ]
 * }
 *
 * const getTopPlayerId = lens(manageScores, (scores) => keyOfMaxValue(scores));
 * const getPlayer = lens(managePlayers, (players) => (lookupId) => _.find(({id}) => id == lookupId));
 *
 * const getPlayerName = getPlayer.then(_.prop('name'));
 *
 * const getTopPlayer = combineLenses({id: getTopPlayerId, getPlayer})
 *     .then(({id, getPlayer}) => getPlayer(id));
 *
 * > useLens(getTopPlayerId);
 * '3bf8dc5a3'
 *
 * > const getPlayerById = useLens(getPlayer);
 * > getPlayerById('2cd5a3f26');
 * {id: '2cd5a3f26', name: 'Alex'}
 *
 * > useLens(getPlayerName)('3bf8dc5a3');
 * 'Bob'
 *
 * > const leader = useLens(getTopPlayer);
 * {id: '3bf8dc5a3', name: 'Bob'}
 *
 */
const mklens = (reducer, getter = _.identity, initPath=false) => {
    if (_.isString(getter)) getter = _.prop(getter);

    const lens = (state) => {
        const scope = lens.path ? _.prop(lens.path)(state) : state;
        return getter(scope);
    };
    if (!reducer.attachedLenses) reducer.attachedLenses = [];
    reducer.attachedLenses.push(lens);
    Object.assign(lens, {
        getter,
        prependPath(newPath) {this.path = addPath(this.path, newPath, initPath);},
        then(fun) {
            return mklens(reducer, (state) => fun(getter(state)), this.path);
        }
    });
    return lens;
};

const combineLenses = (lensObj, composer=_.identity) => (state) => {
    const values = _.mapValues((lens) => lens(state))(lensObj);
    return composer(values);
};

// This keeps track of store shape for our lenses
const combineReducers = (obj) => {
    const result = reduxCombineReducers(obj);
    _.toPairs(obj).forEach(([domain, reducer]) => {
        if (!reducer.attachedLenses) return;
        if (!result.attachedLenses) result.attachedLenses = [];
        reducer.attachedLenses.forEach((lens) => lens.prependPath(domain));
        result.attachedLenses = [...result.attachedLenses, ...reducer.attachedLenses];
    });
    return result;
};


const useLens = (lens) => useSelector(lens);

export {
    mklens as lens,
    combineLenses,
    useLens,
    combineReducers,
};

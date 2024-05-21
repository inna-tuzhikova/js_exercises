import _ from 'lodash/fp';

// We're not going async, so no Promises here.
const maybe = (fun, ...params) => {
    let result, error;
    try { result = fun(...params); }
    catch(actualError) { error = actualError; }
    return {then: (onSuccess, onFailure) => error ? maybe(onFailure,error) : maybe(onSuccess, result) };
};

// TODO: technically we could just invoke it on first command, so the store
// is grabbed automatically
let reduxStoreDispatch;
const setDispatch = (dispatch) => reduxStoreDispatch = dispatch;

/*
 * Makes a function that creates Flux standard actions and dispatches them to redux
 * see https://github.com/redux-utilities/flux-standard-action for full spec
 *
 * First param is action type
 *
 * Second param is a payload-generating function. Will be called with args you
 * give to the command. By default sets the payload equal to the first argument,
 * ignoring the rest.
 * If you supply non-function value as a second param, command args will be ignored
 * and this value would be used as payload.
 *
 *
 * Example usage:
 *
 * const hello = makeCommand('HELLO', (name) => ({name, timestamp: Date.now()}));
 * const debugHello = hello.withMeta('called from util.js');
 * const helloBrendan = hello.decorated((next) => () => next('Brendan'));
 * const helloYesterday = hello.decorated((next) => (...args) => patchTimestamp(next(...args)));
 *
 * > hello('Alex')
 * (redux dispatch): {type:'HELLO', payload:{name:'Alex', timestamp:1570086400000}}
 *
 * > hello('Alex', 1234)
 * (redux dispatch): {type:'HELLO', payload:{name:'Alex', timestamp:1570086400000}}
 *
 * > debugHello('Alex')
 * (redux dispatch): {type:'HELLO', meta: 'called from util.js', payload:{name:'Alex', timestamp:1570086400000}}
 *
 * > helloBrendan()
 * (redux dispatch): {type:'HELLO', payload:{name:'Brendan', timestamp:1570086400000}}
 *
 * > helloBrendan('Alex')
 * (redux dispatch): {type:'HELLO', payload:{name:'Brendan', timestamp:1570086400000}}
 *
 * > helloYesterday('Alex')
 * (redux dispatch): {type:'HELLO', payload:{name:'Alex', timestamp:1570000000000}}
 *
 * > hello.error('Nobody to greet')
 * (redux dispatch): {type:'HELLO', eror:true, payload:'Nobody to greet'}
 */

const makeCommand = (type, payloadFunc = _.identity) => {
    if (!_.isFunction(payloadFunc)) {
        const staticPayload = payloadFunc;
        payloadFunc = () => staticPayload;
    }
    // see https://github.com/redux-utilities/flux-standard-action for full spec
    const makeCommandGeneric = (meta) => {
        const errorToAction = (error) => ({type, error:true, payload:error});
        const payloadToAction = (payload) =>  meta ? ({type, payload, meta}) : ({type, payload});
        const dispatchAction = (...params) => maybe(payloadFunc, ...params)
            .then(payloadToAction, errorToAction)
            .then(reduxStoreDispatch);
        dispatchAction.withMeta = makeCommandGeneric;  // addElementsFancy = addElements.withMeta('some note to myself')
        dispatchAction.error = (error) => dispatchAction(errorToAction(error)); // addElements.error('Not authorised')
        dispatchAction.type = type;
        dispatchAction.decorated = (decorator) => makeCommand(type, decorator(payloadFunc));
        return dispatchAction;
    };
    return makeCommandGeneric();
};
makeCommand.fromActionCreator = (ac) => (...params) => reduxStoreDispatch(ac(...params));
makeCommand.of = (action) => makeCommand.fromActionCreator(() => action);


const argsDispatch = (clauses, default_ = () => undefined) => (...args) => {
    for (const [predicate, fun] of clauses) {
        if (predicate(...args)) return fun(...args);
    }
    return default_(...args);
};

const command = argsDispatch([ // _.is* functions only look at the first argument, others are ignored
    [_.isString, makeCommand], // Primary use. Sets .type and adds fancy methods
    [_.isFunction, makeCommand.fromActionCreator], // For compatibility with external action creators
    [_.isPlainObject, makeCommand.of] // For compatibility only
]);

export {
    setDispatch,
    command,
};

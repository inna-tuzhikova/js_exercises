import _ from 'lodash/fp';

const action = (type) => (payload) => ({
  type, payload
});

const addClick = action('ADD_CLICK');
const addCounter = action('ADD_COUNTER');
const resetCounter = action('RESET_COUNTER');

const initialState = [{id: 0, clicks: 0}];

const manageClicks = (state=initialState, action) => {
  let id;
  switch (action.type) {
    case 'ADD_CLICK':
      id = action.payload.id;
      return state.map(counter => {
        if (counter.id == id) {
          return {...counter, clicks: counter.clicks + 1};
        } else {
          return counter;
        }
      });
     case 'ADD_COUNTER':
       const newId = _.max(state.map(counter => counter.id)) + 1;
       return [...state, {'id': newId, clicks: 0}];
     case 'RESET_COUNTER':
       id = action.payload.id;
       return state.map(counter => {
         if (counter.id == id) {
           return {...counter, clicks: 0};
         } else {
           return counter;
         }
       });
    default:
      return state;
  }
};

export {manageClicks as  default, addClick, addCounter, resetCounter};

import randomZoo from './zoo';
import { command, lens, _, combineReducers } from './../util';
import uuid from 'uuid/v4';

const OPENED = 0;
const CLOSED = 1;
const MATCH = 2;
const MISMATCH = 3;

const initGame = command('INIT_GAME');
const setMode = command('SET_MODE');
const click = command('CLICK_CARD');
const closeAll = command('CLOSE_ALL');
const sampleCards = (n) => {
  if (n % 2 == 1) {
    throw new Error('Number of cards should be even');
  }
  return randomZoo(n).map(emodji => ({emodji, state: CLOSED, id: uuid()}));
};
const initialState = {
  mode: [3, 4],
  cards: sampleCards(12),
};

const manageGameBoard = (state=initialState, action) => {
  if (action.error) {
    return state;
  }
  const payload = action.payload;
  switch (action.type) {
    case initGame.type: {
      try {
        return {...state,
                cards: sampleCards(state.mode.reduce((x, y) => x*y, 1))};
      } catch {
        return state;
      }
    }
    case setMode.type: {
      if (_.isArray(payload) && payload.length == 2
            && _.overEvery(_.isInteger)(payload)) {
        const n = payload[0]*payload[1];
        if (n % 2 == 0) {
          return {...state, cards: sampleCards(n), mode: payload};
        }
      }
      break;
    }
    case click.type: {
      if (! payload || ! payload.id) {
        return state;
      }
      const newCards = state.cards.slice(0);
      const clicked = newCards.filter(card => card.id == payload.id)[0];
      if (! clicked) {
        return state;
      }
      const opened = newCards.filter(({state}) => state == OPENED);
      const match = newCards.filter(({state}) => state == MATCH);
      const mis = newCards.filter(({state}) => state == MISMATCH);

      switch (clicked.state) {
        case CLOSED:
          if (opened.length == 0) {
            clicked.state = OPENED;
            mis.forEach(card => {card.state = CLOSED;});
          } else if (opened.length == 1) {
            if (clicked.emodji == opened[0].emodji) {
              opened[0].state = MATCH;
              clicked.state = MATCH;
            } else {
              opened[0].state = MISMATCH;
              clicked.state = MISMATCH;
            }
          } else {
            opened.forEach(card => {card.state = CLOSED;});
            clicked.state = OPENED;
          }
          return {...state, cards: newCards};
        case OPENED:
        case MISMATCH:
        case MATCH:
        default:
          return state;
      }
    }
    case closeAll.type:
      return {
        ...state,
        cards: state.cards.map(card => ({...card, state: CLOSED}))
      };
    default:
      break;
  }
  return state;
};

const getCards = lens(manageGameBoard, 'cards');
const isVictory = getCards.then(cards => {
  const res = _.all(card => card.state == MATCH)(cards);
  console.log({res, cards});
  return res;
  });


const IDLE = 0;
const GAMEPLAY = 1;
const GAMEOVER = 2;

const setGameState = command('SET_GAME_STATE');

const manageGameState = (state=IDLE, action) => {
  if (action.error) {
    return state;
  }
  switch (action.type) {
    case setGameState.type:
      if ([IDLE, GAMEPLAY, GAMEOVER].includes(action.payload)) {
        return action.payload;
      }
    case initGame.type:
    case setMode.type:
      return IDLE;
    default:
      break;
  }
  return state;
};

const getGameState = lens(manageGameState);

const manageGame = combineReducers({
  state: manageGameState,
  board: manageGameBoard,
});

export {manageGame as default,
        initGame, setMode, click, closeAll,
        getCards, isVictory,
        setGameState, getGameState,
        OPENED, CLOSED, MATCH, MISMATCH,
        IDLE, GAMEPLAY, GAMEOVER};

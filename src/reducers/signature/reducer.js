import {SWITCH, REMOVE} from './actions';

const initialState = {
  signature: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH: {
      // const {signature} = action.payload;
      // return {signature};
      // action.payload is an plain object
      return action.payload;
    }
    default:
      return state;
  }
};

export {reducer};

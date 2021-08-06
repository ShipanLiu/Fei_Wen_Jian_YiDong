import * as actions from '../actions/actions';

export const initialState = [];

export const imageReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};

import * as actions from '../actions/actions';

export const initialState = ['jiba1', 'jiba2'];

export const extraImageReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD:
      return [...state, action.payload];
    case actions.MODIFY:
      return state.map(imgObj => {
        if (imgObj.id === action.payload.id) {
          return action.payload;
        } else {
          return imgObj;
        }
      });
    case actions.TEST:
      return state;
    case actions.REMOVE:
      return [];
    default:
      return state;
  }
};

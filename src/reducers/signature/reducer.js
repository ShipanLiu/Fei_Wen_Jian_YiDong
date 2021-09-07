import {REMOVESIGNATURE, SWITCHSIGNATURE} from './actions';

const initialState = {
  signature: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCHSIGNATURE: {
      // action.payload is an plain object
      return action.payload;
    }
    default:
      return state;
  }
};

export {reducer};

/*

  import {UPDATE} from './actions'
const initialState = {
  avatarSrc:
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
  userName: 'unknown',
  email: 'unknown@unknown.com',
  phone: '00000000'
};
*/

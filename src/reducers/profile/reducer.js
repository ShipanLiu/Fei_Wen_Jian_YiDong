import {UPDATEPROFILE} from './actions';
const initialState = {
  avatarSrc:
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
  userName: 'unknown',
  email: 'unknown@unknown.com',
  phone: '00000000',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATEPROFILE: {
      return action.payload;
    }
    default:
      return state;
  }
};

export {reducer};

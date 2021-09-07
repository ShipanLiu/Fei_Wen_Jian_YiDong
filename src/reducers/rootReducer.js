import {combineReducers} from 'redux';
import {reducer as signatureReducer} from './signature/reducer';
import {reducer as profileReducer} from './profile/reducer';

const rootReducer = combineReducers({
  signatureReducer,
  profileReducer,
});

export default rootReducer;

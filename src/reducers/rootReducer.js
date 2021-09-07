import {combineReducers} from 'redux';
import {reducer as signatureReducer} from './signature/reducer';

const rootReducer = combineReducers({
  signatureReducer,
});

export default rootReducer;

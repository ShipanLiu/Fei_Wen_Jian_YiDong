import {combineReducers} from 'redux';
import {reducer as signatureReducer} from './signature/reducer';
import {reducer as profileReducer} from './profile/reducer';
import {reducer as totalDocsReducer} from './totalDocs/reducer';

const rootReducer = combineReducers({
  signatureReducer,
  profileReducer,
  totalDocsReducer,
});

export default rootReducer;

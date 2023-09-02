import { combineReducers } from 'redux';
import { tokenReducer } from './token/tokenReducer';
export const rootReducers = combineReducers({
  token: tokenReducer,
});

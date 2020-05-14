import { combineReducers } from 'redux';
import photos from './photos';
import user from './user';

export default combineReducers({
  photos,
  user
});
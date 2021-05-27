import { combineReducers } from 'redux';
import user from './user';


const applicationReducers = {
  user
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
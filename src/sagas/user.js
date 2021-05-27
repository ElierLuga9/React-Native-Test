import {
  put, call, takeLatest
} from 'redux-saga/effects';
import Types from '../actions';
import api from '../api';
import Messages from '../messages'

const {
  getUsers
} = api;

//////////////////////////////////////////////
/////////// Get all users from API ///////////
//////////////////////////////////////////////
function* GetUsers(action) {
  yield put({ type: Types.GET_USERS_REQUEST });
  try {
    const users = yield call(getUsers);
    yield put({ type: Types.GET_USERS_SUCCESS, payload: users });
  } catch (error) {
    yield put({ type: Types.GET_USERS_FAILURE, error: Messages.NetWorkError });
  }
}

export default [
  takeLatest(Types.GET_USERS, GetUsers)
];

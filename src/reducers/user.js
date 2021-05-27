import { createReducer } from 'reduxsauce';
import Types from '../actions';
import { Status } from '../constants';

export const initialState = {
  users: [],
  getUsersStatus: Status.NONE
};

/////////////////////////////////////////////////////
/////////////////////// Login ///////////////////////
/////////////////////////////////////////////////////
const getUsersRequest = (state) => ({
  ...state,
  getUsersStatus: Status.REQUEST,
});

const getUsersSuccess = (state, action) => ({
  ...state,
  users: action.payload,
  getUsersStatus: Status.SUCCESS,
});

const getUsersFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  getUsersStatus: Status.FAILURE,
});


const actionHandlers = {
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
};

export default createReducer(initialState, actionHandlers);

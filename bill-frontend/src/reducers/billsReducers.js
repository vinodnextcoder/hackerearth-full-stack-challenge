import {

  BILLS_LIST_REQUEST,
  BILLS_LIST_SUCCESS,
  BILLS_LIST_FAIL,
  BILLS_CREATE_FAIL,
  BILLS_CREATE_REQUEST,
  BILLS_CREATE_SUCCESS,
  BILLS_DELETE_FAIL,
  BILLS_DELETE_REQUEST,
  BILLS_DELETE_SUCCESS,
  BILLS_UPDATE_FAIL,
  BILLS_UPDATE_REQUEST,
  BILLS_UPDATE_SUCCESS,
} from "../constants/notesConstants";

export const noteListReducer = (state = { bills: [] }, action) => {
  switch (action.type) {
    case BILLS_LIST_REQUEST:
      return { loading: true };
    case BILLS_LIST_SUCCESS:
      return { loading: false, bills: action.payload };
    case BILLS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const billCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BILLS_CREATE_REQUEST:
      return { loading: true };
    case BILLS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BILLS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BILLS_DELETE_REQUEST:
      return { loading: true };
    case BILLS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BILLS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const billUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BILLS_UPDATE_REQUEST:
      return { loading: true };
    case BILLS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BILLS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

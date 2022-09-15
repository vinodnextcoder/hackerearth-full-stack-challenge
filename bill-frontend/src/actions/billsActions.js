import {
  BILLS_CREATE_FAIL,
  BILLS_CREATE_REQUEST,
  BILLS_CREATE_SUCCESS,
  BILLS_DELETE_FAIL,
  BILLS_DELETE_REQUEST,
  BILLS_DELETE_SUCCESS,
  BILLS_LIST_FAIL,
  BILLS_LIST_REQUEST,
  BILLS_LIST_SUCCESS,
  BILLS_UPDATE_FAIL,
  BILLS_UPDATE_REQUEST,
  BILLS_UPDATE_SUCCESS,
} from "../constants/notesConstants";
import axios from "axios";

  

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BILLS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.accessToken}`,
      },
    };

    const { data } = await axios.get(`/api/v1/bill/list`, config);
  
    dispatch({
      type: BILLS_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BILLS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction = (unitConsume, billStatus) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BILLS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.accessToken}`,
      },
    };
  

    const { data } = await axios.post(
      `/api/v1/bill/createBill`,
      { unitConsume, billStatus },
      config
    );

  
    dispatch({
      type: BILLS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BILLS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BILLS_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo },
    } = getState();
   
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.accessToken}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/bill/delete/${id}`, config);
  
    dispatch({
      type: BILLS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BILLS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateNoteAction = (id,  amount, billStatus, unitConsume) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BILLS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.data.accessToken}`,
      },
    };

    const { data } = await axios.put(
      `/api/v1/bill/update/${id}`,
      { amount, billStatus, unitConsume },
      config
    );

    dispatch({
      type: BILLS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BILLS_UPDATE_FAIL,
      payload: message,
    });
  }
};

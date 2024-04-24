// actions.js
import axios from 'axios';

const CINEMAWS_USERS_URL = 'http://localhost:3001/users'

export const fetchData = async (dispatch) => {
  try {
    const response = await axios.get(CINEMAWS_USERS_URL)
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data })
  } catch (error) {
    dispatch({ type: 'FETCH_DATA_ERROR', error })
  }
}


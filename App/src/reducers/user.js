import { GETDETAILS, SETDETAILS } from '../types/index';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETDETAILS:
      return {
        ...state,
        user: 'aplpha',
      };

    case SETDETAILS:
      return {
        ...state,
        user: action.value,
      };

    default:
      return state;
  }
}

import { GETDETAILS, SETDETAILS } from '../types/index';

export const getDetails = () => (
  {
    type: GETDETAILS
  }
)

export const setDetails = (value) => (
  {
    type: SETDETAILS,
    value: value
  }
)


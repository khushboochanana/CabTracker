import { GETDETAILS, SETDETAILS } from '../types/index';

export const getDetails = () => (
  {
    type: GETDETAILS
  }
)

export const setDetails = (value) => {
  return {
    type: SETDETAILS,
    value: value
  }
}


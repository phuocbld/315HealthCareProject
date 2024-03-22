import * as typeAction  from '../constants/constants'

export const getAllSelectClinicAction = () => ({
    type: typeAction.GET_ALL_SELECT_CLINIC,
  });

  export const getQuanAction = (payload) => ({
    type: typeAction.GET_QUAN_API,
    payload
  });

  export const getXaAction = (payload) => ({
    type: typeAction.GET_XA_API,
    payload
  });
  

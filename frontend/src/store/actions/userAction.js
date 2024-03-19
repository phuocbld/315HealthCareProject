import * as typeAction  from '../constants/constants'

export const loginUser = (payload,navigate) =>({
    type: typeAction.GET_LOGIN_API,
    payload,
    navigate
})
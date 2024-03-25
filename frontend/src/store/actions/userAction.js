import * as typeAction  from '../constants/constants'

export const loginUser = (payload,navigate) =>({
    type: typeAction.GET_LOGIN_API,
    payload,
    navigate
})

export const logoutUser = (navigate) =>({
    type: typeAction.LOGOUT_USER,
    navigate
})
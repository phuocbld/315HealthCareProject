import * as typeAction  from '../constants/constants'

export const loginUser = (payload,navigate) =>({
    type: typeAction.LOGIN_USER,
    payload,
    navigate
})
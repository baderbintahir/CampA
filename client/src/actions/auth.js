import { AUTH, LOGOUT } from '../constants/actionTypes.js'
import * as api from '../api'

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.login(formData)

        dispatch({ type: AUTH, data })

        router.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const logout = (router) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })

        router.push('/login')
    } catch (error) {
        console.log(error)
    }
}
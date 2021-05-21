import { AUTH } from '../constants/actionTypes.js'
import * as api from '../api'

export const login = (formData) => async (dispatch) => {
    try {
        const { data } = await api.login(formData)

        dispatch({ type: AUTH, data })        
    } catch (error) {
        console.log(error)
    }
}
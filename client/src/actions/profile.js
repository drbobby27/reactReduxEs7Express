import Axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get current user profile
export const getCurrentProfile = () => async dispatch =>{

    try {
        const res = await Axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

      
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }

}

//create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await Axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert(edit ? 'Perfil Actualizado' : 'Perfil Creado','success'));

        if (!edit){
            history.push('/dashboard');
        }



    } catch (error) {

        const errors = error.response.data.errors;        
        if (errors){
            /* puedo correr funciones de otra accion */
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
        
    }



}
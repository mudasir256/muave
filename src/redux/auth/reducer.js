import { AUTH_ACTIONS } from "./auth-constants";

const initialState = {
    loginData: null,
    loading : false,
    onboard : false,
    
}

const auth = (state = initialState , action) => {
    switch(action.type){
        
        case AUTH_ACTIONS.LOGIN_DATA : {
            return{
                ...state,
                loginData : action.payload,
                loading : false
            }
        }

        case AUTH_ACTIONS.SET_LOADING : {
            return {
                ...state,
                loading : true
            }
        } 

        default:
        return state;
    }
}

export default auth;
import { USER_ACTIONS } from "./user-constants"
const initialState = {
    userData: null,
    loading : false,
    reminder : null,
    organization : null,
    subscription : null,
    plans : null,
    selectedPlan : null
}

const user = (state = initialState , action) => {
    switch(action.type){
        
        case USER_ACTIONS.SET_USER_DETAILS : {
            return{
                ...state,
                userData : action.payload,
            }
        }

        case USER_ACTIONS.SET_LOADING : {
            return {
                ...state,
                loading : true
            }
        } 

        case USER_ACTIONS.SET_DOC_DETAILS : {
            return {
                ...state,
                documents : action.payload,
                loading : false
            }
        }

        case USER_ACTIONS.ADD_REMINDER :
            return{
                ...state,
                reminder : action.payload,
                loading : false
            }

        case USER_ACTIONS.SET_ORG_USERS : 
        return{
            ...state,
            organization : action.payload
        }

        case USER_ACTIONS.SET_SUBSCRIPTION : 
        return{
            ...state,
            subscription : action.payload,
        }

        case USER_ACTIONS.SET_PLANS :
            return {
                ...state,
                plans : action.payload,
            }

        case USER_ACTIONS.SET_USER_PERMISSIONS :
        const payloadId = action.payload.id;
        organization?.organization?.map((elem) => {
        if(elem.id === payloadId){
            const newData = [action.payload];
            return{
                ...state,
                UserPermissions : newData, 
                loading : false,
            }
            }
            else{
                return{
                    ...state,
                    loading : false
                }
            }
        })

        default:
        return state;
    }
}

export default user;
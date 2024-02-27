import { USER_ACTIONS } from "./user-constants";
import {
    getUserDetails , addDoc ,AddReminder , GetOrganizationUsers,
    getUserPlans , AdvisorOnboard , setAccountSettings, setFirmSettings,
    setSecuritySetting, setNotificationSettings, setClientSettings
} from "./user-service";

export const userDetails = () => {
    return async (dispatch) => {
    try{
    const response = await getUserDetails();
    if(response){
        dispatch({
            type: USER_ACTIONS.SET_USER_DETAILS,
            payload : response
        })
    }
    }
    catch(error){
    return error;
    }
    }
}

export const getOrganizationUsers = (orgId) => {
    return async (dispatch) => {
    try{
    const response = await GetOrganizationUsers(orgId);
    if(response){
        dispatch({
            type: USER_ACTIONS.SET_ORG_USERS,
            payload : response
        })
    }
    }
    catch(error){
    return error;
    }
    }
}


export const handleAddDocument = (docObj) => {
    return async (dispatch) => {
    try{
    dispatch({
        type: USER_ACTIONS.SET_LOADING
    })
    const response = await addDoc(docObj);
    if(response){
        dispatch({
            type : USER_ACTIONS.SET_DOC_DETAILS,
            payload : response
        })
    }
    }
    catch(error){   
        return error
    }
    }
}

export const addReminder = (reminderObj , clientId) => {
    return async (dispatch) => {
        try{
        dispatch({
            type: USER_ACTIONS.SET_LOADING
        })
        const response = await AddReminder(reminderObj , clientId);
        if(response){
            dispatch({
                type: USER_ACTIONS.cls
                ,
                payload : response
            })
        }
        }
        catch(error){
            return error;
        }
    }
}

export const setSubscription = (plan) => {
    return (dispatch) => {
        dispatch({
            type : USER_ACTIONS.SET_SUBSCRIPTION,
            payload : plan
        })
    }
}

export const getPlans = () => {
    return async (dispatch) => {
        try{
            const response = await getUserPlans();
            if(response){
                dispatch({
                    type : USER_ACTIONS.SET_PLANS,
                    payload : response
                })
            }
        }
        catch(error){
            return error;
        }
    }
}


export const advisorOnboard = (data) => {
    return async(dispatch) => {
        try{
            const response = await AdvisorOnboard(data);
            // if(response){
            //     window.href = response
            // }
        }
        catch(err){
            return err;
        }
    }
}


export const accountSettings = (data) => {
    return async (dispatch) => {
        try{
            const response = await setAccountSettings(data);
            if(response){
                dispatch({
                    type: USER_ACTIONS.SET_USER_DETAILS,
                    payload : response
                })
            }
        }
        catch(error){
            return error;
        }
    }
}

export const firmSettings = (data) => {
    return async (dispatch) => {
        try{
            const response = await setFirmSettings(data);
            if(response) console.log(response);
        }
        catch(error){
            return error;
        }
    }
}


export const securitySetting = (data) => {
    return async (dispatch) => {
    try{
        const response = await setSecuritySetting(data);
        if(response) console.log(response);
    }
    catch(error) {
        return error   
    }
    }
}

export const notificationSettings = (enableDocument , enableReminders , enableTouchPoints) => {
    return async (dispatch) => {
    try{
        const response = await setNotificationSettings(enableDocument , enableReminders , enableTouchPoints);
        if(response) console.log(response);
    }
    catch(error) {
        return error   
    }
    }
}


export const clientSettings = (data) => {
    return async (dispatch) => {
    try{
        dispatch({
            type : USER_ACTIONS.SET_LOADING
        })
        const response = await setClientSettings(data);
        if(response){
            dispatch({
                type: USER_ACTIONS.SET_USER_PERMISSIONS,
                payload : response
            })
        }
    }
    catch(error) {
        return error   
    }
    }
}


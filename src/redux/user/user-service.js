import { makeRequest } from "../../shared/request-service"
import { METHODS } from "../../shared/requests.constants"
import { USER_ENDPOINTS } from "./user-constants"

export const getUserDetails = async () => {
    try{
        const response = await makeRequest(
        USER_ENDPOINTS.USER_DETAILS,
        METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting user details!`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const GetOrganizationUsers = async (organizationId) => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.GET_ALL_ORGANIZATION_USER+`/${organizationId}`,
            METHODS.GET,
            )
            if (!response || !response.data) {
                throw new Error(`Something wen't wrong in getting organization details!`);
            }
            return response.data;
    }
    catch(error){
        return error;
    }
}


export const AdvisorOnboard = async (payload) => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.ADVISOR_ONBOARD,
            METHODS.POST,
            {
                fullName : payload.fullName,
                email : payload.email ,
                account : payload.account,
                twoFactorAuth : payload.twoFactor,
                plan : payload.plan,
                organizationName : payload.firmName,
                logo : payload.firmLogo,
            },
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in Advisor Onboarding!`);
        }
        window.location.href = response.data
    }
    catch(error){
        return error;
    }
}

export const setAccountSettings = async (data) => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.ACCOUNT_SETTINGS,
            METHODS.POST,
            {
                fullName : data.fullName,
                email : data.email,
                department : data.advisor,
                profilepic : data.selectedImage,
                userId : data.id
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in Account Settings`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const setFirmSettings = async (data) => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.FIRM_SETTINGS,
            METHODS.POST,
            {
                fullName: data.fullName, logo:data.selectedImage
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in Firm Settings`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}
export const setSecuritySetting = async (data) => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.SECURITY_SETTINGS,
            METHODS.POST,
            {
                enable: data,
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in Security customization!`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const setNotificationSettings = async (enableDocument , enableReminders , enableTouchPoints) => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.NOTIFICATION_SETTINGS,
            METHODS.POST,
            {enableDocument , enableReminders , enableTouchPoints}
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in Security customization!`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const setClientSettings = async (data) => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.CLIENT_SETTINGS,
            METHODS.POST,
            data,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in Client Setings!`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const getUserPlans = async () => {
    try{
        const response = await makeRequest(
            USER_ENDPOINTS.GET_PLANS,
            METHODS.GET
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting plans!`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const addDoc = async (docObj) => {
    try{
        console.log("final checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk" , docObj)
        const response = await makeRequest(
        USER_ENDPOINTS.UPLOAD_DOCUMENT,
        METHODS.POST,
        {
        category : docObj.category,
        status : docObj.docStatus,
        expireDate : docObj.expDate,
        Access : docObj.access,
        file : docObj.doc[0]    
        }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting user details!`);
        }
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const AddReminder = async (reminderObj , clientId) => {
    try{
        const response = await makeRequest(
        USER_ENDPOINTS.ADD_REMINDER,
        METHODS.POST,
        {
            clientId : clientId,
            action: reminderObj.Action,
            actionItem : reminderObj.actionItem,
            targetDate:reminderObj.targetDate,
            description:reminderObj.description    
        }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting user details!`);
        }
        return response.data;
    }   
    catch(error){
        return error;
    }
}
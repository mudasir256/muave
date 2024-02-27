import { makeRequest } from "../../shared/request-service"
import { METHODS } from "../../shared/requests.constants"
import { ONBOARDING_ENDPOINTS } from "./constants"

export const getOnboarding = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.ONBOARDING,
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting onboarding`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postOnboarding = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.ONBOARDING,
            METHODS.POST,
            {
                step: obj.step,
                finish: obj.finish
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getStep1 = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[1],
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on getting onboarding step 1`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postStep1 = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[1],
            METHODS.POST,
            {
                fullName: obj.fullName,
                avatar: obj.avatar
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding step 1`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getStep2 = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[2],
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on getting onboarding step 2`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postStep2 = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[2],
            METHODS.POST,
            {
                fullName: obj.familyName,
                contactNo: obj.contactNo,
                email: obj.email,
                relationship: obj.relationship
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding step 2`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getStep3 = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[3],
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on getting onboarding step 3`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postStep3 = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[3],
            METHODS.POST,
            {
                source: obj.source,
                totalIncome: obj.totalIncome,
                type: obj.type
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding step 3`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getStep4 = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[4],
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on getting onboarding step 4`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postStep4 = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[4],
            METHODS.POST,
            {
                assetName: obj.assetName,
                assetType: obj.assetType,
                amount: obj.amount,
                type: obj.type
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding step 4`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getStep5 = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[5],
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on getting onboarding step 5`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postStep5 = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[5],
            METHODS.POST,
            {
                name: obj.name,
                liabilityType: obj.liabilityType,
                amount: obj.amount,
                loanPeriodStart: obj.loanPeriodStart,
                loanPeriodEnd: obj.loanPeriodEnd,
                type: obj.type
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding step 5`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getStep6 = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[6],
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on getting onboarding step 6`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postStep6 = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[6],
            METHODS.POST,
            {
                name: obj.name,
                priority: obj.priority,
                date: obj.date,
                description: obj.description,
                type: obj.type
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding step 6`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getStep7 = async () => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[7],
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on getting onboarding step 7`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postStep7 = async (obj) => {
    try {
        const response = await makeRequest(
            ONBOARDING_ENDPOINTS.STEP[7],
            METHODS.POST,
            {
                name: obj.name,
                category: obj.category,
                access: obj.access,
                lastUpdated: obj.lastUpdated,
                documentId: obj.documentId,
                type: obj.type
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting onboarding step 7`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}
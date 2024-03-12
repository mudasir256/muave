import { makeRequest } from "../../shared/request-service"
import { METHODS } from "../../shared/requests.constants"
import { DASHBOARD_ENDPOINTS } from "./constants"

export const getNotes = async () => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.BENEFICIARIES_NOTES,
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting notes`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postNote = async (obj) => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.BENEFICIARIES_NOTES,
            METHODS.POST,
            {
                name: obj.name,
                description: obj.description
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting notes`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}


export const getProvisions = async () => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.BENEFICIARIES_PROVISION,
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting notes`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postProvision = async (obj) => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.BENEFICIARIES_PROVISION,
            METHODS.POST,
            {
                provision: obj.provision,
                associates: obj.associates,
                purpose: obj.purpose,
                description: obj.description
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting notes`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getFid = async () => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.FIDUCUARIES,
            METHODS.GET,
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong in getting fid`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postFid = async (obj) => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.FIDUCUARIES,
            METHODS.POST,
            {
                name: obj.name,
                role: obj.role,
                relationship: obj.relationship,
                email: obj.email,
                phoneNumber: obj.phoneNumber,
                duties: obj.duties,
                assetManaged: obj.assetManaged,
                complianceObligation: obj.complianceObligation,
                notes: obj.notes,
                successor: obj.successor
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting fid`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const deleteFid = async (obj) => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.DELETE_FIDUCARIES,
            METHODS.POST,
            {
                fidId: obj.fidId
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting fid`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const editFid = async (obj) => {
    try {
        const response = await makeRequest(
            DASHBOARD_ENDPOINTS.EDIT_FIDUCARIES,
            METHODS.POST,
            {
                name: obj.name,
                role: obj.role,
                relationship: obj.relationship,
                email: obj.email,
                phoneNumber: obj.phoneNumber,
                duties: obj.duties,
                assetManaged: obj.assetManaged,
                complianceObligation: obj.complianceObligation,
                notes: obj.notes,
                successor: obj.successor,
                successorId: obj.successorId,
                fidId: obj.fidId
            }
        )
        if (!response || !response.data) {
            throw new Error(`Something wen't wrong on posting fid`);
        }
        return response.data;
    }
    catch (error) {
        return error;
    }
}
import { DASHBOARD_ACTIONS } from './constants';
import {
    getNotes,
    postNote,
    getProvisions,
    postProvision,
    getFid,
    postFid,
    editFid,
    deleteFid
} from './service';


export const getNotesAction = () => {
    return async (dispatch) => {
        try {
            const response = await getNotes();
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.GET_BENEFICIARIES_NOTES,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postNotesAction = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postNote(obj);
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.CREATE_BENEFICIARIES_NOTES,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const getProvisionAction = () => {
    return async (dispatch) => {
        try {
            const response = await getProvisions();
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.GET_BENEFICIARIES_PROVISION,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postProvisionAction = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postProvision(obj);
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.CREATE_BENEFICIARIES_PROVISION,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const getFidAction = () => {
    return async (dispatch) => {
        try {
            const response = await getFid();
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.GET_FIDUCUARIES,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postFidAction = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postFid(obj);
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.CREATE_FIDUCUARIES,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const deleteFidAction = (obj) => {
    return async (dispatch) => {
        try {
            const response = await deleteFid(obj);
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.DELETE_FIDUCARIES,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const editFidAction = (obj) => {
    return async (dispatch) => {
        try {
            const response = await editFid(obj);
            if (response) {
                dispatch({
                    type: DASHBOARD_ACTIONS.EDIT_FIDUCARIES,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

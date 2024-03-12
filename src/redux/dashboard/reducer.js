import { DASHBOARD_ACTIONS } from "./constants";

const initialState = {
    notes: null,
    provisions: null,
    fiduciaries: null,
    loading: false
}

const onboarding = (state = initialState, action) => {
    switch (action.type) {

        case DASHBOARD_ACTIONS.GET_BENEFICIARIES_NOTES: {
            return {
                ...state,
                notes: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.CREATE_BENEFICIARIES_NOTES: {
            return {
                ...state,
                notes: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.GET_BENEFICIARIES_PROVISION: {
            return {
                ...state,
                provisions: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.CREATE_BENEFICIARIES_PROVISION: {
            return {
                ...state,
                provisions: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.GET_FIDUCUARIES: {
            return {
                ...state,
                fiduciaries: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.CREATE_FIDUCUARIES: {
            return {
                ...state,
                fiduciaries: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.DELETE_FIDUCARIES: {
            return {
                ...state,
                fiduciaries: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.EDIT_FIDUCARIES: {
            return {
                ...state,
                fiduciaries: action.payload,
                loading: false
            }
        }

        case DASHBOARD_ACTIONS.SET_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return state;
    }
}

export default onboarding;